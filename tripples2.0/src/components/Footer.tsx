import { Link } from "react-router-dom";
import {
  FOOTER_DESCRIPTION,
  FOOTER_SOCIAL_LINKS,
  FOOTER_NAV_LINKS,
  FOOTER_CONTACT,
} from "../data/index";

// ── Inline SVG icons (Lucide has no Facebook/YouTube) ────────────────────────
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-10 pb-5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* ── 4-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">

          {/* Col 1 — Description */}
          <div className="lg:col-span-1">
            <p className="font-['Poppins'] font-bold text-sm text-black mb-3 tracking-wide uppercase">
              Creating Ripple Effects
            </p>
            <p className="font-['Inter'] text-sm leading-relaxed whitespace-pre-line text-gray-600">
              {FOOTER_DESCRIPTION}
            </p>
          </div>

          {/* Col 2 — Follow Us */}
          <div>
            <p className="font-['Poppins'] font-bold text-sm text-black mb-4 tracking-wide uppercase">
              Follow Us
            </p>

            <ul className="flex flex-col gap-3">
              {FOOTER_SOCIAL_LINKS.map((link, idx) => {
                const isFirstFacebook =
                  link.platform === "facebook" &&
                  FOOTER_SOCIAL_LINKS.findIndex(
                    (l) => l.platform === "facebook"
                  ) === idx;

                return (
                  <li key={link.id} className="flex items-center gap-2.5">
                    {/* Icon slot */}
                    <span className="w-4 h-4 flex-shrink-0 text-[#197996]">
                      {isFirstFacebook && <FacebookIcon />}
                      {link.platform === "youtube" && <YoutubeIcon />}
                    </span>

                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-['Inter'] text-sm text-gray-700 hover:text-[#197996] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <p className="font-['Poppins'] font-bold text-sm text-black mb-4 tracking-wide uppercase">
              Company
            </p>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.path}
                    className="font-['Inter'] text-sm text-gray-700 hover:text-[#197996] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <p className="font-['Poppins'] font-bold text-sm text-black mb-4 tracking-wide uppercase">
              Contact
            </p>
            <ul className="flex flex-col gap-2.5 font-['Inter'] text-sm text-gray-700">
              <li>
                <a
                  href={`mailto:${FOOTER_CONTACT.email}`}
                  className="hover:text-[#197996] transition-colors break-all"
                >
                  {FOOTER_CONTACT.email}
                </a>
              </li>
              <li>{FOOTER_CONTACT.phone}</li>
              <li className="leading-relaxed">{FOOTER_CONTACT.address}</li>
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <hr className="border-gray-200 mb-4" />
        <p className="font-['Inter'] text-xs text-gray-500 text-center">
          © 2017–{currentYear} TripplesPH. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
