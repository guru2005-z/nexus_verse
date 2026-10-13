import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import QRCode from 'qrcode';
import {
  Sparkles,
  Ticket,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Tag,
  ShieldCheck,
  CreditCard,
  Users,
  User,
  Building,
  Mail,
  Phone,
  Check,
  Share2,
  Download,
  Printer,
  ExternalLink,
  MessageCircle,
  RefreshCw
} from 'lucide-react';
import { NexusNavbar } from '../components/common/NexusNavbar';
import { Footer } from '../components/common/Footer';
import { RazorpayTestModal } from '../components/common/RazorpayTestModal';
import { NEXUS_VERSE_CONFIG, IEEE_CONFIG } from '../config/events';
import { RegistrationFormData, RegistrationRecord, TeamMemberInput } from '../types';

export const Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Wizard Step State (1: Details, 2: Review & Pay, 3: Success Confirmation)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const initialTierId = searchParams.get('tier') || NEXUS_VERSE_CONFIG.ticketTiers[1].id;
  const initialTrack = searchParams.get('track') || NEXUS_VERSE_CONFIG.tracks[0].id;
  const [formData, setFormData] = useState<RegistrationFormData>({
    participantType: 'individual',
    fullName: '',
    email: '',
    phone: '',
    college: 'NBKR Institute of Science & Technology',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    rollNumber: '',
    city: 'Vidyanagar',
    selectedTrack: initialTrack,
    ticketTierId: initialTierId,
    promoCode: '',
    tshirtSize: 'M',
    foodPreference: 'Veg',
    acceptTerms: true,
    teamName: '',
    teamSize: 3,
    teamMembers: [
      { name: '', email: '', phone: '', rollNumber: '' },
      { name: '', email: '', phone: '', rollNumber: '' },
      { name: '', email: '', phone: '', rollNumber: '' }
    ]
  });

  // Promo Code Validation
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [promoInput, setPromoInput] = useState<string>('');
  const [promoError, setPromoError] = useState<string>('');
  const [promoLoading, setPromoLoading] = useState<boolean>(false);

  // Payment & Order states
  const [orderData, setOrderData] = useState<any>(null);
  const [loadingOrder, setLoadingOrder] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [showTestModal, setShowTestModal] = useState<boolean>(false);

  // Completed Registration Record (Step 3)
  const [confirmedRegistration, setConfirmedRegistration] = useState<RegistrationRecord | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  // Selected Tier
  const selectedTier = NEXUS_VERSE_CONFIG.ticketTiers.find(t => t.id === formData.ticketTierId) || NEXUS_VERSE_CONFIG.ticketTiers[0];

  // Auto-switch participant type if hackathon pass or team
  const handleTierChange = (tierId: string) => {
    setFormData(prev => ({ ...prev, ticketTierId: tierId }));
  };

  // Promo Code Application
  const applyPromoCode = async () => {
    if (!promoInput.trim()) return;
    setPromoLoading(true);
    setPromoError('');
    try {
      const res = await fetch('/api/check-promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoInput.trim(), tierId: formData.ticketTierId })
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setAppliedPromo(data);
        setFormData(prev => ({ ...prev, promoCode: data.promo.code }));
      } else {
        setPromoError(data.message || 'Invalid promo code');
        setAppliedPromo(null);
      }
    } catch {
      setPromoError('Failed to validate promo code');
    } finally {
      setPromoLoading(false);
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoInput('');
    setFormData(prev => ({ ...prev, promoCode: '' }));
  };

  // Calculate Client Preview Pricing
  const basePrice = selectedTier.price;
  const discountAmount = appliedPromo ? appliedPromo.discountAmount : 0;
  const discountedSubtotal = Math.max(0, basePrice - discountAmount);
  const gstAmount = Math.round(discountedSubtotal * 0.18 * 100) / 100;
  const totalPayable = Math.round((discountedSubtotal + gstAmount) * 100) / 100;

  // Step 1 -> Step 2 Validation
  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName || !formData.email || !formData.phone) {
      setErrorMsg('Please enter your full name, email address, and phone number.');
      return;
    }

    if (!formData.acceptTerms) {
      setErrorMsg('Please agree to the Terms and Conditions to proceed.');
      return;
    }

    if (formData.participantType === 'team' && !formData.teamName) {
      setErrorMsg('Please specify a Team Name for team registration.');
      return;
    }

    setCurrentStep(2);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  // Step 2: Trigger Razorpay Checkout
  const handleInitiatePayment = async () => {
    setLoadingOrder(true);
    setErrorMsg('');

    try {
      // 1. Call POST /api/create-order
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.message || 'Failed to create order on server.');
        setLoadingOrder(false);
        return;
      }

      setOrderData(data);

      // 2. Open Official Razorpay Checkout if window.Razorpay exists and not simulated
      const hasRealRazorpay = typeof (window as any).Razorpay === 'function';

      if (hasRealRazorpay && !data.isSimulated) {
        try {
          const options = {
            key: data.keyId,
            amount: data.amount,
            currency: data.currency || 'INR',
            name: NEXUS_VERSE_CONFIG.name,
            description: `${selectedTier.name} — Delegate Pass`,
            image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=128&auto=format&fit=crop&q=80',
            order_id: data.orderId,
            prefill: {
              name: formData.fullName,
              email: formData.email,
              contact: formData.phone
            },
            theme: {
              color: '#06b6d4'
            },
            handler: async (response: any) => {
              await verifyPaymentOnServer(response, data.registrationId);
            },
            modal: {
              ondismiss: () => {
                setLoadingOrder(false);
                setErrorMsg('Payment cancelled. You can retry when ready.');
              }
            }
          };

          const rzp = new (window as any).Razorpay(options);
          rzp.on('payment.failed', (response: any) => {
            setErrorMsg(`Payment Failed: ${response.error.description}`);
            setLoadingOrder(false);
          });
          rzp.open();
          return;
        } catch (rzpErr) {
          console.warn('Real Razorpay initialization failed, opening interactive test modal:', rzpErr);
        }
      }

      // Fallback: Open interactive Razorpay Test Modal
      setShowTestModal(true);
      setLoadingOrder(false);
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error while initiating payment');
      setLoadingOrder(false);
    }
  };

  // 3. Call POST /api/verify-payment
  const verifyPaymentOnServer = async (
    paymentPayload: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string },
    registrationId: string
  ) => {
    setLoadingOrder(true);
    setShowTestModal(false);
    try {
      const res = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...paymentPayload,
          registration_id: registrationId
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setConfirmedRegistration(data.registration);
        setCurrentStep(3);

        // Generate scannable QR code
        const ticketUrl = `${window.location.origin}/nexus-verse/ticket/${data.registration.id}`;
        QRCode.toDataURL(ticketUrl, { width: 240, margin: 2, color: { dark: '#020617', light: '#ffffff' } })
          .then(url => setQrCodeUrl(url))
          .catch(() => {});

        // Fire festive confetti!
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });

        window.scrollTo({ top: 100, behavior: 'smooth' });
      } else {
        setErrorMsg(data.message || 'Payment signature verification failed.');
      }
    } catch {
      setErrorMsg('Failed to reach verification server. Please check your network.');
    } finally {
      setLoadingOrder(false);
    }
  };

  // Update Team Member Info
  const handleMemberChange = (index: number, field: keyof TeamMemberInput, value: string) => {
    const updated = [...(formData.teamMembers || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, teamMembers: updated }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-black">
      <NexusNavbar />

      <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 text-cyan-400 border border-cyan-800 mb-3">
            <Ticket className="w-3.5 h-3.5" />
            <span>NEXUS VERSE 2026 DELEGATE REGISTRATION</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
            {currentStep === 1 && "Delegate & Track Details"}
            {currentStep === 2 && "Review Order & Razorpay Payment"}
            {currentStep === 3 && "Registration Confirmed!"}
          </h1>

          {/* Stepper Dots */}
          <div className="mt-6 flex items-center justify-center gap-3">
            {[
              { num: 1, label: "Details" },
              { num: 2, label: "Payment" },
              { num: 3, label: "Ticket" },
            ].map(step => (
              <div key={step.num} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    currentStep === step.num
                      ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/40 ring-4 ring-cyan-500/20'
                      : currentStep > step.num
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}
                >
                  {currentStep > step.num ? <Check className="w-4 h-4" /> : step.num}
                </div>
                <span className={`text-xs font-mono hidden sm:inline ${currentStep === step.num ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
                  {step.label}
                </span>
                {step.num < 3 && <div className="w-8 sm:w-12 h-0.5 bg-slate-800" />}
              </div>
            ))}
          </div>
        </div>

        {/* Global Error Notice */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-950/60 border border-rose-600/60 text-rose-200 text-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Registration Alert</p>
              <p className="mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* ─── STEP 1: FORM DETAILS ─── */}
        {currentStep === 1 && (
          <form onSubmit={handleProceedToReview} className="space-y-8">
            {/* 1. Ticket Tier Picker */}
            <div className="p-6 rounded-3xl glass-card border border-slate-800">
              <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
                <Ticket className="w-5 h-5 text-cyan-400" />
                <span>1. Select Ticket Tier</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {NEXUS_VERSE_CONFIG.ticketTiers.map(tier => (
                  <div
                    key={tier.id}
                    onClick={() => handleTierChange(tier.id)}
                    className={`p-4 rounded-2xl cursor-pointer border transition-all text-left flex flex-col justify-between ${
                      formData.ticketTierId === tier.id
                        ? 'bg-cyan-950/40 border-cyan-400 ring-2 ring-cyan-500/20 shadow-lg shadow-cyan-950/40'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-base text-white">{tier.name}</span>
                        {tier.isPopular && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-bold">
                            POPULAR
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{tier.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-baseline justify-between">
                      <span className="font-display font-black text-xl text-white">₹{tier.price}</span>
                      <span className="text-xs font-mono text-slate-400">Seats: {tier.seatsBooked}/{tier.seatsLimit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Participant Mode & Track Selection */}
            <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-6">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                <span>2. Participation Mode & Technical Track</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Individual vs Team */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">Participant Type</label>
                  <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, participantType: 'individual' }))}
                      className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                        formData.participantType === 'individual'
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Individual</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, participantType: 'team' }))}
                      className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                        formData.participantType === 'team'
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Team (2-4)</span>
                    </button>
                  </div>
                </div>

                {/* Track */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">Selected Event / Competition Track *</label>
                  <select
                    value={formData.selectedTrack}
                    onChange={(e) => setFormData(prev => ({ ...prev, selectedTrack: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none cursor-pointer"
                  >
                    {NEXUS_VERSE_CONFIG.tracks.map(tr => (
                      <option key={tr.id} value={tr.id} className="bg-slate-900 text-white">
                        {tr.title} ({tr.prizePool} Prize)
                      </option>
                    ))}
                    <option value="all-events-pass" className="bg-slate-900 text-cyan-300 font-bold">
                      ⭐ All-Access (Attend Any / All 5 Events)
                    </option>
                  </select>
                </div>
              </div>

              {/* Team Details if Team selected */}
              {formData.participantType === 'team' && (
                <div className="pt-4 border-t border-slate-800 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Team Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Quantum Pioneers"
                      value={formData.teamName}
                      onChange={(e) => setFormData(prev => ({ ...prev, teamName: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <p className="text-xs font-mono text-cyan-400">Teammate Details (2-3 additional members):</p>
                  <div className="space-y-3">
                    {[0, 1].map((idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder={`Member #${idx + 2} Name`}
                          value={formData.teamMembers?.[idx]?.name || ''}
                          onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                          className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white outline-none"
                        />
                        <input
                          type="email"
                          placeholder={`Member #${idx + 2} Email`}
                          value={formData.teamMembers?.[idx]?.email || ''}
                          onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                          className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white outline-none"
                        />
                        <input
                          type="tel"
                          placeholder={`Member #${idx + 2} Phone`}
                          value={formData.teamMembers?.[idx]?.phone || ''}
                          onChange={(e) => handleMemberChange(idx, 'phone', e.target.value)}
                          className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Primary Delegate Personal Information */}
            <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <User className="w-5 h-5 text-cyan-400" />
                <span>3. Primary Delegate Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="rahul.sharma@college.edu"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">College / University *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NBKRIST, IIT Madras, etc."
                    value={formData.college}
                    onChange={(e) => setFormData(prev => ({ ...prev, college: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Department / Branch</label>
                  <input
                    type="text"
                    placeholder="Computer Science, ECE, AI&DS"
                    value={formData.department}
                    onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Year of Study</label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Postgraduate">Postgraduate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Roll / Student ID</label>
                    <input
                      type="text"
                      placeholder="e.g. 22B81A0501"
                      value={formData.rollNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, rollNumber: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">City & State</label>
                  <input
                    type="text"
                    placeholder="e.g. Chennai, Tamil Nadu"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">T-Shirt Size</label>
                    <select
                      value={formData.tshirtSize}
                      onChange={(e) => setFormData(prev => ({ ...prev, tshirtSize: e.target.value as any }))}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                    >
                      <option value="S">S (38)</option>
                      <option value="M">M (40)</option>
                      <option value="L">L (42)</option>
                      <option value="XL">XL (44)</option>
                      <option value="XXL">XXL (46)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Food Preference</label>
                    <select
                      value={formData.foodPreference}
                      onChange={(e) => setFormData(prev => ({ ...prev, foodPreference: e.target.value as any }))}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                    >
                      <option value="Veg">Vegetarian</option>
                      <option value="Non-Veg">Non-Vegetarian</option>
                      <option value="Jain">Jain Meals</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="pt-4 border-t border-slate-800">
                <label className="block text-xs font-medium text-slate-300 mb-1">Coupon / Promo Code</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. IEEE2026, NBKRISTIAN, EARLYBIRD"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono uppercase focus:border-cyan-400 outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={applyPromoCode}
                    disabled={promoLoading || !promoInput.trim()}
                    className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs font-mono transition-colors disabled:opacity-50"
                  >
                    {promoLoading ? 'Checking...' : 'Apply Code'}
                  </button>
                </div>

                {appliedPromo && (
                  <div className="mt-2 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 text-xs flex items-center justify-between">
                    <span>✓ Applied code {appliedPromo.promo.code}: ₹{appliedPromo.discountAmount} off!</span>
                    <button type="button" onClick={removePromoCode} className="text-xs text-rose-400 hover:underline">
                      Remove
                    </button>
                  </div>
                )}
                {promoError && (
                  <p className="mt-1 text-xs text-rose-400 font-mono">{promoError}</p>
                )}
              </div>

              {/* Terms checkbox */}
              <div className="pt-2 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                  className="mt-1 rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
                />
                <label htmlFor="terms" className="text-xs text-slate-400 leading-relaxed">
                  I accept the <Link to="/terms-conditions" target="_blank" className="text-cyan-400 hover:underline">Terms & Conditions</Link>, <Link to="/privacy-policy" target="_blank" className="text-cyan-400 hover:underline">Privacy Policy</Link>, and <Link to="/refund-policy" target="_blank" className="text-cyan-400 hover:underline">Refund Policy</Link> for NEXUS VERSE 2026.
                </label>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="flex justify-between items-center pt-2">
              <Link to="/nexus-verse" className="text-xs font-mono text-slate-400 hover:text-cyan-400">
                ← Return to Event Site
              </Link>

              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl font-display font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-lg shadow-cyan-400/30 flex items-center gap-2"
              >
                <span>Proceed to Order Summary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* ─── STEP 2: REVIEW & PAY ─── */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-800 space-y-6">
              <h3 className="font-display font-bold text-xl text-white">
                Order Summary & Review
              </h3>

              {/* Delegate Snapshot */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-500">Lead Delegate:</span>
                  <p className="text-white font-bold">{formData.fullName}</p>
                  <p className="text-slate-400">{formData.email}</p>
                  <p className="text-slate-400">{formData.phone}</p>
                </div>
                <div>
                  <span className="text-slate-500">Institution & Track:</span>
                  <p className="text-white font-bold">{formData.college}</p>
                  <p className="text-cyan-400">Track: {formData.selectedTrack}</p>
                  {formData.participantType === 'team' && (
                    <p className="text-violet-400">Team: {formData.teamName}</p>
                  )}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3 font-mono text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Pass ({selectedTier.name}):</span>
                  <span>₹{basePrice.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedPromo?.promo?.code}):</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span>₹{discountedSubtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>GST (18% Tech Summit Standard):</span>
                  <span>₹{gstAmount.toFixed(2)}</span>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between text-base font-bold text-white">
                  <span>Total Amount Payable:</span>
                  <span className="text-cyan-400 font-black">₹{totalPayable.toFixed(2)}</span>
                </div>
              </div>

              {/* Razorpay Safe Payment Notice */}
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-white">Official Razorpay Gateway Integration</p>
                  <p className="text-slate-300 leading-relaxed">
                    Clicking "Pay with Razorpay" will generate an authentic payment order on our Express server and open the Razorpay checkout. Supports UPI (GPay, PhonePe, Paytm), Cards, Netbanking, and Wallets.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 Actions */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-mono text-slate-300 border border-slate-800 flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Edit Registration Details</span>
              </button>

              <button
                type="button"
                onClick={handleInitiatePayment}
                disabled={loadingOrder}
                className="px-8 py-4 rounded-xl font-display font-black text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-xl shadow-cyan-400/40 flex items-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {loadingOrder ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Connecting Razorpay...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Pay with Razorpay (₹{totalPayable.toFixed(2)})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 3: SUCCESS & TICKET DOWNLOAD ─── */}
        {currentStep === 3 && confirmedRegistration && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Confetti Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/40 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                Payment Received & Registration Confirmed!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                Congratulations <strong className="text-white">{confirmedRegistration.fullName}</strong>! Your seat at NEXUS VERSE 2026 is officially reserved.
              </p>
              <div className="pt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950 border border-cyan-500/40 text-cyan-300 font-mono text-sm font-bold">
                <span>Registration ID: {confirmedRegistration.id}</span>
              </div>
            </div>

            {/* Boarding Pass / Ticket Card */}
            <div
              id="printable-ticket"
              className="p-6 sm:p-8 rounded-3xl glass-card border border-cyan-500/40 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative top pattern */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Left Ticket Info */}
                <div className="md:col-span-8 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="font-display font-black text-xl sm:text-2xl text-white">
                      {NEXUS_VERSE_CONFIG.name}
                    </span>
                    <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                      OFFICIAL DELEGATE PASS
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-slate-500 uppercase">Delegate</span>
                      <p className="text-white font-bold text-sm truncate">{confirmedRegistration.fullName}</p>
                    </div>

                    <div>
                      <span className="text-slate-500 uppercase">Pass Tier</span>
                      <p className="text-cyan-400 font-bold text-sm truncate">{confirmedRegistration.ticketTierName}</p>
                    </div>

                    <div>
                      <span className="text-slate-500 uppercase">Event Track</span>
                      <p className="text-violet-300 font-bold text-sm truncate">{confirmedRegistration.selectedTrack}</p>
                    </div>

                    <div>
                      <span className="text-slate-500 uppercase">College</span>
                      <p className="text-slate-300 truncate">{confirmedRegistration.college}</p>
                    </div>

                    <div>
                      <span className="text-slate-500 uppercase">Payment ID</span>
                      <p className="text-slate-300 truncate">{confirmedRegistration.paymentId || 'Captured'}</p>
                    </div>

                    <div>
                      <span className="text-slate-500 uppercase">Status</span>
                      <p className="text-emerald-400 font-bold">PAID & VERIFIED</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                    <span>Dates: {NEXUS_VERSE_CONFIG.dates}</span>
                    <span>Venue: NBKRIST Campus, AP</span>
                  </div>
                </div>

                {/* Right QR Code section */}
                <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-6 flex flex-col items-center justify-center text-center">
                  {qrCodeUrl ? (
                    <div className="p-2.5 rounded-2xl bg-white shadow-md">
                      <img src={qrCodeUrl} alt="Ticket QR code" className="w-36 h-36" />
                    </div>
                  ) : (
                    <div className="w-36 h-36 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-xs text-slate-500">
                      Generating QR...
                    </div>
                  )}

                  <p className="text-[10px] font-mono text-slate-400 mt-2">
                    Scan for On-Spot Check-in
                  </p>
                  <p className="text-xs font-mono font-bold text-cyan-400 mt-0.5">
                    {confirmedRegistration.id}
                  </p>
                </div>
              </div>
            </div>

            {/* Post-Registration Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* WhatsApp Community */}
              <a
                href={NEXUS_VERSE_CONFIG.whatsappGroupInvite}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-600/40 hover:bg-emerald-900/50 text-emerald-300 text-xs font-medium flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>Join Delegates WhatsApp Group</span>
              </a>

              {/* View/Print Pass */}
              <Link
                to={`/nexus-verse/ticket/${confirmedRegistration.id}`}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-cyan-300 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="w-5 h-5 text-cyan-400" />
                <span>Download / Print Pass</span>
              </Link>

              {/* Certificate Access */}
              <Link
                to="/nexus-verse/certificate"
                className="p-4 rounded-2xl bg-slate-900 border border-slate-700 hover:border-violet-400 text-violet-300 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-5 h-5 text-violet-400" />
                <span>Certificate Portal</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />

      {/* Razorpay Test Interactive Modal */}
      {showTestModal && orderData && (
        <RazorpayTestModal
          isOpen={showTestModal}
          orderId={orderData.orderId}
          amountInInr={orderData.amountInInr}
          participantName={formData.fullName}
          participantEmail={formData.email}
          participantPhone={formData.phone}
          onSuccess={(response) => verifyPaymentOnServer(response, orderData.registrationId)}
          onDismiss={() => {
            setShowTestModal(false);
            setErrorMsg('Payment modal closed. You can retry payment anytime.');
          }}
        />
      )}
    </div>
  );
};
