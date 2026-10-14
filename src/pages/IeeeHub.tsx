import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Users,
  Award,
  Zap,
  CheckCircle2,
  Send,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { IeeeNavbar } from '../components/common/IeeeNavbar';
import { Footer } from '../components/common/Footer';
import { CountdownTimer } from '../components/common/CountdownTimer';
import { QuantumParticles } from '../components/common/QuantumParticles';
import { OfficialOrganizersBanner } from '../components/common/Logos';
import { IEEE_CONFIG, NEXUS_VERSE_CONFIG, OTHER_EVENTS, EventItem } from '../config/events';

export const IeeeHub: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  // Filter events
  const filteredEvents = OTHER_EVENTS.filter(evt => {
    const matchesTab = activeTab === 'upcoming' ? (evt.status === 'upcoming' || evt.status === 'ongoing') : evt.status === 'past';
    const matchesCategory = selectedCategory === 'all' || evt.category === selectedCategory;
    return matchesTab && matchesCategory;
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      setContactSubmitted(true);
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setContactSubmitted(true);
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-black">
      <IeeeNavbar />

      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden quantum-grid quantum-radial-hero">
        {/* Interactive Quantum Particles Constellation Canvas */}
        <QuantumParticles className="absolute inset-0 pointer-events-none z-0 opacity-60" particleCount={50} interactive={true} />

        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/20 via-blue-600/20 to-violet-600/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-6 backdrop-blur-md shadow-lg shadow-cyan-950/20">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>{IEEE_CONFIG.branchName} • STB12381</span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Advancing Technology for{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Humanity
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Welcome to the official events hub of the IEEE Student Branch at NBKRIST. Discover flagship tech summits, hands-on masterclasses, hackathons, and global networking.
          </p>

          {/* Quick Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/nexus-verse"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-display font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 transition-all duration-300 shadow-[0_0_25px_-5px_rgba(6,182,212,0.6)] hover:shadow-[0_0_35px_0px_rgba(6,182,212,0.8)]"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Explore NEXUS VERSE 2026</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#events-section"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors"
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Browse All Events</span>
            </a>
          </div>

          {/* Branch Quick Stats Banner */}
          <div className="mt-14 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl glass-card">
            <div className="p-3">
              <p className="font-display font-black text-2xl sm:text-3xl text-cyan-400">{IEEE_CONFIG.stats.activeMembers}</p>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Active IEEE Members</p>
            </div>
            <div className="p-3">
              <p className="font-display font-black text-2xl sm:text-3xl text-blue-400">{IEEE_CONFIG.stats.eventsOrganized}</p>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Events Organized</p>
            </div>
            <div className="p-3">
              <p className="font-display font-black text-2xl sm:text-3xl text-violet-400">{IEEE_CONFIG.stats.nationalAwards}</p>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Section Awards</p>
            </div>
            <div className="p-3">
              <p className="font-display font-black text-2xl sm:text-3xl text-emerald-400">{IEEE_CONFIG.stats.communityReach}</p>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Students Reached</p>
            </div>
          </div>

          {/* Official Organizers Logos */}
          <div className="mt-10 max-w-4xl mx-auto">
            <OfficialOrganizersBanner />
          </div>
        </div>
      </section>

      {/* ─── FEATURED EVENT BANNER (NEXUS VERSE) ─── */}
      <section className="py-12 bg-slate-950/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              Flagship Summit 2026
            </h2>
          </div>

          {/* Interactive Card */}
          <div
            onClick={() => navigate('/nexus-verse')}
            className="group relative cursor-pointer rounded-3xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/80 shadow-[0_0_50px_-15px_rgba(6,182,212,0.3)] hover:border-cyan-400/60 hover:shadow-[0_0_70px_-10px_rgba(6,182,212,0.5)] transition-all duration-500"
          >
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-600/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center">
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    NATIONAL TECH SUMMIT
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-violet-500/20 text-violet-300 border border-violet-500/40">
                    36-HR HACKATHON
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800">
                    PRIZES {NEXUS_VERSE_CONFIG.prizePool}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                    {NEXUS_VERSE_CONFIG.name}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-cyan-200/90 font-medium font-mono">
                    {NEXUS_VERSE_CONFIG.edition}
                  </p>
                  <p className="mt-3 text-sm text-slate-300 line-clamp-2 leading-relaxed">
                    {NEXUS_VERSE_CONFIG.tagline}
                  </p>
                </div>

                {/* Event Coordinates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{NEXUS_VERSE_CONFIG.dates}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="truncate">NBKRIST Campus, AP</span>
                  </div>
                </div>

                {/* Live Countdown in Card */}
                <div className="pt-2">
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Summit Countdown:
                  </p>
                  <CountdownTimer targetDate={NEXUS_VERSE_CONFIG.isoStartDate} size="sm" />
                </div>

                {/* Call to action bar */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-400 text-slate-950 font-display font-bold text-sm group-hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-400/30">
                    <span>Explore Event Site</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>

                  <span className="text-xs font-mono text-slate-400">
                    Click anywhere on this card to launch microsite →
                  </span>
                </div>
              </div>

              {/* Right Visual / Poster preview */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden border border-slate-700 aspect-video lg:aspect-[4/3] group-hover:border-cyan-400/50 transition-colors shadow-2xl">
                  <img
                    src={NEXUS_VERSE_CONFIG.pillars[1].accent.includes('indigo') ? "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80" : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80"}
                    alt="Nexus Verse 2026 Summit Poster"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-mono uppercase text-cyan-400 font-bold">Registration Status</p>
                      <p className="text-xs text-white font-semibold">112 Seats Left • Phase 2 Open</p>
                    </div>
                    <span className="px-2 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] font-mono">
                      Fast Filling
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── EVENTS GRID (Upcoming / Past) ─── */}
      <section id="events-section" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-900">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Calendar & Initiatives</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
                IEEE Student Branch Events
              </h2>
              <p className="mt-2 text-sm text-slate-400 max-w-xl">
                Explore technical symposia, coding marathons, hands-on workshops, and community events organized throughout the academic year.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 flex items-center">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'upcoming'
                      ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Upcoming Events
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'past'
                      ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Past Archives
                </button>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <Filter className="w-3.5 h-3.5 text-slate-400 ml-2" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent text-slate-300 py-1.5 px-2 outline-none cursor-pointer"
                >
                  <option value="all" className="bg-slate-900 text-white">All Categories</option>
                  <option value="Flagship" className="bg-slate-900 text-white">Flagships</option>
                  <option value="Workshop" className="bg-slate-900 text-white">Workshops</option>
                  <option value="Competition" className="bg-slate-900 text-white">Competitions</option>
                  <option value="Seminar" className="bg-slate-900 text-white">Seminars</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="group rounded-2xl glass-card glass-card-hover overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Poster */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                    <img
                      src={evt.poster}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-950/80 text-cyan-300 border border-cyan-800 backdrop-blur-md">
                        {evt.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-950/80 text-slate-300 border border-slate-800 backdrop-blur-md">
                        {evt.mode}
                      </span>
                    </div>

                    {evt.status === 'past' && (
                      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-slate-900/90 text-slate-400 font-mono text-xs border border-slate-700">
                          EVENT COMPLETED
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{evt.date}</span>
                      <span>•</span>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{evt.time}</span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan-300 transition-colors">
                      {evt.title}
                    </h3>

                    <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {evt.description}
                    </p>

                    {/* Venue */}
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{evt.venue}</span>
                    </div>

                    {/* Highlights tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {evt.highlights.slice(0, 3).map((h, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-800"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  {evt.slug === 'nexus-verse' || evt.isFeatured ? (
                    <Link
                      to="/nexus-verse"
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold font-display flex items-center justify-center gap-2 shadow-md hover:from-cyan-400 hover:to-indigo-500 transition-all"
                    >
                      <span>Explore Flagship Site</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  ) : evt.registrationOpen ? (
                    <button
                      onClick={() => alert(`Registration details for "${evt.title}" will be forwarded to IEEE Member Portal. You can also explore our Flagship NEXUS VERSE summit!`)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-400 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <span>Register for Event</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <Link
                      to="/nexus-verse/certificate"
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs font-semibold flex items-center justify-center gap-2 hover:text-white transition-colors"
                    >
                      <span>Download Certificate</span>
                      <Award className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT THE IEEE STUDENT BRANCH SECTION ─── */}
      <section id="about-section" className="py-20 bg-slate-950/80 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-800">
                <span>ESTABLISHED 2011 • BRANCH {IEEE_CONFIG.code}</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                Nurturing Tech Pioneers at{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  NBKRIST
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                The IEEE Student Branch at N.B.K.R. Institute of Science and Technology is a vibrant community of passionate undergraduate and graduate technocrats. Operating under the prestigious IEEE Hyderabad Section and IEEE Region 10, our branch empowers students to bridge the gap between academic theory and deep industrial breakthroughs.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Active affinity groups: IEEE Computer Society, Robotics & Automation Society (RAS), and Women in Engineering (WIE).",
                  "Over 48+ national symposia, hackathons, and high-performance computing workshops conducted since inception.",
                  "Direct student access to global IEEE Xplore digital library, travel grants, and international student congresses."
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href={`mailto:${IEEE_CONFIG.email}`}
                  className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-xs font-mono text-cyan-300 transition-colors"
                >
                  Branch Contact: {IEEE_CONFIG.email}
                </a>
              </div>
            </div>

            {/* Right Graphic / Photo Card */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 p-3 shadow-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80"
                  alt="IEEE Student Branch Tech Session"
                  className="rounded-2xl w-full h-80 object-cover"
                />
                <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Section Affiliation:</span>
                    <span className="text-cyan-400 font-bold">IEEE Hyderabad Section</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Parent Body:</span>
                    <span className="text-white">IEEE Region 10 (Asia-Pacific)</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Campus Location:</span>
                    <span className="text-white">Vidyanagar, Tirupati Dist, AP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT SECTION ─── */}
      <section id="contact-section" className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              Have Questions?
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white mt-1">
              Connect With IEEE Student Branch
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto">
              Reach out for event sponsorships, workshop queries, member registrations, or delegate support.
            </p>
          </div>

          <div className="rounded-3xl glass-card p-6 sm:p-10 border border-slate-800">
            {contactSubmitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-white">Message Received!</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Thank you for reaching out. The branch secretariat will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setContactSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-cyan-400"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="name@college.edu"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    placeholder="e.g. Inquiry regarding Nexus Verse Hackathon"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Type your message or questions here..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactLoading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                >
                  {contactLoading ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry to IEEE Branch</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
