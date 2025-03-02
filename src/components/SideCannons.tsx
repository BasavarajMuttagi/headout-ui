import confetti from "canvas-confetti";
import { forwardRef, useImperativeHandle, useRef } from "react";

export const ConfettiSideCannons = forwardRef((_, ref) => {
  const cannonRef = useRef<number | null>(null);

  useImperativeHandle(ref, () => ({
    fire: () => {
      if (cannonRef.current) return;

      const end = Date.now() + 3 * 1000; // 3 seconds
      const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

      const frame = () => {
        if (Date.now() > end) {
          cannonRef.current = null;
          return;
        }

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });

        cannonRef.current = requestAnimationFrame(frame);
      };

      frame();
    },
  }));

  return null; // This component doesn't render anything visible
});

ConfettiSideCannons.displayName = "ConfettiSideCannons";
