# IEEE Student Branch & NEXUS VERSE 2026 Platform

A modern, production-grade, fully responsive multi-page web application for an IEEE Student Branch event hub and its national flagship tech summit: **NEXUS VERSE 2026** (inspired by the **Qiskit Fall Fest 2026** dark futuristic summit aesthetic).

---

## 🚀 Key Features

### Page 1: IEEE Events Hub (`/`)
- **Interactive Header**: IEEE Student Branch branding (`STB12381`), branch code, and light/dark theme toggle.
- **Hero & Branch Milestones**: Animated grid, glow effects, live stats counters (350+ members, 48+ events, 12+ national awards, 15k+ reach).
- **Featured Summit Banner**: High-impact card for **NEXUS VERSE 2026** with real-time countdown clock, prize pool indicator, and direct routing.
- **Events Grid**: Tabbed filter for *Upcoming* and *Past* events with category selector (Flagships, Workshops, Hackathons, Seminars, Competitions).
- **Branch Story & Contact Form**: Directly connected to backend `/api/contact`.

### Page 2: NEXUS VERSE Event Microsite (`/nexus-verse`)
- **Futuristic Summit Design**: Electric blue to violet gradients, cyber-grid mesh, and bold typography.
- **Live Announcements Ticker**: Real-time ticker with seat counter updates and share modal.
- **Full-Screen Hero**: Live countdown timer, highlight metrics, and instant registration CTA.
- **4 Experience Pillars**: Learn, Build, Connect, Create Impact.
- **4 Technical Tracks**:
  1. *Quantum Computing & Applied AI* (IBM Qiskit, VQC algorithms)
  2. *Autonomous Robotics & Smart IoT* (ROS 2, Edge AI)
  3. *Cloud Native & Secure Distributed Systems* (Zero-trust architecture)
  4. *Tech For Good & Sustainable AgTech/MedTech*
- **Day-Wise Tabbed Schedule**: Interactive Day 1, Day 2, Day 3 timelines with "Add to Calendar" links for Google Calendar.
- **Ticket Tiers**: Summit Pass (₹399), Hackathon Pass (₹799), and All-Access VIP (₹1199).
- **Interactive Venue & Accommodation**: Embedded Google Map and train/flight travel instructions for NBKRIST campus.
- **Organizing Team**: Faculty advisors and student core leads.
- **Sponsors Grid & FAQs Accordion**: Tiered partners and accordion answers.
- **Past Editions Gallery**: Responsive masonry layout with modal lightbox.

### Registration & Razorpay Payments (`/nexus-verse/register`)
- **Multi-Step Flow**:
  - *Step 1*: Individual / Team (2–4 members) details, college, department, roll number, track, ticket tier, t-shirt size, food preference, and live coupon code validator (`IEEE2026`, `NBKRISTIAN`, `EARLYBIRD`).
  - *Step 2*: Order summary review with **server-side validated price calculation** (never trusting client amounts) + 18% GST breakdown.
  - *Step 3*: Checkout with Razorpay (supporting UPI, Cards, Netbanking, and Wallets) + instant simulated test modal fallback.
  - *Step 4*: Victory confetti celebration, unique Registration ID (`NV26-XXXX`), scannable QR code pass, WhatsApp group invite, and print/download pass.

### Dedicated Delegate Pass (`/nexus-verse/ticket/:id`)
- Printable boarding pass view with QR code, check-in status, gate directions, and venue guidelines.

### Certificate Verification Portal (`/nexus-verse/certificate`)
- Online credential retrieval by Registration ID or email, displaying a signed IEEE Certificate of Participation/Achievement ready to print or save.

### Admin Command Center (`/admin`)
- **Protected Access**: Login with default admin password: `admin@nexusverse2026`.
- **Live Metrics**: Total registrations, paid orders, pending orders, and total revenue collected.
- **Searchable / Filterable Table**: Filter by payment status, technical track, or query text.
- **One-Click Gate Check-In**: Instant attendance marking for on-spot badge collection.
- **Promo Code Generator**: Create dynamic percentage or flat discount coupons on the fly.
- **Announcement Broadcaster**: Publish live notices to the site ticker.
- **CSV Export**: One-click download of all delegate data for Excel/Google Sheets.

