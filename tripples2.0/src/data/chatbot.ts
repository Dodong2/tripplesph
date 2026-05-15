import { ChartColumnIncreasing, Mails, Target, Trophy, ZodiacAquarius,  } from "lucide-react";
import type { ChatCategory } from "../types";


export const CHATBOT_GREETING =
  "Hi! I'm Ripple 👋 TRipplesPH's virtual assistant. How can I help you today?";

export const CHATBOT_DATA: ChatCategory[] = [
  {
    id: "cat1",
    category: "About TRipplesPH",
    icon: ZodiacAquarius,
    iconsColor: "#1E90FF",
    options: [
      {
        id: "a1",
        label: "What is TRipplesPH?",
        answer:
          "TRipplesPH is the Philippines' FIRST and BIGGEST online community for promoting campaigns. We are a full-stack digital marketing company that creates positive ripple effects for humanity, businesses, and society by connecting the hearts of brands and non-profits with their target audiences.",
      },
      {
        id: "a2",
        label: "When was TRipplesPH founded?",
        answer:
          "TRipplesPH was founded in 2017 by Pastors Francis Oliver and Mai Ryza Sison. From humble beginnings with our first client — a photo and video supplier — we've grown into the Philippines' leading digital marketing company.",
      },
      {
        id: "a3",
        label: "What is TRipplesPH's mission?",
        answer:
          "We exist to create positive ripple effects for humanity, businesses, and society. We operate under the Triple Bottom Line: People (MAN), Profit (MONEY), and Planet (MOTHER EARTH). We also compensate our online community with cash and rewards for their participation.",
      },
      {
        id: "a4",
        label: "Who are the founders?",
        answer:
          "TRipplesPH was founded by Pastors Francis Oliver and Mai Ryza Sison — a couple driven by faith, purpose, and a vision to use digital marketing as a force for good. Their story began in 2017 and continues to inspire the team today.",
      },
    ],
  },
  {
    id: "cat2",
    category: "Our Services",
    icon: Target,
    iconsColor: "#DC143C",
    options: [
      {
        id: "s1",
        label: "What services do you offer?",
        answer:
          "We offer three core services: (1) CPC Advertising — Google Ads, Facebook Ads, and retargeting campaigns; (2) Content Management — strategy, editorial calendars, SEO content, and multi-platform publishing; and (3) Digital Marketing — SEO, email campaigns, social media management, influencer partnerships, and video marketing.",
      },
      {
        id: "s2",
        label: "What is CPC Advertising?",
        answer:
          "Cost-Per-Click (CPC) Advertising means you only pay when someone clicks your ad. We manage Google Ads, Bing Ads, Facebook, Instagram, and LinkedIn campaigns — with real-time monitoring, A/B testing, and transparent ROI reporting to maximize every peso of your budget.",
      },
      {
        id: "s3",
        label: "Do you help non-profit organizations?",
        answer:
          "Yes — and it's FREE! TRipplesPH is committed to helping non-profits promote their advocacies. Whether environmental, humanitarian, or community-driven, we help amplify your cause at no cost.",
      },
      {
        id: "s4",
        label: "Do you offer consulting?",
        answer:
          "Absolutely! We offer strategic consulting to help you navigate the digital landscape, make informed marketing decisions, and build a cohesive brand strategy tailored to your goals.",
      },
    ],
  },
  {
    id: "cat3",
    category: "Results & Clients",
    icon: ChartColumnIncreasing,
    iconsColor: "#7CFC00",
    options: [
      {
        id: "r1",
        label: "What results have you achieved?",
        answer:
          "In 2024 alone, we achieved: 372% increase in YouTube unique viewers for DOST TV, 262% growth in audience & engagement for DOST-STII, and 159% increase in post reach for DOST Starbooks. These are real numbers from real campaigns.",
      },
      {
        id: "r2",
        label: "Who are your clients?",
        answer:
          "We serve a wide range of clients including government agencies (DOST, PCO, PHREB, PRC), private brands, SMEs, and non-profit organizations across the Philippines. Our community of over 1 million members helps amplify every campaign.",
      },
      {
        id: "r3",
        label: "Do you guarantee results?",
        answer:
          "Yes! Our Performance Guarantee means our fees are tied to your success — if you don't see results, you don't pay. We also provide full transparency through real-time dashboard access so you always know where every peso goes.",
      },
      {
        id: "r4",
        label: "How fast will I see results?",
        answer:
          "You can see measurable improvements within 30 days of campaign launch. Our 4-step framework — Audit & Strategy, Campaign Setup, Optimization, and Scale & Report — is designed for fast, sustainable growth.",
      },
    ],
  },
  {
    id: "cat4",
    category: "Awards & Recognition",
    icon: Trophy,
    iconsColor:"#FFFF00",
    options: [
      {
        id: "aw1",
        label: "What awards has TRipplesPH received?",
        answer:
          "TRipplesPH has received several prestigious recognitions including: Certificate of Excellence from Asia's Golden Legacy Awards, Excellence in Digital Marketing award, DOST Partnership recognition, Legacy Crown Award, and DOST Starbooks Technology Partnership recognition.",
      },
      {
        id: "aw2",
        label: "Are you PHILGEPS accredited?",
        answer:
          "Yes! TRipplesPH is a PHILGEPS Platinum member, making us eligible to participate in stringent multi-million government bids. This accreditation reflects our credibility, transparency, and commitment to delivering quality services.",
      },
    ],
  },
  {
    id: "cat5",
    category: "Contact & Getting Started",
    icon: Mails,
    iconsColor:"#4169E1",
    options: [
      {
        id: "c1",
        label: "How do I get started?",
        answer:
          "Getting started is easy! Simply visit our Contacts page and fill out the form — or send us an email at info@tripplesph.com. Our team will reach out to schedule a FREE strategy consultation where we discuss your goals and how we can help.",
      },
      {
        id: "c2",
        label: "How do I contact TRipplesPH?",
        answer:
          "You can reach us through:\n📧 Email: info@tripplesph.com\n📧 Support: support@tripplesph.com\n📞 General: +63 (2) 1234-5678\n📞 Sales: +63 (2) 9876-5432\n📍 Office: 123 Ripple Avenue, Calamba, Laguna, Philippines",
      },
      {
        id: "c3",
        label: "Do you offer a free consultation?",
        answer:
          "Yes! We offer a FREE strategy consultation for all new inquiries. During the call, we'll deep-dive into your current digital presence, understand your goals, and propose a customized roadmap — with zero obligation.",
      },
      {
        id: "c4",
        label: "What is your response time?",
        answer:
          "We typically respond to all inquiries within 24 hours on business days. For urgent matters, please call us directly at +63 (2) 1234-5678 and our team will assist you as soon as possible.",
      },
    ],
  },
];
