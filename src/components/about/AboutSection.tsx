"use client";

import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

export default function AboutSection() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          <FadeIn>
            <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-violet-950 via-burgundy to-charcoal">
              <Image
                src="/About_Artist_Portrait.png"
                alt="Portrait of Julio Parejo"
                fill
                className="object-cover object-center"
                sizes="(min-width: 768px) 40vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
            </div>
          </FadeIn>

          <div className="flex flex-col justify-center">
            <FadeIn>
              <p className="text-xs tracking-[0.4em] uppercase opacity-40">About the Artist</p>
              <h1 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">
                Julio Parejo
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="mt-8 leading-relaxed opacity-70">
                A multidisciplinary artist whose journey spans musical theatre in Barcelona,
                fashion in London, and the vibrant cultural landscape of Mexico. Julio&apos;s work
                lives at the intersection of personal narrative and universal emotion — turning
                private grief into shared experience.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-6 leading-relaxed opacity-70">
                <em>2025: A Year of Closing Cycles</em> is his most personal exhibition to date —
                six works that document a year of profound endings and hard-won renewal. Each piece
                is both autobiography and invitation: an open door for viewers to find their own
                stories within his.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-10 border-l-2 border-violet-accent/30 pl-6">
                <p className="text-xs tracking-[0.3em] uppercase opacity-40">Mission</p>
                <p className="mt-3 font-display text-lg leading-relaxed">
                  To make the invisible visible — grief, displacement, love, and rebirth —
                  through art that honours the full spectrum of human experience.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-10 flex flex-wrap gap-6">
                <a
                  href="https://www.instagram.com/julystresss/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.3em] uppercase opacity-50 transition-opacity hover:opacity-100"
                  data-cursor-hover
                >
                  Instagram
                </a>
                <a
                  href="mailto:julystresss@gmail.com"
                  className="text-xs tracking-[0.3em] uppercase opacity-50 transition-opacity hover:opacity-100"
                  data-cursor-hover
                >
                  Email
                </a>
                <a
                  href="#"
                  className="text-xs tracking-[0.3em] uppercase opacity-50 transition-opacity hover:opacity-100"
                  data-cursor-hover
                >
                  Portfolio
                </a>
              </div>
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-24 border-t border-charcoal/5 pt-16 dark:border-warm-white/5">
            <p className="text-xs tracking-[0.4em] uppercase opacity-40">Creative Journey</p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { place: "Barcelona", field: "Musical Theatre" },
                { place: "London", field: "Fashion & Design" },
                { place: "Mexico", field: "Cultural Immersion" },
                { place: "2025", field: "Fine Art Exhibition" },
              ].map((item) => (
                <div key={item.place}>
                  <p className="font-display text-xl">{item.place}</p>
                  <p className="mt-1 text-sm opacity-50">{item.field}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
