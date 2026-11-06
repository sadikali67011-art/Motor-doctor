import { ServicePlan, ReviewCase, CommonScam, MechanicDoctor } from "@/types";

export const SERVICE_PLANS: ServicePlan[] = [
  {
    id: "quick-review",
    name: "Quick Review",
    price: 499,
    originalPrice: 999,
    turnaroundTime: "Within 20-30 Mins",
    description: "WhatsApp-based instant audit of your garage estimate or job card.",
    features: [
      "Item-by-item line breakdown (Approve / Reject / Negotiate)",
      "Flagging of unnecessary add-ons & duplicate labor charges",
      "Exact OEM spare parts fair price comparison",
      "WhatsApp summary report to share with service advisor",
      "Guaranteed response within 30 minutes while at garage"
    ],
    bestFor: "Owners waiting at dealership needing fast decision before approving job card"
  },
  {
    id: "expert-call",
    name: "Expert 1-on-1 Call",
    price: 999,
    originalPrice: 1999,
    turnaroundTime: "Scheduled in 15 Mins",
    popular: true,
    badge: "Most Popular",
    description: "20-minute direct Phone / Video consultation with Senior Master Automobile Engineer.",
    features: [
      "Everything in Quick Review plan included",
      "20-minute detailed 1-on-1 call with Senior Automotive Engineer",
      "Discussion of actual symptoms, noises & driving problems",
      "Strategic advice on which repairs can wait vs safety-critical ones",
      "Tips to negotiate parts discount and labor waiver",
      "Follow-up check when you receive final invoice"
    ],
    bestFor: "Major services (30k, 50k, 80k km) or suspected clutch/suspension/engine work"
  },
  {
    id: "full-advisory",
    name: "Full Garage Advisory & Shield",
    price: 1499,
    originalPrice: 2999,
    turnaroundTime: "Live Active Support",
    badge: "100% Peace of Mind",
    description: "Complete hands-off protection: Our expert speaks directly with your service advisor.",
    features: [
      "Everything in Expert Call included",
      "Direct 3-way conference call with your Service Center Advisor",
      "Our senior technician questions technical necessity & labor hours",
      "Eliminates aggressive upselling and bogus diagnostic fees",
      "Live bill verification before you swipe your card",
      "Free 30-day follow up warranty assistance"
    ],
    bestFor: "Big repair quotes (₹15,000+), major engine/gearbox/suspension overhauls"
  }
];

