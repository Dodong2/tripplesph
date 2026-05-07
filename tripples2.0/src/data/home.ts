import { ASSETS } from ".";
import type { 
    ArticleItem, 
    ClientLogo, 
    FaqItem, 
    ImpactStat, 
    ProcessStep, 
    ServiceSnippet, 
    StatCard, 
    TestimonialItem, 
    WhyUsCard 
} from "../types";
import { 
  CircleStar, 
  Users, 
  SquarePen, 
  Target, 
  TrendingUp, 
  Zap, 
  Eye, 
  Clock4,
  ChartNoAxesColumnIncreasing,
  ChartColumnIncreasing,
  
} from "lucide-react";




// ─── Home ─────────────────────────────────────────────────────────────────────
export const STAT_CARDS: StatCard[] = [
  { id: "sc1", label: "Dost TV, 2024", value: "372%", sub: "YT unique viewers" },
  { id: "sc2", label: "Dost – STII, 2024", value: "262%", sub: "audience & engagement" },
  { id: "sc3", label: "Dost Starbooks, 2024", value: "159%", sub: "post reach" },
];

export const IMPACT_STATS: ImpactStat[] = [
  { id: "is1", icon: CircleStar, value: "7+", label: "Years Of Service" },
  { id: "is2", icon: Users, value: "1M+", label: "Online Community Members" },
  { id: "is3", icon: SquarePen, value: "1K+", label: "Content Pieces Produced" },
  { id: "is4", icon: Target, value: "3", label: "Pillars: People, Profit, Planet" },
  { id: "is5", icon: TrendingUp, value: "20", label: "Partners" },
];

export const WHY_US_CARDS: WhyUsCard[] = [
  { id: "wu1", icon: Zap, title: "Performance Guarantee", description: "We don't get paid unless you see results. Our fees are tied to your success." },
  { id: "wu2", icon: Eye, title: "Full Transparency", description: "Real-time dashboard access. See exactly where every dollar goes and what it returns." },
  { id: "wu3", icon: CircleStar, title: "Industry Specialists", description: "Dedicated account managers with proven expertise in your specific industry." },
  { id: "wu4", icon: Clock4, title: "Fast Results", description: "See measurable improvements within 30 days, not months of waiting." },
];

export const PROCESS_STEPS: ProcessStep[] = [
  { id: "ps1", number: "01", icon: ChartNoAxesColumnIncreasing, title: "Audit & Strategy", description: "Deep-dive analysis of your current digital presence and competitive landscape." },
  { id: "ps2", number: "02", icon: Zap, title: "Campaign Setup", description: "Build precision-targeted campaigns with compelling creatives and copy." },
  { id: "ps3", number: "03", icon: TrendingUp, title: "Optimization", description: "Continuous A/B testing and data-driven refinements for peak performance." },
  { id: "ps4", number: "04", icon: CircleStar, title: "Scale & Report", description: "Amplify what works, cut what doesn't, and deliver transparent reporting." },
];

export const SERVICE_SNIPPETS: ServiceSnippet[] = [
  { id: "ss1", icon: Target, title: "CPC Advertising", description: "Get maximum ROI with our data-driven CPC campaigns. We optimize every click to turn visitors into customers.", tags: ["Google Ads", "Facebook Ads", "Display ads", "Retargeting"], color: "#0891b2" },
  { id: "ss2", icon: SquarePen, title: "Content Management", description: "From strategy to execution, we create and manage content that drives engagement and converts your audience.", tags: ["Social Media", "Content Strategy", "Community Managemen"], color: "#0d9488" },
  { id: "ss3", icon: ChartColumnIncreasing, title: "Digital Magazine & Publishing", description: "Professional digital magazine publishing with articles and blogs that establish your brand as an industry authority.", tags: ["Content Strategy", "Brand Voice", "Analytics"], color: "#197996" },
];

export const TESTIMONIALS: TestimonialItem[] = [
  { id: "tm1", avatarUrl: ASSETS.c1, organization: "NRCP", intro: "We would like to notify that TRipplesPH Corporation has a", highlight: "final rating of (E) Excellent in our Supplier Performance Rating Sheet", detail: "for all the transactions delivered in 2023.", source: "– National Research Council of the Philippines" },
  { id: "tm2", avatarUrl: ASSETS.c2, organization: "PCO", intro: "We hereby certify that, to the best of our knowledge and belief,", highlight: "TRipplesPH Corporation has satisfactorily supplied the goods and/or services", detail: "for the DOE-EPOWER MO! Campaign.", source: "– Presidential Communication Office" },
  { id: "tm3", avatarUrl: ASSETS.c3, organization: "PHREB", intro: "This is to certify that TRipples PH Corporation has satisfactorily", highlight: "completed the Audio-Visual Presentation Production Services", detail: "for the Philippine Health Research Ethics Board.", source: "– Philippine Health Research Ethics Board" },
  { id: "tm4", avatarUrl: ASSETS.c4, organization: "PRC", intro: "The Committee is happy and proud of seeing the PRC community appreciating the AVPs.", highlight: "Your AVPs made PRC's Golden Anniversary celebration much more memorable!", detail: "On behalf of the Committee, thanks!", source: "– Professional Regulation Commission" },
];

export const CLIENT_LOGOS: ClientLogo[] = [
  { id: "cl1", image: ASSETS.c1, },
  { id: "cl2", image: ASSETS.c2, },
  { id: "cl3", image: ASSETS.c3, },
  { id: "cl4", image: ASSETS.c4, },
  { id: "cl5", image: ASSETS.c5, },
  { id: "cl6", image: ASSETS.c6, },
  { id: "cl7", image: ASSETS.c7, },
  { id: "cl8", image: ASSETS.c8, },
  { id: "cl9", image: ASSETS.c9, },
  { id: "cl10", image: ASSETS.c10, },
  { id: "cl11", image: ASSETS.c11, },
  { id: "cl12", image: ASSETS.c12, },
  { id: "cl13", image: ASSETS.c13, },
  { id: "cl14", image: ASSETS.c14, },
  { id: "cl15", image: ASSETS.c15, },
  { id: "cl16", image: ASSETS.c16, },
  { id: "cl17", image: ASSETS.c17, },
  { id: "cl18", image: ASSETS.c18, },
  { id: "cl19", image: ASSETS.c19, },
  { id: "cl20", image: ASSETS.c20, },
  { id: "cl21", image: ASSETS.c21, },
  { id: "cl22", image: ASSETS.c22, },
  { id: "cl23", image: ASSETS.c23, },
  { id: "cl24", image: ASSETS.c24, },
  { id: "cl25", image: ASSETS.c25, },
  { id: "cl26", image: ASSETS.c26, },
  { id: "cl27", image: ASSETS.c27, },
  { id: "cl28", image: ASSETS.c28, },
  { id: "cl29", image: ASSETS.c29, },
  { id: "cl20", image: ASSETS.c30, },
] ;

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