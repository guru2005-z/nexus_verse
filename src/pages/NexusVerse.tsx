import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Ticket,
  Calendar,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  Cpu,
  Code2,
  Network,
  Binary,
  Radio,
  CloudLightning,
  Leaf,
  Users,
  Award,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  Share2,
  Bell,
  ArrowRight,
  Info,
  Layers,
  HelpCircle,
  Compass,
  Download,
  Linkedin,
  Github,
  Twitter,
  X,
  ShieldAlert,
  Rocket,
  Bug,
  Palette,
  Flag
} from 'lucide-react';
import { NexusNavbar } from '../components/common/NexusNavbar';
import { Footer } from '../components/common/Footer';
import { CountdownTimer } from '../components/common/CountdownTimer';
import { ShareModal } from '../components/common/ShareModal';
import { NEXUS_VERSE_CONFIG, IEEE_CONFIG } from '../config/events';

export const NexusVerse: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    // Fetch live announcements from backend
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        if (data.announcements && data.announcements.length > 0) {
          setAnnouncements(data.announcements);
        }
      })
      .catch(() => {});
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Helper to generate Google Calendar / ICS links
  const createCalendarUrl = (title: string, startTime: string, endTime: string, details: string, location: string) => {
    const formatTime = (iso: string) => iso.replace(/[-:]/g, '').split('.')[0] + 'Z';
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formatTime(startTime)}/${formatTime(endTime)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  };

  const scheduleForDay = NEXUS_VERSE_CONFIG.schedule.filter(s => s.day === selectedDay);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-black">
      <NexusNavbar />

      {/* ─── ANNOUNCEMENTS / UPDATES STRIP ─── */}
      <div className="pt-20 bg-gradient-to-r from-blue-950/80 via-indigo-950/80 to-purple-950/80 border-b border-cyan-900/30 py-2.5 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/40 shrink-0">
              <Bell className="w-3 h-3 animate-bounce" />
              <span>LIVE UPDATES</span>
            </span>
            <p className="text-slate-300 font-medium truncate">
              {announcements.length > 0
                ? announcements[0].text
                : "🔥 Phase 2 Registration Open: Only 112 seats remaining across Hackathon and Summit passes!"}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-4 shrink-0 font-mono text-[11px]">
            <button
              onClick={() => setShareModalOpen(true)}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Event</span>
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 font-bold">112 SEATS LEFT</span>
          </div>
        </div>
      </div>

      {/* ─── FULL-SCREEN HERO SECTION ─── */}
      <section id="top" className="relative min-h-[92vh] flex items-center justify-center pt-12 pb-24 overflow-hidden cyber-grid">
        {/* Glow Spheres & Futuristic Beam */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-cyan-500/25 via-blue-600/20 to-violet-600/25 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute -top-32 left-10 w-96 h-96 bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-violet-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          {/* Host Tagline pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono backdrop-blur-xl shadow-lg shadow-cyan-950/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>IEEE Student Branch NBKRIST Presents</span>
            <span className="text-slate-600">•</span>
            <span className="text-violet-300 font-semibold">{NEXUS_VERSE_CONFIG.dates}</span>
          </div>

          {/* Main Title inspired by Qiskit Fall Fest */}
          <div className="space-y-4">
            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-none">
              NEXUS{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                VERSE
              </span>
            </h1>

            <p className="font-mono text-sm sm:text-lg text-cyan-200/90 font-medium tracking-wide uppercase max-w-3xl mx-auto">
              {NEXUS_VERSE_CONFIG.edition}
            </p>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {NEXUS_VERSE_CONFIG.tagline}
            </p>
          </div>

          {/* Key Coordinates Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-300 p-2 sm:px-5 sm:py-2.5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center gap-1.5 text-cyan-400">
              <Calendar className="w-4 h-4" />
              <span>{NEXUS_VERSE_CONFIG.dates}</span>
            </div>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-4 h-4 text-violet-400" />
              <span>NBKRIST Campus, AP, India</span>
            </div>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Award className="w-4 h-4" />
              <span>Prize Pool {NEXUS_VERSE_CONFIG.prizePool}</span>
            </div>
          </div>

          {/* Live Countdown */}
          <div className="pt-4 flex flex-col items-center">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
              Summit Inception Countdown
            </p>
            <CountdownTimer targetDate={NEXUS_VERSE_CONFIG.isoStartDate} size="lg" />
          </div>

          {/* Primary Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/nexus-verse/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-display font-black text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 transition-all duration-300 shadow-[0_0_35px_-5px_rgba(6,182,212,0.7)] hover:shadow-[0_0_45px_0px_rgba(6,182,212,0.9)] hover:scale-105 active:scale-95"
            >
              <Ticket className="w-5 h-5 text-slate-950" />
              <span>Register Now — Passes From ₹399</span>
            </Link>

            <a
              href="#schedule"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-medium text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 transition-colors"
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>View Full Schedule</span>
            </a>

            <button
              onClick={() => setShareModalOpen(true)}
              className="p-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-400 transition-colors"
              title="Share Event"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Stats Strip */}
          <div className="pt-10 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-4 rounded-2xl glass-card border-l-2 border-l-cyan-400">
              <p className="font-display font-black text-3xl text-white">600+</p>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Elite Delegates</p>
            </div>
            <div className="p-4 rounded-2xl glass-card border-l-2 border-l-blue-400">
              <p className="font-display font-black text-3xl text-white">36 Hrs</p>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Non-stop Hacking</p>
            </div>
            <div className="p-4 rounded-2xl glass-card border-l-2 border-l-violet-400">
              <p className="font-display font-black text-3xl text-white">₹2.5L+</p>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Cash & Grants</p>
            </div>
            <div className="p-4 rounded-2xl glass-card border-l-2 border-l-emerald-400">
              <p className="font-display font-black text-3xl text-white">40+ Colleges</p>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Pan-India Reach</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4 EXPERIENCE PILLARS (Learn, Build, Connect, Create Impact) ─── */}
      <section className="py-20 bg-slate-950/80 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              Four Core Pillars
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white mt-2">
              The NEXUS VERSE Experience
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Every hour is meticulously engineered to push your technical capabilities, expand your professional circle, and accelerate your engineering journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {NEXUS_VERSE_CONFIG.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-2xl glass-card glass-card-hover relative overflow-hidden flex flex-col justify-between"
              >
                {/* Glow on hover */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${pillar.accent} opacity-10 group-hover:opacity-20 blur-2xl transition-opacity`} />

                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${pillar.accent} p-[1.5px] mb-5`}>
                    <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                      {idx === 0 && <Cpu className="w-6 h-6 text-cyan-400" />}
                      {idx === 1 && <Code2 className="w-6 h-6 text-blue-400" />}
                      {idx === 2 && <Network className="w-6 h-6 text-indigo-400" />}
                      {idx === 3 && <Sparkles className="w-6 h-6 text-violet-400" />}
                    </div>
                  </div>

                  <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold">
                    {pillar.title}
                  </h3>
                  <h4 className="font-display font-bold text-xl text-white mt-1 group-hover:text-cyan-200 transition-colors">
                    {pillar.subtitle}
                  </h4>

                  <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs font-mono text-slate-400 group-hover:text-cyan-400 transition-colors">
                  <span>Explore Pillar Details</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT EVENT & ORGANISING BODY ─── */}
      <section id="about" className="py-24 relative overflow-hidden cyber-grid-dense">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visuals */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 p-2 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80"
                  alt="Hackathon Team Brainstorming"
                  className="rounded-2xl w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent rounded-2xl" />

                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-cyan-500/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-bold font-mono">
                      NBKR
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">N.B.K.R. Institute of Science & Technology</p>
                      <p className="text-[11px] text-slate-400">Autonomous • NAAC 'A' Grade • NBA Accredited</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-violet-950/80 text-violet-300 border border-violet-800">
                <span>OUR VISION & STORY</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                Where Ambition Collides with{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                  Cutting-Edge Science
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                NEXUS VERSE was conceived by the IEEE Student Branch at NBKRIST to transcend traditional college symposiums. We believe that true engineering excellence occurs at the intersection of emerging quantum algorithms, high-throughput machine learning, resilient cyber-physical systems, and societal empathy.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <h4 className="font-bold text-sm text-cyan-300 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    Hands-On Hardware & Cloud
                  </h4>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    Direct access to IoT boards, robotics lab gear, and IBM Quantum simulation backends.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <h4 className="font-bold text-sm text-cyan-300 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    36-Hour Hackathon Arena
                  </h4>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    Continuous coding environment with high-speed gigabit Wi-Fi, midnight energy bars, and dorms.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to="/nexus-verse/register"
                  className="px-6 py-3 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-colors"
                >
                  Join NEXUS VERSE 2026
                </Link>
                <a
                  href="#team"
                  className="text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Meet the Organizers & Faculty →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRACKS & CHALLENGES SECTION ─── */}
      <section id="experience" className="py-24 bg-slate-950 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              Summit & Hackathon Competitions
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white mt-2">
              5 Premier Events & Tracks
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Compete in Flag Hunt CTF, Tech Prenures / Project Expo, Clever Coding, Bugmania, and Canva Clash for trophies and ₹2,50,000+ in prizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NEXUS_VERSE_CONFIG.tracks.map((track, i) => (
              <div
                key={track.id}
                className="group rounded-3xl glass-card p-7 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-800 text-cyan-400 flex items-center justify-center">
                      {track.id === 'flag-hunt-ctf' && <ShieldAlert className="w-6 h-6 text-rose-400" />}
                      {track.id === 'tech-prenures' && <Rocket className="w-6 h-6 text-cyan-400" />}
                      {track.id === 'clever-coding' && <Code2 className="w-6 h-6 text-blue-400" />}
                      {track.id === 'bugmania' && <Bug className="w-6 h-6 text-amber-400" />}
                      {track.id === 'canva-clash' && <Palette className="w-6 h-6 text-purple-400" />}
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                      Prize: {track.prizePool}
                    </span>
                  </div>

                  <div className="text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">
                    EVENT #{i + 1}
                  </div>
                  <h3 className="font-display font-black text-xl text-white group-hover:text-cyan-300 transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-xs text-cyan-200/90 font-mono mt-1">
                    {track.tagline}
                  </p>

                  <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                    {track.details}
                  </p>

                  {/* Key Deliverables */}
                  <div className="mt-4 space-y-1.5">
                    <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">Key Criteria:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {track.deliverables.map((del, dIdx) => (
                        <span
                          key={dIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300"
                        >
                          ✓ {del}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="text-slate-400 text-[11px]">
                    <span className="text-slate-500">Mentors: </span>
                    <span className="text-slate-300 font-medium">{track.speakers[0]}</span>
                  </div>
                  <Link
                    to={`/nexus-verse/register?track=${track.id}`}
                    className="font-mono text-cyan-400 hover:text-cyan-300 text-xs font-bold"
                  >
                    Select Event →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/nexus-verse/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-bold transition-all"
            >
              <span>Register Now & Select Your Track</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── DAY-WISE TABBED TIMELINE SCHEDULE ─── */}
      <section id="schedule" className="py-24 bg-slate-950/90 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              3 Days of Immersion
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white mt-2">
              Summit Schedule
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Interactive timeline for workshops, keynote addresses, pitch checkpoints, and networking sessions.
            </p>
          </div>

          {/* Day selection tabs */}
          <div className="flex justify-center mb-12">
            <div className="p-1.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-2">
              {[
                { day: 1, label: "Day 1: Nov 20", sub: "Kickoff & Workshops" },
                { day: 2, label: "Day 2: Nov 21", sub: "Hacking & Reviews" },
                { day: 3, label: "Day 3: Nov 22", sub: "Grand Finale & Gala" },
              ].map((tab) => (
                <button
                  key={tab.day}
                  onClick={() => setSelectedDay(tab.day)}
                  className={`px-5 py-3 rounded-xl text-left transition-all ${
                    selectedDay === tab.day
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <p className="text-xs sm:text-sm font-display">{tab.label}</p>
                  <p className="text-[10px] font-mono opacity-80">{tab.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Vertical animated timeline */}
          <div className="relative border-l border-cyan-500/30 ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-10">
            {scheduleForDay.map((item, idx) => (
              <div
                key={item.id}
                className="relative group p-6 rounded-2xl glass-card border border-slate-800 hover:border-cyan-500/40 transition-all duration-300"
              >
                {/* Node dot on timeline */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:scale-125 group-hover:bg-cyan-400 transition-all shadow-[0_0_10px_rgba(6,182,212,0.8)]" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.time}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400">{item.track}</span>
                  </div>

                  {/* Add to Calendar Button */}
                  <a
                    href={createCalendarUrl(item.title, item.startTime, item.endTime, item.description, item.venue)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-[11px] font-mono text-slate-300 hover:text-cyan-400 transition-colors w-fit"
                  >
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    <span>Add to Calendar</span>
                  </a>
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Speaker info if available */}
                {item.speaker && (
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-3">
                    <img
                      src={item.speaker.avatar}
                      alt={item.speaker.name}
                      className="w-9 h-9 rounded-full object-cover border border-cyan-500/40"
                    />
                    <div>
                      <p className="text-xs font-semibold text-white">{item.speaker.name}</p>
                      <p className="text-[11px] text-slate-400">{item.speaker.role} • {item.speaker.org}</p>
                    </div>
                  </div>
                )}

                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2">
                  <div className="flex items-center gap-1 text-slate-400">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{item.venue}</span>
                  </div>
                  <div className="flex gap-1.5">
                    {item.tags.map((t, ti) => (
                      <span key={ti} className="px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TICKET TIERS SECTION ─── */}
      <section className="py-24 bg-slate-950 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              Passes & Packages
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white mt-2">
              Choose Your Summit Pass
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Transparent, subsidised student pricing. Use promo code <span className="font-mono text-cyan-300 font-bold">IEEE2026</span> for 20% off or <span className="font-mono text-cyan-300 font-bold">NBKRISTIAN</span> for 25% off.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {NEXUS_VERSE_CONFIG.ticketTiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  tier.isPopular
                    ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/70 border-2 border-cyan-400 shadow-[0_0_50px_-10px_rgba(6,182,212,0.4)] scale-105 z-10'
                    : 'glass-card border border-slate-800 hover:border-slate-700'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-cyan-400 text-slate-950 shadow-md">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <h3 className="font-display font-black text-2xl text-white">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 min-h-[32px]">
                    {tier.description}
                  </p>

                  <div className="my-6">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-black text-4xl sm:text-5xl text-white">
                        ₹{tier.price}
                      </span>
                      <span className="text-sm font-mono text-slate-500 line-through">
                        ₹{tier.originalPrice}
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        Save {Math.round(((tier.originalPrice - tier.price) / tier.originalPrice) * 100)}%
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-400 mt-1">
                      + 18% GST (Calculated at checkout)
                    </p>
                  </div>

                  {/* Seat capacity bar */}
                  <div className="mb-6 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
                      <span>Seats Filled</span>
                      <span className="text-cyan-400 font-bold">{tier.seatsBooked} / {tier.seatsLimit}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 rounded-full"
                        style={{ width: `${(tier.seatsBooked / tier.seatsLimit) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3">
                    <p className="text-xs font-mono uppercase text-slate-400 font-bold">Includes:</p>
                    {tier.features.map((feat, fi) => (
                      <div key={fi} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800/80">
                  <Link
                    to={`/nexus-verse/register?tier=${tier.id}`}
                    className={`w-full py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                      tier.isPopular
                        ? 'bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 text-slate-950 shadow-cyan-400/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Select {tier.name}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VENUE & TRAVEL SECTION ─── */}
      <section id="venue" className="py-24 bg-slate-950/80 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Info */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                Campus & Travel
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white">
                Venue & Accommodation
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                NEXUS VERSE 2026 takes place at the state-of-the-art Dr. A.P.J. Abdul Kalam Convention Center and the tech laboratories of NBKRIST. Spanning 184 acres of green campus, it offers modern computing centers and high-speed Wi-Fi.
              </p>

              {/* Transit coordinates */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">Campus Address: </span>
                    <span className="text-slate-400">{NEXUS_VERSE_CONFIG.venue}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <p className="font-bold text-cyan-300">How to Reach:</p>
                  <p className="text-slate-400">
                    🚆 <strong className="text-white">By Rail:</strong> Gudur Junction (GDR) - 22 km | Nayudupeta Station (NYP) - 18 km. Free campus shuttle available hourly.
                  </p>
                  <p className="text-slate-400">
                    ✈️ <strong className="text-white">By Air:</strong> Tirupati Airport (TIR) - 85 km | Chennai International Airport (MAA) - 120 km.
                  </p>
                  <p className="text-slate-400">
                    🛌 <strong className="text-white">Accommodation:</strong> Complimentary hostel lodging included with Hackathon & VIP Passes.
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative h-[400px]">
                <iframe
                  title="NBKRIST Campus Location"
                  src={NEXUS_VERSE_CONFIG.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[60%] invert-[90%] hue-rotate-[180deg]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TEAM & ORGANISERS SECTION ─── */}
      <section id="team" className="py-24 bg-slate-950 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              The Minds Behind
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white mt-2">
              Organising Committee
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Meet our faculty advisors, branch chairs, technical leads, and student coordinators.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {NEXUS_VERSE_CONFIG.team.map((member) => (
              <div
                key={member.id}
                className="group rounded-2xl glass-card p-4 border border-slate-800 hover:border-cyan-500/40 transition-all text-center"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-2xl overflow-hidden mb-4 border-2 border-slate-800 group-hover:border-cyan-400 transition-colors">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="font-display font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-mono text-cyan-400 mt-0.5">
                  {member.role}
                </p>
                {member.designation && (
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {member.designation}
                  </p>
                )}

                <div className="mt-3 flex items-center justify-center gap-2 text-slate-400">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400 p-1">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400 p-1">
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SPONSORS & PARTNERS ─── */}
      <section className="py-20 bg-slate-950/90 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            Ecosystem Backing
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white mt-1">
            Sponsors & Technology Partners
          </h2>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {NEXUS_VERSE_CONFIG.sponsors.map((sp, idx) => (
              <a
                key={idx}
                href={sp.website}
                target="_blank"
                rel="noreferrer"
                className="group p-5 rounded-2xl glass-card border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden mb-2 bg-slate-900 flex items-center justify-center p-2">
                  <img
                    src={sp.logo}
                    alt={sp.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <p className="font-semibold text-xs text-white group-hover:text-cyan-300 transition-colors">
                  {sp.name}
                </p>
                <span className="text-[10px] font-mono text-cyan-400 uppercase mt-0.5">
                  {sp.tier}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQS ACCORDION ─── */}
      <section id="faqs" className="py-24 bg-slate-950 border-t border-slate-900 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              Clarifications & Help
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {NEXUS_VERSE_CONFIG.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl glass-card border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left font-display font-bold text-base text-white hover:text-cyan-300 transition-colors"
                >
                  <span>{faq.question}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-cyan-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {openFaq === idx && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                    <p>{faq.answer}</p>
                    <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-cyan-400 border border-slate-800">
                      Category: {faq.category}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY: PAST EDITIONS ─── */}
      <section className="py-20 bg-slate-950/80 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                Past Moments
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-white mt-1">
                Summit Memories & Energy
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Click any photo to enlarge in lightbox
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {NEXUS_VERSE_CONFIG.gallery.map((g) => (
              <div
                key={g.id}
                onClick={() => setActiveLightboxImg(g.image)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border border-slate-800 hover:border-cyan-400 transition-all shadow-md"
              >
                <img
                  src={g.image}
                  alt={g.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">{g.edition}</span>
                  <p className="text-xs font-bold text-white truncate">{g.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeLightboxImg && (
        <div
          onClick={() => setActiveLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute -top-10 right-0 text-white p-2 rounded-lg hover:bg-slate-800"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activeLightboxImg}
              alt="Enlarged gallery view"
              className="w-full max-h-[85vh] object-contain rounded-2xl border border-slate-700"
            />
          </div>
        </div>
      )}

      {/* ─── FINAL CTA BANNER ─── */}
      <section className="py-20 bg-gradient-to-br from-cyan-950/60 via-slate-950 to-indigo-950/60 border-t border-cyan-900/40 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 font-mono text-xs border border-cyan-800">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>REGISTRATIONS WILL CLOSE NOV 18</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-6xl text-white tracking-tight">
            Ready to Redefine Your Limits?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Secure your summit ticket, lock in hostel accommodation, and step into the frontiers of Quantum, AI, and Autonomous Systems.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/nexus-verse/register"
              className="px-8 py-4 rounded-xl font-display font-black text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-xl shadow-cyan-400/40 active:scale-95"
            >
              Register Now with Razorpay
            </Link>

            <button
              onClick={() => setShareModalOpen(true)}
              className="px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 transition-colors"
            >
              Share with Colleagues
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title="NEXUS VERSE 2026 — IEEE Student Branch NBKRIST"
      />
    </div>
  );
};
