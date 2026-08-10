"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Artwork } from "@/data/artworks";
import FadeIn from "@/components/ui/FadeIn";

interface ArtworkDetailProps {
  artwork: Artwork;
  prev: Artwork | null;
  next: Artwork | null;
}

export default function ArtworkDetail({ artwork, prev, next }: ArtworkDetailProps) {
  return (
    <article>
      <section className={`relative flex min-h-[80vh] items-end bg-gradient-to-br ${artwork.gradient} artwork-gradient`}>
        <Image
          src={artwork.imageSrc}
          alt={artwork.imageAlt}
          fill
          priority
          className={
            artwork.imageFit === "contain"
              ? "object-contain p-2 md:p-4"
              : "object-cover object-center"
          }
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="relative z-10 w-full px-6 pb-16 pt-32 md:px-12 md:pb-24">
          <FadeIn>
            <Link
              href="/#exhibition"
              className="mb-8 inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase opacity-50 transition-opacity hover:opacity-100"
              data-cursor-hover
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Exhibition
            </Link>
            <p className="text-xs tracking-[0.3em] uppercase opacity-50">{artwork.year}</p>
            <h1 className="mt-3 font-display text-5xl tracking-tight md:text-7xl lg:text-8xl">
              {artwork.title}
            </h1>
          </FadeIn>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase opacity-40">Curator&apos;s Note</p>
            <p className="mt-6 text-lg leading-relaxed opacity-80 md:text-xl">{artwork.curatorNote}</p>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-charcoal/5 px-6 py-20 dark:border-warm-white/5 md:px-12 md:py-32">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase opacity-40">Artist&apos;s Words</p>
            <p className="mt-6 font-display text-2xl leading-relaxed md:text-3xl">{artwork.personalText}</p>
          </FadeIn>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-sm bg-gradient-to-br ${artwork.gradient} artwork-gradient`}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0"
              >
                <Image
                  src={artwork.imageSrc}
                  alt={artwork.imageAlt}
                  fill
                  className="object-contain p-2 md:p-4"
                  sizes="(min-width: 768px) 80vw, 100vw"
                />
              </motion.div>
              <div className="absolute inset-0 bg-charcoal/10" />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-charcoal/5 px-6 py-20 dark:border-warm-white/5 md:px-12 md:py-32">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase opacity-40">Behind the Symbolism</p>
            <p className="mt-6 leading-relaxed opacity-70">{artwork.symbolism}</p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-12 border-l-2 border-violet-accent/30 pl-6">
              <p className="text-xs tracking-[0.3em] uppercase opacity-40">Meaning</p>
              <p className="mt-4 font-display text-xl leading-relaxed md:text-2xl">{artwork.meaning}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-charcoal/5 px-6 py-16 dark:border-warm-white/5 md:px-12">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          {prev ? (
            <Link
              href={`/exhibition/${prev.slug}`}
              className="group flex flex-col gap-1"
              data-cursor-hover
            >
              <span className="text-xs tracking-[0.3em] uppercase opacity-40">Previous</span>
              <span className="font-display text-lg transition-opacity group-hover:opacity-70 md:text-xl">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/exhibition/${next.slug}`}
              className="group flex flex-col items-end gap-1 text-right"
              data-cursor-hover
            >
              <span className="text-xs tracking-[0.3em] uppercase opacity-40">Next</span>
              <span className="font-display text-lg transition-opacity group-hover:opacity-70 md:text-xl">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </article>
  );
}
