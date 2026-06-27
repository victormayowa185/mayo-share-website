"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

export interface SpeedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SpeedIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  loop?: boolean;
}

const PATH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.3 },
  },
  animate: {
    opacity: [0, 1],
    rotate: [0, 360],
    transition: {
      duration: 0.6,
      ease: "linear",
    },
  },
};

const SpeedIcon = forwardRef<SpeedIconHandle, SpeedIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, loop = false, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    useEffect(() => {
      if (loop) {
        const run = () => {
          controls.start("animate").then(() => {
            timeoutRef.current = setTimeout(run, 1200);
          });
        };
        run();
        return () => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
      }
    }, [loop, controls]);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!loop && !isControlledRef.current) {
        controls.start("animate");
      }
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!loop && !isControlledRef.current) {
        controls.start("normal");
      }
      onMouseLeave?.(e);
    };

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
          <path d="M3.34 19a10 10 0 1 1 17.32 0" />
          <motion.path
            animate={controls}
            d="m12 14 4-4"
            variants={PATH_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

SpeedIcon.displayName = "SpeedIcon";

export { SpeedIcon };