### Mandatory Legal Policies for Payment Gateways
- Terms & Conditions (`/terms-conditions`)
- Privacy Policy (`/privacy-policy`)
- Refund & Cancellation Policy (`/refund-policy`)

---

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, Canvas Confetti, QRCode
- **Backend**: Node.js & Express in `server.ts` and `server/routes.ts`
- **Database / Store**: Resilient file-backed persistent store in `server/data/store.json` with memory caching
- **Payment Processing**: Razorpay Checkout SDK & HMAC SHA256 Signature Verification (`server/razorpay.ts`)

---

## ⚙️ Configuration & Easy Customization

All event specifics, dates, venues, ticket tiers, schedules, and team members are centralized in a single configuration file:

📁 `src/config/events.ts`

```typescript
export const IEEE_CONFIG = {
  branchName: "IEEE Student Branch — NBKRIST",
  collegeName: "N.B.K.R. Institute of Science & Technology",
  location: "Vidyanagar, Tirupati District, Andhra Pradesh, India",
  code: "STB12381",
  email: "ieee.branch@nbkrist.ac.in",
  phone: "+91 94901 23456"
};

export const NEXUS_VERSE_CONFIG = {
  name: "NEXUS VERSE 2026",
  dates: "November 20 – 22, 2026",
  venue: "Dr. A.P.J. Abdul Kalam Convention Center, NBKRIST",
  ticketTiers: [ ... ],
  tracks: [ ... ]
};
```

---

## 💳 Razorpay Test Mode Setup

1. Copy `.env.example` to `.env`.
2. Add your Razorpay Test API Keys from [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys):
   ```env
   RAZORPAY_KEY_ID="rzp_test_yourKeyHere"
   RAZORPAY_KEY_SECRET="yourSecretHere"
   RAZORPAY_WEBHOOK_SECRET="yourWebhookSecretHere"
   ADMIN_SECRET_KEY="admin@nexusverse2026"
   ```
3. When using placeholder or demo keys, the built-in interactive **Razorpay Test Sandbox Modal** allows immediate simulation of UPI, Card, and Netbanking payments, generating valid signatures and issuing authentic ticket QR codes!

---

## 🏃 Running the Application

```bash
# Install dependencies
npm install

# Start full-stack dev server (Express + Vite on port 3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

---

## ☁️ Deploying to Vercel

The application is pre-configured for seamless zero-config deployment on Vercel:

### Method 1: Deploy via GitHub (Recommended)
1. Push this repository to **GitHub** (or GitLab/Bitbucket).
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Click **Import** next to your repository.
4. Vercel will automatically detect the **Vite** framework from `vercel.json`.
5. Under **Environment Variables**, add:
   - `RAZORPAY_KEY_ID`: Your Razorpay Key ID (e.g. `rzp_test_...`)
   - `RAZORPAY_KEY_SECRET`: Your Razorpay Secret Key
   - `RAZORPAY_WEBHOOK_SECRET`: Webhook Secret
   - `ADMIN_SECRET_KEY`: Admin password (e.g. `admin@nexusverse2026`)
6. Click **Deploy**.

### Method 2: Deploy via Vercel CLI
```bash
# Install Vercel CLI globally (if not already installed)
npm i -g vercel

# Log in to Vercel
vercel login

# Deploy project
vercel

# Deploy to production
vercel --prod
```

### Architecture on Vercel
- **Frontend SPA**: Pre-rendered Vite bundle served globally across Vercel Edge CDN with HTML5 history API rewrites to `index.html`.
- **Backend API**: The Express router in `/api/index.ts` automatically runs as a high-performance **Vercel Serverless Function** responding to all `/api/*` requests (Order creation, HMAC verification, Webhooks, Admin APIs, Certificates).
- **Persistent Data**: On Vercel, the data store automatically utilizes the `/tmp` scratchpad filesystem, allowing state persistence across serverless invocations.

