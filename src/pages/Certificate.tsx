import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Search,
  CheckCircle,
  Download,
  Printer,
  ShieldCheck,
  Calendar,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';
import { NexusNavbar } from '../components/common/NexusNavbar';
import { Footer } from '../components/common/Footer';
import { NEXUS_VERSE_CONFIG, IEEE_CONFIG } from '../config/events';
import { IeeeStudentBranchLogo, NbkristLogo, IeeeRegion10Logo } from '../components/common/Logos';

export const Certificate: React.FC = () => {
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [certificateData, setCertificateData] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setLoading(true);
    setError('');
    setCertificateData(null);

    try {
      const res = await fetch(`/api/certificate/${searchId.trim()}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setCertificateData(data.certificate);
      } else {
        setError(data.message || 'No verified certificate found for this Registration ID.');
      }
    } catch {
      setError('Failed to query certificate portal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 print:bg-white print:text-black">
      <div className="print:hidden">
        <NexusNavbar />
      </div>

      <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header (hidden in print) */}
        <div className="text-center mb-10 print:hidden space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
            <Award className="w-4 h-4" />
            <span>IEEE CREDENTIAL VERIFICATION PORTAL</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
            Digital Certificate of Participation
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Enter your Registration ID (e.g. <span className="font-mono text-cyan-300">NV26-1042</span>) or registered email to retrieve your verified IEEE Student Branch certificate.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto pt-4 flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Registration ID (e.g. NV26-1042)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shrink-0 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Find Certificate'}
            </button>
          </form>

          {error && (
            <p className="text-xs font-mono text-rose-400 mt-2">{error}</p>
          )}
        </div>

        {/* Certificate Display */}
        {certificateData && (
          <div className="space-y-6">
            <div className="flex justify-end gap-3 print:hidden">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save as PDF</span>
              </button>
            </div>

            {/* Official Certificate Canvas Frame */}
            <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-4 border-double border-cyan-500/50 shadow-2xl text-center space-y-6 print:border-black print:bg-white print:text-black">
              {/* Corner Embellishments */}
              <div className="absolute top-4 left-4 text-cyan-500 font-mono text-xs">◆ ◆ ◆</div>
              <div className="absolute top-4 right-4 text-cyan-500 font-mono text-xs">◆ ◆ ◆</div>
              <div className="absolute bottom-4 left-4 text-cyan-500 font-mono text-xs">◆ ◆ ◆</div>
              <div className="absolute bottom-4 right-4 text-cyan-500 font-mono text-xs">◆ ◆ ◆</div>

              {/* Institution Header with Logos */}
              <div className="flex flex-wrap items-center justify-center gap-6 pb-2">
                <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                  <NbkristLogo className="h-10 w-auto" />
                </div>
                <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                  <IeeeStudentBranchLogo className="h-10 w-auto" />
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase font-bold">
                  IEEE STUDENT BRANCH • STB12381 • REGION 10
                </span>
                <p className="text-xs text-slate-400">
                  N.B.K.R. Institute of Science & Technology, Vidyanagar, AP
                </p>
                <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight pt-2 print:text-black">
                  Certificate of Achievement & Participation
                </h2>
              </div>

              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto" />

              {/* Body statement */}
              <div className="space-y-4 max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed print:text-gray-800">
                <p>This is to certify that</p>
                <p className="font-display font-black text-3xl sm:text-4xl text-cyan-300 print:text-black tracking-wide">
                  {certificateData.fullName}
                </p>
                <p className="text-xs font-mono text-slate-400">
                  from <span className="text-white print:text-black font-semibold">{certificateData.college}</span>
                </p>
                <p>
                  has actively participated as a delegate in the{' '}
                  <strong className="text-white print:text-black">{certificateData.event}</strong> ({certificateData.tier})
                  under the technical track <span className="font-mono text-cyan-400">{certificateData.track}</span>,
                  held at NBKRIST from November 20 to 22, 2026.
                </p>
              </div>

              {/* Signatures Row */}
              <div className="pt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 text-center border-t border-slate-800 print:border-gray-400 font-mono text-xs">
                <div>
                  <div className="font-serif italic text-base text-cyan-200 print:text-black">Dr. R. Madhusudhan Rao</div>
                  <p className="text-slate-400 text-[10px] uppercase mt-1">Branch Counselor, IEEE NBKRIST</p>
                </div>

                <div className="hidden sm:block">
                  <div className="w-12 h-12 rounded-full border-2 border-cyan-400/60 mx-auto flex items-center justify-center text-[9px] text-cyan-300 font-bold">
                    IEEE SEAL
                  </div>
                  <p className="text-slate-500 text-[10px] uppercase mt-1">Section Verified</p>
                </div>

                <div>
                  <div className="font-serif italic text-base text-cyan-200 print:text-black">Dr. K. Sudhakar</div>
                  <p className="text-slate-400 text-[10px] uppercase mt-1">Director, NBKRIST</p>
                </div>
              </div>

              {/* Credential ID Verification */}
              <div className="pt-2 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                <span>Verification ID: {certificateData.registrationId}</span>
                <span>Issue Date: {certificateData.issueDate}</span>
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
