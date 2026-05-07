import { Mail, MapPin, Phone } from "lucide-react";
import type { ContactFaqItem, ContactInfoItem } from "../types/index";


export const CONTACT_FAQS: ContactFaqItem[] = [
  {
    id: "cf1",
    question: "What is your response time?",
    answer:
      "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly and we'll do our best to assist you immediately.",
  },
  {
    id: "cf2",
    question: "What services can I inquire about?",
    answer:
      "You can reach out about any of our offerings — CPC Advertising, Content Management, Digital Marketing, brand strategy, article writing, or consulting. We're happy to discuss the right fit for your business.",
  },
  {
    id: "cf3",
    question: "Can I schedule a free strategy call?",
    answer:
      "Absolutely! Just fill out the contact form above or send us an email and our team will set up a complimentary consultation to discuss your goals.",
  },
  {
    id: "cf4",
    question: "Do you work with non-profit organizations?",
    answer:
      "Yes — and we do it for FREE. TRipples is committed to helping non-profits promote their advocacies, whether humanitarian or environmental causes.",
  },
  {
    id: "cf5",
    question: "Where is your office located?",
    answer:
      "Our main office is in the Philippines. Exact address details are available upon request. We also accommodate remote meetings via video call.",
  },
];

export const CONTACT_INFO: ContactInfoItem[] = [
  {
    id: "ci1",
    icon: Mail,
    label: "Email",
    lines: ["info@tripplsph.com", "support@tripplesph.com"],
  },
  {
    id: "ci2",
    icon: Phone,
    label: "Phone",
    lines: ["+63 (2) 1234-5678 (General)", "+63 (2) 9876-5432 (Sales)"],
  },
  {
    id: "ci3",
    icon: MapPin,
    label: "Office",
    lines: ["123 Ripple Avenue", "Calamba, Laguna, Philippines"],
  },
];
