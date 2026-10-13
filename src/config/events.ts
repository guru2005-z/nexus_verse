export interface EventItem {
  id: string;
  title: string;
  slug?: string;
  tagline: string;
  category: 'Flagship' | 'Workshop' | 'Hackathon' | 'Seminar' | 'Competition';
  status: 'upcoming' | 'ongoing' | 'past';
  date: string;
  endDate?: string;
  time: string;
  venue: string;
  mode: 'In-Person' | 'Hybrid' | 'Virtual';
  poster: string;
  description: string;
  highlights: string[];
  seatsTotal: number;
  seatsFilled: number;
  isFeatured?: boolean;
  registrationOpen: boolean;
  registrationLink?: string;
}

export interface TicketTier {
  id: string;
  name: string;
  badge?: string;
  price: number; // in INR
  originalPrice: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  recommendedFor: string;
  seatsLimit: number;
  seatsBooked: number;
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxDiscount?: number;
  minOrder?: number;
  description: string;
  isActive: boolean;
}

export interface ScheduleItem {
  id: string;
  day: number;
  dateStr: string;
  time: string;
  startTime: string;
  endTime: string;
  title: string;
  speaker?: {
    name: string;
    role: string;
    org: string;
    avatar: string;
  };
  track: string;
  venue: string;
  description: string;
  tags: string[];
}

