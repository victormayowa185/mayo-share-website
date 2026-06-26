"use client";

import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

export interface WifiIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface WifiIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  loop?: boolean;
}

const WIFI_LEVELS = [
  { d: "M12 20h.01", initialOpacity: 1, delay: 0 },
  { d: "M8.5 16.429a5 5 0 0 1 7 0", initialOpacity: 1, delay: 0.1 },
  { d: "M5 12.859a10 10 0 0 1 14 0", initialOpacity: 1, delay: 0.2 },
  { d: "M2 8.82a15 15 0 0 1 20 0", initialOpacity: 1, delay: 0.3 },
];

const WifiIcon = forwardRef<WifiIconHandle, WifiIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, loop = false, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    const intervalRef = useRef<ReturnType<typeof setInterval>>();

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: async () => {
          await controls.start("fadeOut");
          controls.start("fadeIn");
        },
        stopAnimation: () => controls.start("fadeIn"),
      };
    });

    // Auto‑start loop if requested
    useEffect(() => {
      if (loop) {
        const run = async () => {
          await controls.start("fadeOut");
          controls.start("fadeIn");
        };
        run();
        intervalRef.current = setInterval(run, 1500);
        return () => {
          if (intervalRef.current) clearInterval(intervalRef.current);
        };
      }
    }, [loop, controls]);

    const handleMouseEnter = useCallback(
      async (e: React.MouseEvent<HTMLDivElement>) => {
        if (!loop && !isControlledRef.current) {
          await controls.start("fadeOut");
          controls.start("fadeIn");
        }
        onMouseEnter?.(e);
      },
      [controls, onMouseEnter, loop]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!loop && !isControlledRef.current) {
          controls.start("fadeIn");
        }
        onMouseLeave?.(e);
      },
      [controls, onMouseLeave, loop]
    );

    return (
      <div
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          {WIFI_LEVELS.map((level, index) => (
            <motion.path
              animate={controls}
              d={level.d}
              initial={{ opacity: level.initialOpacity }}
              key={index}
              variants={{
                fadeOut: {
                  opacity: index === 0 ? 1 : 0,
                  transition: { duration: 0.2 },
                },
                fadeIn: {
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: level.delay,
                  },
                },
              }}
            />
          ))}
        </svg>
      </div>
    );
  }
);

WifiIcon.displayName = "WifiIcon";

export { WifiIcon };