export const COMMON_SCAMS: CommonScam[] = [
  {
    title: "Engine Flush / Oil Treatment Additives",
    quotedPrice: "₹1,200 – ₹2,500",
    verdict: "Almost Always BOGUS",
    whyItsPushed: "Huge dealer profit margin (70%+). Modern synthetic oils already contain heavy detergent additives.",
    whatYouShouldDo: "Firmly strike it out. Manufacturers like Maruti, Hyundai and Honda specifically advise against unauthorized chemical flushes.",
    dealerExcuse: "'Sir, engine ke andar carbon jama ho gaya hai, flush nahi karoge toh engine seize ho sakta hai.'",
    iconName: "Droplets"
  },
  {
    title: "AC Evaporator Foam & Disinfection Bomb",
    quotedPrice: "₹1,500 – ₹2,800",
    verdict: "UNNECESSARY UPSELL",
    whyItsPushed: "Costs the workshop barely ₹150 for a spray can, billed at 10x. Doesn't clean clogged filters.",
    whatYouShouldDo: "Replace only the PM 2.5 Cabin Air Filter (₹350-₹500). If AC cooling is low, check gas pressure or clean radiator condenser.",
    dealerExcuse: "'Bacteria kill hoga sir, monsoon mein bad smell aati hai.'",
    iconName: "Wind"
  },
  {
    title: "Brake Disc Skimming / Caliper Greasing",
    quotedPrice: "₹1,800 – ₹3,500",
    verdict: "OVERBILLED / PREMATURE",
    whyItsPushed: "Labor-heavy item with almost zero parts cost. Done without measuring brake rotor minimum thickness with micrometer.",
    whatYouShouldDo: "If the steering doesn't judder during 80-0 km/h braking, disc skimming is unnecessary. Caliper pin lube takes 2 mins and shouldn't cost ₹800.",
    dealerExcuse: "'Brake pads change ke sath disc turning mandatory hoti hai sir.'",
    iconName: "Disc"
  },
  {
    title: "Throttle Body & Injector Cleaning",
    quotedPrice: "₹1,600 – ₹3,000",
    verdict: "RARELY NEEDED BEFORE 60K KM",
    whyItsPushed: "Advisors add it to every 20k or 30k periodic service blindly.",
    whatYouShouldDo: "Only needed if car has erratic idling RPM, rough pickup, or misfiring. Otherwise fuel detergents in normal fuel are sufficient.",
    dealerExcuse: "'Mileage badh jayega sir 2-3 kmpl extra milegi.'",
    iconName: "Gauge"
  },
  {
    title: "Silencer Coating & Underbody Rust Spray",
    quotedPrice: "₹2,500 – ₹5,500",
    verdict: "GIMMICK UPSELL",
    whyItsPushed: "High dealer commission. High-temp paint burns off within 3 months in Indian driving conditions.",
    whatYouShouldDo: "Modern car silencers are made of aluminized stainless steel and rust from the inside out due to acidic condensation, not outside splash.",
    dealerExcuse: "'Exhaust pipe gal jayega monsoon mein rust lagne se.'",
    iconName: "ShieldAlert"
  },
  {
    title: "Battery Terminal Spray & Premium Distilled Water",
    quotedPrice: "₹450 – ₹950",
    verdict: "RIDICULOUS OVERCHARGE",
    whyItsPushed: "Zero-effort addition to pad the invoice total.",
    whatYouShouldDo: "Simple petroleum jelly (Vaseline) costs ₹20. Most modern batteries are sealed maintenance-free (MF) anyway.",
    dealerExcuse: "'Special anti-corrosion blue gel for terminal protection.'",
    iconName: "Zap"
  }
];

