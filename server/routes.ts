import express, { Request, Response } from 'express';
import { db } from './db';
import { razorpayService } from './razorpay';
import { NEXUS_VERSE_CONFIG } from '../src/config/events';
import { RegistrationFormData, RegistrationRecord } from '../src/types';

export const apiRouter = express.Router();

const ADMIN_PASSWORD = process.env.ADMIN_SECRET_KEY || 'admin@nexusverse2026';

// Helper to calculate pricing server-side
function calculateOrderPricing(tierId: string, promoCodeStr?: string) {
  const tier = NEXUS_VERSE_CONFIG.ticketTiers.find(t => t.id === tierId);
  if (!tier) {
    throw new Error(`Invalid ticket tier selected: ${tierId}`);
  }

  const basePrice = tier.price;
  let discountAmount = 0;
  let promoApplied: string | undefined = undefined;

  if (promoCodeStr) {
    const promo = db.getPromos().find(
      p => p.code.toUpperCase() === promoCodeStr.trim().toUpperCase() && p.isActive
    );

    if (promo) {
      if (promo.discountType === 'percentage') {
        let disc = (basePrice * promo.discountValue) / 100;
        if (promo.maxDiscount && disc > promo.maxDiscount) {
          disc = promo.maxDiscount;
        }
        discountAmount = disc;
      } else {
        discountAmount = Math.min(promo.discountValue, basePrice);
      }
      promoApplied = promo.code;
    }
  }

  const discountedPrice = Math.max(0, basePrice - discountAmount);
  // 18% GST (Standard on tech summits/events in India)
  const gstAmount = Math.round(discountedPrice * 0.18 * 100) / 100;
  const finalAmount = Math.round((discountedPrice + gstAmount) * 100) / 100;
  const amountInPaise = Math.round(finalAmount * 100);

  return {
    tierName: tier.name,
    basePrice,
    discountAmount: Math.round(discountAmount * 100) / 100,
    promoApplied,
    gstAmount,
    finalAmount,
    amountInPaise
  };
}

// 1. Get Public Config & Live Seat Status
apiRouter.get('/config', (req: Request, res: Response) => {
  const registrations = db.getRegistrations();
  const paidCount = registrations.filter(r => r.status === 'paid').length;
  const totalLimit = NEXUS_VERSE_CONFIG.maxAttendees;
  const seatsRemaining = Math.max(0, totalLimit - (NEXUS_VERSE_CONFIG.currentRegistered + paidCount));

  res.json({
    appName: NEXUS_VERSE_CONFIG.name,
    keyId: razorpayService.getKeyId(),
    isTestMode: razorpayService.isTestMode(),
    totalLimit,
    seatsRemaining,
    registrationDeadline: NEXUS_VERSE_CONFIG.registrationDeadline,
    announcements: db.getAnnouncements(),
    ticketTiers: NEXUS_VERSE_CONFIG.ticketTiers,
    tracks: NEXUS_VERSE_CONFIG.tracks
  });
});

// 2. Validate Promo Code
apiRouter.post('/check-promo', (req: Request, res: Response) => {
  const { code, tierId } = req.body;
  if (!code || !tierId) {
    return res.status(400).json({ valid: false, message: "Code and Tier ID are required" });
  }

  const promo = db.getPromos().find(
    p => p.code.toUpperCase() === String(code).trim().toUpperCase() && p.isActive
  );

  if (!promo) {
    return res.status(404).json({ valid: false, message: "Invalid or expired promo code" });
  }

  try {
    const pricing = calculateOrderPricing(tierId, promo.code);
    return res.json({
      valid: true,
      promo: {
        code: promo.code,
        description: promo.description,
        discountType: promo.discountType,
        discountValue: promo.discountValue
      },
      discountAmount: pricing.discountAmount,
      finalAmount: pricing.finalAmount
    });
  } catch (err: any) {
    return res.status(400).json({ valid: false, message: err.message });
  }
});

