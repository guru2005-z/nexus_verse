import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  LogOut,
  Users,
  DollarSign,
  CheckCircle,
  Clock,
  Search,
  Download,
  Filter,
  Plus,
  Bell,
  Tag,
  QrCode,
  Check,
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { NEXUS_VERSE_CONFIG, IEEE_CONFIG } from '../config/events';
import { RegistrationRecord } from '../types';

export const Admin: React.FC = () => {
  const [token, setToken] = useState<string>(() => localStorage.getItem('nv_admin_token') || '');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);

  // Dashboard Data
  const [stats, setStats] = useState<any>(null);
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [trackFilter, setTrackFilter] = useState('all');

  // Check-in input
  const [checkInInput, setCheckInInput] = useState('');
  const [checkInMsg, setCheckInMsg] = useState('');

  // Manage Promos & Announcements state
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoDiscount, setNewPromoDiscount] = useState('20');
  const [newPromoDesc, setNewPromoDesc] = useState('');
  const [promoSuccessMsg, setPromoSuccessMsg] = useState('');

  const [announcementText, setAnnouncementText] = useState('');
  const [announcementBadge, setAnnouncementBadge] = useState('UPDATE');
  const [annSuccessMsg, setAnnSuccessMsg] = useState('');

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingLogin(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setToken(data.token);
        localStorage.setItem('nv_admin_token', data.token);
      } else {
        setLoginError(data.message || 'Invalid admin credentials');
      }
    } catch {
      setLoginError('Error authenticating with admin server');
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('nv_admin_token');
  };

  // Fetch Dashboard Stats & Registrations
  const fetchDashboardData = async () => {
    if (!token) return;
    setLoadingData(true);
    try {
      const [statsRes, regRes] = await Promise.all([
        fetch('/api/admin/stats', { headers: { Authorization: token } }),
        fetch(`/api/admin/registrations?search=${encodeURIComponent(searchQuery)}&status=${statusFilter}&track=${trackFilter}`, {
          headers: { Authorization: token }
        })
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      if (regRes.ok) {
        const regData = await regRes.json();
        setRegistrations(regData.registrations || []);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token, statusFilter, trackFilter]);

  // On-spot Check-in
  const handlePerformCheckIn = async (idToMark?: string) => {
    const regId = idToMark || checkInInput.trim();
    if (!regId) return;

    setCheckInMsg('');
    try {
      const res = await fetch('/api/admin/check-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify({ registrationId: regId, agentName: 'Admin Desk' })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCheckInMsg(`✓ ${data.message}`);
        setCheckInInput('');
        fetchDashboardData();
      } else {
        setCheckInMsg(`✗ ${data.error || 'Check-in failed'}`);
      }
    } catch {
      setCheckInMsg('✗ Network error during check-in');
    }
  };

  // Add Promo Code
  const handleAddPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode.trim()) return;
    try {
      const res = await fetch('/api/admin/promos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({
          code: newPromoCode.trim(),
          discountType: 'percentage',
          discountValue: Number(newPromoDiscount),
          description: newPromoDesc || `${newPromoDiscount}% Discount`
        })
      });
      if (res.ok) {
        setPromoSuccessMsg(`Created promo ${newPromoCode.toUpperCase()}!`);
        setNewPromoCode('');
        setNewPromoDesc('');
      }
    } catch {}
  };

  // Add Announcement
  const handleAddAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    try {
      const res = await fetch('/api/admin/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ text: announcementText.trim(), badge: announcementBadge })
      });
      if (res.ok) {
        setAnnSuccessMsg('Announcement broadcasted to site ticker!');
        setAnnouncementText('');
      }
    } catch {}
  };

  // ─── LOGIN SCREEN IF NOT AUTHENTICATED ───
  if (!token) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-3xl glass-card border border-slate-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="font-display font-bold text-2xl text-white">Admin Command Center</h1>
            <p className="text-xs text-slate-400">
              IEEE Student Branch NBKRIST • NEXUS VERSE 2026 Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Admin Access Secret</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="Enter secret password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:border-cyan-400 outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5 font-mono">
                Default: <span className="text-cyan-400 font-bold">admin@nexusverse2026</span>
              </p>
            </div>

            {loginError && (
              <p className="text-xs text-rose-400 font-mono">{loginError}</p>
            )}

            <button
              type="submit"
              disabled={loadingLogin}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
            >
              {loadingLogin ? 'Authenticating...' : 'Enter Admin Console'}
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link to="/nexus-verse" className="text-xs font-mono text-slate-500 hover:text-cyan-400">
              ← Return to Nexus Verse
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Admin Top Navbar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center font-mono font-bold text-slate-950 text-xs">
              ADM
            </div>
            <div>
              <h2 className="font-display font-bold text-sm text-white">NEXUS VERSE Admin Console</h2>
              <p className="text-[11px] text-slate-400 font-mono">IEEE Student Branch NBKRIST</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <a
              href="/api/admin/export-csv"
              download
              className="px-3.5 py-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 hover:bg-emerald-900 flex items-center gap-1.5 font-mono font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </a>

            <Link
              to="/nexus-verse"
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition-colors"
            >
              Live Site
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ─── STATS CARDS ROW ─── */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl glass-card border border-slate-800">
              <span className="text-xs font-mono text-slate-400 uppercase">Total Registrations</span>
              <p className="font-display font-black text-3xl text-white mt-1">{stats.total}</p>
              <p className="text-[11px] text-cyan-400 font-mono mt-1">
                {stats.paidCount} Paid • {stats.pendingCount} Pending
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-card border border-slate-800">
              <span className="text-xs font-mono text-slate-400 uppercase">Total Revenue</span>
              <p className="font-display font-black text-3xl text-emerald-400 mt-1">
                ₹{stats.totalRevenue.toLocaleString()}
              </p>
              <p className="text-[11px] text-slate-400 font-mono mt-1">Via Razorpay Gateway</p>
            </div>

            <div className="p-5 rounded-2xl glass-card border border-slate-800">
              <span className="text-xs font-mono text-slate-400 uppercase">On-Spot Check-ins</span>
              <p className="font-display font-black text-3xl text-cyan-400 mt-1">{stats.checkedInCount}</p>
              <p className="text-[11px] text-slate-400 font-mono mt-1">Verified at gate</p>
            </div>

            <div className="p-5 rounded-2xl glass-card border border-slate-800">
              <span className="text-xs font-mono text-slate-400 uppercase">Seats Remaining</span>
              <p className="font-display font-black text-3xl text-violet-400 mt-1">
                {Math.max(0, NEXUS_VERSE_CONFIG.maxAttendees - (NEXUS_VERSE_CONFIG.currentRegistered + stats.paidCount))}
              </p>
              <p className="text-[11px] text-slate-400 font-mono mt-1">Cap: 600 Attendees</p>
            </div>
          </div>
        )}

        {/* ─── QUICK CHECK-IN SCANNER BOX ─── */}
        <div className="p-6 rounded-3xl glass-card border border-cyan-500/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                <QrCode className="w-5 h-5 text-cyan-400" />
                <span>On-Spot Attendance Check-in</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Type or scan Registration ID (e.g. <span className="font-mono text-cyan-300">NV26-1042</span>) to instantly mark delegate attendance.
              </p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Registration ID (NV26-XXXX)"
                value={checkInInput}
                onChange={(e) => setCheckInInput(e.target.value.toUpperCase())}
                className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 outline-none uppercase"
              />
              <button
                onClick={() => handlePerformCheckIn()}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors"
              >
                Mark Attendance
              </button>
            </div>
          </div>

          {checkInMsg && (
            <p className="mt-3 text-xs font-mono font-semibold text-emerald-400">{checkInMsg}</p>
          )}
        </div>

        {/* ─── REGISTRATIONS TABLE & SEARCH ─── */}
        <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-display font-bold text-lg text-white">
              Delegates & Registrations ({registrations.length})
            </h3>

            {/* Filter tools */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search name, email, ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchDashboardData()}
                  className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 outline-none"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>

              <select
                value={trackFilter}
                onChange={(e) => setTrackFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 outline-none"
              >
                <option value="all">All Tracks</option>
                {NEXUS_VERSE_CONFIG.tracks.map(t => (
                  <option key={t.id} value={t.id}>{t.title.split(' ')[0]}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800/80">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3">Reg ID</th>
                  <th className="p-3">Delegate</th>
                  <th className="p-3">College & Track</th>
                  <th className="p-3">Tier</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Attendance</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-500">
                      No registrations matched the filter query.
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3 font-bold text-cyan-400">
                        <Link to={`/nexus-verse/ticket/${reg.id}`} target="_blank" className="hover:underline">
                          {reg.id}
                        </Link>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-white">{reg.fullName}</div>
                        <div className="text-[10px] text-slate-400">{reg.email}</div>
                      </td>
                      <td className="p-3">
                        <div className="truncate max-w-[150px] text-slate-300">{reg.college}</div>
                        <div className="text-[10px] text-violet-400">{reg.selectedTrack}</div>
                      </td>
                      <td className="p-3 text-slate-300">{reg.ticketTierName}</td>
                      <td className="p-3 font-bold text-white">₹{reg.finalAmount}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            reg.status === 'paid'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : reg.status === 'pending'
                              ? 'bg-amber-950 text-amber-400 border border-amber-800'
                              : 'bg-rose-950 text-rose-400 border border-rose-800'
                          }`}
                        >
                          {reg.status}
                        </span>
                      </td>
                      <td className="p-3">
                        {reg.checkedIn ? (
                          <span className="text-emerald-400 font-bold text-[10px]">✓ Present</span>
                        ) : (
                          <span className="text-slate-500 text-[10px]">Unchecked</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        {!reg.checkedIn && (
                          <button
                            onClick={() => handlePerformCheckIn(reg.id)}
                            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-cyan-600 hover:text-slate-950 text-[10px] text-cyan-400 border border-slate-700 transition-colors"
                          >
                            Check-In
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ─── MANAGE PROMOS & BROADCAST ANNOUNCEMENTS ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create Promo */}
          <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <Tag className="w-4 h-4 text-cyan-400" />
              <span>Create Promo Discount Code</span>
            </h3>

            <form onSubmit={handleAddPromo} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Coupon Code (Uppercase)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FLASH50"
                  value={newPromoCode}
                  onChange={(e) => setNewPromoCode(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 font-mono text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Discount (% Off)</label>
                  <input
                    type="number"
                    min="5"
                    max="90"
                    value={newPromoDiscount}
                    onChange={(e) => setNewPromoDiscount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 font-mono text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Description Note</label>
                  <input
                    type="text"
                    placeholder="e.g. Flash 20% discount"
                    value={newPromoDesc}
                    onChange={(e) => setNewPromoDesc(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold transition-colors"
              >
                Create Promo Code
              </button>

              {promoSuccessMsg && (
                <p className="text-emerald-400 font-mono text-[11px]">{promoSuccessMsg}</p>
              )}
            </form>
          </div>

          {/* Broadcast Announcement */}
          <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-cyan-400" />
              <span>Broadcast Announcement to Ticker</span>
            </h3>

            <form onSubmit={handleAddAnnouncement} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Announcement Message</label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Hacker kits distribution starting at Hall B..."
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Badge Tag</label>
                <select
                  value={announcementBadge}
                  onChange={(e) => setAnnouncementBadge(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none font-mono"
                >
                  <option value="UPDATE">UPDATE</option>
                  <option value="URGENT">URGENT</option>
                  <option value="TRAVEL">TRAVEL</option>
                  <option value="SCHEDULE">SCHEDULE</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
              >
                Publish to Live Banner
              </button>

              {annSuccessMsg && (
                <p className="text-emerald-400 font-mono text-[11px]">{annSuccessMsg}</p>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