export const REAL_CASE_STUDIES: ReviewCase[] = [
  {
    id: "case-creta",
    carModel: "Hyundai Creta 1.5 CRDi",
    year: "2021",
    location: "Noida / Delhi NCR",
    serviceType: "40,000 KM Major Service",
    originalBill: 26850,
    finalPaidBill: 12400,
    totalSaved: 14450,
    bogusItemsRemoved: [
      "Engine Decarbonizing (₹3,800)",
      "Brake Rotor Lathe Skimming (₹2,200)",
      "AC Evaporator Sanitizer (₹1,650)",
      "Synthetic Transmission Fluid Flush (Premature) (₹3,400)",
      "Unnecessary Steering Rack Boot (₹3,400)"
    ],
    customerFeedback: "The Hyundai service advisor gave me a scary estimate of ₹26,850. Motor Doctor reviewed the bill in 18 minutes on WhatsApp and told me what was genuine vs made up. Saved ₹14,450 directly on the counter!",
    ownerName: "Vikas Malhotra",
    rating: 5
  },
  {
    id: "case-nexon",
    carModel: "Tata Nexon XZ+ Petrol",
    year: "2020",
    location: "Bengaluru, Karnataka",
    serviceType: "Suspension & Clutch Complaint",
    originalBill: 41200,
    finalPaidBill: 14800,
    totalSaved: 26400,
    bogusItemsRemoved: [
      "Complete Clutch Assembly Replacement (₹18,500)",
      "Flywheel Resurfacing (₹3,500)",
      "Front Strut Replacement (False Alarm) (₹4,400)"
    ],
    customerFeedback: "Tata workshop claimed my clutch was totally burnt and struts were leaking. Motor Doctor had a 15 min video call, checked my clutch pedal play and leak photos. Turns out it was just a loose stabilizer link and clutch bleeding needed! Saved ₹26,400!",
    ownerName: "Arun Swaminathan",
    rating: 5
  },
  {
    id: "case-baleno",
    carModel: "Maruti Suzuki Baleno Alpha",
    year: "2022",
    location: "Mumbai, Maharashtra",
    serviceType: "30,000 KM Periodic Maintenance",
    originalBill: 15400,
    finalPaidBill: 6150,
    totalSaved: 9250,
    bogusItemsRemoved: [
      "Engine Flush (₹1,450)",
      "Caliper Greasing (₹850)",
      "Underchassis Anti-Rust (₹2,800)",
      "Throttle Body Spray (₹1,650)",
      "Windshield Washer Tablets & Additives (₹500)",
      "Wheel Alignment (Done just 2k km ago) (₹2,000)"
    ],
    customerFeedback: "Authorized Maruti service center handed me a bill of ₹15,400 for a simple 30k service. Motor Doctor's item checklist gave me the confidence to say NO to 6 bogus line items. Genuine bill was only ₹6,150!",
    ownerName: "Prateek Deshmukh",
    rating: 5
  },
  {
    id: "case-city",
    carModel: "Honda City 5th Gen ZX",
    year: "2019",
    location: "Pune, Maharashtra",
    serviceType: "Brake & AC Service",
    originalBill: 33500,
    finalPaidBill: 16200,
    totalSaved: 17300,
    bogusItemsRemoved: [
      "Both Front Brake Rotors Replacement (₹9,800)",
      "AC Condenser Replacement Quote (₹7,500 - was just dust clogging)"
    ],
    customerFeedback: "They wanted to replace both brake discs and condenser claiming failure. Motor Doctor inspected the micrometer measurement and told me discs still had 4mm above minimum threshold. Cleaned condenser externally for ₹400 and AC chilled like new!",
    ownerName: "Rajesh Kulkarni",
    rating: 5
  }
];

export const EXPERT_MECHANICS: MechanicDoctor[] = [
  {
    name: "Sunil Verma",
    title: "Chief Technical Auditor",
    experience: "19+ Years Experience",
    specialization: "Engine Diagnostics, Drivetrain & Automatic Transmissions (DCT/CVT/TC)",
    pastCompany: "Ex-Master Tech Maruti Suzuki Arena & Nexa / Bosch Certified",
    verifiedBadge: "Master Automobile Engineer",
    carsInspected: 4200,
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=250&auto=format&fit=crop&q=80"
  },
  {
    name: "Gurpreet Singh",
    title: "Senior Workshop & Warranty Specialist",
    experience: "16+ Years Experience",
    specialization: "Hyundai, Kia & Tata Common Rail Diesels & Turbo Petrols",
    pastCompany: "Ex-Senior Technical Service Manager Hyundai India",
    verifiedBadge: "OEM Certified Master Trainer",
    carsInspected: 3600,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80"
  },
  {
    name: "Dr. Farhan Shaikh",
    title: "German & Premium Car Advisor",
    experience: "14+ Years Experience",
    specialization: "VAG Group (VW/Skoda), Honda, Toyota & Mahindra M-Hawk Engines",
    pastCompany: "Ex-Workshop Head Skoda & Toyota Certified Master Specialist",
    verifiedBadge: "Automotive Systems Expert",
    carsInspected: 2900,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&auto=format&fit=crop&q=80"
  }
];

