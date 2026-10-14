import React from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
}

// ─── 1. IEEE OFFICIAL LOGO (Diamond kite + Right-hand electromagnetic induction lines + IEEE wordmark) ───
export const IeeeLogo: React.FC<LogoProps> = ({ className = "h-8 w-auto", size }) => (
  <svg
    viewBox="0 0 240 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { height: size } : undefined}
    aria-label="IEEE Official Logo"
  >
    {/* IEEE Diamond Emblem */}
    <g transform="translate(4, 5)">
      {/* Outer Diamond */}
      <polygon
        points="30,0 60,30 30,60 0,30"
        fill="#00629B"
        stroke="#38bdf8"
        strokeWidth="1.5"
      />
      {/* Electromagnetic arrows & coils */}
      <circle cx="30" cy="30" r="18" stroke="#ffffff" strokeWidth="2.5" fill="none" opacity="0.95" />
      <path
        d="M 30,12 A 18 18 0 0 1 48,30"
        stroke="#38bdf8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Induction arrow right */}
      <path
        d="M 20,30 L 40,30 M 35,24 L 41,30 L 35,36"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Magnetic field line */}
      <path
        d="M 30,20 L 30,40"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="30" cy="20" r="2.5" fill="#38bdf8" />
      <circle cx="30" cy="40" r="2.5" fill="#38bdf8" />
    </g>

    {/* "IEEE" Wordmark */}
    <g fill="currentColor" transform="translate(80, 16)">
      {/* I */}
      <rect x="0" y="4" width="8" height="32" rx="1" fill="#38bdf8" />
      {/* E */}
      <path
        d="M 20,4 L 46,4 L 46,11 L 28,11 L 28,16 L 43,16 L 43,23 L 28,23 L 28,29 L 46,29 L 46,36 L 20,36 Z"
        fill="currentColor"
      />
      {/* E */}
      <path
        d="M 54,4 L 80,4 L 80,11 L 62,11 L 62,16 L 77,16 L 77,23 L 62,23 L 62,29 L 80,29 L 80,36 L 54,36 Z"
        fill="currentColor"
      />
      {/* E */}
      <path
        d="M 88,4 L 114,4 L 114,11 L 96,11 L 96,16 L 111,16 L 111,23 L 96,23 L 96,29 L 114,29 L 114,36 L 88,36 Z"
        fill="currentColor"
      />
    </g>
    <text
      x="80"
      y="60"
      fill="#94a3b8"
      fontSize="8.5"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="600"
      letterSpacing="0.08em"
    >
      Advancing Technology for Humanity
    </text>
  </svg>
);

// ─── 2. NBKRIST INSTITUTE LOGO (Official College Seal: Flame of Knowledge, Cogwheel, Atom Orbits, Shield) ───
export const NbkristLogo: React.FC<LogoProps> = ({ className = "h-10 w-auto", size }) => (
  <svg
    viewBox="0 0 280 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { height: size } : undefined}
    aria-label="NBKR Institute of Science & Technology Logo"
  >
    {/* Crest / Emblem */}
    <g transform="translate(6, 6)">
      {/* Outer Golden Glow Circle */}
      <circle cx="34" cy="34" r="33" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
      {/* Inner Cogwheel (Engineering) */}
      <circle cx="34" cy="34" r="28" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" fill="#0284c7" fillOpacity="0.15" />
      
      {/* Atom Orbits (Science & Research) */}
      <ellipse cx="34" cy="34" rx="22" ry="8" stroke="#38bdf8" strokeWidth="1.2" transform="rotate(30 34 34)" opacity="0.8" />
      <ellipse cx="34" cy="34" rx="22" ry="8" stroke="#f59e0b" strokeWidth="1.2" transform="rotate(-30 34 34)" opacity="0.8" />
      
      {/* Central Flame of Knowledge / Jyothi */}
      <path
        d="M 34,16 C 36,22 41,25 39,33 C 38,36 36,38 34,40 C 32,38 30,36 29,33 C 27,25 32,22 34,16 Z"
        fill="url(#nbkrFlameGrad)"
      />
      <circle cx="34" cy="30" r="3" fill="#fef08a" />
      
      {/* Base Pedestal / Open Book */}
      <path
        d="M 23,45 Q 34,42 45,45 L 43,48 Q 34,45 25,48 Z"
        fill="#f8fafc"
      />
      <rect x="31" y="44" width="6" height="5" fill="#f59e0b" rx="1" />
      
      {/* ESTD 1979 banner arc */}
      <rect x="18" y="54" width="32" height="10" rx="3" fill="#0369a1" stroke="#38bdf8" strokeWidth="0.8" />
      <text
        x="34"
        y="61.5"
        fill="#ffffff"
        fontSize="6.5"
        fontFamily="monospace"
        fontWeight="bold"
        textAnchor="middle"
      >
        ESTD 1979
      </text>
    </g>

    {/* College Typography */}
    <g transform="translate(82, 18)">
      <text
        x="0"
        y="14"
        fill="#ffffff"
        fontSize="17"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        letterSpacing="0.05em"
      >
        N.B.K.R.I.S.T.
      </text>
      <text
        x="0"
        y="28"
        fill="#38bdf8"
        fontSize="9.5"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="600"
        letterSpacing="0.02em"
      >
        N.B.K.R. INSTITUTE OF SCIENCE & TECHNOLOGY
      </text>
      <text
        x="0"
        y="40"
        fill="#94a3b8"
        fontSize="7.5"
        fontFamily="monospace"
        letterSpacing="0.04em"
      >
        AUTONOMOUS • NAAC 'A' GRADE • NBA ACCREDITED • VIDYANAGAR
      </text>
    </g>

    <defs>
      <linearGradient id="nbkrFlameGrad" x1="28" y1="16" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fef08a" />
        <stop offset="0.4" stopColor="#f59e0b" />
        <stop offset="1" stopColor="#ea580c" />
      </linearGradient>
    </defs>
  </svg>
);

