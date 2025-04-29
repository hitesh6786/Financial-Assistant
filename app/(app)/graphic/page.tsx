"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";

import { AnimatedBeam } from "@/components/ui/animated-beam";
import { Beef, Brain, ChartCandlestick, Coins, Droplet, Wallet } from "lucide-react";
import { Logo } from "@/components/ui";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex flex-col gap-1 size-24 items-center justify-center rounded-full border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

const GraphicPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex h-[800px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-10 md:shadow-xl"
      ref={containerRef}
    >
      <div className="flex size-full flex-col max-w-lg max-h-[200px] items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
            <Wallet className="size-8" />
            <p className="text-sm font-bold">
                Wallet
            </p>
          </Circle>
          <Circle ref={div5Ref}>
            <Coins className="size-8" />
            <p className="text-sm font-bold">
                Tokens
            </p>
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
            <ChartCandlestick className="size-8" />
            <p className="text-sm font-bold">
                Trading
            </p>
          </Circle>
          <Circle ref={div4Ref} className="size-28 border-brand-600 dark:border-brand-600">
            <Logo 
                className="size-20"
            />
          </Circle>
          <Circle ref={div6Ref}>
            <Droplet className="size-8" />
            <p className="text-sm font-bold">
                Liquidity
            </p>
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
            <Beef className="size-8" />
            <p className="text-sm font-bold">
                Staking
            </p>
          </Circle>
          <Circle ref={div7Ref}>
            <Brain className="size-8" />
            <p className="text-sm font-bold">
                Knowledge
            </p>
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse={true}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
        reverse={true}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse={true}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
    </div>
  );
}

export default GraphicPage;