export interface TrackItem {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  color: string;
  details: string;
  prizePool?: string;
  speakers: string[];
  deliverables: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: 'Faculty' | 'Core' | 'Tech & Web' | 'Design & Media' | 'Logistics';
  designation?: string;
  avatar: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

export interface SponsorItem {
  name: string;
  tier: 'Title Partner' | 'Platinum' | 'Gold' | 'Silver' | 'Community' | 'Ecosystem';
  logo: string;
  website: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Registration & Payment' | 'Hackathon' | 'Logistics & Accommodation';
}

export interface GalleryItem {
  id: string;
  title: string;
  edition: string;
  image: string;
  category: string;
}

// Master Configuration for IEEE Student Branch & Nexus Verse 2026
export const IEEE_CONFIG = {
  branchName: "IEEE Student Branch — NBKRIST",
  collegeName: "N.B.K.R. Institute of Science & Technology",
  location: "Vidyanagar, Tirupati District, Andhra Pradesh, India",
  code: "STB12381",
  established: 2011,
  email: "ieee.branch@nbkrist.ac.in",
  phone: "+91 94901 23456 / +91 85002 98765",
  socials: {
    instagram: "https://instagram.com/ieee_nbkrist",
    linkedin: "https://linkedin.com/company/ieee-nbkrist",
    twitter: "https://twitter.com/ieee_nbkrist",
    youtube: "https://youtube.com/@ieeenbkrist",
    whatsappCommunity: "https://chat.whatsapp.com/sampleCommunityInviteLink2026"
  },
  stats: {
    activeMembers: "350+",
    eventsOrganized: "48+",
    nationalAwards: "12+",
    communityReach: "15,000+"
  }
};

export const NEXUS_VERSE_CONFIG = {
  name: "NEXUS VERSE 2026",
  shortName: "Nexus Verse",
  edition: "Annual National Tech Summit & 36-Hr Hackathon",
  tagline: "Unleashing the Frontiers of Quantum, AI & Cyber-Physical Systems",
  dates: "November 20 – 22, 2026",
  isoStartDate: "2026-11-20T09:00:00+05:30",
  isoEndDate: "2026-11-22T18:00:00+05:30",
  venue: "Dr. A.P.J. Abdul Kalam Convention Center & Tech Hub, NBKRIST Campus, Vidyanagar, Andhra Pradesh, India - 524413",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.8767931065753!2d80.00976527508785!3d14.008987486411933!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x3a4cf1353c8db4b1%3A0x7d287bb2ffbc3b4f!2sNBKR%20Institute%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  registrationDeadline: "November 18, 2026 23:59 IST",
  maxAttendees: 600,
  currentRegistered: 488,
  prizePool: "₹2,50,000+",
  whatsappGroupInvite: "https://chat.whatsapp.com/sampleNexusVerseDelegatesGroup2026",

  pillars: [
    {
      title: "Pillar I: Learn",
      subtitle: "Master Next-Gen Tech",
      description: "Hands-on masterclasses on Quantum Computing, Multimodal Generative AI, Edge Robotics, and Post-Quantum Cryptography from global researchers and Google/IBM practitioners.",
      icon: "Cpu",
      accent: "from-cyan-500 to-blue-600"
    },
    {
      title: "Pillar II: Build",
      subtitle: "36-Hour Hackathon",
      description: "Code through the night with high-speed internet, hardware lab access, unlimited caffeine, and 1-on-1 mentorship from seasoned industry tech leads.",
      icon: "Code2",
      accent: "from-blue-500 to-indigo-600"
    },
    {
      title: "Pillar III: Connect",
      subtitle: "Vibrant Network",
      description: "Engage with 600+ elite student innovators from 40+ premier colleges, VC scouts, top tech recruiters, and IEEE international representatives.",
      icon: "Network",
      accent: "from-indigo-500 to-violet-600"
    },
    {
      title: "Pillar IV: Create Impact",
      subtitle: "₹2.5L+ in Grants & Prizes",
      description: "Pitch to angel investors, secure incubation fast-tracks at tech accelerators, win IEEE project grants, and claim exclusive hardware prize packs.",
      icon: "Sparkles",
      accent: "from-violet-500 to-fuchsia-600"
    }
  ],

  tracks: [
    {
      id: "flag-hunt-ctf",
      title: "Flag Hunt CTF",
      tagline: "Jeopardy-style Cyber Defense, Cryptography & Exploit Quest",
      iconName: "ShieldAlert",
      color: "red",
      details: "Test your cybersecurity prowess across binary exploitation, reverse engineering, web security, steganography, and network packet forensics to uncover hidden flags.",
      prizePool: "₹50,000",
      speakers: ["Arjun Varma (Certified Ethical Hacker)", "K. Raghunath (IEEE CyberSecurity Lead)"],
      deliverables: ["Live Flag Submissions", "Proof of Concept Writeups", "Vulnerability Discovery Reports"]
    },
    {
      id: "tech-prenures",
      title: "Tech Prenures / Project Expo",
      tagline: "National Tech Innovation, Hardware/Software Models & Startup Pitch",
      iconName: "Rocket",
      color: "cyan",
      details: "Exhibit your groundbreaking engineering prototypes, IoT models, and software architectures. Pitch your tech ventures to angel investors and industry veteran judges.",
      prizePool: "₹75,000",
      speakers: ["Dr. S. Ramanathan (Startup Incubator Director)", "Sneha Roy (Venture Associate)"],
      deliverables: ["Working Hardware/Software Prototype", "Investor Pitch Deck", "Market Feasibility Report"]
    },
    {
      id: "clever-coding",
      title: "Clever Coding",
      tagline: "High-Speed Algorithmic Contest & Code Optimization Sprint",
      iconName: "Code2",
      color: "blue",
      details: "Battle through multi-tiered competitive coding rounds. Solve intricate algorithmic puzzles under time pressure focusing on optimal time and space complexity.",
      prizePool: "₹45,000",
      speakers: ["M. Karthik (Master on Codeforces)", "Pooja Reddy (Senior Algorithm Engineer)"],
      deliverables: ["Optimal Code Implementations", "Benchmark Test Case Passes", "Algorithmic Complexity Proofs"]
    },
    {
      id: "bugmania",
      title: "Bugmania",
      tagline: "Fast-Paced Code Debugging, Syntax Forensics & Glitch Hunt",
      iconName: "Bug",
      color: "amber",
      details: "Uncover intentionally placed bugs, memory leaks, race conditions, and runtime crashes across Python, C++, Java, and JavaScript. Speed and precision determine the victor.",
      prizePool: "₹40,000",
      speakers: ["David Chen (Lead QA Architect)", "Divya K. (Senior Systems Debugger)"],
      deliverables: ["Corrected Executables", "Bug Root-Cause Analysis", "Test Suite Validation"]
    },
    {
      id: "canva-clash",
      title: "Canva Clash",
      tagline: "UI/UX, Graphic Design & Digital Visual Identity Championship",
      iconName: "Palette",
      color: "purple",
      details: "Unleash your visual creativity in live timed design sprints. Create compelling UI screens, tech posters, brand graphics, and motion assets for realistic product briefs.",
      prizePool: "₹40,000",
      speakers: ["Meera Joshi (Lead UI/UX Designer)", "Ankit Sengupta (Brand Strategy Consultant)"],
      deliverables: ["High-Fidelity Figma/Canva Screens", "Brand Asset Package", "Design System & Typography Guide"]
    }
  ] as TrackItem[],

  ticketTiers: [
    {
      id: "tier_standard",
      name: "Summit Pass",
      badge: "Fast Selling",
      price: 399,
      originalPrice: 599,
      description: "Full access to keynotes, technical track talks, project exhibitions, and delegate kit.",
      features: [
        "Access to Day 1 & Day 2 Keynotes",
        "Official IEEE Delegate Kit & Swag Pack",
        "Networking Lunch & Refreshments (2 Days)",
        "Participation Certificate with QR Verification",
        "Access to Exhibition Arena & Poster Sessions"
      ],
      recommendedFor: "Individual Delegates & Scholars",
      seatsLimit: 250,
      seatsBooked: 210
    },
    {
      id: "tier_hackathon",
      name: "Hackathon Pass",
      badge: "Most Popular",
      isPopular: true,
      price: 799,
      originalPrice: 1199,
      description: "Dedicated 36-hour hackathon arena pass with 24/7 mentoring, hardware lab access, and all meals.",
      features: [
        "Everything in Summit Pass",
        "36-Hour Continuous Hackathon Access",
        "Dedicated Team Workspace & Power Outlets",
        "Midnight Snacks, Energy Drinks & 5 Full Meals",
        "1-on-1 Mentorship from Tech Industry Veterans",
        "Eligibility for ₹2,50,000+ Prize Pool",
        "Complimentary High-Quality Event Hoodie"
      ],
      recommendedFor: "Hackathon Teams (2-4 Members)",
      seatsLimit: 250,
      seatsBooked: 220
    },
    {
      id: "tier_all_access",
      name: "All-Access VIP",
      badge: "Exclusive Access",
      price: 1199,
      originalPrice: 1799,
      description: "Complete summit + hackathon + exclusive speaker lounge dinner + priority cloud credits ($500+).",
      features: [
        "Everything in Hackathon Pass",
        "VIP Front-Row Seating at All Keynotes",
        "Private Networking Dinner with Keynote Speakers",
        "$500 Cloud Credits (GCP / IBM Quantum simulators)",
        "Direct Fast-Track Interview Shortlisting with Sponsors",
        "Premium Hardbound Notebook & Executive IEEE Pen Set",
        "On-Campus Air-Conditioned Rest Lounge Access"
      ],
      recommendedFor: "Pro Innovators & Campus Ambassadors",
      seatsLimit: 100,
      seatsBooked: 58
    }
  ] as TicketTier[],

  promoCodes: [
    {
      code: "IEEE2026",
      discountType: "percentage",
      discountValue: 20,
      maxDiscount: 300,
      description: "20% off for verified IEEE Student Branch Members",
      isActive: true
    },
    {
      code: "EARLYBIRD",
      discountType: "fixed",
      discountValue: 150,
      description: "Flat ₹150 off Early Bird Registration",
      isActive: true
    },
    {
      code: "NBKRISTIAN",
      discountType: "percentage",
      discountValue: 25,
      description: "Exclusive 25% off for host college students",
      isActive: true
    },
    {
      code: "HACKVIP",
      discountType: "fixed",
      discountValue: 200,
      description: "₹200 discount for Hackathon Pass holders",
      isActive: true
    }
  ] as PromoCode[],

  schedule: [
    {
      id: "sch-1",
      day: 1,
      dateStr: "Friday, Nov 20, 2026",
      time: "08:30 AM - 10:00 AM",
      startTime: "2026-11-20T08:30:00",
      endTime: "2026-11-20T10:00:00",
      title: "Delegate Check-in, Kit Distribution & Morning Refreshments",
      track: "Registration",
      venue: "Main Atrium & Helpdesk",
      description: "Registration badge scanning, welcome gift kit collection, and badge printing.",
      tags: ["Check-in", "Welcome"]
    },
    {
      id: "sch-2",
      day: 1,
      dateStr: "Friday, Nov 20, 2026",
      time: "10:00 AM - 11:30 AM",
      startTime: "2026-11-20T10:00:00",
      endTime: "2026-11-20T11:30:00",
      title: "Grand Opening Ceremony & Presidential Address",
      speaker: {
        name: "Dr. K. Sudhakar",
        role: "Director & IEEE Senior Member",
        org: "NBKRIST & IEEE Hyderabad Section",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
      },
      track: "Inauguration",
      venue: "Main Auditorium",
      description: "Lighting of the lamp, welcome address by Branch Counselor, and unveiling of NEXUS VERSE 2026 competitions.",
      tags: ["Keynote", "Plenary"]
    },
    {
      id: "sch-3",
      day: 1,
      dateStr: "Friday, Nov 20, 2026",
      time: "12:00 PM - 05:00 PM",
      startTime: "2026-11-20T12:00:00",
      endTime: "2026-11-20T17:00:00",
      title: "Flag Hunt CTF — Prelims & Live Jeopardy Arena",
      speaker: {
        name: "Arjun Varma",
        role: "Certified Ethical Hacker & Offensive Security Lead",
        org: "IEEE CyberSecurity Council",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
      },
      track: "Flag Hunt CTF",
      venue: "Cyber Defense Arena (Lab 1 & 2)",
      description: "5-Hour continuous live Jeopardy CTF: Binary exploitation, reverse engineering, web challenges, and steganography flags.",
      tags: ["Flag Hunt CTF", "CyberSecurity", "Live Scoreboard"]
    },
    {
      id: "sch-4",
      day: 2,
      dateStr: "Saturday, Nov 21, 2026",
      time: "09:30 AM - 01:00 PM",
      startTime: "2026-11-21T09:30:00",
      endTime: "2026-11-21T13:00:00",
      title: "Tech Prenures / Project Expo — Prototype Exhibition & Stalls",
      speaker: {
        name: "Dr. S. Ramanathan & Jury Panel",
        role: "Director of Tech Incubation",
        org: "IIT Madras Research Park & Angel Network",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80"
      },
      track: "Tech Prenures / Project Expo",
      venue: "Main Convention Center Exhibition Hall",
      description: "Live demonstration of hardware prototypes, IoT circuits, robotics models, and AI systems before industry evaluators.",
      tags: ["Tech Prenures", "Project Expo", "Hardware/Software"]
    },
    {
      id: "sch-5",
      day: 2,
      dateStr: "Saturday, Nov 21, 2026",
      time: "02:00 PM - 05:30 PM",
      startTime: "2026-11-21T14:00:00",
      endTime: "2026-11-21T17:30:00",
      title: "Clever Coding — Speed Algorithmic Sprint Championship",
      speaker: {
        name: "M. Karthik & Algorithmic Leads",
        role: "Competitive Programming Grandmaster",
        org: "Codeforces & Google",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80"
      },
      track: "Clever Coding",
      venue: "High Performance Computing Lab, CSE Block",
      description: "3.5 Hours of intense algorithmic coding across 6 difficulty tiers. Automated test suite execution and time complexity scoring.",
      tags: ["Clever Coding", "Algorithms", "Competitive Programming"]
    },
    {
      id: "sch-6",
      day: 3,
      dateStr: "Sunday, Nov 22, 2026",
      time: "09:30 AM - 12:30 PM",
      startTime: "2026-11-22T09:30:00",
      endTime: "2026-11-22T12:30:00",
      title: "Bugmania — Rapid Code Debugging & Forensics Battle",
      speaker: {
        name: "David Chen",
        role: "Staff QA & Reliability Architect",
        org: "Red Hat Linux",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80"
      },
      track: "Bugmania",
      venue: "Software Engineering Lab 3",
      description: "Hunt and eliminate intentionally planted memory leaks, concurrency locks, syntax anomalies, and security vulnerabilities.",
      tags: ["Bugmania", "Debugging", "Code Forensics"]
    },
    {
      id: "sch-7",
      day: 3,
      dateStr: "Sunday, Nov 22, 2026",
      time: "01:30 PM - 04:00 PM",
      startTime: "2026-11-22T13:30:00",
      endTime: "2026-11-22T16:00:00",
      title: "Canva Clash — UI/UX & Visual Design Live Sprint",
      speaker: {
        name: "Meera Joshi",
        role: "Lead Product Designer",
        org: "Figma Community Advocate",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80"
      },
      track: "Canva Clash",
      venue: "Multimedia Studio & Design Lab",
      description: "Live 2.5-hour design showdown: Craft mobile UI screens, branding posters, and interactive wireframes based on surprise product briefs.",
      tags: ["Canva Clash", "UI/UX", "Graphic Design"]
    },
    {
      id: "sch-8",
      day: 3,
      dateStr: "Sunday, Nov 22, 2026",
      time: "04:30 PM - 06:00 PM",
      startTime: "2026-11-22T16:30:00",
      endTime: "2026-11-22T18:00:00",
      title: "Grand Valedictory Ceremony & Awards Felicitation",
      track: "Awards",
      venue: "Open Air Amphitheatre",
      description: "Grand prize distribution for Flag Hunt CTF, Tech Prenures, Clever Coding, Bugmania, and Canva Clash champions, followed by High Tea.",
      tags: ["Awards", "Valedictory", "Prizes ₹2,50,000"]
    }
  ] as ScheduleItem[],

  team: [
    {
      id: "t-1",
      name: "Dr. R. Madhusudhan Rao",
      role: "Branch Counselor & Faculty Advisor",
      category: "Faculty",
      designation: "Professor & Head, Dept of ECE, NBKRIST",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      linkedin: "https://linkedin.com",
    },
    {
      id: "t-2",
      name: "Dr. S. Suhasini",
      role: "WIE Faculty Advisor",
      category: "Faculty",
      designation: "Associate Professor, Dept of CSE, NBKRIST",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
      linkedin: "https://linkedin.com",
    },
    {
      id: "t-3",
      name: "Katta Guravaiah",
      role: "Lead Convenor & Branch Chair",
      category: "Core",
      designation: "Final Year B.Tech CSE",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
    {
      id: "t-4",
      name: "Meghana Varma",
      role: "Vice Chair & Hackathon Lead",
      category: "Core",
      designation: "Third Year B.Tech AI & DS",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
      linkedin: "https://linkedin.com",
    },
    {
      id: "t-5",
      name: "Sai Teja Reddy",
      role: "Technical Head & Platform Architect",
      category: "Tech & Web",
      designation: "B.Tech Computer Science",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      github: "https://github.com",
    },
    {
      id: "t-6",
      name: "Divya Bhavani",
      role: "Publicity & Media Lead",
      category: "Design & Media",
      designation: "Third Year B.Tech ECE",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
      linkedin: "https://linkedin.com",
    },
    {
      id: "t-7",
      name: "Rahul Krishna",
      role: "Hospitality & Logistics Lead",
      category: "Logistics",
      designation: "Final Year B.Tech Mechanical",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      linkedin: "https://linkedin.com",
    },
    {
      id: "t-8",
      name: "Ananya Deshmukh",
      role: "Treasurer & Registration Head",
      category: "Core",
      designation: "B.Tech Information Technology",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
      linkedin: "https://linkedin.com",
    }
  ] as TeamMember[],

  sponsors: [
    {
      name: "IBM Quantum Systems",
      tier: "Title Partner",
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
      website: "https://quantum.ibm.com"
    },
    {
      name: "Google Cloud",
      tier: "Platinum",
      logo: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=200&auto=format&fit=crop&q=80",
      website: "https://cloud.google.com"
    },
    {
      name: "GitHub Education",
      tier: "Platinum",
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
      website: "https://education.github.com"
    },
    {
      name: "Razorpay",
      tier: "Gold",
      logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&auto=format&fit=crop&q=80",
      website: "https://razorpay.com"
    },
    {
      name: "NVIDIA Developer Program",
      tier: "Gold",
      logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&auto=format&fit=crop&q=80",
      website: "https://developer.nvidia.com"
    },
    {
      name: "IEEE Region 10 (Asia Pacific)",
      tier: "Ecosystem",
      logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&auto=format&fit=crop&q=80",
      website: "https://ieeer10.org"
    }
  ] as SponsorItem[],

  faqs: [
    {
      question: "What is NEXUS VERSE 2026?",
      answer: "NEXUS VERSE 2026 is the annual national flagship tech summit and 36-hour hackathon hosted by the IEEE Student Branch at NBKRIST. It brings together leading student engineers, researchers, founders, and industry luminaries across Quantum Computing, Generative AI, Robotics, and Cloud systems.",
      category: "General"
    },
    {
      question: "Who is eligible to participate?",
      answer: "Any undergraduate, postgraduate, or diploma student enrolled in an accredited academic institution is welcome. Non-IEEE members can also participate, though IEEE members receive special discounted pricing using the promo code IEEE2026.",
      category: "General"
    },
    {
      question: "How does the team registration work?",
      answer: "For the Hackathon track, teams can consist of 2 to 4 members. You can select 'Team' registration on the portal, provide your team name, and specify your teammates' details. The primary registrant completes the single payment for the team pass.",
      category: "Registration & Payment"
    },
    {
      question: "What payment methods are supported on Razorpay?",
      answer: "Through our official Razorpay checkout integration, we support all major payment methods across India: UPI (Google Pay, PhonePe, Paytm, CRED), Debit/Credit Cards (Visa, Mastercard, RuPay), Netbanking across 50+ banks, and Wallets.",
      category: "Registration & Payment"
    },
    {
      question: "Is accommodation provided for outstation delegates?",
      answer: "Yes! Complimentary sanitized hostel accommodation with bedding is provided for all registered Hackathon and All-Access delegates inside the green NBKRIST campus from Nov 19 evening to Nov 23 morning. Separate hostels are allotted for boys and girls with 24/7 security.",
      category: "Logistics & Accommodation"
    },
    {
      question: "What hardware will be provided for IoT & Robotics track?",
      answer: "The campus IoT Center of Excellence provides ESP32 microcontrollers, Arduino kits, Raspberry Pi 4 boards, basic sensor shields, soldering stations, and 3D printing facilities. Teams are also encouraged to bring their proprietary hardware.",
      category: "Hackathon"
    },
    {
      question: "Will participants receive certificates?",
      answer: "Yes, all verified attendees and hackathon participants will receive digitally verifiable IEEE Certificates signed by the Section Chair and Branch Counselor, accessible instantly via their unique Registration ID on our certificate portal.",
      category: "General"
    }
  ] as FAQItem[],

  gallery: [
    {
      id: "g-1",
      title: "Keynote Hall Full House - Fall Summit 2025",
      edition: "2025 Edition",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
      category: "Keynote"
    },
    {
      id: "g-2",
      title: "Hacking Overnight in the Indoor Arena",
      edition: "2025 Edition",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80",
      category: "Hackathon"
    },
    {
      id: "g-3",
      title: "Hands-on Quantum Circuit Simulator Workshop",
      edition: "2025 Edition",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
      category: "Workshops"
    },
    {
      id: "g-4",
      title: "Grand Prize Winners Cheque Handover",
      edition: "2025 Edition",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
      category: "Awards"
    },
    {
      id: "g-5",
      title: "Robotics Arena Autonomous Drone Trials",
      edition: "2024 Edition",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
      category: "Hardware"
    },
    {
      id: "g-6",
      title: "Student Networking & Dinner Mixer",
      edition: "2025 Edition",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=80",
      category: "Networking"
    }
  ] as GalleryItem[]
};

// Other IEEE Branch Events
// IEEE Branch Events Grid featuring the 5 official events
export const OTHER_EVENTS: EventItem[] = [
  {
    id: "flag-hunt-ctf",
    title: "Flag Hunt CTF",
    slug: "flag-hunt-ctf",
    tagline: "National 12-Hour Cyber Defense, Cryptography & Jeopardy CTF",
    category: "Competition",
    status: "upcoming",
    date: "Nov 20, 2026",
    time: "10:00 AM - 04:00 PM",
    venue: "Cyber Defense Arena, Hall A, NBKRIST",
    mode: "In-Person",
    poster: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    description: "Battle through Jeopardy-style cybersecurity hurdles spanning binary exploitation, web security, steganography, cryptographic ciphers, and digital forensics to hunt flags.",
    highlights: ["Live Dynamic Scoreboard", "₹50,000 Cash Prize", "Offensive Security Certificates"],
    seatsTotal: 150,
    seatsFilled: 118,
    isFeatured: true,
    registrationOpen: true,
    registrationLink: "/nexus-verse/register?track=flag-hunt-ctf"
  },
  {
    id: "tech-prenures",
    title: "Tech Prenures / Project Expo",
    slug: "tech-prenures",
    tagline: "National Project Exhibition, Prototype Demos & Startup Venture Pitch",
    category: "Flagship",
    status: "upcoming",
    date: "Nov 21, 2026",
    time: "09:30 AM - 04:30 PM",
    venue: "Main Convention Center Exhibition Hall, NBKRIST",
    mode: "In-Person",
    poster: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
    description: "Display working hardware prototypes, IoT systems, AI products, and innovative research models to top industry evaluators, angel investors, and IEEE section leaders.",
    highlights: ["₹75,000 Prize Pool", "Incubation Fast-Track", "Direct Investor Evaluation"],
    seatsTotal: 120,
    seatsFilled: 96,
    isFeatured: true,
    registrationOpen: true,
    registrationLink: "/nexus-verse/register?track=tech-prenures"
  },
  {
    id: "clever-coding",
    title: "Clever Coding",
    slug: "clever-coding",
    tagline: "Speed Algorithmic Contest & Code Optimization Sprint",
    category: "Competition",
    status: "upcoming",
    date: "Nov 21, 2026",
    time: "11:00 AM - 02:00 PM",
    venue: "High Performance Computing Lab, CSE Block",
    mode: "In-Person",
    poster: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80",
    description: "A fast-paced contest testing raw algorithmic prowess, dynamic programming, graph algorithms, and optimal data structure manipulation within tight execution limits.",
    highlights: ["LeetCode / Codeforces Style", "₹45,000 Prize Pool", "Speed Coding Trophy"],
    seatsTotal: 200,
    seatsFilled: 164,
    registrationOpen: true,
    registrationLink: "/nexus-verse/register?track=clever-coding"
  },
  {
    id: "bugmania",
    title: "Bugmania",
    slug: "bugmania",
    tagline: "Ultimate Code Forensics, Debugging & Runtime Glitch Hunt",
    category: "Competition",
    status: "upcoming",
    date: "Nov 22, 2026",
    time: "10:00 AM - 01:00 PM",
    venue: "Software Engineering Lab 3, NBKRIST",
    mode: "In-Person",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    description: "Hunt down memory corruptions, race conditions, logical traps, and runtime crashes across Python, C++, and JavaScript codebases under timed rounds.",
    highlights: ["Multi-language Challenges", "₹40,000 Prize Pool", "Bug Bounty Medals"],
    seatsTotal: 160,
    seatsFilled: 132,
    registrationOpen: true,
    registrationLink: "/nexus-verse/register?track=bugmania"
  },
  {
    id: "canva-clash",
    title: "Canva Clash",
    slug: "canva-clash",
    tagline: "UI/UX & Graphic Design Championship",
    category: "Competition",
    status: "upcoming",
    date: "Nov 22, 2026",
    time: "02:00 PM - 05:00 PM",
    venue: "Multimedia & Design Studio, NBKRIST",
    mode: "In-Person",
    poster: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&auto=format&fit=crop&q=80",
    description: "Creative design face-off where UI/UX creators, poster designers, and visual storytellers craft brand identities, mobile app mockups, and pitch graphics.",
    highlights: ["Figma & Canva Sprint", "₹40,000 Prize Pool", "Design Portfolio Review"],
    seatsTotal: 150,
    seatsFilled: 110,
    registrationOpen: true,
    registrationLink: "/nexus-verse/register?track=canva-clash"
  },
  {
    id: "nexus-verse-2025-past",
    title: "NEXUS VERSE 2025 Fall Edition",
    slug: "nexus-verse-2025",
    tagline: "Previous Edition of the National Flagship Summit",
    category: "Flagship",
    status: "past",
    date: "Oct 2025",
    time: "Completed",
    venue: "Dr. A.P.J. Abdul Kalam Convention Center",
    mode: "In-Person",
    poster: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
    description: "The 2025 gathering featuring 500+ participants across 32 universities with national project exhibitions and coding hackathons.",
    highlights: ["500+ Attendees", "₹2,00,000 Awarded", "100% Certificate Verification"],
    seatsTotal: 500,
    seatsFilled: 500,
    registrationOpen: false
  }
];

