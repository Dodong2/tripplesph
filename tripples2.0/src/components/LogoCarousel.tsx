import type { ClientLogo } from "../types"; // adjust path

interface LogoCarouselProps {
  logos: ClientLogo[];
  reverse?: boolean;
}

export const LogoCarousel = ({ logos, reverse = false }: LogoCarouselProps) => {
  const doubled = [...logos, ...logos];
  return (
    <div
      className="overflow-hidden w-full mb-3"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)",
      }}
    >
      <div
        className={`flex gap-5 ${reverse ? "animate-scroll-right" : "animate-scroll-left"}`}
        style={{ width: "max-content" }}
      >
        {doubled.map((logo, i) => (
          <div
            key={`${logo.id}-${i}`}
            className="w-[148px] h-[228px] flex-shrink-0 rounded-[7px] flex items-center justify-center"
          >
            <img
              src={logo.image}
              alt={logo.id}
              className="max-w-[120px] max-h-[140px] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};