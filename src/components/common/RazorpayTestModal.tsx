import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Smartphone, Building, Wallet, CheckCircle, AlertTriangle } from 'lucide-react';

interface RazorpayTestModalProps {
  isOpen: boolean;
  orderId: string;
  amountInInr: number;
  participantName: string;
  participantEmail: string;
  participantPhone: string;
  onSuccess: (response: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => void;
  onDismiss: () => void;
}

export const RazorpayTestModal: React.FC<RazorpayTestModalProps> = ({
  isOpen,
  orderId,
  amountInInr,
  participantName,
  participantEmail,
  participantPhone,
  onSuccess,
  onDismiss
}) => {
  const [activeTab, setActiveTab] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState(`${participantEmail.split('@')[0]}@okaxis`);
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('789');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSimulatePayment = (success: boolean) => {
    if (!success) {
      alert("Payment was cancelled or failed in test mode.");
      onDismiss();
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const fakePaymentId = `pay_rzp_${Math.floor(100000000 + Math.random() * 900000000)}`;
      onSuccess({
        razorpay_order_id: orderId,
        razorpay_payment_id: fakePaymentId,
        razorpay_signature: `simulated_sig_${orderId}_${fakePaymentId}`
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-cyan-500/30 shadow-[0_0_50px_-10px_rgba(6,182,212,0.3)] overflow-hidden text-slate-100">
        {/* Razorpay Brand Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 px-6 py-4 flex items-center justify-between border-b border-blue-800/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-white text-xs shadow-md">
              RZP
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-white">Razorpay Checkout</span>
                <span className="text-[10px] font-mono uppercase bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded font-black">
                  TEST MODE
                </span>
              </div>
              <p className="text-[11px] text-blue-200">
                Merchant: IEEE Student Branch NBKRIST
              </p>
            </div>
          </div>
          <button
            onClick={onDismiss}
            className="p-1 rounded-lg text-blue-300 hover:text-white hover:bg-blue-800/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount bar */}
        <div className="bg-slate-950 px-6 py-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">Order ID: {orderId}</span>
          <span className="text-cyan-400 font-bold text-base">₹{amountInInr.toFixed(2)}</span>
        </div>

        {/* Tabs for Payment Methods */}
        <div className="grid grid-cols-3 border-b border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('upi')}
            className={`py-3 flex items-center justify-center gap-1.5 font-medium transition-colors ${
              activeTab === 'upi'
                ? 'bg-slate-800/80 text-cyan-400 border-b-2 border-cyan-400 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>UPI / QR</span>
          </button>

          <button
            onClick={() => setActiveTab('card')}
            className={`py-3 flex items-center justify-center gap-1.5 font-medium transition-colors ${
              activeTab === 'card'
                ? 'bg-slate-800/80 text-cyan-400 border-b-2 border-cyan-400 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Card</span>
          </button>

          <button
            onClick={() => setActiveTab('netbanking')}
            className={`py-3 flex items-center justify-center gap-1.5 font-medium transition-colors ${
              activeTab === 'netbanking'
                ? 'bg-slate-800/80 text-cyan-400 border-b-2 border-cyan-400 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Netbanking</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-4">
          {activeTab === 'upi' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Instant UPI Apps</p>
                  <p className="text-[11px] text-slate-400">GPay, PhonePe, Paytm, BHIM</p>
                </div>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">
                  Zero Charges
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Enter UPI VPA ID</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:border-cyan-400 outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'card' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Card Number (Visa / MC / RuPay)</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:border-cyan-400 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Expiry</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:border-cyan-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">CVV</label>
                  <input
                    type="password"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:border-cyan-400 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'netbanking' && (
            <div className="space-y-3">
              <label className="block text-xs font-medium text-slate-300 mb-1">Select Bank</label>
              <div className="grid grid-cols-2 gap-2">
                {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBank(b)}
                    className={`p-2.5 rounded-xl text-xs text-left transition-all border ${
                      selectedBank === b
                        ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Delegate info snapshot */}
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Delegate:</span>
              <span className="text-white font-medium">{participantName}</span>
            </div>
            <div className="flex justify-between">
              <span>Contact:</span>
              <span className="text-white font-mono">{participantPhone} • {participantEmail}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleSimulatePayment(true)}
              disabled={isProcessing}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing Payment...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Complete Payment (₹{amountInInr.toFixed(2)})</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleSimulatePayment(false)}
              disabled={isProcessing}
              className="py-3 px-4 rounded-xl font-medium text-xs bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700 transition-colors"
            >
              Cancel / Decline
            </button>
          </div>
        </div>

        {/* Security badge footer */}
        <div className="bg-slate-950 px-6 py-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit SSL Encrypted Razorpay Gateway</span>
          </div>
          <span>PCI-DSS Compliant</span>
        </div>
      </div>
    </div>
  );
};
