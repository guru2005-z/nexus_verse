import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Calendar, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { IEEE_CONFIG } from '../../config/events';
import { IeeeStudentBranchLogo, NbkristLogo } from './Logos';

export const IeeeNavbar: React.FC = () => {
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
    { name: 'Events', href: '#events-section' },
    { name: 'About Branch', href: '#about-section' },
    { name: 'Contact', href: '#contact-section' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-cyan-950/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Branch Name */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-colors">
                <IeeeStudentBranchLogo className="h-9 w-auto" />
              </div>
            </Link>

            <div className="hidden lg:flex items-center pl-3 border-l border-slate-800">
              <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-colors" title="N.B.K.R. Institute of Science & Technology">
                <NbkristLogo className="h-8 w-auto" />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </a>
            ))}

            <Link
              to="/nexus-verse"
              className="relative inline-flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_0_20px_-3px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_0px_rgba(6,182,212,0.6)]"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>NEXUS VERSE 2026</span>
              <span className="text-[10px] font-mono bg-black/30 px-1.5 py-0.5 rounded-full text-cyan-200">
                FLAGSHIP
              </span>
            </Link>

            <Link
              to="/admin"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              title="Admin Portal"
            >
              <ShieldCheck className="w-4 h-4" />
            </Link>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-6 py-6 space-y-4 backdrop-blur-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-200 hover:text-cyan-400 py-1"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <Link
              to="/nexus-verse"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-sm shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              NEXUS VERSE 2026 Summit
            </Link>
          </div>
          <div className="pt-2 flex justify-between items-center text-xs text-slate-400">
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">
              Admin Portal Login
            </Link>
            <Link to="/nexus-verse/certificate" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">
              Certificate Download
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