// ─── 3. IEEE STUDENT BRANCH NBKRIST CREST (STB12381) ───
export const IeeeStudentBranchLogo: React.FC<LogoProps> = ({ className = "h-10 w-auto", size }) => (
  <svg
    viewBox="0 0 260 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { height: size } : undefined}
    aria-label="IEEE Student Branch NBKRIST Logo"
  >
    {/* Diamond Crest */}
    <g transform="translate(6, 6)">
      <polygon points="28,0 56,28 28,56 0,28" fill="#00629B" stroke="#06b6d4" strokeWidth="1.5" />
      <circle cx="28" cy="28" r="16" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.9" />
      <path d="M 18,28 L 38,28 M 33,22 L 39,28 L 33,34" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 28,18 L 28,38" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
      <circle cx="28" cy="18" r="2" fill="#ffffff" />
      <circle cx="28" cy="38" r="2" fill="#ffffff" />
    </g>

    {/* Text Stack */}
    <g transform="translate(70, 16)">
      <div className="flex items-center gap-2">
        <text x="0" y="14" fill="#38bdf8" fontSize="15" fontFamily="system-ui, sans-serif" fontWeight="900" letterSpacing="0.04em">
          IEEE STUDENT BRANCH
        </text>
      </div>
      <text x="0" y="29" fill="#ffffff" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="700">
        NBKRIST • VIDYANAGAR
      </text>
      <text x="0" y="42" fill="#a5f3fc" fontSize="8" fontFamily="monospace" fontWeight="600" letterSpacing="0.06em">
        BRANCH CODE: STB12381 • REGION 10
      </text>
    </g>
  </svg>
);

// ─── 4. IEEE REGION 10 (ASIA-PACIFIC) EMBLEM ───
export const IeeeRegion10Logo: React.FC<LogoProps> = ({ className = "h-9 w-auto", size }) => (
  <svg
    viewBox="0 0 200 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { height: size } : undefined}
    aria-label="IEEE Region 10 Logo"
  >
    <g transform="translate(4, 8)">
      {/* Globe Meridian Grid */}
      <circle cx="22" cy="22" r="20" fill="#082f49" stroke="#0284c7" strokeWidth="1.5" />
      <ellipse cx="22" cy="22" rx="10" ry="20" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" fill="none" />
      <line x1="2" y1="22" x2="42" y2="22" stroke="#38bdf8" strokeWidth="1" />
      {/* R10 Badge */}
      <polygon points="22,6 36,22 22,38 8,22" fill="#00629b" stroke="#38bdf8" strokeWidth="1.2" />
      <text x="22" y="26" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="900" textAnchor="middle">
        R10
      </text>
    </g>
    <g transform="translate(56, 18)">
      <text x="0" y="13" fill="#ffffff" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="800">
        IEEE REGION 10
      </text>
      <text x="0" y="27" fill="#38bdf8" fontSize="8.5" fontFamily="monospace" fontWeight="600" letterSpacing="0.08em">
        ASIA PACIFIC SECTION
      </text>
    </g>
  </svg>
);

