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
    rotate: -45, // resting position (low speed)
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  animate: {
    // revving pattern: left → right → settle → higher → return
    rotate: [-25, 20, 20, 20, -45],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      times: [0, 0.3, 0.5, 0.8, 1],
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
            timeoutRef.current = setTimeout(run, 1200); // delay between loops
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
          {/* Static speedometer background */}
          <path d="M3.34 19a10 10 0 1 1 17.32 0" />

          {/* Animated needle group – pivot at the base (12,14) */}
          <motion.g
            animate={controls}
            initial="normal"
            variants={PATH_VARIANTS}
            style={{
              transformOrigin: '12px 14px', // needle base
            }}
          >
            <path d="m12 14 4-4" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

SpeedIcon.displayName = "SpeedIcon";

export { SpeedIcon };