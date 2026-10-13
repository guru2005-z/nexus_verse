import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import QRCode from 'qrcode';
import {
  Printer,
  ArrowLeft,
  Calendar,
  MapPin,
  CheckCircle,
  ShieldCheck,
  Download,
  Share2,
  Clock,
  Ticket as TicketIcon
} from 'lucide-react';
import { NexusNavbar } from '../components/common/NexusNavbar';
import { Footer } from '../components/common/Footer';
import { NEXUS_VERSE_CONFIG, IEEE_CONFIG } from '../config/events';
import { RegistrationRecord } from '../types';

export const TicketView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [registration, setRegistration] = useState<RegistrationRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/registrations/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.registration) {
          setRegistration(data.registration);
          // Generate QR code for ticket verification
          const verificationUrl = `${window.location.origin}/nexus-verse/ticket/${data.registration.id}`;
          QRCode.toDataURL(verificationUrl, {
            width: 260,
            margin: 2,
            color: { dark: '#020617', light: '#ffffff' }
          }).then(url => setQrCodeUrl(url));
        } else {
          setError(data.message || 'Registration ticket not found');
        }
      })
      .catch(() => setError('Failed to retrieve ticket record'))
      .finally(() => setLoading(false));
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 print:bg-white print:text-black">
      <div className="print:hidden">
        <NexusNavbar />
      </div>

      <div className="pt-28 pb-20 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6 print:hidden">
          <Link
            to="/nexus-verse"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Summit</span>
          </Link>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 font-mono text-xs">
            Loading delegate pass...
          </div>
        ) : error || !registration ? (
          <div className="p-8 rounded-3xl glass-card border border-rose-800/60 text-center space-y-3">
            <p className="text-rose-400 font-bold text-sm">Pass Not Found</p>
            <p className="text-xs text-slate-400">{error || 'Invalid Registration ID.'}</p>
            <Link to="/nexus-verse/register" className="inline-block mt-3 text-xs text-cyan-400 underline">
              Register for NEXUS VERSE 2026
            </Link>
          </div>
        ) : (
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-cyan-500/40 shadow-2xl print:border-black print:bg-white print:shadow-none">
            {/* Top summit header banner */}
            <div className="bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-800 p-6 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-200">
                  IEEE STUDENT BRANCH • NBKRIST
                </span>
                <h1 className="font-display font-black text-2xl sm:text-3xl tracking-tight">
                  {NEXUS_VERSE_CONFIG.name}
                </h1>
                <p className="text-xs text-cyan-100 font-mono mt-0.5">
                  Official Delegate Entry Badge
                </p>
              </div>

              <div className="text-right font-mono">
                <span className="text-xs text-cyan-200">PASS ID:</span>
                <p className="text-lg font-black tracking-wider text-white">{registration.id}</p>
              </div>
            </div>

            {/* Main content grid */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left Details */}
                <div className="md:col-span-8 space-y-4">
                  <div className="border-b border-slate-800 pb-3">
                    <span className="text-[10px] font-mono uppercase text-slate-400">Delegate Name</span>
                    <h2 className="font-display font-bold text-2xl text-white print:text-black">
                      {registration.fullName}
                    </h2>
                    <p className="text-xs text-slate-400 font-mono">{registration.college}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-slate-500 uppercase">Tier</span>
                      <p className="text-cyan-400 font-bold">{registration.ticketTierName}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase">Track</span>
                      <p className="text-violet-300 font-bold">{registration.selectedTrack}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase">Payment Status</span>
                      <p className="text-emerald-400 font-bold uppercase">{registration.status}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase">Check-in Status</span>
                      <p className={registration.checkedIn ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                        {registration.checkedIn ? "CHECKED IN" : "PENDING GATE SCAN"}
                      </p>
                    </div>
                  </div>

                  {registration.participantType === 'team' && registration.teamName && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
                      <span className="text-slate-400">Team: </span>
                      <strong className="text-white">{registration.teamName}</strong>
                    </div>
                  )}

                  <div className="space-y-1 text-xs text-slate-400 font-mono pt-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{NEXUS_VERSE_CONFIG.dates}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{NEXUS_VERSE_CONFIG.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Right QR Code */}
                <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  {qrCodeUrl ? (
                    <img src={qrCodeUrl} alt="Ticket Verification QR" className="w-40 h-40 rounded-lg bg-white p-1" />
                  ) : (
                    <div className="w-40 h-40 bg-slate-900 rounded-lg flex items-center justify-center text-xs text-slate-500">
                      QR Code
                    </div>
                  )}
                  <p className="text-[10px] font-mono text-slate-400 mt-2">
                    Show this QR at Registration Desk
                  </p>
                  <p className="text-xs font-mono font-bold text-cyan-400">
                    {registration.id}
                  </p>
                </div>
              </div>

              {/* Instructions Bar */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                <p className="font-bold text-white">Entry Guidelines:</p>
                <p>• Please bring a valid college photo ID card along with this pass.</p>
                <p>• Registration desks open at 08:30 AM IST on November 20, 2026.</p>
                <p>• For hostel allocation, show this pass at the Campus Guest Reception desk.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};