// ─── 5. NEXUSVERSE-2K26 OFFICIAL TECH CREST ───
export const NexusVerseCrest: React.FC<LogoProps> = ({ className = "h-10 w-auto", size }) => (
  <svg
    viewBox="0 0 240 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { height: size } : undefined}
    aria-label="NEXUSVERSE 2K26 Official Crest"
  >
    {/* Futuristic Hexagon Quantum Core */}
    <g transform="translate(6, 7)">
      {/* Outer Hex */}
      <polygon
        points="28,4 52,18 52,46 28,60 4,46 4,18"
        fill="#050814"
        stroke="url(#nvHexGrad)"
        strokeWidth="2.5"
      />
      {/* Inner Neon Lines */}
      <polygon
        points="28,12 44,21 44,39 28,48 12,39 12,21"
        fill="url(#nvCoreGrad)"
        fillOpacity="0.25"
        stroke="#38bdf8"
        strokeWidth="1.2"
      />
      {/* Center Quantum Node */}
      <circle cx="28" cy="30" r="5" fill="#06b6d4" />
      <circle cx="28" cy="30" r="8" stroke="#a855f7" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="28" y1="12" x2="28" y2="25" stroke="#38bdf8" strokeWidth="1.5" />
      <line x1="28" y1="35" x2="28" y2="48" stroke="#a855f7" strokeWidth="1.5" />
      <line x1="12" y1="21" x2="23" y2="28" stroke="#38bdf8" strokeWidth="1.5" />
      <line x1="33" y1="32" x2="44" y2="39" stroke="#a855f7" strokeWidth="1.5" />
    </g>

    {/* Typography */}
    <g transform="translate(68, 17)">
      <text
        x="0"
        y="18"
        fill="url(#nvTextGrad)"
        fontSize="18"
        fontFamily="Orbitron, system-ui, sans-serif"
        fontWeight="900"
        letterSpacing="0.08em"
      >
        NEXUSVERSE
      </text>
      <rect x="135" y="4" width="32" height="15" rx="3" fill="#082f49" stroke="#06b6d4" strokeWidth="1" />
      <text
        x="151"
        y="15"
        fill="#67e8f9"
        fontSize="9"
        fontFamily="monospace"
        fontWeight="bold"
        textAnchor="middle"
      >
        2K26
      </text>
      <text
        x="0"
        y="33"
        fill="#94a3b8"
        fontSize="8"
        fontFamily="monospace"
        fontWeight="600"
        letterSpacing="0.1em"
      >
        NATIONAL TECHNICAL SYMPOSIUM
      </text>
    </g>

    <defs>
      <linearGradient id="nvHexGrad" x1="4" y1="4" x2="52" y2="60" gradientUnits="userSpaceOnUse">
        <stop stopColor="#06b6d4" />
        <stop offset="0.5" stopColor="#6366f1" />
        <stop offset="1" stopColor="#a855f7" />
      </linearGradient>
      <linearGradient id="nvCoreGrad" x1="12" y1="12" x2="44" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#06b6d4" />
        <stop offset="1" stopColor="#a855f7" />
      </linearGradient>
      <linearGradient id="nvTextGrad" x1="0" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" />
        <stop offset="0.6" stopColor="#67e8f9" />
        <stop offset="1" stopColor="#c084fc" />
      </linearGradient>
    </defs>
  </svg>
);

