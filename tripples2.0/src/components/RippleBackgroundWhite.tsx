
interface RippleBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  rippleCount?: number;
  animationDuration?: number;
  rippleOriginY?: number;
  /** hex or any CSS color string for the section bg — wave fill matches the NEXT section */
  nextSectionBg?: string;
}

export const RippleBackgroundWhite: React.FC<RippleBackgroundProps> = ({
  children,
  className = "",
  rippleCount = 5,
  animationDuration = 5,
  rippleOriginY = 62,
  nextSectionBg = "#ffffff",
}) => {
  const ripples = Array.from({ length: rippleCount }, (_, i) => i);
  const totalCycle = animationDuration * rippleCount;
  const interval = animationDuration;

  const styles = `
    .ripple-wrapper {
      position: relative;
      display: flex;
      width: 100%;
      /* overflow visible so the wave SVG can bleed below */
      overflow: visible;
      align-items: center;
      justify-content: center;
      background: linear-gradient(160deg, #b8dce8 0%, #5fb3c8 45%, #2a7f99 100%);
    }

    /* Separate clip container so ripple rings are clipped but wave is not */
    .ripple-rings-clip {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
    }

    .ripple-ring {
      position: absolute;
      top: ${rippleOriginY}%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: none;
      background-color: #c8e8f0;
      box-shadow:
        inset 10px 10px 20px rgba(255, 255, 255, 0.45),
        inset -10px -10px 20px rgba(60, 140, 160, 0.3);
      animation: ripple-expand ${totalCycle}s linear infinite backwards;
      pointer-events: none;
      will-change: width, height, opacity;
    }

    ${ripples
      .map(
        (i) => `
      .ripple-ring:nth-child(${i + 1}) {
        animation-delay: ${i * interval}s;
      }
    `
      )
      .join("")}

    @keyframes ripple-expand {
      0%   { width: 20px;  height: 20px;  opacity: 1; }
      100% { width: min(1400px, 160vw); height: min(700px, 90vw); opacity: 0; }
    }

    @media (max-width: 768px) {
      @keyframes ripple-expand {
        0%   { width: 10px; height: 10px; opacity: 1; }
        100% { width: min(900px, 150vw); height: min(450px, 80vw); opacity: 0; }
      }
    }

    @media (max-width: 480px) {
      @keyframes ripple-expand {
        0%   { width: 8px; height: 8px; opacity: 1; }
        100% { width: 140vw; height: 80vw; opacity: 0; }
      }
    }

    .ripple-content {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      box-sizing: border-box;
    }

    /* Wave sits at the very bottom, on top of everything */
    .ripple-wave {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      line-height: 0;
      z-index: 20;
      pointer-events: none;
    }

    .ripple-wave svg {
      display: block;
      width: 100%;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className={`ripple-wrapper ${className}`}>

        {/* Rings — clipped inside their own container */}
        <div className="ripple-rings-clip">
          {ripples.map((i) => (
            <div key={i} className="ripple-ring" />
          ))}
        </div>

        {/* Page content */}
        <div className="ripple-content">{children}</div>

        {/* Wave — outside the clip container, bleeds below the section */}
        <div className="ripple-wave">
          <svg
            viewBox="0 0 1440 90"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C240,85 480,0 720,45 C960,90 1200,5 1440,42 L1440,90 L0,90 Z"
              fill={nextSectionBg}
            />
          </svg>
        </div>

      </div>
    </>
  );
};