export const POPULAR_CAR_BRANDS = [
  { name: "Maruti Suzuki", models: ["Swift", "Baleno", "Brezza", "Dzire", "Ertiga", "Grand Vitara", "WagonR", "Fronx", "Ciaz", "Alto"] },
  { name: "Hyundai", models: ["Creta", "Venue", "i20", "Verna", "Grand i10 Nios", "Exter", "Alcazar", "Tucson"] },
  { name: "Tata Motors", models: ["Nexon", "Punch", "Harrier", "Safari", "Tiago", "Tigor", "Curvv", "Altroz"] },
  { name: "Mahindra", models: ["XUV700", "Scorpio-N", "Thar", "XUV3XO", "Bolero", "Scorpio Classic", "XUV400"] },
  { name: "Kia", models: ["Seltos", "Sonet", "Carens", "EV6", "Carnival"] },
  { name: "Honda", models: ["City", "Amaze", "Elevate", "Civic", "Jazz", "WR-V"] },
  { name: "Toyota", models: ["Innova Crysta", "Innova Hycross", "Fortuner", "Urban Cruiser Hyryder", "Glanza", "Camry"] },
  { name: "Volkswagen", models: ["Taigun", "Virtus", "Polo", "Vento", "Tiguan"] },
  { name: "Skoda", models: ["Kushaq", "Slavia", "Octavia", "Superb", "Kodiaq", "Rapid"] },
  { name: "MG Motor", models: ["Hector", "Astor", "ZS EV", "Gloster", "Comet"] },
  { name: "Renault / Nissan", models: ["Kiger", "Magnite", "Triber", "Kwid", "Duster"] },
  { name: "Luxury (BMW / Merc / Audi)", models: ["BMW 3 Series", "BMW X1/X3", "Mercedes C-Class", "Mercedes GLC", "Audi A4", "Audi Q3/Q5"] }
];

export const FAQS = [
  {
    question: "I am currently standing at the service center. Can you help me right now?",
    answer: "Yes, absolutely! That is what 80% of our customers use us for. As soon as the service advisor hands you the job sheet estimate, simply upload a clear photo of the bill on our WhatsApp or website. Our master mechanics begin reviewing it immediately and deliver your strike-off checklist within 20 to 30 minutes, before you approve the job card!"
  },
  {
    question: "How will Motor Doctor save me money?",
    answer: "Authorized service centers and multi-brand workshops routinely add 30% to 60% unnecessary add-ons: engine flushes, AC chemical sprays, throttle cleaning, rust sprays, duplicate labor charges, and premature component replacements (e.g., claiming brake pads or clutch are dead when 40% life remains). We tell you exactly which items are genuine OEM requirements vs dealership profit boosters."
  },
  {
    question: "Will refusing these items void my car's manufacturer warranty?",
    answer: "NO, absolutely not! This is a common scare tactic used by service advisors. Your manufacturer warranty only requires following the official Owner's Manual Periodic Maintenance schedule (e.g., engine oil, oil filter, air filter, brake fluid). Add-ons like engine flush, sanitization, coating, and injector cleaning are dealer-level accessories and refusing them NEVER impacts warranty. In fact, many brands strictly warn dealers against using unauthorized chemical flushes!"
  },
  {
    question: "Can your expert mechanic talk directly to my Service Advisor?",
    answer: "Yes! If you select our 'Full Garage Advisory & Shield' plan (₹1,499), our Senior Automotive Engineer will join a 3-way conference call with your service advisor or workshop manager. When advisors realize they are talking to a 15+ year veteran automotive engineer who knows exact part numbers and labor times, they immediately drop bogus charges and apply genuine discounts."
  },
  {
    question: "What if I have already approved the estimate or paid the bill?",
    answer: "If work is currently ongoing, you can still immediately call the workshop and instruct them not to carry out or bill specific items before the final invoice is generated. If you have already paid, we can audit the final invoice and provide you with a written technical discrepancy report that you can escalate to the brand's nodal customer care for refunds or service credits."
  },
  {
    question: "How do I send my service estimate or bill to you?",
    answer: "You can upload it directly through the upload button on this page, or click our WhatsApp button to send high-res photos or PDF of your estimate directly to our official line (+91 98199 12166)."
  }
];

