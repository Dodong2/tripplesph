import type {
  NavLink,
  StatCard,
  ImpactStat,
  WhyUsCard,
  ProcessStep,
  ServiceSnippet,
  TestimonialItem,
  ClientLogo,
  ArticleItem,
  FaqItem,
  ServiceBlock,
  AdditionalService,
  FooterColumn,
  Pillar,
  AwardCard,
  BenefitGroup,
} from "../types";

// images
import LogoIcons from '../assets/logo-icon.png'
import WordMark from '../assets/wordmark.png'
import Articleimage from '../assets/article-sample.png'
import CpcImage from '../assets/cpc-sample.png'
import ContentImg from '../assets/content-sample.png'
import DigitalImage from '../assets/digital-sample.png'
import Client1 from '../assets/client-1-sample.png'
import Client2 from '../assets/client-2-sample.png'
import Client3 from '../assets/client-3-sample.png'
import Client4 from '../assets/client-4-sample.png'
import Founder from '../assets/founder.png'
import Award1 from '../assets/award1.png'
import Award2 from '../assets/award2.png'
import Award3 from '../assets/award3.png'
import Award4 from '../assets/award4.png'
import Award5 from '../assets/award5.png'
import Team from '../assets/Team.png'

// ─── Assets (Figma) ──────────────────────────────────────────────────────────
export const ASSETS = {
  logoIcon: LogoIcons,
  logoWordmark: WordMark,
  articleImg: Articleimage,
  cpcImg: CpcImage,
  contentImg: ContentImg,
  digitalImg: DigitalImage,
  t1: Client1,
  t2: Client2,
  t3: Client3,
  t4: Client4,
  // About
  founderImg: Founder,
  award1: Award1,
  award2: Award2,
  award3: Award3,
  award4: Award4,
  award5: Award5,
  teamPhoto: Team,
};

// ─── Nav ─────────────────────────────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: "Home", page: "home" },
  { label: "About", page: "about" },
  { label: "Service", page: "services" },
  { label: "Blog", page: "blog" },
  { label: "Contacts", page: "contacts" },
];

// ─── Home ─────────────────────────────────────────────────────────────────────
export const STAT_CARDS: StatCard[] = [
  { id: "sc1", label: "Dost TV, 2024", value: "372%", sub: "YT unique viewers" },
  { id: "sc2", label: "Dost – STII, 2024", value: "262%", sub: "audience & engagement" },
  { id: "sc3", label: "Dost Starbooks, 2024", value: "159%", sub: "post reach" },
];

export const IMPACT_STATS: ImpactStat[] = [
  { id: "is1", icon: "⏰", value: "7+", label: "Years Of Service" },
  { id: "is2", icon: "👥", value: "1M+", label: "Online Community Members" },
  { id: "is3", icon: "✏️", value: "1K+", label: "Content Pieces Produced" },
  { id: "is4", icon: "🌿", value: "3", label: "Pillars: People, Profit, Planet" },
  { id: "is5", icon: "🤝", value: "20", label: "Partners" },
];

export const WHY_US_CARDS: WhyUsCard[] = [
  { id: "wu1", icon: "🏆", title: "Performance Guarantee", description: "We don't get paid unless you see results. Our fees are tied to your success." },
  { id: "wu2", icon: "📊", title: "Full Transparency", description: "Real-time dashboard access. See exactly where every dollar goes and what it returns." },
  { id: "wu3", icon: "🎯", title: "Industry Specialists", description: "Dedicated account managers with proven expertise in your specific industry." },
  { id: "wu4", icon: "⚡", title: "Fast Results", description: "See measurable improvements within 30 days, not months of waiting." },
];

export const PROCESS_STEPS: ProcessStep[] = [
  { id: "ps1", number: "01", title: "Audit & Strategy", description: "Deep-dive analysis of your current digital presence and competitive landscape." },
  { id: "ps2", number: "02", title: "Campaign Setup", description: "Build precision-targeted campaigns with compelling creatives and copy." },
  { id: "ps3", number: "03", title: "Optimization", description: "Continuous A/B testing and data-driven refinements for peak performance." },
  { id: "ps4", number: "04", title: "Scale & Report", description: "Amplify what works, cut what doesn't, and deliver transparent reporting." },
];

