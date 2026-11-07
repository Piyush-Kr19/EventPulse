/**
 * EventPulse - Comprehensive Events Dataset
 * Contains curated events across multiple disciplines with rich metadata
 */

const INITIAL_EVENTS = [
  {
    id: 'ev-tech-summit-2026',
    title: 'India AI & Cloud Innovation Summit',
    category: 'tech',
    categoryLabel: 'Technology & AI',
    tagline: 'Explore the next wave of generative AI, neural computing, and cloud architectures.',
    date: 'Nov 24, 2026',
    isoDate: '2026-11-24T09:00:00',
    time: '09:00 AM - 05:30 PM IST',
    venue: 'Bengaluru International Exhibition Centre, Bengaluru, Karnataka',
    locationShort: 'Bengaluru, KA',
    format: 'Hybrid',
    price: 1499,
    priceDisplay: '\u20B91,499',
    featured: true,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    description: `The India AI & Cloud Innovation Summit brings together over 2,500 industry pioneers, machine learning researchers, and enterprise tech leaders. This year's summit focuses on production-grade autonomous agents, sustainable cloud infrastructure, and ethical frontier models.\n\nAttendees will gain firsthand insights from architects behind high-scale AI systems, participate in interactive break-out workshops, and explore transformative real-world enterprise applications.`,
    highlights: [
      'Over 40 technical keynotes and fireside chats',
      'Hands-on interactive lab sessions with cloud GPUs',
      'Executive networking lounge and VIP dinner access',
      'Official verified Certificate of Participation',
      'Access to on-demand video recordings for 1 full year'
    ],
    agenda: [
      { time: '09:00 AM', title: 'Opening Keynote: The Dawn of Autonomous Software Agents', speaker: 'Dr. Ananya Iyer' },
      { time: '11:00 AM', title: 'Deep Dive: Low-Latency Inference at Edge Scale', speaker: 'Rohan Mehta' },
      { time: '01:00 PM', title: 'Curated Networking Luncheon & Partner Showcase', speaker: 'All Attendees' },
      { time: '02:30 PM', title: 'Panel: Ethics, Safety & Governance in Frontier AI', speaker: 'Panel of Experts' },
      { time: '04:30 PM', title: 'Closing Keynote & Startup Pitch Grand Finale', speaker: 'Arjun Kapoor' }
    ],
    speakers: [
      {
        name: 'Dr. Ananya Iyer',
        role: 'Chief AI Scientist',
        company: 'Synthetix Labs',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
      },
      {
        name: 'Rohan Mehta',
        role: 'Distinguished Cloud Architect',
        company: 'HyperScale Cloud',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      },
      {
        name: 'Priya Nair',
        role: 'Head of Open Source AI',
        company: 'NeuralFront',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'
      }
    ],
    totalSeats: 350,
    registeredSeats: 295,
    ticketTiers: [
      { id: 'standard', name: 'General Admission', price: 1499, desc: 'Full day access + lunch & recordings' },
      { id: 'vip', name: 'VIP Executive Pass', price: 3999, desc: 'VIP seating, speaker dinner & 1-on-1 mentor sessions' },
      { id: 'student', name: 'Student Academic Pass', price: 499, desc: 'Valid student ID required at badge pickup' }
    ]
  },
  {
    id: 'ev-indie-music-fest',
    title: 'Neon Horizon Music & Arts Festival',
    category: 'music',
    categoryLabel: 'Music & Festivals',
    tagline: 'An unforgettable three-stage weekend of indie electro, synthwave, and live visual art.',
    date: 'Dec 05, 2026',
    isoDate: '2026-12-05T16:00:00',
    time: '04:00 PM - 01:00 AM IST',
    venue: 'Vagator Beachfront Arena, Goa',
    locationShort: 'Goa',
    format: 'In-Person',
    price: 1299,
    priceDisplay: '\u20B91,299',
    featured: true,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    description: `Get ready for an electric night of pulse-pounding rhythm, immersive spatial light installations, and sonic innovation. Neon Horizon brings together 24 groundbreaking indie electronic bands, ambient producers, and projection-mapping visual artists.\n\nEnjoy gourmet food trucks, artisan craft markets, acoustic relaxation domes, and unforgettable mainstage headline acts under the starry Goan skies.`,
    highlights: [
      'Three immersive stages with 360-degree surround sound',
      'Over 20 live performances from Indian and international indie creators',
      'Interactive holographic art garden and light mazes',
      'Craft beer garden and regional culinary street vendors',
      'Free commemorative festival wristband & digital poster NFT'
    ],
    agenda: [
      { time: '04:00 PM', title: 'Gates Open & Ambient Sunsets DJ Set', speaker: 'DJ Solara' },
      { time: '06:00 PM', title: 'Stage 2 Live: Indie Synthwave Showcase', speaker: 'The Echo Drift' },
      { time: '08:30 PM', title: 'Mainstage Spectacle & Laser Mapping Symphony', speaker: 'Cosmic Pulse' },
      { time: '11:00 PM', title: 'Late Night Electro Dance Party', speaker: 'Vespera Live' }
    ],
    speakers: [
      {
        name: 'Aarohi Sen',
        role: 'Lead Vocalist & Producer',
        company: 'Vespera Live',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      },
      {
        name: 'Kabir Malhotra',
        role: 'Visual Stage Director',
        company: 'Luminary Arts',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
      }
    ],
    totalSeats: 1200,
    registeredSeats: 1045,
    ticketTiers: [
      { id: 'ga', name: 'General Weekend Pass', price: 1299, desc: 'All-stage access + reusable festival cup' },
      { id: 'vip', name: 'VIP Stage-Front Access', price: 2999, desc: 'Dedicated bar, express entry, VIP viewing deck' }
    ]
  },
  {
    id: 'ev-ux-design-con',
    title: 'DesignCraft: Modern UX & Product Design Conference',
    category: 'design',
    categoryLabel: 'Art & Design',
    tagline: 'Mastering spatial computing, design systems, and delightful human-centric interfaces.',
    date: 'Dec 12, 2026',
    isoDate: '2026-12-12T10:00:00',
    time: '10:00 AM - 06:00 PM IST',
    venue: 'Jio World Convention Centre, Mumbai, Maharashtra',
    locationShort: 'Mumbai, MH',
    format: 'Hybrid',
    price: 999,
    priceDisplay: '\u20B9999',
    featured: false,
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
    description: `DesignCraft 2026 is the premier annual gathering for UX designers, product strategists, and creative technologists. Explore how design is evolving with conversational UIs, adaptive interfaces, and unified design token architectures.\n\nWhether you are scaling design systems across thousands of components or crafting tactile micro-interactions, DesignCraft delivers practical frameworks you can implement immediately.`,
    highlights: [
      '15 design system teardowns from top tech platforms',
      'Figma & prototyping masterclass breakout tracks',
      'Portfolio review sessions with Design Directors',
      'UI asset kit bundle included with registration'
    ],
    agenda: [
      { time: '10:00 AM', title: 'The Anatomy of Scalable Design Tokens', speaker: 'Maya Patel' },
      { time: '11:45 AM', title: 'Designing for Voice, Spatial & Multi-Modal Inputs', speaker: 'Siddharth Rao' },
      { time: '02:00 PM', title: 'Interactive Portfolio Lab & Critique', speaker: 'Design Leads' },
      { time: '04:15 PM', title: 'Micro-Interactions that Drive Product Love', speaker: 'Neha Kulkarni' }
    ],
    speakers: [
      {
        name: 'Maya Patel',
        role: 'Design Systems Lead',
        company: 'Figma Community Partner',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
      },
      {
        name: 'Siddharth Rao',
        role: 'Spatial Design Director',
        company: 'Holosphere Studios',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
      }
    ],
    totalSeats: 250,
    registeredSeats: 198,
    ticketTiers: [
      { id: 'standard', name: 'Full Conference Ticket', price: 999, desc: 'All live sessions, workshops, and digital assets' },
      { id: 'virtual', name: 'Virtual Stream Pass', price: 499, desc: 'High-definition live stream + replay archive' }
    ]
  },
  {
    id: 'ev-startup-venture-pitch',
    title: 'VentureScale: Seed-to-Series A Startup Expo',
    category: 'business',
    categoryLabel: 'Business & Startups',
    tagline: 'Connect with over 150 accredited angel investors and visionary founders building the future.',
    date: 'Dec 18, 2026',
    isoDate: '2026-12-18T08:30:00',
    time: '08:30 AM - 06:30 PM IST',
    venue: 'Bharat Mandapam, New Delhi',
    locationShort: 'New Delhi, DL',
    format: 'In-Person',
    price: 1999,
    priceDisplay: '\u20B91,999',
    featured: false,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
    description: `VentureScale 2026 convenes high-growth startups, venture capitalists, and industry strategists under one roof. The day features rapid-fire pitch competitions, VC matchmaking speed dates, and tactical masterclasses on unit economics, fundraising, and go-to-market acceleration.\n\nOver \u20B950 lakh in non-dilutive grant prizes will be awarded live on stage during the evening Investor Showcase.`,
    highlights: [
      '50 curated early-stage demo booths',
      '1-on-1 curated meetings with venture partners',
      'Live pitch battle with immediate panel feedback',
      'Startup legal & valuation toolkit download package'
    ],
    agenda: [
      { time: '08:30 AM', title: 'Founder Breakfast & Investor Check-in', speaker: 'Opening Host' },
      { time: '10:00 AM', title: 'Fundraising in Uncertain Markets: Key Metrics', speaker: 'Meera Krishnan' },
      { time: '01:30 PM', title: 'Top 10 Finalists Live Demo & Pitch Battle', speaker: 'Pitch Finalists' },
      { time: '05:00 PM', title: 'Award Ceremony & Networking Cocktail Hour', speaker: 'Lead Partners' }
    ],
    speakers: [
      {
        name: 'Meera Krishnan',
        role: 'General Partner',
        company: 'Apex Ventures',
        avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80'
      },
      {
        name: 'Vikram Sethi',
        role: 'Serial Founder & Angel',
        company: 'Vance Capital',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80'
      }
    ],
    totalSeats: 400,
    registeredSeats: 340,
    ticketTiers: [
      { id: 'founder', name: 'Founder Pass', price: 1999, desc: 'Includes investor lounge access & pitch directory entry' },
      { id: 'attendee', name: 'General Attendee', price: 999, desc: 'Expo floor, all open sessions, and networking hall' }
    ]
  },
  {
    id: 'ev-web-dev-bootcamp',
    title: 'Full-Stack Modern Web & React Workshop',
    category: 'workshop',
    categoryLabel: 'Workshops & Education',
    tagline: 'Master Next.js, TypeScript, Tailwind CSS, and Serverless Microservices in 8 intensive hours.',
    date: 'Dec 22, 2026',
    isoDate: '2026-12-22T09:30:00',
    time: '09:30 AM - 05:30 PM IST',
    venue: 'Online Interactive Campus (Live Zoom + Discord)',
    locationShort: 'Virtual / Online',
    format: 'Virtual',
    price: 0,
    priceDisplay: 'Free',
    featured: false,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    description: `Level up your full-stack development skills in this intensive, code-along masterclass. We will build, test, and deploy a production-ready web application from scratch with modern state management, real-time WebSockets, and zero-downtime serverless architecture.\n\nIdeal for frontend developers seeking to conquer full-stack workflows and backend engineers looking to streamline modern UI design.`,
    highlights: [
      'Interactive live coding with instant instructor Q&A',
      'Exclusive GitHub starter repo with clean boilerplate',
      'Discord community study hall with TA support',
      'Completely free of charge with certified completion badge'
    ],
    agenda: [
      { time: '09:30 AM', title: 'Architecture Setup: TypeScript, Next.js & Tailwind CSS', speaker: 'Karthik Subramanian' },
      { time: '11:30 AM', title: 'Database & ORM Integration with Edge Functions', speaker: 'Karthik Subramanian' },
      { time: '02:00 PM', title: 'Authentication, Security, and State Synchronization', speaker: 'Karthik Subramanian' },
      { time: '04:00 PM', title: 'Deployment, CI/CD Pipeline & Performance Auditing', speaker: 'Karthik Subramanian' }
    ],
    speakers: [
      {
        name: 'Karthik Subramanian',
        role: 'Senior Staff Engineer & Educator',
        company: 'CodeVelocity',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80'
      }
    ],
    totalSeats: 800,
    registeredSeats: 712,
    ticketTiers: [
      { id: 'free-pass', name: 'Free Student & Community Pass', price: 0, desc: 'Live stream access, GitHub repo, Discord server' },
      { id: 'supporter', name: 'Supporter Tier + 1-on-1 Code Review', price: 499, desc: 'Personalized 30-min architecture review session' }
    ]
  },
  {
    id: 'ev-mindfulness-wellness-retreat',
    title: 'Mind & Body: Holistic Wellness & Yoga Summit',
    category: 'health',
    categoryLabel: 'Health & Fitness',
    tagline: 'Recharge your energy, cultivate mindfulness, and learn restorative movement practices.',
    date: 'Jan 09, 2027',
    isoDate: '2027-01-09T08:00:00',
    time: '08:00 AM - 04:00 PM IST',
    venue: 'Ganga Valley Yoga Sanctuary, Rishikesh, Uttarakhand',
    locationShort: 'Rishikesh, UK',
    format: 'In-Person',
    price: 799,
    priceDisplay: '\u20B9799',
    featured: false,
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    description: `Escape the digital hustle and immerse yourself in a restorative retreat dedicated to mental clarity and physical vitality. Featuring sunrise sound-bath meditations, breathwork masterclasses, plant-powered nutrition workshops, and vinyasa flows led by master practitioners.\n\nDesigned for all experience levels, from beginners looking for stress relief to dedicated wellness enthusiasts.`,
    highlights: [
      'Sunrise outdoor sound meditation with crystal singing bowls',
      'Guided breathwork for nervous system regulation',
      'Organic farm-to-table lunch & botanical smoothie bar',
      'Eco-friendly yoga mat and aromatherapy kit gift'
    ],
    agenda: [
      { time: '08:00 AM', title: 'Sunrise Sound Bath & Grounding Meditation', speaker: 'Maya Ananda' },
      { time: '10:00 AM', title: 'Vinyasa Flow: Aligning Breath and Motion', speaker: 'Aditya Joshi' },
      { time: '12:30 PM', title: 'Nutritional Medicine: Fueling Energy Naturally', speaker: 'Dr. Kavita Deshmukh' },
      { time: '02:30 PM', title: 'Restorative Yin Yoga & Closing Circle', speaker: 'Maya Ananda' }
    ],
    speakers: [
      {
        name: 'Maya Ananda',
        role: 'Mindfulness & Sound Practitioner',
        company: 'Sanctuary Breath',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      },
      {
        name: 'Aditya Joshi',
        role: 'Mobility Coach & Kinesiologist',
        company: 'VitalMotion',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80'
      }
    ],
    totalSeats: 150,
    registeredSeats: 122,
    ticketTiers: [
      { id: 'retreat-pass', name: 'General Retreat Pass', price: 799, desc: 'Includes classes, organic lunch & yoga mat gift' },
      { id: 'vip-healing', name: 'VIP Holistic Wellness Pass', price: 1999, desc: 'Adds 45-min private sound therapy session' }
    ]
  },
  {
    id: 'ev-cyber-security-con',
    title: 'CyberShield: Threat Intelligence & Zero-Trust Expo',
    category: 'tech',
    categoryLabel: 'Technology & AI',
    tagline: 'Defending critical digital infrastructure against modern zero-day attacks and ransomware.',
    date: 'Jan 16, 2027',
    isoDate: '2027-01-16T09:00:00',
    time: '09:00 AM - 05:00 PM IST',
    venue: 'HITEX Exhibition Centre, Hyderabad, Telangana',
    locationShort: 'Hyderabad, TS',
    format: 'Hybrid',
    price: 1499,
    priceDisplay: '\u20B91,499',
    featured: false,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    description: `CyberShield 2027 delivers hard-hitting technical briefings, live capture-the-flag competitions, and offensive security analysis from top penetration testers and cyber defense directors.\n\nDiscover how organizations are transitioning from legacy perimeter models to cryptographic zero-trust architectures and automated response workflows.`,
    highlights: [
      'Live Blue Team vs Red Team simulation arena',
      'Deep dive into firmware vulnerabilities and supply chain security',
      'Exclusive threat intelligence reports distributed to attendees',
      'CPE Continuing Education Credits accreditation'
    ],
    agenda: [
      { time: '09:00 AM', title: 'Zero-Trust Architecture: Real-World Lessons', speaker: 'Imran Sheikh' },
      { time: '11:15 AM', title: 'Deconstructing Advanced Persistent Threats (APTs)', speaker: 'Ishita Banerjee' },
      { time: '02:00 PM', title: 'Live Capture The Flag (CTF) Tournament', speaker: 'CTF Organizers' },
      { time: '04:15 PM', title: 'Future of Post-Quantum Cryptography', speaker: 'Dr. Suresh Pillai' }
    ],
    speakers: [
      {
        name: 'Imran Sheikh',
        role: 'Chief Information Security Officer',
        company: 'SentinelDefend',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
      },
      {
        name: 'Ishita Banerjee',
        role: 'Principal Security Researcher',
        company: 'RedVector Labs',
        avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80'
      }
    ],
    totalSeats: 300,
    registeredSeats: 260,
    ticketTiers: [
      { id: 'standard', name: 'Technical Pass', price: 1499, desc: 'Access to keynotes, CTF viewing, and security briefs' },
      { id: 'ctf-competitor', name: 'CTF Competitor Pass', price: 2499, desc: 'Includes official player seat in live CTF tournament' }
    ]
  },
  {
    id: 'ev-film-photo-festival',
    title: 'Cinematic Visions: Independent Film & Photography Showcase',
    category: 'design',
    categoryLabel: 'Art & Design',
    tagline: 'Celebrating visionary storytelling, documentary shorts, and cutting-edge visual aesthetics.',
    date: 'Jan 23, 2027',
    isoDate: '2027-01-23T14:00:00',
    time: '02:00 PM - 10:00 PM IST',
    venue: 'Nandan Arts Pavilion, Kolkata, West Bengal',
    locationShort: 'Kolkata, WB',
    format: 'In-Person',
    price: 599,
    priceDisplay: '\u20B9599',
    featured: false,
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    description: `Cinematic Visions showcases bold, evocative independent cinema and documentary photography from emerging voices from across India. Featuring screenings of 18 juried short films, director Q&A panels, cinematography lighting masterclasses, and an open gallery reception.\n\nExperience visual storytelling at its most visceral, poetic, and thought-provoking.`,
    highlights: [
      'Screening of 18 juried Indian independent films',
      'Color grading and cinema camera hands-on gear showcase',
      'Networking cocktail reception with producers and indie filmmakers',
      'Juried Audience Choice Award ceremony'
    ],
    agenda: [
      { time: '02:00 PM', title: 'Gallery Doors Open & Photography Exhibition', speaker: 'Curator Tour' },
      { time: '03:30 PM', title: 'Block A: Short Narrative & Documentary Screenings', speaker: 'Film Program' },
      { time: '06:30 PM', title: 'Panel: The Art of Indie Lighting & Framing', speaker: 'Cinematographers' },
      { time: '08:30 PM', title: 'Block B: Experimental Visuals & Awards Ceremony', speaker: 'Jury Panel' }
    ],
    speakers: [
      {
        name: 'Tanvi Bhatt',
        role: 'Award-Winning Cinematographer',
        company: 'Lumiere Studios',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
      },
      {
        name: 'Anurag Ghosh',
        role: 'Documentary Director',
        company: 'Vanguard Media',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
      }
    ],
    totalSeats: 350,
    registeredSeats: 280,
    ticketTiers: [
      { id: 'film-screening', name: 'General Screening Pass', price: 599, desc: 'Access to all film blocks & photo gallery' },
      { id: 'all-access', name: 'VIP All-Access & Reception', price: 1299, desc: 'Includes VIP reception with open bar & directors gift bag' }
    ]
  }
];

// Helper to get all categories
const CATEGORIES = [
  { id: 'all', label: 'All Events', icon: 'sparkles' },
  { id: 'tech', label: 'Technology & AI', icon: 'cpu' },
  { id: 'music', label: 'Music & Festivals', icon: 'music' },
  { id: 'business', label: 'Business & Startups', icon: 'briefcase' },
  { id: 'design', label: 'Art & Design', icon: 'palette' },
  { id: 'workshop', label: 'Workshops', icon: 'book' },
  { id: 'health', label: 'Health & Fitness', icon: 'activity' }
];