// ─── 6. IBM QUANTUM LOGO (Clean IBM 8-bar + Quantum Typography) ───
export const IbmQuantumLogo: React.FC<LogoProps> = ({ className = "h-8 w-auto", size }) => (
  <svg
    viewBox="0 0 200 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { height: size } : undefined}
    aria-label="IBM Quantum Logo"
  >
    {/* IBM 8-bar Stripes */}
    <g fill="#0062ff" transform="translate(4, 10)">
      {/* I */}
      <rect x="0" y="0" width="14" height="3.2" />
      <rect x="0" y="4.5" width="14" height="3.2" />
      <rect x="4.5" y="9" width="5" height="3.2" />
      <rect x="4.5" y="13.5" width="5" height="3.2" />
      <rect x="4.5" y="18" width="5" height="3.2" />
      <rect x="4.5" y="22.5" width="5" height="3.2" />
      <rect x="0" y="27" width="14" height="3.2" />
      <rect x="0" y="31.5" width="14" height="3.2" />

      {/* B */}
      <path d="M 18,0 L 32,0 C 35,0 37,1.5 37,3.2 L 18,3.2 Z" />
      <path d="M 18,4.5 L 34,4.5 C 37,4.5 38.5,6 38.5,7.7 L 18,7.7 Z" />
      <path d="M 18,9 L 23,9 L 23,12.2 L 34,12.2 C 37,12.2 38,10.6 38,9 Z" />
      <path d="M 18,13.5 L 34,13.5 C 36,13.5 37,15 37,16.7 L 18,16.7 Z" />
      <path d="M 18,18 L 34,18 C 36,18 37,19.5 37,21.2 L 18,21.2 Z" />
      <path d="M 18,22.5 L 23,22.5 L 23,25.7 L 34,25.7 C 37,25.7 38.5,24.1 38.5,22.5 Z" />
      <path d="M 18,27 L 34,27 C 37,27 38.5,28.5 38.5,30.2 L 18,30.2 Z" />
      <path d="M 18,31.5 L 32,31.5 C 35,31.5 37,33 37,34.7 L 18,34.7 Z" />

      {/* M */}
      <rect x="43" y="0" width="5" height="3.2" />
      <rect x="52" y="0" width="4" height="3.2" />
      <rect x="63" y="0" width="5" height="3.2" />
      <rect x="43" y="4.5" width="5" height="3.2" />
      <rect x="50" y="4.5" width="8" height="3.2" />
      <rect x="63" y="4.5" width="5" height="3.2" />
      <rect x="43" y="9" width="5" height="3.2" />
      <rect x="48" y="9" width="12" height="3.2" />
      <rect x="63" y="9" width="5" height="3.2" />
      <rect x="43" y="13.5" width="5" height="3.2" />
      <rect x="52" y="13.5" width="4" height="3.2" />
      <rect x="63" y="13.5" width="5" height="3.2" />
      <rect x="43" y="18" width="5" height="3.2" />
      <rect x="63" y="18" width="5" height="3.2" />
      <rect x="43" y="22.5" width="5" height="3.2" />
      <rect x="63" y="22.5" width="5" height="3.2" />
      <rect x="43" y="27" width="5" height="3.2" />
      <rect x="63" y="27" width="5" height="3.2" />
      <rect x="43" y="31.5" width="5" height="3.2" />
      <rect x="63" y="31.5" width="5" height="3.2" />
    </g>

    {/* Quantum Wordmark */}
    <g transform="translate(80, 16)">
      <text
        x="0"
        y="18"
        fill="#ffffff"
        fontSize="16"
        fontFamily="system-ui, sans-serif"
        fontWeight="300"
        letterSpacing="0.08em"
      >
        Quantum
      </text>
    </g>
  </svg>
);

// ─── 7. QISKIT OFFICIAL LOGO (The Quantum Bloch Sphere / Hex Network) ───
export const QiskitLogo: React.FC<LogoProps> = ({ className = "h-8 w-auto", size }) => (
  <svg
    viewBox="0 0 170 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { height: size } : undefined}
    aria-label="Qiskit Logo"
  >
    {/* Qiskit 6-Node Quantum Circuit Symbol */}
    <g transform="translate(6, 9)">
      {/* Central Ring */}
      <circle cx="16" cy="16" r="14" stroke="#6929c4" strokeWidth="2.5" fill="none" />
      {/* Quantum Nodes (Purple, Violet, Blue) */}
      <circle cx="16" cy="4" r="3.5" fill="#a56eff" />
      <circle cx="26" cy="10" r="3.5" fill="#6929c4" />
      <circle cx="26" cy="22" r="3.5" fill="#1192e8" />
      <circle cx="16" cy="28" r="3.5" fill="#0043ce" />
      <circle cx="6" cy="22" r="3.5" fill="#6929c4" />
      <circle cx="6" cy="10" r="3.5" fill="#a56eff" />
      {/* Entanglement Line */}
      <path d="M 16,4 L 16,28 M 6,10 L 26,22" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
    </g>
    {/* Typography */}
    <g transform="translate(48, 15)">
      <text
        x="0"
        y="19"
        fill="#ffffff"
        fontSize="19"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        letterSpacing="-0.02em"
      >
        qiskit
      </text>
      <circle cx="66" cy="19" r="2.5" fill="#a56eff" />
    </g>
  </svg>
);

