import type {
  NavLink,
  FooterSocialLink,
  FooterNavLink,
  FooterContact
} from "../types";

// images
import LogoIcons from '../assets/logo-icon.png'
import WordMark from '../assets/wordmark.png'
import Articleimage from '../assets/article-sample.png'
// services images
import DigitalImage from '../assets/services/digital-marketing.webp'
import AVP from '../assets/services/avp.webp'
import Train from '../assets/services/train.webp'
import CPC from '../assets/services/cpc.webp'
import Web from '../assets/services/web.webp'
// Home clients logo
import Client1 from '../assets/Client logos/client-1-sample.png'
import Client2 from '../assets/Client logos/client-2-sample.png'
import Client3 from '../assets/Client logos/client-3-sample.png'
import Client4 from '../assets/Client logos/client-4-sample.png'
import Client5 from '../assets/Client logos/client-5-sample.png'
import Client6 from '../assets/Client logos/client-6-sample.png'
import Client7 from '../assets/Client logos/client-7-sample.png'
import Client8 from '../assets/Client logos/client-8-sample.png'
import Client9 from '../assets/Client logos/client-9-sample.png'
import Client10 from '../assets/Client logos/client-10-sample.png'
import Client11 from '../assets/Client logos/client-11-sample.png'
import Client12 from '../assets/Client logos/client-12-sample.png'
import Client13 from '../assets/Client logos/client-13-sample.png'
import Client14 from '../assets/Client logos/client-14-sample.png'
import Client15 from '../assets/Client logos/client-15-sample.png'
import Client16 from '../assets/Client logos/client-16-sample.png'
import Client17 from '../assets/Client logos/client-17-sample.png'
import Client18 from '../assets/Client logos/client-18-sample.png'
import Client19 from '../assets/Client logos/client-19-sample.png'
import Client20 from '../assets/Client logos/client-20-sample.png'
import Client21 from '../assets/Client logos/client-21-sample.png'
import Client22 from '../assets/Client logos/client-22-sample.png'
import Client23 from '../assets/Client logos/client-23-sample.png'
import Client24 from '../assets/Client logos/client-24-sample.png'
import Client25 from '../assets/Client logos/client-25-sample.png'
import Client26 from '../assets/Client logos/client-26-sample.png'
import Client27 from '../assets/Client logos/client-27-sample.png'
import Client28 from '../assets/Client logos/client-28-sample.png'
import Client29 from '../assets/Client logos/client-29-sample.png'
import Client30 from '../assets/Client logos/client-30-sample.png'
import Client31 from '../assets/Client logos/client-31-sample.png'
import Client32 from '../assets/Client logos/client-32-sample.png'
// company
import Founder from '../assets/founder.png'
import Team from '../assets/Team.png'
// awards
import Award1 from '../assets/awards/award1.png'
import Award2 from '../assets/awards/award2.png'
import Award3 from '../assets/awards/award3.png'
import Award4 from '../assets/awards/award4.png'
import Award5 from '../assets/awards/award5.png'

// ─── Assets (Figma) ──────────────────────────────────────────────────────────
export const ASSETS = {
  logoIcon: LogoIcons,
  logoWordmark: WordMark,
  articleImg: Articleimage,
  // services images
  digitalImg: DigitalImage,
  TrainImg: Train,
  AvpImg: AVP,
  CPCImg: CPC,
  WebImg: Web,
  // Home clients logo
  c1: Client1,
  c2: Client2,
  c3: Client3,
  c4: Client4,
  c5: Client5,
  c6: Client6,
  c7: Client7,
  c8: Client8,
  c9: Client9,
  c10: Client10, 
  c11: Client11,
  c12: Client12,
  c13: Client13,
  c14: Client14,
  c15: Client15,
  c16: Client16,
  c17: Client17,
  c18: Client18,
  c19: Client19,
  c20: Client20,
  c21: Client21,
  c22: Client22,
  c23: Client23,
  c24: Client24,
  c25: Client25,
  c26: Client26,
  c27: Client27,
  c28: Client28,
  c29: Client29,
  c30: Client30,
  c31: Client31,
  c32: Client32,
  // company
  founderImg: Founder,
  teamPhoto: Team,
  // awards
  award1: Award1,
  award2: Award2,
  award3: Award3,
  award4: Award4,
  award5: Award5,
};

// ─── Nav ─────────────────────────────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: "Home", page: "home" },
  { label: "About", page: "about" },
  { label: "Service", page: "services" },
  { label: "Blog", page: "blog" },
  { label: "Contacts", page: "contacts" },
];

// ─── Footer ───────────────────────────────────────────────────────────────────
export const FOOTER_DESCRIPTION =
  `TRipples exists to create positive ripple effects for humanity, businesses and the society by connecting the hearts of the brands and non-profits with that of the customers and audiences.\n\nWe exist for humanity. Thus, we compensate our online community with cash and rewards (gift items, vouchers, and points).`;

export const FOOTER_SOCIAL_LINKS: FooterSocialLink[] = [
  { id: "fs1", label: "Tripples",          url: "https://facebook.com/TRipplesPH",         platform: "facebook" },
  { id: "fs2", label: "TripplesPH",        url: "https://facebook.com/TrippPH",       platform: "facebook" },
  { id: "fs3", label: "Positive Tripples", url: "https://www.facebook.com/OfficialTRipples", platform: "facebook" },
  { id: "fs4", label: "Tripples PH",       url: "https://www.youtube.com/@tripplesph5736",       platform: "youtube"  },
];

export const FOOTER_NAV_LINKS: FooterNavLink[] = [
  { id: "fn1", label: "About Us",  path: "/about"    },
  { id: "fn2", label: "Service",   path: "/services" },
  { id: "fn3", label: "Blog",      path: "/blog"     },
  { id: "fn4", label: "Contacts",  path: "/contacts" },
];

export const FOOTER_CONTACT: FooterContact = {
  id: "fc1",
  email:   "oliver.sison@tripplesph.com",
  phone:   "0921-508-6584 (Smart)",
  address: "11023 Downhill Drive Off Jose Velasco Ave. UPLB Batong Malake , Los Baños , Laguna 4030",
};
