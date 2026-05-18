import type { ClientLogo } from "../types"; // adjust path

interface LogoCarouselProps {
  logos: ClientLogo[];
  reverse?: boolean;
}

export const LogoCarousel = ({ logos, reverse = false }: LogoCarouselProps) => {
  // Ensure enough items for seamless loop — minimum 3 copies
  const copies = logos.length < 10 ? 4 : 2;
  const repeated = Array.from({ length: copies }, () => logos).flat();

  return (
    <div className="overflow-hidden w-full mb-3" style={{ /* mask */ }}>
      <div
        className={`flex gap-5 ${reverse ? "animate-scroll-right" : "animate-scroll-left"}`}
        style={{ width: "max-content" }}
      >
        {repeated.map((logo, i) => (
          <div key={`${logo.id}-${i}`} className="w-[148px] h-[228px] flex-shrink-0 rounded-[7px] flex items-center justify-center">
            <img src={logo.image} alt={logo.id} className="max-w-[120px] max-h-[140px] object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};