// ─── 8. GOOGLE CLOUD LOGO ───
export const GoogleCloudLogo: React.FC<LogoProps> = ({ className = "h-8 w-auto", size }) => (
  <svg
    viewBox="0 0 180 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { height: size } : undefined}
    aria-label="Google Cloud Logo"
  >
    {/* 4-Color Cloud Shape */}
    <g transform="translate(6, 10)">
      <path d="M 28,14 C 27,9 23,6 18,6 C 14,6 11,8 9.5,11 C 4.5,11.5 1,15.5 1,20.5 C 1,26 5.5,30 11,30 L 27,30 C 32,30 36,26 36,21 C 36,17 32.5,14.5 28,14 Z" fill="#4285F4" />
      <path d="M 27,30 L 11,30 C 5.5,30 1,26 1,20.5 C 1,18 2,15.5 4,13.8 L 12,22 L 27,30 Z" fill="#EA4335" opacity="0.3" />
      <path d="M 18,6 C 23,6 27,9 28,14 L 21,21 L 9.5,11 C 11,8 14,6 18,6 Z" fill="#FBBC04" opacity="0.4" />
      <circle cx="27" cy="21" r="5" fill="#34A853" opacity="0.4" />
    </g>
    <g transform="translate(50, 16)">
      <text x="0" y="17" fill="#ffffff" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="700">
        Google Cloud
      </text>
    </g>
  </svg>
);

// ─── 9. GITHUB LOGO ───
export const GithubLogo: React.FC<LogoProps> = ({ className = "h-8 w-auto", size }) => (
  <svg
    viewBox="0 0 160 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { height: size } : undefined}
    aria-label="GitHub Logo"
  >
    {/* Octocat Silhouette */}
    <g transform="translate(6, 9)">
      <circle cx="16" cy="16" r="16" fill="#ffffff" />
      <path
        d="M 16,3 C 8.8,3 3,8.8 3,16 C 3,21.7 6.7,26.6 11.9,28.3 C 12.5,28.4 12.8,28 12.8,27.7 L 12.8,25.5 C 9.2,26.3 8.4,23.8 8.4,23.8 C 7.8,22.3 7,21.9 7,21.9 C 5.8,21.1 7.1,21.1 7.1,21.1 C 8.4,21.2 9.1,22.4 9.1,22.4 C 10.3,24.4 12.1,23.8 12.8,23.5 C 12.9,22.6 13.3,22 13.7,21.6 C 10.8,21.3 7.8,20.2 7.8,15.3 C 7.8,13.9 8.3,12.7 9.1,11.8 C 9,11.5 8.5,10.2 9.2,8.5 C 9.2,8.5 10.3,8.1 12.8,9.8 C 13.8,9.5 14.9,9.4 16,9.4 C 17.1,9.4 18.2,9.5 19.2,9.8 C 21.7,8.1 22.8,8.5 22.8,8.5 C 23.5,10.2 23,11.5 22.9,11.8 C 23.7,12.7 24.2,13.9 24.2,15.3 C 24.2,20.2 21.2,21.3 18.3,21.6 C 18.8,22 19.2,22.8 19.2,24 L 19.2,27.7 C 19.2,28 19.5,28.4 20.1,28.3 C 25.3,26.6 29,21.7 29,16 C 29,8.8 23.2,3 16,3 Z"
        fill="#0d1117"
      />
    </g>
    <g transform="translate(48, 16)">
      <text x="0" y="17" fill="#ffffff" fontSize="15" fontFamily="system-ui, sans-serif" fontWeight="800">
        GitHub
      </text>
    </g>
  </svg>
);

// ─── 10. NVIDIA LOGO ───
export const NvidiaLogo: React.FC<LogoProps> = ({ className = "h-8 w-auto", size }) => (
  <svg
    viewBox="0 0 170 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { height: size } : undefined}
    aria-label="NVIDIA Logo"
  >
    {/* NVIDIA Eye Curve */}
    <g transform="translate(6, 10)">
      <path
        d="M 17,2 C 9,2 2,8.5 2,16.5 C 2,24.5 9,31 17,31 C 24,31 29,26 31,21 L 25.5,21 C 24,24 21,26.5 17,26.5 C 11.5,26.5 7,22 7,16.5 C 7,11 11.5,6.5 17,6.5 C 21.5,6.5 24.5,9.5 25.5,13 L 31,13 C 29,6.5 24,2 17,2 Z"
        fill="#76B900"
      />
      <circle cx="17" cy="16.5" r="4.5" fill="#76B900" />
    </g>
    <g transform="translate(46, 16)">
      <text x="0" y="17" fill="#ffffff" fontSize="15" fontFamily="system-ui, sans-serif" fontWeight="900" letterSpacing="0.04em">
        NVIDIA
      </text>
    </g>
  </svg>
);

