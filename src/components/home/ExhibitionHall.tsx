"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { artworks, type Artwork, type HoverEffect } from "@/data/artworks";
import FadeIn from "@/components/ui/FadeIn";

import MobileArtworkSwipe from "./MobileArtworkSwipe";

export default function ExhibitionHall() {
  return (
    <section id="exhibition" className="relative">
      <MobileArtworkSwipe />

      <div className="hidden px-6 py-24 md:block md:px-12 md:py-32">
        <FadeIn>
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-xs tracking-[0.4em] uppercase opacity-40">The Exhibition</p>
            <h2 className="mt-4 font-display text-4xl tracking-tight md:text-6xl">
              Six Rooms
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-sm opacity-50">
              Enter each room. Spend time with each piece. Let the journey unfold.
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="hidden flex-col gap-10 pb-24 md:flex md:px-12 lg:gap-16 lg:pb-32">
        {artworks.map((artwork, i) => (
          <ArtworkRoom key={artwork.slug} artwork={artwork} index={i} />
        ))}
      </div>
    </section>
  );
}

function ArtworkRoom({ artwork, index }: { artwork: Artwork; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const imageOnRight = index % 2 === 0;

  return (
    <FadeIn
      duration={1}
      direction={imageOnRight ? "left" : "right"}
      className="mx-auto w-full max-w-7xl"
    >
      <Link
        href={`/exhibition/${artwork.slug}`}
        className="group block"
        data-cursor-hover
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <article className="overflow-hidden rounded-[2rem] border border-charcoal/10 bg-warm-white/70 shadow-[0_30px_80px_rgba(17,17,17,0.08)] transition-transform duration-500 group-hover:-translate-y-1 dark:border-warm-white/10 dark:bg-[#171717] dark:shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <div className="grid items-stretch md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`relative flex min-h-[420px] flex-col justify-between px-8 py-10 lg:min-h-[640px] lg:px-14 lg:py-14 xl:px-16 xl:py-16 ${
                imageOnRight ? "md:order-1" : "md:order-2"
              }`}
            >
              <div className="pointer-events-none absolute top-6 right-6 font-display text-7xl leading-none text-charcoal/[0.06] dark:text-warm-white/[0.05] xl:text-8xl">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="relative z-10 max-w-xl">
                <span className="text-xs tracking-[0.35em] uppercase opacity-45">
                  Room {String(index + 1).padStart(2, "0")} &mdash; {artwork.year}
                </span>
                <h3 className="mt-4 font-display text-4xl leading-none tracking-tight lg:text-5xl xl:text-6xl">
                  {artwork.title}
                </h3>
                <p className="mt-6 max-w-lg text-sm leading-7 opacity-65 lg:text-base">
                  {artwork.story}
                </p>
              </div>

              <div className="relative z-10 mt-10 max-w-xl">
                <div className="border-l border-violet-accent/35 pl-5">
                  <p className="text-xs tracking-[0.3em] uppercase opacity-40">Meaning</p>
                  <p className="mt-3 font-display text-xl leading-relaxed opacity-90 lg:text-2xl">
                    {artwork.meaning}
                  </p>
                </div>

                <motion.span
                  className="mt-8 inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase opacity-50 transition-opacity group-hover:opacity-90"
                  animate={{ x: isHovered ? 10 : 0 }}
                  transition={{ duration: 0.35 }}
                >
                  Enter Room
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-current/20">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </motion.span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className={imageOnRight ? "md:order-2" : "md:order-1"}
            >
              <ArtworkVisual artwork={artwork} isHovered={isHovered} index={index} />
            </motion.div>
          </div>
        </article>
      </Link>
    </FadeIn>
  );
}

