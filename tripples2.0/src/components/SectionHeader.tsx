interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  white?: boolean;
  badgeDark?: boolean;
  className?: string;
}

export default function SectionHeader({ badge, title, subtitle, white, badgeDark, className = "" }: SectionHeaderProps) {
  return (
    <div className={`text-center ${className}`}>
      {badge && (
        <span
          className={`inline-flex items-center h-9 px-3.5 rounded-full border border-[#a3f4fd] font-['Poppins'] font-bold text-[11px] text-[#0088bf] mb-4 ${
            badgeDark ? "bg-white" : "bg-gradient-to-r from-[#ccfbf1] via-[#cffafe] to-[#a5f3fc]"
          }`}
        >
          {badge}
        </span>
      )}
      <h2
        className={`font-['Poppins'] font-bold text-[28px] sm:text-[36px] md:text-[44px] leading-tight mb-3 ${
          white ? "text-white" : "text-black"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`font-['Inter'] text-lg md:text-xl leading-relaxed mb-10 ${white ? "text-white/90" : "text-gray-700"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