// ─── 11. RAZORPAY LOGO ───
export const RazorpayLogo: React.FC<LogoProps> = ({ className = "h-8 w-auto", size }) => (
  <svg
    viewBox="0 0 170 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { height: size } : undefined}
    aria-label="Razorpay Logo"
  >
    {/* Blue Lightning Bolt */}
    <g transform="translate(6, 10)">
      <path
        d="M 18,2 L 6,20 L 14,20 L 10,32 L 26,14 L 18,14 Z"
        fill="#0c2340"
        stroke="#0284c7"
        strokeWidth="1.5"
      />
      <path
        d="M 18,2 L 8,18 L 15,18 L 12,30 L 25,14 L 18,14 Z"
        fill="#0284c7"
      />
    </g>
    <g transform="translate(42, 16)">
      <text x="0" y="17" fill="#ffffff" fontSize="15" fontFamily="system-ui, sans-serif" fontWeight="800">
        Razorpay
      </text>
    </g>
  </svg>
);

// ─── COMPOSITE: ALL ORGANIZER & PATRON LOGOS BANNER ───
export const OfficialOrganizersBanner: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`w-full py-6 px-4 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl ${className}`}>
      <div className="flex flex-col items-center text-center mb-4">
        <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Officially Organized & Sanctioned By
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14">
        {/* NBKRIST College Logo */}
        <div className="group flex items-center gap-3 p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all hover:scale-105 shadow-lg">
          <NbkristLogo className="h-10 sm:h-12 w-auto" />
        </div>

        {/* IEEE Student Branch Logo */}
        <div className="group flex items-center gap-3 p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 transition-all hover:scale-105 shadow-lg">
          <IeeeStudentBranchLogo className="h-10 sm:h-12 w-auto" />
        </div>

        {/* IEEE Official Logo */}
        <div className="group flex items-center gap-3 p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-blue-500/40 transition-all hover:scale-105 shadow-lg">
          <IeeeLogo className="h-9 sm:h-10 w-auto" />
        </div>

        {/* IEEE Region 10 */}
        <div className="group flex items-center gap-3 p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition-all hover:scale-105 shadow-lg">
          <IeeeRegion10Logo className="h-9 sm:h-10 w-auto" />
        </div>
      </div>
    </div>
  );
};

// ─── COMPOSITE: TECH PARTNER LOGO MARQUEE (qffsrmap2026.com style) ───
export const TechPartnersMarquee: React.FC<{ className?: string }> = ({ className = "" }) => {
  const partners = [
    { component: <IbmQuantumLogo className="h-7 w-auto" />, name: "IBM Quantum", badge: "Quantum Track" },
    { component: <QiskitLogo className="h-7 w-auto" />, name: "Qiskit", badge: "Partner SDK" },
    { component: <GoogleCloudLogo className="h-7 w-auto" />, name: "Google Cloud", badge: "Cloud Platform" },
    { component: <GithubLogo className="h-7 w-auto" />, name: "GitHub", badge: "Dev Ecosystem" },
    { component: <NvidiaLogo className="h-7 w-auto" />, name: "NVIDIA", badge: "AI Acceleration" },
    { component: <RazorpayLogo className="h-7 w-auto" />, name: "Razorpay", badge: "Payment Gateway" },
    { component: <IeeeRegion10Logo className="h-7 w-auto" />, name: "IEEE Region 10", badge: "Global Network" },
  ];

  return (
    <div className={`overflow-hidden py-6 relative ${className}`}>
      <div className="text-center mb-6">
        <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
          Technology Ecosystem & Platform Partners
        </span>
      </div>

      {/* Track */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 max-w-6xl mx-auto px-4">
        {partners.map((partner, idx) => (
          <div
            key={idx}
            className="group flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] min-w-[140px]"
          >
            <div className="h-8 flex items-center justify-center">
              {partner.component}
            </div>
            <span className="mt-2 text-[10px] font-mono text-cyan-400 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-800/60 uppercase">
              {partner.badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