export const SERVICE_SNIPPETS: ServiceSnippet[] = [
  { id: "ss1", icon: "🎯", title: "CPC Advertising", description: "Get maximum ROI with data-driven CPC campaigns.", tags: ["Google Ads", "Facebook Ads", "Retargeting"], color: "#0891b2" },
  { id: "ss2", icon: "📝", title: "Content Management", description: "From strategy to execution — content that converts.", tags: ["Social Media", "Editorial Calendar", "SEO Content"], color: "#0d9488" },
  { id: "ss3", icon: "📈", title: "Digital Marketing", description: "Establish authority through professional digital publishing.", tags: ["Content Strategy", "Brand Voice", "Analytics"], color: "#197996" },
];

export const TESTIMONIALS: TestimonialItem[] = [
  { id: "tm1", avatarUrl: ASSETS.t1, organization: "NRCP", intro: "We would like to notify that TRipplesPH Corporation has a", highlight: "final rating of (E) Excellent in our Supplier Performance Rating Sheet", detail: "for all the transactions delivered in 2023.", source: "– National Research Council of the Philippines" },
  { id: "tm2", avatarUrl: ASSETS.t2, organization: "PCO", intro: "We hereby certify that, to the best of our knowledge and belief,", highlight: "TRipplesPH Corporation has satisfactorily supplied the goods and/or services", detail: "for the DOE-EPOWER MO! Campaign.", source: "– Presidential Communication Office" },
  { id: "tm3", avatarUrl: ASSETS.t3, organization: "PHREB", intro: "This is to certify that TRipples PH Corporation has satisfactorily", highlight: "completed the Audio-Visual Presentation Production Services", detail: "for the Philippine Health Research Ethics Board.", source: "– Philippine Health Research Ethics Board" },
  { id: "tm4", avatarUrl: ASSETS.t4, organization: "PRC", intro: "The Committee is happy and proud of seeing the PRC community appreciating the AVPs.", highlight: "Your AVPs made PRC's Golden Anniversary celebration much more memorable!", detail: "On behalf of the Committee, thanks!", source: "– Professional Regulation Commission" },
];

export const CLIENT_LOGOS: ClientLogo[] = [
  { id: "cl1", label: "Client 1", color: "#e53e3e" },
  { id: "cl2", label: "Client 2", color: "#3182ce" },
  { id: "cl3", label: "Client 3", color: "#38a169" },
  { id: "cl4", label: "Client 4", color: "#d69e2e" },
  { id: "cl5", label: "Client 5", color: "#805ad5" },
  { id: "cl6", label: "Client 6", color: "#1a202c" },
  { id: "cl7", label: "Client 7", color: "#e53e3e" },
  { id: "cl8", label: "Client 8", color: "#3182ce" },
  { id: "cl9", label: "Client 9", color: "#38a169" },
  { id: "cl10", label: "Client 10", color: "#d69e2e" },
  { id: "cl11", label: "Client 11", color: "#805ad5" },
  { id: "cl12", label: "Client 12", color: "#1a202c" },
];

export const ARTICLES: ArticleItem[] = [
  { id: "ar1", imageUrl: ASSETS.articleImg, title: "The Best Way to Start Your Day", excerpt: "Every day must begin with a prayer, thanking God for the blessings and opportunities that lie ahead.", slug: "#" },
  { id: "ar2", imageUrl: ASSETS.articleImg, title: "Digital Marketing in 2024", excerpt: "Explore the most effective digital marketing strategies shaping the landscape this year.", slug: "#" },
  { id: "ar3", imageUrl: ASSETS.articleImg, title: "Growing Your Online Community", excerpt: "Learn how to build and nurture an engaged online community that drives real business results.", slug: "#" },
];

export const FAQS: FaqItem[] = [
  { id: "fq1", question: "What services does TRipplesPH offer?", answer: "TRipplesPH offers CPC Advertising, Content Management, and Digital Marketing services tailored to your business needs." },
  { id: "fq2", question: "How long before I see results?", answer: "You can see measurable improvements within 30 days of campaign launch." },
  { id: "fq3", question: "Do you guarantee performance?", answer: "Yes — our fees are tied to your success. If you don't see results, you don't pay." },
  { id: "fq4", question: "Can I track my campaign in real time?", answer: "Absolutely. We provide a real-time dashboard so you can see exactly where every peso goes." },
  { id: "fq5", question: "Who are your typical clients?", answer: "Brands, government organizations, NGOs, and businesses of all sizes across the Philippines." },
  { id: "fq6", question: "How do I get started?", answer: "Click 'Get Started' or reach out via our Contacts page for a free strategy call." },
];

