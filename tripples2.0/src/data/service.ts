import { ASSETS } from ".";
import type { AdditionalService, ServiceBlock } from "../types";
import { ChartColumnIncreasing, FileText, Megaphone, MonitorCog, Presentation, SquarePlay, Target, UsersRound } from 'lucide-react'

// ─── Services ─────────────────────────────────────────────────────────────────
export const SERVICE_BLOCKS: ServiceBlock[] = [
    {
    id: "sb1",
    title: "Digital Marketing",
    description: "Boost your brand’s online presence through our strategic and results-driven digital marketing solutions. \n\nGrow your audience. Increase engagement. Drive results digitally. ",
    
    iconBg: "#dbeafe",
    iconColor: "#155DFC",
    icon: ChartColumnIncreasing,
    iconAlt: "Chart icon",
    imageUrl: ASSETS.digitalImg,
    imageAlt: "Digital",
    flipped: false,
    features: [
      { id: "f1", text: "Social Media Management (Content Creation & Copywriting)" },
      { id: "f2", text: "Paid Advertising (Meta, TikTok & Google Ads)" },
      { id: "f3", text: "Search Engine Optimization (SEO)" },
      { id: "f4", text: "Email Marketing" },
      { id: "f5", text: "Website Management" },
      { id: "f6", text: "Branding & Creative Strategy" },
      { id: "f7", text: "Influencer & Partnership Campaigns" },
      { id: "f8", text: "Analytics & Performance Reporting" },
      { id: "f9", text: "Digital magazine" },
    ],
  },
  {
    id: "sb2",
    title: "Audio-Visual Production (AVP)",
    description: "Bring your ideas to life through high-quality and creative multimedia production solutions. From concept development to final output, we deliver compelling audio-visual content that elevates your brand and message. ",
    iconBg: "#FCE7F3",
    iconColor: "#EE57A4",
    icon: SquarePlay,
    iconAlt: "Edit icon",
    imageUrl: ASSETS.AvpImg,
    imageAlt: "Audio-Visual",
    flipped: true,
    features: [
      { id: "f1", text: "Video Production" },
      { id: "f2", text: "Video Editing" },
      { id: "f3", text: "Audio Production" },
      { id: "f4", text: "Photo & Media Coverage" },
      { id: "f5", text: "Livestream & Multimedia Solutions " },
      { id: "f6", text: "2D and 3D Animation" },
      { id: "f7", text: "Infomercial" },
    ],
  },
  {
    id: "sb3",
    title: "Training",
    description: "Train your people with our online or onsite programs. Depending on your current needs, our specialized training programs focus on media engagement, video production, internal knowledge transfer, and team communication skills Training & Capacity Development. ",
    iconBg: "#CEFAFE",
    iconColor: "#0997BB",
    icon: Presentation,
    iconAlt: "Chart icon",
    imageUrl: ASSETS.TrainImg,
    imageAlt: "Training",
    flipped: false,
    features: [
    ],
  },
  {
    id: "sb4",
    title: "CPC Advertising",
    description: "Drive measurable results and expand your digital presence with targeted advertising solutions designed to reach the right audience at the right time. Gain valuable customer insights through detailed campaign performance reports. \n\nMake your brand visible where your audience spends their time.",
    iconBg: "#FFEDD4",
    iconColor: "#F54900",
    icon: Target,
    iconAlt: "Target icon",
    imageUrl: ASSETS.CPCImg,
    imageAlt: "Cpc",
    flipped: true,
    features: [
      { id: "f1", text: "Online Campaigns" },
      { id: "f2", text: "Affiliate Marketing" },
      { id: "f3", text: "Events Promotion" },
      { id: "f4", text: "Website Traffic" },
      { id: "f5", text: "Lead Generation" },
    ],
  },
  {
    id: "sb6",
    title: "Website and Mobile App Development ",
    description: "Strengthen your digital presence with modern websites and high-performing mobile applications designed to connect, engage, and grow your business. ",
    iconBg: "#dbeafe",
    iconColor: "#155DFC",
    icon: MonitorCog,
    iconAlt: "Edit icon",
    imageUrl: ASSETS.WebImg,
    imageAlt: "Website",
    flipped: false,
    features: [],
  },
];

export const ADDITIONAL_SERVICES: AdditionalService[] = [
  { id: "as1", iconBg: "#FFEDD4", iconColor: "#F54900", icon: FileText, title: "Article Writing", description: "Professional writers crafting engaging, SEO-optimized articles that resonate with your target audience.", bgColor: "#ffedd4" },
  { id: "as2", iconBg: "#FCE7F3", iconColor: "#EE57A4", icon: Megaphone, title: "Brand Strategy", description: "Develop a cohesive brand identity and messaging strategy that sets you apart from competitors.", bgColor: "#fce7f3" },
  { id: "as3", iconBg: "#CEFAFE", iconColor: "#0997BB", icon: UsersRound, title: "Consulting", description: "Strategic consulting to help you navigate the digital landscape and make informed marketing decisions.", bgColor: "#cefafe" },
];