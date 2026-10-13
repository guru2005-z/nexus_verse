import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ArrowLeft,
  Sparkles,
  Ticket,
  Calendar,
  MapPin,
  Users,
  HelpCircle,
  Sun,
  Moon,
  ShieldCheck,
  Award
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { NEXUS_VERSE_CONFIG } from '../../config/events';

export const NexusNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/nexus-verse#top' },
    { name: 'About', href: '/nexus-verse#about' },
    { name: 'Experience', href: '/nexus-verse#experience' },
    { name: 'Schedule', href: '/nexus-verse#schedule' },
    { name: 'Venue', href: '/nexus-verse#venue' },
    { name: 'Team', href: '/nexus-verse#team' },
    { name: 'FAQs', href: '/nexus-verse#faqs' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 dark:bg-slate-950/95 backdrop-blur-md border-b border-cyan-900/30 shadow-lg shadow-cyan-950/20 py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand & Back Link */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-400 hover:text-cyan-400 transition-colors py-1 px-2 rounded-lg hover:bg-slate-900/80"
              title="Return to IEEE Student Branch Events Hub"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">IEEE Hub</span>
            </Link>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <Link to="/nexus-verse" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-purple-600 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <span className="font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-xs">
                    NV
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-orbitron font-extrabold text-base sm:text-lg tracking-wider bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent group-hover:to-purple-300 transition-all text-glow-cyan">
                    NEXUSVERSE
                  </span>
                  <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800">
                    2K26
                  </span>
                </div>
                <span className="text-[9px] font-mono text-slate-400 -mt-1 hidden sm:block">
                  IEEE-SB-NBKRIST
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium uppercase tracking-wider text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/nexus-verse/certificate"
              className="text-xs font-medium uppercase tracking-wider text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>Certificates</span>
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link
              to="/admin"
              className="hidden sm:inline-flex p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
              title="Admin Portal"
            >
              <ShieldCheck className="w-4 h-4" />
            </Link>

            <Link
              to="/nexus-verse/register"
              className="relative inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-display font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 transition-all duration-300 shadow-[0_0_20px_-2px_rgba(6,182,212,0.6)] hover:shadow-[0_0_30px_0px_rgba(6,182,212,0.85)] active:scale-95"
            >
              <Ticket className="w-4 h-4 text-slate-950" />
              <span>Register Now</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-cyan-900/40 px-6 py-6 space-y-3 backdrop-blur-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium uppercase tracking-wider text-slate-200 hover:text-cyan-400 py-1.5"
            >
              {link.name}
            </a>
          ))}
          <Link
            to="/nexus-verse/certificate"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-slate-200 hover:text-cyan-400 py-1.5"
          >
            <Award className="w-4 h-4 text-cyan-400" />
            Certificate Portal
          </Link>
          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <Link
              to="/nexus-verse/register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/30"
            >
              <Ticket className="w-4 h-4" />
              Register Now for Summit
            </Link>
            <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">
                ← Back to IEEE Events
              </Link>
              <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
