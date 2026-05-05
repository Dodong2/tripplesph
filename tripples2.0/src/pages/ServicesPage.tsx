import CTABanner from "../components/CTABanner";
import { SERVICE_BLOCKS, ADDITIONAL_SERVICES,} from "../data";
import { CircleCheckBig } from "lucide-react";

// ── Target icon (SVG) ────────────────────────────────────────────────────────
function TargetIcon() {
  return (
    <svg viewBox="0 0 69 69" fill="none" className="w-16 h-16">
      <circle cx="34.5" cy="34.5" r="29" stroke="#197996" strokeWidth="3" />
      <circle cx="34.5" cy="34.5" r="19" stroke="#197996" strokeWidth="3" />
      <circle cx="34.5" cy="34.5" r="9"  stroke="#197996" strokeWidth="3" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg viewBox="0 0 70 72" fill="none" className="w-16 h-16">
      <path d="M50 14L60 24L28 56H18V46L50 14Z" stroke="#197996" strokeWidth="3" strokeLinejoin="round" />
      <line x1="9" y1="66" x2="61" y2="66" stroke="#197996" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16">
      <rect x="8" y="32" width="10" height="22" rx="2" fill="#197996" />
      <rect x="23" y="20" width="10" height="34" rx="2" fill="#197996" />
      <rect x="38" y="10" width="10" height="44" rx="2" fill="#197996" />
      <rect x="53" y="24" width="10" height="30" rx="2" fill="#197996" />
    </svg>
  );
}

const ICONS = [<TargetIcon />, <EditIcon />, <ChartIcon />];

// ── Service Hero ──────────────────────────────────────────────────────────────
function ServiceHero() {
  return (
    <section className="bg-[#197996] min-h-[420px] flex items-center justify-center text-center px-6">
      <div className="py-20">
        <h1 className="font-['Poppins'] font-bold text-3xl sm:text-4xl md:text-[56px] lg:text-[70px] text-white leading-tight mb-6">
          Our Services
        </h1>
        <p className="font-['Inter'] text-lg sm:text-xl md:text-[30px] text-white max-w-3xl leading-snug">
          Comprehensive digital solutions tailored to your business needs
        </p>
      </div>
    </section>
  );
}

// ── Service Block ─────────────────────────────────────────────────────────────
function ServiceBlockSection() {
  return (
    <>
      {SERVICE_BLOCKS.map((block, idx) => (
        <section
          key={block.id}
          className={`py-16 ${idx % 2 !== 0 ? "bg-[#f8f6f6]" : "bg-white"}`}
        >
          <div
            className={`max-w-[1300px] mx-auto px-6 md:px-10 flex flex-wrap items-start gap-12 md:gap-16 ${
              block.flipped ? "flex-row-reverse" : ""
            }`}
          >
            {/* Content */}
            <div className="flex-1 min-w-[280px]">
              <div
                className="w-24 h-24 rounded-xl flex items-center justify-center mb-5"
                style={{ background: block.iconBg }}
              >
                {ICONS[idx]}
              </div>
              <h2 className="font-['Poppins'] font-medium text-3xl md:text-[40px] text-black mb-5 leading-tight">
                {block.title}
              </h2>
              <p className="font-['Inter'] text-lg md:text-2xl text-[#6d6d6d] leading-relaxed mb-8">
                {block.description}
              </p>
              <ul className="flex flex-col gap-3.5">
                {block.features.map((f) => (
                  <li key={f.id} className="flex items-center gap-3.5 font-['Inter'] text-lg md:text-xl text-[#6d6d6d]">
                    <CircleCheckBig className="flex-shrink-0 w-7 h-7 text-[#00C950]"/>
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
            {/* Image */}
            <div className="flex-shrink-0 w-full md:w-[520px]">
              <img
                src={block.imageUrl}
                alt={block.imageAlt}
                className="w-full h-[380px] md:h-[460px] object-cover rounded-[22px] shadow-[0_10px_22px_7px_rgba(0,0,0,.22)]"
              />
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

// ── Additional Services ───────────────────────────────────────────────────────
function AdditionalServices() {
  return (
    <section className="bg-[#f8f6f6] py-16 px-6 text-center">
      <h2 className="font-['Poppins'] font-medium text-3xl md:text-[40px] text-black mb-2.5 leading-tight">Additional Services</h2>
      <p className="font-['Inter'] text-xl md:text-2xl text-[#6d6d6d] mb-12 leading-relaxed">More ways we can help grow your business</p>
      <div className="flex flex-wrap justify-center gap-6 max-w-[1400px] mx-auto">
        {ADDITIONAL_SERVICES.map((s) => (
          <article key={s.id} className="bg-white rounded-xl shadow-[0_4px_12px_3px_rgba(0,0,0,.22)] p-8 flex-1 min-w-[260px] max-w-[440px] text-left">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-4.5 text-3xl" style={{ background: s.bgColor }}>
              {s.icon}
            </div>
            <h3 className="font-['Poppins'] text-xl md:text-2xl mb-2.5">{s.title}</h3>
            <p className="font-['Inter'] text-base md:text-lg text-[#6d6d6d] leading-snug">{s.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <main>
      <ServiceHero />
      <ServiceBlockSection />
      <AdditionalServices />
      <CTABanner />
    </main>
  );
}