// ─── Services ─────────────────────────────────────────────────────────────────
export const SERVICE_BLOCKS: ServiceBlock[] = [
  {
    id: "sb1",
    title: "CPC Advertising",
    description: "Drive qualified traffic and maximize your advertising ROI with our expert cost-per-click campaign management. We leverage advanced targeting and continuous optimization to ensure every click counts.",
    iconBg: "#dbeafe",
    iconUrl: "",
    iconAlt: "Target icon",
    imageUrl: ASSETS.cpcImg,
    imageAlt: "Laptop showing ad analytics",
    flipped: false,
    features: [
      { id: "f1", text: "Google Ads & Bing Ads Management" },
      { id: "f2", text: "Social Media Advertising (Facebook, Instagram, LinkedIn)" },
      { id: "f3", text: "Real-time Campaign Monitoring" },
      { id: "f4", text: "A/B Testing & Optimization" },
      { id: "f5", text: "Conversion Tracking & Analytics" },
      { id: "f6", text: "Budget Management & ROI Reporting" },
    ],
  },
  {
    id: "sb2",
    title: "Content Management",
    description: "Streamline your content workflow with our comprehensive management solutions. From ideation to publication, we handle every aspect of your content ecosystem.",
    iconBg: "#c9fff4",
    iconUrl: "",
    iconAlt: "Edit icon",
    imageUrl: ASSETS.contentImg,
    imageAlt: "Team collaborating on content",
    flipped: true,
    features: [
      { id: "f1", text: "Content Strategy Development" },
      { id: "f2", text: "Editorial Calendar Management" },
      { id: "f3", text: "Multi-platform Publishing" },
      { id: "f4", text: "SEO-Optimized Content" },
      { id: "f5", text: "Brand Voice & Guidelines" },
      { id: "f6", text: "Content Performance Analytics" },
    ],
  },
  {
    id: "sb3",
    title: "Digital Marketing",
    description: "Expand your reach and engage your audience across all digital channels. Our integrated marketing strategies deliver consistent messaging and measurable growth.",
    iconBg: "#dbfce7",
    iconUrl: "",
    iconAlt: "Chart icon",
    imageUrl: ASSETS.digitalImg,
    imageAlt: "Smartphone showing social media",
    flipped: false,
    features: [
      { id: "f1", text: "Search Engine Optimization (SEO)" },
      { id: "f2", text: "Email Marketing Campaigns" },
      { id: "f3", text: "Social Media Management" },
      { id: "f4", text: "Influencer Partnerships" },
      { id: "f5", text: "Video Marketing" },
      { id: "f6", text: "Marketing Automation" },
    ],
  },
];

export const ADDITIONAL_SERVICES: AdditionalService[] = [
  { id: "as1", icon: "📝", title: "Article Writing", description: "Professional writers crafting engaging, SEO-optimized articles that resonate with your target audience.", bgColor: "#ffedd4" },
  { id: "as2", icon: "📢", title: "Brand Strategy", description: "Develop a cohesive brand identity and messaging strategy that sets you apart from competitors.", bgColor: "#fce7f3" },
  { id: "as3", icon: "👥", title: "Consulting", description: "Strategic consulting to help you navigate the digital landscape and make informed marketing decisions.", bgColor: "#cefafe" },
];

// ─── About ────────────────────────────────────────────────────────────────────
export const PILLARS: Pillar[] = [
  { id: "pl1", iconUrl: "", title: "MAN", subtitle: "(Social Aspect)", description: "We build meaningful relationships with our team and empower them to reach their fullest potential." },
  { id: "pl2", iconUrl: "", title: "MONEY", subtitle: "(Economic Aspect)", description: "Our joy is to drive significant growth and profit to your brand, as illustrated in our high-impact client results." },
  { id: "pl3", iconUrl: "", title: "MOTHER EARTH", subtitle: "(Environmental Aspect)", description: "We champion social responsibility and empower other brands to do the same by supporting their CSR campaigns." },
];

export const AWARDS: AwardCard[] = [
  { id: "aw1", imageUrl: ASSETS.award1, title: "Certificate of Excellence", badge: "Asia's Golden Legacy Awards", description: "Recognized for outstanding achievement in digital advertising innovation and client success across the Asian market.", category: "International Recognition" },
  { id: "aw2", imageUrl: ASSETS.award2, title: "Excellence in Digital Marketing", badge: "Asia's Golden Legacy Awards", description: "Awarded for demonstrating exceptional creativity, strategic thinking, and measurable results in digital campaigns.", category: "Industry Leadership" },
  { id: "aw3", imageUrl: ASSETS.award3, title: "DOST Partnership", badge: "", description: "Honored for exceptional collaboration in advancing technology and digital transformation initiatives.", category: "" },
  { id: "aw4", imageUrl: ASSETS.award4, title: "Legacy Crown Award", badge: "", description: "Prestigious trophy awarded for lasting impact and pioneering contributions to the digital marketing industry.", category: "" },
  { id: "aw5", imageUrl: ASSETS.award5, title: "Technology Partnership", badge: "DOST Starbooks Recognition", description: "Recognized for valuable partnership in promoting digital literacy and technology accessibility initiatives.", category: "" },
];

