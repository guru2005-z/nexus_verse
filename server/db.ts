import fs from 'fs';
import path from 'path';
import { RegistrationRecord, PromoCode } from '../src/types';

interface StoreData {
  registrations: RegistrationRecord[];
  announcements: Array<{
    id: string;
    text: string;
    badge: string;
    date: string;
    active: boolean;
  }>;
  promos: PromoCode[];
}

const isVercel = Boolean(process.env.VERCEL || process.env.NOW_REGION);
const DATA_DIR = isVercel
  ? path.resolve('/tmp', 'nexus_verse_data')
  : path.resolve(process.cwd(), 'server', 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

// Initial seed registrations for realistic admin demo out-of-the-box
const INITIAL_REGISTRATIONS: RegistrationRecord[] = [
  {
    id: "NV26-1042",
    orderId: "order_demo_1042",
    paymentId: "pay_demo_98231",
    signature: "sig_demo_verified",
    status: "paid",
    createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    paidAt: new Date(Date.now() - 3600000 * 24 * 3 + 120000).toISOString(),
    participantType: "team",
    fullName: "Aditya Narayan",
    email: "aditya.n@gmail.com",
    phone: "+91 98480 12345",
    college: "IIT Madras",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    rollNumber: "CS23B042",
    city: "Chennai",
    selectedTrack: "flag-hunt-ctf",
    ticketTierId: "tier_hackathon",
    ticketTierName: "Hackathon Pass",
    basePrice: 799,
    discountAmount: 159.8,
    promoCodeApplied: "IEEE2026",
    gstAmount: 115.05,
    finalAmount: 754.25,
    amountInPaise: 75425,
    tshirtSize: "L",
    foodPreference: "Veg",
    teamName: "QuantumVortex",
    teamMembers: [
      { name: "Aditya Narayan", email: "aditya.n@gmail.com", phone: "+91 98480 12345", rollNumber: "CS23B042" },
      { name: "Priya Sundaram", email: "priya.sundar@gmail.com", phone: "+91 98480 12346", rollNumber: "CS23B089" },
      { name: "Rohit Krishnan", email: "rohit.k@gmail.com", phone: "+91 98480 12347", rollNumber: "CS23B091" }
    ],
    checkedIn: true,
    checkedInAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    checkedInBy: "Helpdesk Gate 1",
    certificateIssued: true
  },
  {
    id: "NV26-1088",
    orderId: "order_demo_1088",
    paymentId: "pay_demo_98452",
    signature: "sig_demo_verified",
    status: "paid",
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    paidAt: new Date(Date.now() - 3600000 * 24 * 2 + 65000).toISOString(),
    participantType: "individual",
    fullName: "Sneha Reddy",
    email: "sneha.reddy@nbkrist.ac.in",
    phone: "+91 94901 99887",
    college: "NBKR Institute of Science & Technology",
    department: "Artificial Intelligence & Data Science",
    year: "4th Year",
    rollNumber: "22B81A5401",
    city: "Vidyanagar",
    selectedTrack: "tech-prenures",
    ticketTierId: "tier_all_access",
    ticketTierName: "All-Access VIP",
    basePrice: 1199,
    discountAmount: 299.75,
    promoCodeApplied: "NBKRISTIAN",
    gstAmount: 161.86,
    finalAmount: 1061.11,
    amountInPaise: 106111,
    tshirtSize: "M",
    foodPreference: "Veg",
    checkedIn: false,
    certificateIssued: false
  },
  {
    id: "NV26-1115",
    orderId: "order_demo_1115",
    paymentId: "pay_demo_98912",
    signature: "sig_demo_verified",
    status: "paid",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    paidAt: new Date(Date.now() - 3600000 * 24 + 180000).toISOString(),
    participantType: "individual",
    fullName: "Vikas Sharma",
    email: "vikas.sharma@nitw.ac.in",
    phone: "+91 97000 55432",
    college: "NIT Warangal",
    department: "Electronics & Communication Engineering",
    year: "2nd Year",
    rollNumber: "EC24A015",
    city: "Warangal",
    selectedTrack: "clever-coding",
    ticketTierId: "tier_standard",
    ticketTierName: "Summit Pass",
    basePrice: 399,
    discountAmount: 0,
    gstAmount: 71.82,
    finalAmount: 470.82,
    amountInPaise: 47082,
    tshirtSize: "XL",
    foodPreference: "Non-Veg",
    checkedIn: false,
    certificateIssued: false
  }
];

const INITIAL_PROMOS: PromoCode[] = [
  {
    code: "IEEE2026",
    discountType: "percentage",
    discountValue: 20,
    maxDiscount: 300,
    description: "20% off for verified IEEE Student Branch Members",
    isActive: true
  },
  {
    code: "EARLYBIRD",
    discountType: "fixed",
    discountValue: 150,
    description: "Flat ₹150 off Early Bird Registration",
    isActive: true
  },
  {
    code: "NBKRISTIAN",
    discountType: "percentage",
    discountValue: 25,
    description: "Exclusive 25% off for host college students",
    isActive: true
  },
  {
    code: "HACKVIP",
    discountType: "fixed",
    discountValue: 200,
    description: "₹200 discount for Hackathon Pass holders",
    isActive: true
  }
];

const INITIAL_ANNOUNCEMENTS = [
  {
    id: "ann-1",
    text: "🔥 Phase 2 Registration Open: Only 112 seats remaining across Hackathon and Summit passes!",
    badge: "URGENT",
    date: "Oct 2026",
    active: true
  },
  {
    id: "ann-2",
    text: "🚀 IBM Quantum hardware access tokens will be dispatched to all registered delegates 48h before summit.",
    badge: "UPDATE",
    date: "Oct 2026",
    active: true
  },
  {
    id: "ann-3",
    text: "🚌 Free college shuttle service running from Gudur and Nayudupeta railway stations every hour.",
    badge: "TRAVEL",
    date: "Oct 2026",
    active: true
  }
];

class DatabaseService {
  private memoryData: StoreData = {
    registrations: [...INITIAL_REGISTRATIONS],
    announcements: [...INITIAL_ANNOUNCEMENTS],
    promos: [...INITIAL_PROMOS]
  };

  constructor() {
    this.initStore();
  }

  private initStore() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.registrations)) {
          this.memoryData = parsed;
          return;
        }
      }
      this.saveStore();
    } catch (err) {
      console.warn("Could not load store from disk, running in memory:", err);
    }
  }

  private saveStore() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.memoryData, null, 2), 'utf-8');
    } catch (err) {
      console.warn("Could not save store to disk:", err);
    }
  }

  public getRegistrations(): RegistrationRecord[] {
    return this.memoryData.registrations;
  }

  public getRegistrationById(id: string): RegistrationRecord | undefined {
    return this.memoryData.registrations.find(
      r => r.id.toLowerCase() === id.toLowerCase() || r.orderId === id
    );
  }

  public getRegistrationByEmail(email: string): RegistrationRecord | undefined {
    return this.memoryData.registrations.find(
      r => r.email.toLowerCase() === email.toLowerCase() && r.status === 'paid'
    );
  }

  public addRegistration(record: RegistrationRecord): RegistrationRecord {
    const existingIdx = this.memoryData.registrations.findIndex(r => r.id === record.id);
    if (existingIdx >= 0) {
      this.memoryData.registrations[existingIdx] = record;
    } else {
      this.memoryData.registrations.unshift(record);
    }
    this.saveStore();
    return record;
  }

  public updateRegistration(id: string, updates: Partial<RegistrationRecord>): RegistrationRecord | null {
    const record = this.memoryData.registrations.find(
      r => r.id.toLowerCase() === id.toLowerCase() || r.orderId === id
    );
    if (!record) return null;
    Object.assign(record, updates);
    this.saveStore();
    return record;
  }

  public getPromos(): PromoCode[] {
    return this.memoryData.promos;
  }

  public addPromo(promo: PromoCode): PromoCode {
    const idx = this.memoryData.promos.findIndex(p => p.code.toUpperCase() === promo.code.toUpperCase());
    if (idx >= 0) {
      this.memoryData.promos[idx] = promo;
    } else {
      this.memoryData.promos.push(promo);
    }
    this.saveStore();
    return promo;
  }

  public deletePromo(code: string): boolean {
    const prevLen = this.memoryData.promos.length;
    this.memoryData.promos = this.memoryData.promos.filter(p => p.code.toUpperCase() !== code.toUpperCase());
    this.saveStore();
    return this.memoryData.promos.length < prevLen;
  }

  public getAnnouncements() {
    return this.memoryData.announcements;
  }

  public addAnnouncement(text: string, badge: string) {
    const newAnn = {
      id: `ann-${Date.now()}`,
      text,
      badge: badge || 'NEW',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      active: true
    };
    this.memoryData.announcements.unshift(newAnn);
    this.saveStore();
    return newAnn;
  }

  public deleteAnnouncement(id: string) {
    this.memoryData.announcements = this.memoryData.announcements.filter(a => a.id !== id);
    this.saveStore();
  }
}

export const db = new DatabaseService();