// 3. Create Order (Server-Side Price Calculation & Razorpay Order)
apiRouter.post('/create-order', async (req: Request, res: Response) => {
  try {
    const formData = req.body as RegistrationFormData;

    // Basic Validations
    if (!formData.fullName || !formData.email || !formData.phone || !formData.ticketTierId) {
      return res.status(400).json({
        success: false,
        message: "Missing required registration fields (Full Name, Email, Phone, Ticket Tier)."
      });
    }

    // Check duplicate registrations (Email + Event)
    const existing = db.getRegistrationByEmail(formData.email);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `An active paid registration (${existing.id}) already exists for ${formData.email}. Please check your ticket status or contact the helpdesk.`
      });
    }

    // Server-side calculated pricing
    const pricing = calculateOrderPricing(formData.ticketTierId, formData.promoCode);

    // Generate unique Registration ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const registrationId = `NV26-${randomNum}`;

    // Call Razorpay Order API
    const orderResult = await razorpayService.createOrder({
      amount: pricing.amountInPaise,
      currency: 'INR',
      receipt: registrationId,
      notes: {
        registrationId,
        participant: formData.fullName,
        email: formData.email,
        track: formData.selectedTrack,
        tier: pricing.tierName
      }
    });

    // Save pending registration record
    const record: RegistrationRecord = {
      id: registrationId,
      orderId: orderResult.id,
      status: 'pending',
      createdAt: new Date().toISOString(),
      participantType: formData.participantType || 'individual',
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      college: formData.college || 'N/A',
      department: formData.department || 'N/A',
      year: formData.year || 'N/A',
      rollNumber: formData.rollNumber || 'N/A',
      city: formData.city || 'N/A',
      selectedTrack: formData.selectedTrack || 'General',
      ticketTierId: formData.ticketTierId,
      ticketTierName: pricing.tierName,
      basePrice: pricing.basePrice,
      discountAmount: pricing.discountAmount,
      promoCodeApplied: pricing.promoApplied,
      gstAmount: pricing.gstAmount,
      finalAmount: pricing.finalAmount,
      amountInPaise: pricing.amountInPaise,
      tshirtSize: formData.tshirtSize || 'M',
      foodPreference: formData.foodPreference || 'Veg',
      teamName: formData.teamName,
      teamMembers: formData.teamMembers,
      checkedIn: false
    };

    db.addRegistration(record);

    return res.json({
      success: true,
      orderId: orderResult.id,
      amount: pricing.amountInPaise,
      amountInInr: pricing.finalAmount,
      currency: 'INR',
      keyId: razorpayService.getKeyId(),
      registrationId,
      isSimulated: orderResult.isSimulated
    });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create registration order"
    });
  }
});

// 4. Verify Payment Signature
apiRouter.post('/verify-payment', (req: Request, res: Response) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      registration_id
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification parameters"
      });
    }

    // Verify HMAC Signature
    const isValid = razorpayService.verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      // Mark as failed if found
      if (registration_id) {
        db.updateRegistration(registration_id, { status: 'failed' });
      }
      return res.status(400).json({
        success: false,
        message: "Payment signature verification failed. Please contact support."
      });
    }

    // Update registration to paid
    const updated = db.updateRegistration(registration_id || razorpay_order_id, {
      status: 'paid',
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      paidAt: new Date().toISOString()
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Registration record not found for this order"
      });
    }

    return res.json({
      success: true,
      registrationId: updated.id,
      message: "Payment successfully verified! Your ticket has been confirmed.",
      registration: updated
    });
  } catch (err: any) {
    console.error("Payment verification error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error during verification"
    });
  }
});

// 5. Razorpay Webhook (Backup fulfillment)
apiRouter.post('/razorpay-webhook', (req: Request, res: Response) => {
  try {
    const signature = req.headers['x-razorpay-signature'] as string;
    const bodyStr = JSON.stringify(req.body);

    if (signature && !razorpayService.verifyWebhookSignature(bodyStr, signature)) {
      console.warn("Invalid webhook signature received");
      return res.status(400).json({ status: "invalid_signature" });
    }

    const event = req.body.event;
    const payload = req.body.payload;

    if (event === 'payment.captured' && payload?.payment?.entity) {
      const orderId = payload.payment.entity.order_id;
      const paymentId = payload.payment.entity.id;
      if (orderId) {
        db.updateRegistration(orderId, {
          status: 'paid',
          paymentId,
          paidAt: new Date().toISOString()
        });
        console.log(`Webhook marked order ${orderId} as paid`);
      }
    } else if (event === 'payment.failed' && payload?.payment?.entity) {
      const orderId = payload.payment.entity.order_id;
      if (orderId) {
        db.updateRegistration(orderId, { status: 'failed' });
      }
    }

    return res.json({ status: 'ok' });
  } catch (err) {
    console.error("Webhook processing error:", err);
    return res.status(500).json({ status: 'error' });
  }
});

// 6. Get Registration by ID or Email
apiRouter.get('/registrations/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const reg = db.getRegistrationById(id) || db.getRegistrationByEmail(id);
  if (!reg) {
    return res.status(404).json({ success: false, message: "Registration not found" });
  }
  return res.json({ success: true, registration: reg });
});

// 7. Certificate verification & lookup
apiRouter.get('/certificate/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const reg = db.getRegistrationById(id) || db.getRegistrationByEmail(id);
  if (!reg) {
    return res.status(404).json({ success: false, message: "Registration not found for this ID" });
  }

  if (reg.status !== 'paid') {
    return res.status(400).json({ success: false, message: "Registration payment is not completed" });
  }

  return res.json({
    success: true,
    certificate: {
      registrationId: reg.id,
      fullName: reg.fullName,
      college: reg.college,
      track: reg.selectedTrack,
      tier: reg.ticketTierName,
      event: NEXUS_VERSE_CONFIG.name,
      organizer: NEXUS_VERSE_CONFIG.edition,
      issueDate: "November 22, 2026",
      status: "Verified IEEE Certificate",
      credentialUrl: `https://nbkristieee.in/nexus-verse/ticket/${reg.id}`
    }
  });
});

