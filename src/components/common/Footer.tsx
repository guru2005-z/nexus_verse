import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Award,
  ArrowUp,
  Heart
} from 'lucide-react';
import { IEEE_CONFIG, NEXUS_VERSE_CONFIG } from '../../config/events';
import { IeeeStudentBranchLogo, NbkristLogo, IeeeRegion10Logo } from './Logos';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Branch Info & College */}
          <div className="lg:col-span-2 space-y-4">
            {/* Official Logos Badges in Footer */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center">
                <IeeeStudentBranchLogo className="h-9 w-auto" />
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center">
                <NbkristLogo className="h-8 w-auto" />
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Empowering student engineers at {IEEE_CONFIG.collegeName} through technical innovation, national hackathons, multidisciplinary research, and IEEE Region 10 global opportunities.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5 font-mono">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{IEEE_CONFIG.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${IEEE_CONFIG.email}`} className="hover:text-cyan-400 transition-colors">
                  {IEEE_CONFIG.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{IEEE_CONFIG.phone}</span>
              </div>
            </div>
          </div>

          {/* Col 2: NEXUS VERSE Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-mono text-cyan-400">
              NEXUS VERSE 2026
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/nexus-verse" className="hover:text-cyan-400 transition-colors">
                  Summit Overview
                </Link>
              </li>
              <li>
                <Link to="/nexus-verse/register" className="hover:text-cyan-400 transition-colors font-medium text-cyan-300">
                  Register & Ticket Tiers
                </Link>
              </li>
              <li>
                <a href="/nexus-verse#experience" className="hover:text-cyan-400 transition-colors">
                  Tracks & Challenges
                </a>
              </li>
              <li>
                <a href="/nexus-verse#schedule" className="hover:text-cyan-400 transition-colors">
                  Day-wise Schedule
                </a>
              </li>
              <li>
                <a href="/nexus-verse#venue" className="hover:text-cyan-400 transition-colors">
                  Venue & Travel Guide
                </a>
              </li>
              <li>
                <a href="/nexus-verse#team" className="hover:text-cyan-400 transition-colors">
                  Organizing Committee
                </a>
              </li>
              <li>
                <Link to="/nexus-verse/certificate" className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-slate-300">
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                  Certificate Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: IEEE Events & Resources */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-mono text-cyan-400">
              Branch Activities
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">
                  All IEEE Events
                </Link>
              </li>
              <li>
                <a href="/#events-section" className="hover:text-cyan-400 transition-colors">
                  Upcoming Workshops
                </a>
              </li>
              <li>
                <a href="/#about-section" className="hover:text-cyan-400 transition-colors">
                  Branch Milestones
                </a>
              </li>
              <li>
                <a href={IEEE_CONFIG.socials.whatsappCommunity} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <span>WhatsApp Community</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link to="/admin" className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Razorpay & Legal Compliance */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-mono text-cyan-400">
              Legal & Policies
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Payments processed securely via Razorpay standard gateway adhering to PCI-DSS standards.
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/terms-conditions" className="hover:text-cyan-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-cyan-400 transition-colors">
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <a href="/nexus-verse#faqs" className="hover:text-cyan-400 transition-colors">
                  Payment FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400 text-center sm:text-left">
            © 2026 IEEE Student Branch — NBKRIST. All rights reserved. Built for NEXUS VERSE 2026.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors text-xs font-mono"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
