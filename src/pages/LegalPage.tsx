import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, FileText, RefreshCw } from 'lucide-react';
import { NexusNavbar } from '../components/common/NexusNavbar';
import { Footer } from '../components/common/Footer';
import { IEEE_CONFIG, NEXUS_VERSE_CONFIG } from '../config/events';

export const LegalPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const isPrivacy = path.includes('privacy');
  const isRefund = path.includes('refund');
  const isTerms = path.includes('terms') || (!isPrivacy && !isRefund);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <NexusNavbar />

      <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <Link
            to="/nexus-verse"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to NEXUS VERSE</span>
          </Link>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl glass-card border border-slate-800 space-y-8">
          {/* TERMS AND CONDITIONS */}
          {isTerms && (
            <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <FileText className="w-8 h-8 text-cyan-400" />
                <div>
                  <h1 className="font-display font-black text-2xl sm:text-3xl text-white">Terms and Conditions</h1>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Last updated: October 2026</p>
                </div>
              </div>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white">1. Event Participation & Eligibility</h2>
                <p>
                  NEXUS VERSE 2026 is organized by the {IEEE_CONFIG.branchName} at {IEEE_CONFIG.collegeName}. By registering for the summit or 36-hour hackathon, delegates agree to comply with all campus rules, code of conduct, and IEEE ethical guidelines.
                </p>
                <p>
                  All participants must carry a valid institutional student identity card alongside their official digital delegate pass generated upon payment.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white">2. Intellectual Property & Hackathon Projects</h2>
                <p>
                  All code, designs, and prototypes authored during the hackathon remain 100% the intellectual property of the respective student teams. Teams must not utilize proprietary code developed prior to the hackathon kickoff unless explicitly disclosed as an open-source library or public API.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white">3. Payment & Pricing</h2>
                <p>
                  All delegate ticket amounts are quoted in Indian Rupees (INR) and are subject to 18% Goods and Services Tax (GST). Payments are securely authorized through the Razorpay payment gateway.
                </p>
              </section>
            </div>
          )}

          {/* PRIVACY POLICY */}
          {isPrivacy && (
            <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <ShieldCheck className="w-8 h-8 text-cyan-400" />
                <div>
                  <h1 className="font-display font-black text-2xl sm:text-3xl text-white">Privacy Policy</h1>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Last updated: October 2026</p>
                </div>
              </div>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white">1. Information We Collect</h2>
                <p>
                  We collect information necessary for event administration, including full name, institutional email address, phone number, college name, department, year of study, roll number, and t-shirt/dietary preferences.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white">2. Payment Security</h2>
                <p>
                  Financial transactions and card/UPI information are handled directly by Razorpay Software Private Limited adhering to PCI-DSS Level 1 compliance. We do not store credit card numbers, CVVs, or UPI PINs on our servers.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white">3. Certificate & Data Retention</h2>
                <p>
                  Delegate registration IDs and verification records are maintained in our digital credentials registry to enable lifetime online certificate verification by academic institutions and prospective employers.
                </p>
              </section>
            </div>
          )}

          {/* REFUND AND CANCELLATION POLICY */}
          {isRefund && (
            <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <RefreshCw className="w-8 h-8 text-cyan-400" />
                <div>
                  <h1 className="font-display font-black text-2xl sm:text-3xl text-white">Refund & Cancellation Policy</h1>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Last updated: October 2026</p>
                </div>
              </div>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white">1. Cancellation Window</h2>
                <p>
                  Delegates may request cancellation of their registration up to 7 calendar days before the event kickoff (on or before November 13, 2026, 23:59 IST). Eligible cancellations will receive an 80% refund of the base ticket amount (20% retained toward administrative processing and kit logistics).
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white">2. Non-Refundable Period</h2>
                <p>
                  Due to catering commitments, hostel room allocations, and customized delegate hoodie manufacturing, cancellation requests submitted after November 13, 2026 cannot be refunded. However, ticket transfer to another student from the same institution is permitted upon email notification to <a href={`mailto:${IEEE_CONFIG.email}`} className="text-cyan-400 underline">{IEEE_CONFIG.email}</a>.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white">3. Mode of Refund</h2>
                <p>
                  Approved refunds will be credited back directly to the original payment source (UPI account or bank card) via Razorpay within 5–7 business days.
                </p>
              </section>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
