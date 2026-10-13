import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageCircle, Linkedin, Twitter } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  url?: string;
  description?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title = "NEXUS VERSE 2026 — National Tech Summit & 36-Hr Hackathon",
  url = typeof window !== 'undefined' ? window.location.href : '',
  description = "Join 600+ student innovators at NEXUS VERSE 2026 hosted by IEEE Student Branch NBKRIST! 🚀"
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`${title}\n\n${description}\n\n${url}`);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-cyan-400" />
            <h3 className="font-display font-bold text-lg text-white">Share Event</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-3 text-xs text-slate-400 leading-relaxed">
          Invite your friends, teammates, and peers to NEXUS VERSE 2026.
        </p>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-3 gap-3 my-5">
          <a
            href={`https://api.whatsapp.com/send?text=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-emerald-950/40 border border-emerald-700/40 hover:bg-emerald-900/50 hover:border-emerald-500 text-emerald-400 transition-all text-xs font-medium"
          >
            <MessageCircle className="w-6 h-6" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-blue-950/40 border border-blue-700/40 hover:bg-blue-900/50 hover:border-blue-500 text-blue-400 transition-all text-xs font-medium"
          >
            <Linkedin className="w-6 h-6" />
            <span>LinkedIn</span>
          </a>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-sky-950/40 border border-sky-700/40 hover:bg-sky-900/50 hover:border-sky-500 text-sky-400 transition-all text-xs font-medium"
          >
            <Twitter className="w-6 h-6" />
            <span>X (Twitter)</span>
          </a>
        </div>

        {/* Copy Link Input */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800">
          <input
            type="text"
            readOnly
            value={url}
            className="w-full bg-transparent px-2 text-xs text-slate-300 font-mono outline-none"
          />
          <button
            onClick={handleCopy}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
