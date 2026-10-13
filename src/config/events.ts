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
  name: "NEXUSVERSE-2K26",
  shortName: "NexusVerse-2K26",
  edition: "A National Level Technical Symposium",
  tagline: "IEEE-SB-NBKRIST Proudly Presents National Level Technical Symposium",
  dates: "11 October 2026",
  time: "9:00 AM IST",
  isoStartDate: "2026-10-11T09:00:00+05:30",
  isoEndDate: "2026-10-11T18:00:00+05:30",
  venue: "N.B.K.R. Institute of Science & Technology (Autonomous), Vidyanagar, Tirupati District, A.P., India - 524413",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.8767931065753!2d80.00976527508785!3d14.008987486411933!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x3a4cf1353c8db4b1%3A0x7d287bb2ffbc3b4f!2sNBKR%20Institute%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  registrationDeadline: "October 10, 2026 23:59 IST",
  maxAttendees: 600,
  currentRegistered: 488,
  prizePool: "Exciting Cash Prizes & Awards",
  email: "nexusverse@nbkrist.org",
  whatsappGroupInvite: "https://chat.whatsapp.com/sampleNexusVerseDelegatesGroup2026",
  studentCoordinators: [
    { name: "R. DINESH", phone: "6300158172" },
    { name: "S. NANDINI", phone: "9121668985" },
    { name: "MD. UMAR", phone: "9347191353" }
  ],

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
      id: "tier_technical",
      name: "Technical Events Pass",
      badge: "Official Entry",
      isPopular: true,
      price: 200,
      originalPrice: 250,
      description: "Full access to participate in all 5 events: Clever Coding, Canvaclash, Bugmania, Flaghunt - CTF, and Techpreneurs.",
      features: [
        "Access to All 5 Events Competitions",
        "Clever Coding & Bugmania Arena Access",
        "Flaghunt - CTF Live Participation",
        "Techpreneurs & Canvaclash Submission",
        "Official Participation Certificate with QR Verification",
        "Eligible to Win Exciting Cash Prizes & Trophies"
      ],
      recommendedFor: "All College Students & Innovators",
      seatsLimit: 400,
      seatsBooked: 320
    },
    {
      id: "tier_spot",
      name: "Spot Registration",
      badge: "On-Spot Entry",
      price: 100,
      originalPrice: 150,
      description: "Supplementary spot registration fee / on-campus event access pass.",
      features: [
        "On-Spot Gate Entry Pass",
        "Access to Exhibition Arena & Project Expo",
        "Live Audience for Finals & Pitching",
        "Participation Certificate"
      ],
      recommendedFor: "Spot Registrants & Audience",
      seatsLimit: 200,
      seatsBooked: 88
    },
    {
      id: "tier_all_access",
      name: "All-Events VIP Pass",
      badge: "Complete Package",
      price: 250,
      originalPrice: 350,
      description: "All 5 technical events + IEEE delegate swag kit + priority seating & refreshment coupon.",
      features: [
        "Everything in Technical Events Pass",
        "Official IEEE Delegate Badge & Kit",
        "Refreshment & High Tea Coupon",
        "Direct Mentorship with Industry Evaluators"
      ],
      recommendedFor: "Pro Innovators & Campus Delegates",
      seatsLimit: 100,
      seatsBooked: 80
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
      dateStr: "Sunday, Oct 11, 2026",
      time: "08:30 AM - 09:30 AM",
      startTime: "2026-10-11T08:30:00",
      endTime: "2026-10-11T09:30:00",
      title: "Delegate Check-in, Kit Distribution & Morning Refreshments",
      track: "Registration",
      venue: "Main Atrium & Helpdesk",
      description: "Registration badge scanning, welcome gift kit collection, and badge printing.",
      tags: ["Check-in", "Welcome"]
    },
    {
      id: "sch-2",
      day: 1,
      dateStr: "Sunday, Oct 11, 2026",
      time: "09:30 AM - 10:30 AM",
      startTime: "2026-10-11T09:30:00",
      endTime: "2026-10-11T10:30:00",
      title: "Grand Inaugural Ceremony & Dignitaries Address",
      speaker: {
        name: "Dr. V. Vijaya Kumar Reddy & Patrons",
        role: "Director, NBKRIST",
        org: "NBKRIST & IEEE Hyderabad Section",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
      },
      track: "Inauguration",
      venue: "Main Auditorium",
      description: "Lighting of the lamp, presidential address by Director & Principal, and official flag-off of NEXUSVERSE-2K26.",
      tags: ["Keynote", "Inauguration"]
    },
    {
      id: "sch-3",
      day: 1,
      dateStr: "Sunday, Oct 11, 2026",
      time: "10:30 AM - 01:30 PM",
      startTime: "2026-10-11T10:30:00",
      endTime: "2026-10-11T13:30:00",
      title: "Flag Hunt CTF & Clever Coding (Round 1)",
      speaker: {
        name: "R. Dinesh & Technical Leads",
        role: "Event Co-ordinator",
        org: "IEEE Student Branch NBKRIST",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
      },
      track: "Flag Hunt CTF & Clever Coding",
      venue: "Computer Labs 1 & 2 (CSE Block)",
      description: "Simultaneous battle of cyber exploit quests, binary forensics, and speed algorithmic programming sprints.",
      tags: ["Flag Hunt CTF", "Clever Coding", "Live Arena"]
    },
    {
      id: "sch-4",
      day: 1,
      dateStr: "Sunday, Oct 11, 2026",
      time: "11:00 AM - 02:00 PM",
      startTime: "2026-10-11T11:00:00",
      endTime: "2026-10-11T14:00:00",
      title: "Techpreneurs / Project Expo — Model Exhibition & Jury Evaluation",
      speaker: {
        name: "Jury Panel & Evaluators",
        role: "Faculty & Industry Experts",
        org: "NBKRIST & IEEE R10",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80"
      },
      track: "Techpreneurs",
      venue: "Main Convention Center Exhibition Hall",
      description: "Exhibition stalls for hardware prototypes, IoT circuits, and software startup models reviewed by judges.",
      tags: ["Techpreneurs", "Project Expo", "Hardware/Software"]
    },
    {
      id: "sch-5",
      day: 1,
      dateStr: "Sunday, Oct 11, 2026",
      time: "02:00 PM - 03:30 PM",
      startTime: "2026-10-11T14:00:00",
      endTime: "2026-10-11T15:30:00",
      title: "Bugmania — Code Debugging & Forensics Championship",
      speaker: {
        name: "S. Nandini & Technical Committee",
        role: "Event Co-ordinator",
        org: "IEEE Student Branch",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80"
      },
      track: "Bugmania",
      venue: "Software Engineering Lab",
      description: "Intense code forensics round: Eliminate memory leaks, syntax bugs, and runtime anomalies under clock pressure.",
      tags: ["Bugmania", "Debugging", "Code Forensics"]
    },
    {
      id: "sch-6",
      day: 1,
      dateStr: "Sunday, Oct 11, 2026",
      time: "02:30 PM - 04:30 PM",
      startTime: "2026-10-11T14:30:00",
      endTime: "2026-10-11T16:30:00",
      title: "Canva Clash — UI/UX & Graphic Design Sprint",
      speaker: {
        name: "Md. Umar & Creative Leads",
        role: "Design Co-ordinator",
        org: "IEEE Media Cell",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80"
      },
      track: "Canva Clash",
      venue: "Multimedia Design Studio",
      description: "Live visual showdown: UI screens, tech posters, and branding assets designed based on surprise briefs.",
      tags: ["Canva Clash", "UI/UX", "Graphic Design"]
    },
    {
      id: "sch-7",
      day: 1,
      dateStr: "Sunday, Oct 11, 2026",
      time: "04:45 PM - 06:00 PM",
      startTime: "2026-10-11T16:45:00",
      endTime: "2026-10-11T18:00:00",
      title: "Grand Valedictory Ceremony & Prize Distribution",
      track: "Awards",
      venue: "Main Auditorium",
      description: "Prize distribution for Clever Coding, Canvaclash, Bugmania, Flaghunt - CTF, and Techpreneurs winners, followed by High Tea.",
      tags: ["Valedictory", "Awards", "Prizes"]
    }
  ] as ScheduleItem[],

  team: [
    {
      id: "t-1",
      name: "Dr. V. Vijaya Kumar Reddy",
      role: "Director, NBKRIST",
      category: "Faculty",
      designation: "Chief Patron & Director, N.B.K.R.I.S.T.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "t-2",
      name: "Dr. M. Sreenivasulu",
      role: "Principal I/C, NBKRIST",
      category: "Faculty",
      designation: "Patron & Principal I/C, N.B.K.R.I.S.T.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "t-3",
      name: "Dr. G. Harinath Reddy",
      role: "Dean, Student Affairs",
      category: "Faculty",
      designation: "Dean of Student Affairs, N.B.K.R.I.S.T.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "t-4",
      name: "Dr. S. Suresh",
      role: "IEEE SB Counselor",
      category: "Faculty",
      designation: "Branch Counselor, IEEE Student Branch NBKRIST",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "t-5",
      name: "R. Dinesh",
      role: "Student Co-ordinator",
      category: "Core",
      designation: "Contact: +91 63001 58172",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "t-6",
      name: "S. Nandini",
      role: "Student Co-ordinator",
      category: "Core",
      designation: "Contact: +91 91216 68985",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "t-7",
      name: "Md. Umar",
      role: "Student Co-ordinator",
      category: "Core",
      designation: "Contact: +91 93471 91353",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "t-8",
      name: "Katta Guravaiah",
      role: "Lead Convenor & Branch Chair",
      category: "Tech & Web",
      designation: "Final Year B.Tech CSE • Lead Developer",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
      github: "https://github.com/guru2005-z",
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
      answer: "Yes! Complimentary sanitized hostel accommodation with bedding is provided for outstation delegates inside the green NBKRIST campus from Oct 10 evening to Oct 11 evening. Separate hostels are allotted for boys and girls with 24/7 security.",
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
    date: "Oct 11, 2026",
    time: "10:00 AM - 04:00 PM",
    venue: "Cyber Defense Arena, Hall A, NBKRIST",
    mode: "In-Person",
    poster: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    description: "Battle through Jeopardy-style cybersecurity hurdles spanning binary exploitation, web security, steganography, cryptographic ciphers, and digital forensics to hunt flags.",
    highlights: ["Live Dynamic Scoreboard", "Exciting Cash Prizes", "Offensive Security Certificates"],
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
    date: "Oct 11, 2026",
    time: "09:30 AM - 04:30 PM",
    venue: "Main Convention Center Exhibition Hall, NBKRIST",
    mode: "In-Person",
    poster: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
    description: "Display working hardware prototypes, IoT systems, AI products, and innovative research models to top industry evaluators, angel investors, and IEEE section leaders.",
    highlights: ["Exciting Cash Prizes", "Incubation Fast-Track", "Direct Investor Evaluation"],
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
    date: "Oct 11, 2026",
    time: "11:00 AM - 02:00 PM",
    venue: "High Performance Computing Lab, CSE Block",
    mode: "In-Person",
    poster: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80",
    description: "A fast-paced contest testing raw algorithmic prowess, dynamic programming, graph algorithms, and optimal data structure manipulation within tight execution limits.",
    highlights: ["LeetCode / Codeforces Style", "Exciting Cash Prizes", "Speed Coding Trophy"],
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
    date: "Oct 11, 2026",
    time: "10:00 AM - 01:00 PM",
    venue: "Software Engineering Lab 3, NBKRIST",
    mode: "In-Person",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    description: "Hunt down memory corruptions, race conditions, logical traps, and runtime crashes across Python, C++, and JavaScript codebases under timed rounds.",
    highlights: ["Multi-language Challenges", "Exciting Cash Prizes", "Bug Bounty Medals"],
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
    date: "Oct 11, 2026",
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

