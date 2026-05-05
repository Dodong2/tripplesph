import { useState } from "react";
import { CONTACT_FAQS, CONTACT_INFO } from "../data/contact";

// ── Icon components ───────────────────────────────────────────────────────────
function EmailIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
      <rect x="4" y="10" width="32" height="22" rx="3" stroke="#197996" strokeWidth="2" />
      <polyline points="4,10 20,24 36,10" stroke="#197996" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
      <path
        d="M8 6h7l3 8-4 2.5a18 18 0 0 0 9.5 9.5L26 22l8 3v7a2 2 0 0 1-2 2C12 34 6 18 6 8a2 2 0 0 1 2-2z"
        stroke="#197996"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OfficeIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
      <path
        d="M20 4C14.477 4 10 8.477 10 14c0 8.25 10 22 10 22s10-13.75 10-22c0-5.523-4.477-10-10-10z"
        stroke="#197996"
        strokeWidth="2"
      />
      <circle cx="20" cy="14" r="3.5" stroke="#197996" strokeWidth="2" />
    </svg>
  );
}

const INFO_ICONS = [<EmailIcon />, <PhoneIcon />, <OfficeIcon />];

// ── Contact Hero ──────────────────────────────────────────────────────────────
function ContactHero() {
  return (
    <section className="bg-[#197996] min-h-[380px] flex items-center justify-center text-center px-6 py-16">
      <div className="max-w-4xl">
        <h1 className="font-['Poppins'] font-bold text-3xl sm:text-5xl md:text-[70px] text-white leading-tight mb-6 tracking-tight">
          WE'D LOVE TO HEAR FROM YOU
        </h1>
        <p className="font-['Inter'] text-lg sm:text-xl md:text-[28px] text-white leading-relaxed max-w-3xl mx-auto">
          Feel free to share your thoughts, comments, and suggestions.
          <br className="hidden sm:block" />
          We'd love to have a conversation with you, answer any questions and meet you in a call.
        </p>
      </div>
    </section>
  );
}

// ── Contact Form ──────────────────────────────────────────────────────────────
const SUBJECTS = [
  "General Inquiry",
  "CPC Advertising",
  "Content Management",
  "Digital Marketing",
  "Partnership",
  "Other",
];

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputClass =
    "w-full h-12 px-4 rounded-lg bg-[#f3f3f5] font-['Inter'] text-base text-gray-700 placeholder-[#939393] outline-none focus:ring-2 focus:ring-[#197996]/40 transition-shadow";

  return (
    <section className="bg-[#f9fafb] py-16 px-6">
      <div className="max-w-[818px] mx-auto bg-white rounded-[42px] shadow-[0px_4px_16.1px_6px_rgba(0,0,0,0.25)] px-8 sm:px-14 py-12">
        <h2 className="font-['Poppins'] font-bold text-3xl md:text-[40px] text-black text-center mb-2 leading-tight">
          Get in touch with us!
        </h2>
        <p className="font-['Inter'] text-base md:text-lg text-black text-center mb-8">
          Let us work together and make positive ripples!
        </p>

        {submitted ? (
          <div className="text-center py-10">
            <p className="font-['Poppins'] font-semibold text-xl text-[#197996] mb-2">
              Message sent! 🎉
            </p>
            <p className="font-['Inter'] text-sm text-[#939393]">
              Thank you for your query. We will respond to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="fullName"
                type="text"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                required
                className={inputClass}
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
              />
              {/* Subject dropdown */}
              <div className="relative">
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className={`${inputClass} appearance-none cursor-pointer pr-8`}
                >
                  <option value="" disabled>
                    Subject
                  </option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {/* Chevron */}
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none"
                  viewBox="0 0 12 8"
                  fill="none"
                >
                  <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Message */}
            <textarea
              name="message"
              placeholder="Write your message here..."
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-[#f3f3f5] font-['Inter'] text-base text-gray-700 placeholder-[#939393] outline-none focus:ring-2 focus:ring-[#197996]/40 transition-shadow resize-none"
            />

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-[48px] rounded-lg bg-[#ff6f37] font-['Inter'] font-semibold text-base text-white hover:opacity-90 transition-opacity cursor-pointer border-none"
            >
              Submit Message
            </button>

            <p className="font-['Inter'] text-sm text-[#939393] text-center -mt-1">
              Thank you for your query. We will respond to you shortly.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

// ── Contact Info Cards ────────────────────────────────────────────────────────
function ContactInfoCards() {
  return (
    <section className="bg-white py-14 px-6">
      <div className="max-w-[1100px] mx-auto flex flex-wrap justify-center gap-6">
        {CONTACT_INFO.map((info, idx) => (
          <div
            key={info.id}
            className="bg-white rounded-xl shadow-[0px_4px_10px_2px_rgba(0,0,0,0.25)] flex-1 min-w-[260px] max-w-[333px] flex flex-col items-center text-center p-8 gap-3"
          >
            {/* Icon circle */}
            <div className="w-[73px] h-[73px] rounded-full bg-gradient-to-br from-[#06b6d4] to-[#197996] flex items-center justify-center mb-1">
              <div className="text-white [&_svg_rect]:stroke-white [&_svg_path]:stroke-white [&_svg_polyline]:stroke-white [&_svg_line]:stroke-white [&_svg_circle]:stroke-white">
                {INFO_ICONS[idx]}
              </div>
            </div>
            <h3 className="font-['Poppins'] font-semibold text-lg text-black">
              {info.label}
            </h3>
            <div className="font-['Inter'] text-base text-black leading-relaxed">
              {info.lines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Contact FAQs ─────────────────────────────────────────────────────────────
function ContactFAQs() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="bg-[#f9fafb] py-16 px-6">
      <h2 className="font-['Poppins'] font-bold text-3xl md:text-[40px] text-black text-center mb-10 leading-tight">
        Frequently Asked Questions
      </h2>
      <div className="max-w-[894px] mx-auto flex flex-col divide-y divide-gray-200">
        {CONTACT_FAQS.map((faq) => (
          <div key={faq.id}>
            <button
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              className="w-full flex items-center justify-between py-4 text-left font-['Inter'] font-semibold text-lg text-black cursor-pointer bg-transparent border-none gap-4"
            >
              <span>{faq.question}</span>
              <svg
                className={`w-4 h-4 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
                  openId === faq.id ? "rotate-180" : ""
                }`}
                viewBox="0 0 16 10"
                fill="none"
              >
                <path
                  d="M1 1l7 7 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-[max-height,padding] duration-300 font-['Inter'] text-base text-black leading-relaxed ${
                openId === faq.id ? "max-h-[300px] pb-4" : "max-h-0"
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactForm />
      <ContactInfoCards />
      <ContactFAQs />
    </main>
  );
}
