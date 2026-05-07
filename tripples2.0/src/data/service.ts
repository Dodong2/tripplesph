import { ASSETS } from ".";
import type { AdditionalService, ServiceBlock } from "../types";
import { ChartColumnIncreasing, FileText, Megaphone, SquarePen, Target, UsersRound } from 'lucide-react'

// ─── Services ─────────────────────────────────────────────────────────────────
export const SERVICE_BLOCKS: ServiceBlock[] = [
  {
    id: "sb1",
    title: "CPC Advertising",
    description: "Drive qualified traffic and maximize your advertising ROI with our expert cost-per-click campaign management. We leverage advanced targeting and continuous optimization to ensure every click counts.",
    iconBg: "#dbeafe",
    iconColor: "#155DFC",
    icon: Target,
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
    iconColor: "#009689",
    icon: SquarePen,
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
    iconColor: "#00A63E",
    icon: ChartColumnIncreasing,
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
  { id: "as1", iconBg: "#FFEDD4", iconColor: "#F54900", icon: FileText, title: "Article Writing", description: "Professional writers crafting engaging, SEO-optimized articles that resonate with your target audience.", bgColor: "#ffedd4" },
  { id: "as2", iconBg: "#FCE7F3", iconColor: "#EE57A4", icon: Megaphone, title: "Brand Strategy", description: "Develop a cohesive brand identity and messaging strategy that sets you apart from competitors.", bgColor: "#fce7f3" },
  { id: "as3", iconBg: "#CEFAFE", iconColor: "#0997BB", icon: UsersRound, title: "Consulting", description: "Strategic consulting to help you navigate the digital landscape and make informed marketing decisions.", bgColor: "#cefafe" },
];