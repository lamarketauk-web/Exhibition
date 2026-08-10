"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { artworks } from "@/data/artworks";
import FadeIn from "@/components/ui/FadeIn";

export default function MobileArtworkSwipe() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    const next = currentIndex + newDirection;
    if (next >= 0 && next < artworks.length) {
      setDirection(newDirection);
      setCurrentIndex(next);
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) paginate(1);
    else if (info.offset.x > threshold) paginate(-1);
  };

  const artwork = artworks[currentIndex];

  return (
    <section className="md:hidden">
      <div className="px-6 py-16">
        <FadeIn>
          <p className="text-xs tracking-[0.4em] uppercase opacity-40">Swipe to explore</p>
          <h2 className="mt-2 font-display text-3xl">The Exhibition</h2>
        </FadeIn>
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="px-6"
          >
            <Link href={`/exhibition/${artwork.slug}`}>
              <div
                className={`relative flex min-h-[60vh] flex-col justify-end overflow-hidden rounded-sm bg-gradient-to-br ${artwork.gradient} p-8`}
              >
                <Image
                  src={artwork.imageSrc}
                  alt={artwork.imageAlt}
                  fill
                  className={
                    artwork.imageFit === "contain"
                      ? "object-contain p-2"
                      : "object-cover object-center"
                  }
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-charcoal/30" />
                <div className="relative z-10">
                  <span className="text-xs tracking-[0.3em] uppercase opacity-50">
                    {String(currentIndex + 1).padStart(2, "0")} / {String(artworks.length).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-3xl">{artwork.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed opacity-70">{artwork.story}</p>
                  <span className="mt-6 inline-block text-xs tracking-[0.3em] uppercase opacity-50">
                    Tap to enter &rarr;
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-center gap-2">
          {artworks.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all ${
                i === currentIndex ? "w-6 bg-violet-accent" : "w-1.5 bg-charcoal/20 dark:bg-warm-white/20"
              }`}
              aria-label={`Go to artwork ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
