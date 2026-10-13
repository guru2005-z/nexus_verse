import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Sparkles } from 'lucide-react';
import { NexusNavbar } from '../components/common/NexusNavbar';
import { Footer } from '../components/common/Footer';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <NexusNavbar />

      <div className="max-w-2xl mx-auto px-4 text-center py-32 space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto shadow-2xl shadow-cyan-950">
          <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '10s' }} />
        </div>

        <h1 className="font-display font-black text-6xl sm:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
          404
        </h1>

        <h2 className="font-display font-bold text-2xl text-white">
          Quantum Coordinate Not Found
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          The event frequency or page URL you requested is outside our multidimensional summit grid.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/nexus-verse"
            className="px-6 py-3 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-colors"
          >
            NEXUS VERSE Home
          </Link>

          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-colors"
          >
            ← IEEE Events Hub
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};
