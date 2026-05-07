import React from "react";

interface RippleBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  rippleCount?: number;
  animationDuration?: number;
  rippleOriginY?: number;
}

export const RippleBackgroundWhite: React.FC<RippleBackgroundProps> = ({
  children,
  className = "",
  rippleCount = 5,
  animationDuration = 5,
  rippleOriginY = 62,
}) => {
  const ripples = Array.from({ length: rippleCount }, (_, i) => i);
  const totalCycle = animationDuration * rippleCount;
  const interval = animationDuration;

  const styles = `
    .ripple-wrapper {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      min-height: 600px;
      align-items: center;
      justify-content: center;
      background: linear-gradient(160deg, #b8dce8 0%, #5fb3c8 45%, #2a7f99 100%);
      overflow: hidden;
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
      /*
        totalCycle duration = seamless loop (no gap between rings).
        animation-fill-mode: backwards = hides each ring BEFORE its delay
        starts, so no white flash while waiting.
      */
      animation: ripple-expand ${totalCycle}s linear infinite backwards;
      pointer-events: none;
      will-change: width, height, opacity;
    }

    ${ripples
      .map(
        (i) => `
      .ripple-ring:nth-child(${i + 1}) {
        /* Positive delay = startup stagger effect (ring appears one by one) */
        /* After first cycle, loops seamlessly due to totalCycle duration */
        animation-delay: ${i * interval}s;
      }
    `
      )
      .join("")}

    @keyframes ripple-expand {
      0% {
        width: 20px;
        height: 20px;
        opacity: 1;
      }
      100% {
        width: min(1400px, 160vw);
        height: min(700px, 90vw);
        opacity: 0;
      }
    }

    @media (max-width: 768px) {
      @keyframes ripple-expand {
        0% {
          width: 10px;
          height: 10px;
          opacity: 1;
        }
        100% {
          width: min(900px, 150vw);
          height: min(450px, 80vw);
          opacity: 0;
        }
      }
    }

    @media (max-width: 480px) {
      @keyframes ripple-expand {
        0% {
          width: 8px;
          height: 8px;
          opacity: 1;
        }
        100% {
          width: 140vw;
          height: 80vw;
          opacity: 0;
        }
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
      padding: 2rem;
      box-sizing: border-box;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className={`ripple-wrapper ${className}`}>
        {ripples.map((i) => (
          <div key={i} className="ripple-ring" />
        ))}
        <div className="ripple-content">{children}</div>
      </div>
    </>
  );
};