// 8. Contact Form
apiRouter.post('/contact', (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;
  console.log(`Contact message from ${name} (${email}): [${subject}] ${message}`);
  return res.json({
    success: true,
    message: "Thank you for reaching out! The IEEE student branch team will get back to you within 24 hours."
  });
});

// ─── ADMIN ENDPOINTS ───

// Admin Login
apiRouter.post('/admin/login', (req: Request, res: Response) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    return res.json({
      success: true,
      token: `admin_token_${Buffer.from(ADMIN_PASSWORD).toString('base64')}`,
      message: "Admin authentication successful"
    });
  }
  return res.status(401).json({ success: false, message: "Invalid Admin Password" });
});

// Admin Stats
apiRouter.get('/admin/stats', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const registrations = db.getRegistrations();
  const total = registrations.length;
  const paid = registrations.filter(r => r.status === 'paid');
  const pending = registrations.filter(r => r.status === 'pending');
  const checkedIn = registrations.filter(r => r.checkedIn);

  const totalRevenue = paid.reduce((sum, r) => sum + (r.finalAmount || 0), 0);

  // Group by Track
  const trackCounts: Record<string, number> = {};
  paid.forEach(r => {
    trackCounts[r.selectedTrack] = (trackCounts[r.selectedTrack] || 0) + 1;
  });

  // Group by Tier
  const tierCounts: Record<string, number> = {};
  paid.forEach(r => {
    tierCounts[r.ticketTierName] = (tierCounts[r.ticketTierName] || 0) + 1;
  });

  return res.json({
    total,
    paidCount: paid.length,
    pendingCount: pending.length,
    checkedInCount: checkedIn.length,
    totalRevenue: Math.round(totalRevenue),
    trackCounts,
    tierCounts
  });
});

// Admin Get Registrations with filter
apiRouter.get('/admin/registrations', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { search, status, track } = req.query;
  let list = db.getRegistrations();

  if (status && status !== 'all') {
    list = list.filter(r => r.status === status);
  }

  if (track && track !== 'all') {
    list = list.filter(r => r.selectedTrack === track);
  }

  if (search) {
    const q = String(search).toLowerCase();
    list = list.filter(
      r =>
        r.fullName.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.college.toLowerCase().includes(q) ||
        (r.teamName && r.teamName.toLowerCase().includes(q))
    );
  }

  return res.json({ registrations: list });
});

// Admin Check-In (On-spot QR scan attendance)
apiRouter.post('/admin/check-in', (req: Request, res: Response) => {
  const { registrationId, agentName } = req.body;
  if (!registrationId) {
    return res.status(400).json({ error: "Registration ID is required" });
  }

  const updated = db.updateRegistration(registrationId, {
    checkedIn: true,
    checkedInAt: new Date().toISOString(),
    checkedInBy: agentName || "Admin Scanner"
  });

  if (!updated) {
    return res.status(404).json({ error: "Registration record not found" });
  }

  return res.json({ success: true, message: `Successfully checked in ${updated.fullName} (${updated.id})`, registration: updated });
});

// Admin Manage Promo Codes
apiRouter.post('/admin/promos', (req: Request, res: Response) => {
  const { code, discountType, discountValue, description } = req.body;
  if (!code || !discountValue) {
    return res.status(400).json({ error: "Code and discount value are required" });
  }
  const created = db.addPromo({
    code: String(code).toUpperCase(),
    discountType: discountType || 'percentage',
    discountValue: Number(discountValue),
    description: description || 'Promotional Discount',
    isActive: true
  });
  return res.json({ success: true, promo: created });
});

// Admin Manage Announcements
apiRouter.post('/admin/announcements', (req: Request, res: Response) => {
  const { text, badge } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  const created = db.addAnnouncement(text, badge);
  return res.json({ success: true, announcement: created });
});

// Admin CSV Export
apiRouter.get('/admin/export-csv', (req: Request, res: Response) => {
  const registrations = db.getRegistrations();
  const headers = [
    "Registration ID",
    "Full Name",
    "Email",
    "Phone",
    "College",
    "Department",
    "Year",
    "City",
    "Track",
    "Ticket Tier",
    "Final Amount (INR)",
    "Payment Status",
    "Payment ID",
    "Order ID",
    "Participant Type",
    "Team Name",
    "T-Shirt",
    "Food",
    "Checked In",
    "Created At"
  ];

  const rows = registrations.map(r => [
    `"${r.id}"`,
    `"${r.fullName}"`,
    `"${r.email}"`,
    `"${r.phone}"`,
    `"${r.college}"`,
    `"${r.department}"`,
    `"${r.year}"`,
    `"${r.city}"`,
    `"${r.selectedTrack}"`,
    `"${r.ticketTierName}"`,
    r.finalAmount,
    r.status,
    `"${r.paymentId || ''}"`,
    `"${r.orderId}"`,
    r.participantType,
    `"${r.teamName || ''}"`,
    r.tshirtSize,
    r.foodPreference,
    r.checkedIn ? "YES" : "NO",
    `"${r.createdAt}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="nexus_verse_2026_registrations.csv"');
  return res.send(csvContent);
});