function ArtworkVisual({
  artwork,
  isHovered,
  index,
}: {
  artwork: Artwork;
  isHovered: boolean;
  index: number;
}) {
  return (
    <div
      className={`relative min-h-[420px] overflow-hidden bg-gradient-to-br ${artwork.gradient} artwork-gradient lg:min-h-[640px]`}
    >
      <Image
        src={artwork.imageSrc}
        alt={artwork.imageAlt}
        fill
        className={`transition-transform duration-[1600ms] ${
          artwork.imageFit === "contain"
            ? "object-contain p-6 lg:p-10"
            : "object-cover object-center"
        } ${isHovered ? "scale-105" : "scale-100"}`}
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal/10 via-transparent to-charcoal/55 dark:from-charcoal/20 dark:to-charcoal/70" />
      <HoverEffectLayer effect={artwork.hoverEffect} isHovered={isHovered} accentColor={artwork.accentColor} />

      <div className="pointer-events-none absolute inset-6 border border-warm-white/12" />
      <div className="absolute right-6 bottom-6 left-6 flex items-end justify-between gap-6">
        <div>
          <p className="text-[10px] tracking-[0.35em] uppercase text-warm-white/60">
            Exhibition Room
          </p>
          <p className="mt-2 font-display text-2xl text-warm-white lg:text-3xl">
            {artwork.title}
          </p>
        </div>
        <p className="font-display text-5xl leading-none text-warm-white/20">
          {String(index + 1).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}

function HoverEffectLayer({
  effect,
  isHovered,
  accentColor,
}: {
  effect: HoverEffect;
  isHovered: boolean;
  accentColor: string;
}) {
  switch (effect) {
    case "door":
      return <DoorEffect isHovered={isHovered} />;
    case "coins":
      return <CoinsEffect isHovered={isHovered} accentColor={accentColor} />;
    case "butterflies":
      return <ButterfliesEffect isHovered={isHovered} accentColor={accentColor} />;
    case "heartbeat":
      return <HeartbeatEffect isHovered={isHovered} accentColor={accentColor} />;
    case "warmth":
      return <SmokeEffect isHovered={isHovered} accentColor={accentColor} />;
    default:
      return <SmokeEffect isHovered={isHovered} accentColor={accentColor} />;
  }
}

function DoorEffect({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="relative h-64 w-40 border-2 border-warm-white/20 md:h-80 md:w-48"
        animate={{ rotateY: isHovered ? 15 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ perspective: 1000 }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 w-1/2 origin-left border-r border-warm-white/10 bg-warm-white/5"
          animate={{ rotateY: isHovered ? -25 : 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="absolute top-1/2 right-3 h-2 w-2 -translate-y-1/2 rounded-full bg-warm-white/30" />
        <motion.div
          className="absolute inset-0 bg-violet-accent/10"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 1 }}
        />
      </motion.div>
    </div>
  );
}

function CoinsEffect({ isHovered, accentColor }: { isHovered: boolean; accentColor: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-10 w-10 rounded-full border-2 md:h-14 md:w-14"
          style={{
            borderColor: accentColor,
            left: `${30 + Math.cos((i / 8) * Math.PI * 2) * 20}%`,
            top: `${40 + Math.sin((i / 8) * Math.PI * 2) * 15}%`,
          }}
          animate={{
            rotateY: isHovered ? 360 : 0,
            rotateX: isHovered ? 180 : 0,
          }}
          transition={{ duration: 2, delay: i * 0.1, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function ButterfliesEffect({ isHovered, accentColor }: { isHovered: boolean; accentColor: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${15 + i * 14}%`,
            top: `${25 + (i % 3) * 20}%`,
            color: accentColor,
          }}
          animate={
            isHovered
              ? {
                  x: [0, 30, -20, 40, 0],
                  y: [0, -40, -20, -50, 0],
                  rotate: [0, 15, -10, 20, 0],
                }
              : { y: [0, -8, 0] }
          }
          transition={{
            duration: isHovered ? 4 : 3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity={0.6}>
            <path d="M12 2C8 6 4 8 4 12s4 6 8 10c4-4 8-6 8-10s-4-6-8-10zm0 14c-2-2-4-3.5-4-5.5S10 6 12 4c2 2 4 3.5 4 5.5S14 14 12 16z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function HeartbeatEffect({ isHovered, accentColor }: { isHovered: boolean; accentColor: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        animate={isHovered ? { scale: [1, 1.08, 1, 1.06, 1] } : { scale: 1 }}
        transition={isHovered ? { duration: 2, repeat: Infinity } : {}}
      >
        <svg width="80" height="80" viewBox="0 0 24 24" fill={accentColor} opacity={0.3}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </motion.div>
      <div className="absolute h-32 w-48 border border-warm-white/10 md:h-40 md:w-64" />
    </div>
  );
}

function SmokeEffect({ isHovered, accentColor }: { isHovered: boolean; accentColor: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-2xl"
          style={{
            width: 60 + i * 20,
            height: 60 + i * 20,
            backgroundColor: accentColor,
            left: `${40 + i * 5}%`,
            bottom: `${20 + i * 5}%`,
          }}
          animate={{
            y: isHovered ? [-20, -60, -40] : [-10, -30, -20],
            x: [0, 10, -5],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