export const BENEFIT_GROUPS: BenefitGroup[] = [
  {
    id: "bg1",
    groupTitle: "Compensation & Benefits",
    items: [
      { id: "bi1", iconUrl: "", title: "Competitive Salary", description: "We follow DOLE's minimum salary grade" },
      { id: "bi2", iconUrl: "", title: "Productivity Incentive (PI)", description: "The company provides PI to every milestone achievement of the staff" },
      { id: "bi3", iconUrl: "", title: "13th Month Pay", description: "We follow and observe DOLE's policy on 13th month pay" },
      { id: "bi4", iconUrl: "", title: "HMO", description: "Medical & hospital bills are covered per policy" },
      { id: "bi5", iconUrl: "", title: "SSS, Philhealth, Pagibig Benefits", description: "The company provides PI to every milestone achievement of the staff" },
      { id: "bi6", iconUrl: "", title: "Life Insurance & Cooperative", description: "We follow and observe DOLE's policy on 13th month pay" },
    ],
  },
  {
    id: "bg2",
    groupTitle: "Work-Life Balance",
    items: [
      { id: "bi7", iconUrl: "", title: "Transportation Allowance", description: "Commuting staffs are entitled to transportation allowance" },
      { id: "bi8", iconUrl: "", title: "Hybrid Work", description: "Options for onsite and online flexible work arrangements" },
      { id: "bi9", iconUrl: "", title: "Perfect Office Location", description: "Away from busy environment; with garden, nearby park, hospital, campus, food, church" },
      { id: "bi10", iconUrl: "", title: "Foods & Drinks", description: "Provision of breakfast, lunch, snacks and OT meals for onsite staff" },
      { id: "bi11", iconUrl: "", title: "Lodging/Accommodation", description: "Beddings, utilities, electricity, and WiFi are all provided for stay-in staff" },
      { id: "bi12", iconUrl: "", title: "Training & Seminars", description: "Staff can recommend trainings and seminars to attend to" },
    ],
  },
  {
    id: "bg3",
    groupTitle: "Office Perks & Culture",
    items: [
      { id: "bi13", iconUrl: "", title: "Celebrating Birthdays", description: "We treat our whole staff with their choice of food from buffet to Samgyupsal or more" },
      { id: "bi14", iconUrl: "", title: "Unlimited Brewed Coffee", description: "Enjoy sipping your healthy 'kapeng barako' in dark or mix with creamer and brown sugar" },
      { id: "bi15", iconUrl: "", title: "Musical Instrument", description: "Organ, drum set, bass, acoustic and electric guitar can be used" },
      { id: "bi16", iconUrl: "", title: "Sports Day", description: "Table Tennis, Football, Basketball, Badminton, Volleyball, Chess" },
      { id: "bi17", iconUrl: "", title: "Chill Area", description: "Cozy kitchen and sofa to play chess and boardgames" },
      { id: "bi18", iconUrl: "", title: "Company Outing & Team Building", description: "We're all humans who need rest and recreation. We do this annually." },
      { id: "bi19", iconUrl: "", title: "Christmas Party and Baskets/Hampers", description: "The spirit of giving is abundant here, especially during Christmas" },
      { id: "bi20", iconUrl: "", title: "Prayer Room", description: "You can pray anywhere but we also have a room to just meditate and read" },
      { id: "bi21", iconUrl: "", title: "Weekly Mid-Week Fellowship", description: "We also stop our work midweek to talk about life and our faith walk with God" },
    ],
  },
];

// ─── Footer ───────────────────────────────────────────────────────────────────
export const FOOTER_COLUMNS: FooterColumn[] = [
  { id: "fc1", heading: "CREATING RIPPLE EFFECTS", body: "TRipples exists to create positive ripple effects for humanity, businesses and the society by connecting the hearts of the brands and non-profits with that of the customers and audiences.\n\nWe exist for humanity. Thus, we compensate our online community with cash and rewards." },
  { id: "fc2", heading: "CREATING RIPPLE EFFECTS", body: "TRipples exists to create positive ripple effects for humanity, businesses and the society by connecting the hearts of the brands and non-profits with that of the customers and audiences." },
  { id: "fc3", heading: "CREATING RIPPLE EFFECTS", body: "TRipples exists to create positive ripple effects for humanity, businesses and the society." },
];
