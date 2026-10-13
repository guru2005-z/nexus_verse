export type ParticipantType = 'individual' | 'team';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxDiscount?: number;
  minOrder?: number;
  description: string;
  isActive: boolean;
}

export interface TeamMemberInput {
  name: string;
  email: string;
  phone: string;
  college?: string;
  department?: string;
  year?: string;
  rollNumber?: string;
}

export interface RegistrationFormData {
  participantType: ParticipantType;
  // Primary Lead
  fullName: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  rollNumber: string;
  city: string;
  
  // Track and Tier
  selectedTrack: string;
  ticketTierId: string;
  promoCode?: string;

  // Personalization
  tshirtSize: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  foodPreference: 'Veg' | 'Non-Veg' | 'Jain';
  acceptTerms: boolean;

  // Team Specific
  teamName?: string;
  teamSize?: number;
  teamMembers?: TeamMemberInput[];
}

export interface RegistrationRecord {
  id: string; // NV26-XXXX
  orderId: string; // Razorpay order id: order_xxxx
  paymentId?: string;
  signature?: string;
  status: PaymentStatus;
  createdAt: string;
  paidAt?: string;

  // Participant Data
  participantType: ParticipantType;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  rollNumber: string;
  city: string;

  selectedTrack: string;
  ticketTierId: string;
  ticketTierName: string;
  
  // Pricing Details calculated server side
  basePrice: number;
  discountAmount: number;
  promoCodeApplied?: string;
  gstAmount: number;
  finalAmount: number; // in INR
  amountInPaise: number; // in paise

  tshirtSize: string;
  foodPreference: string;

  teamName?: string;
  teamMembers?: TeamMemberInput[];

  // Event check-in
  checkedIn: boolean;
  checkedInAt?: string;
  checkedInBy?: string;

  // Certificate
  certificateIssued?: boolean;
}

export interface OrderCreateResponse {
  success: boolean;
  orderId: string;
  amount: number; // paise
  amountInInr: number;
  currency: string;
  keyId: string;
  registrationId: string;
  isSimulated?: boolean;
  message?: string;
}

export interface PaymentVerifyResponse {
  success: boolean;
  registrationId: string;
  message: string;
  registration?: RegistrationRecord;
}
