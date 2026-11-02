"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

interface Reflection {
  id: string;
  name: string;
  text: string;
  created_at: string;
}

interface ReflectionPage {
  reflections: Reflection[];
  hasMore: boolean;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

export default function ReflectionForm() {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newReflection, setNewReflection] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [moreError, setMoreError] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    fetch("/api/reflections?offset=0")
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not load reflections");
        return (await response.json()) as ReflectionPage;
      })
      .then((data) => {
        if (active) {
          setReflections(data.reflections);
          setHasMore(data.hasMore);
        }
      })
      .catch(() => {
        if (active) setLoadError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const loadMore = async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);
    setMoreError(false);
    try {
      const response = await fetch(`/api/reflections?offset=${reflections.length}`);
      const data = (await response.json()) as ReflectionPage;
      if (!response.ok) throw new Error("Could not load more reflections");

      setReflections((current) => [...current, ...data.reflections]);
      setHasMore(data.hasMore);
    } catch {
      setMoreError(true);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/reflections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, text: newReflection, consent, website }),
      });
      const result = (await response.json()) as Reflection & { error?: string };

      if (!response.ok) throw new Error(result.error || "Your reflection could not be sent.");

      setReflections((current) => [result, ...current]);
      setName("");
      setEmail("");
      setNewReflection("");
      setConsent(false);
      setMessage("Thank you. Your reflection is now published.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Your reflection could not be sent.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="text-xs tracking-[0.4em] uppercase opacity-40">Visitor Reflections</p>
          <h2 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">What Stayed With You</h2>
          <p className="mt-6 text-sm opacity-50">
            Share what the exhibition brought up for you. Your reflection will appear here as soon as you submit it.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <form onSubmit={handleSubmit} className="mt-12">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-xs tracking-[0.2em] uppercase opacity-60">
                Name
                <input
                  required
                  autoComplete="name"
                  maxLength={80}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 w-full border border-charcoal/10 bg-transparent px-4 py-3 text-sm normal-case tracking-normal opacity-100 focus:border-violet-accent/50 focus:outline-none dark:border-warm-white/10"
                  placeholder="Your name"
                />
              </label>
              <label className="block text-xs tracking-[0.2em] uppercase opacity-60">
                Email
                <input
                  required
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 w-full border border-charcoal/10 bg-transparent px-4 py-3 text-sm normal-case tracking-normal opacity-100 focus:border-violet-accent/50 focus:outline-none dark:border-warm-white/10"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="mt-5 block text-xs tracking-[0.2em] uppercase opacity-60">
              Your reflection
              <textarea
                required
                maxLength={2000}
                value={newReflection}
                onChange={(event) => setNewReflection(event.target.value)}
                placeholder="This exhibition reminded me of..."
                rows={4}
                className="mt-2 w-full resize-none border border-charcoal/10 bg-transparent px-6 py-4 text-sm leading-relaxed normal-case tracking-normal opacity-100 transition-colors placeholder:opacity-30 focus:border-violet-accent/50 focus:outline-none dark:border-warm-white/10"
              />
            </label>

            <label className="mt-4 flex items-start gap-3 text-xs leading-relaxed opacity-60">
              <input
                required
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                className="mt-0.5 accent-violet-accent"
              />
              <span>I understand my name and reflection will be published. My email address will not be shown.</span>
            </label>

            <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
              <label>
                Leave this field empty
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </label>
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs opacity-40">Your email stays private and is stored with your submission.</p>
              <button
                type="submit"
                disabled={submitting || !name.trim() || !email.trim() || !newReflection.trim() || !consent}
                className="border border-charcoal/20 px-8 py-3 text-xs tracking-[0.3em] uppercase transition-all hover:border-violet-accent disabled:opacity-30 dark:border-warm-white/20"
                data-cursor-hover
              >
                {submitting ? "Sending…" : "Share Reflection"}
              </button>
            </div>
            {message && <p role="status" className="mt-4 text-sm opacity-70">{message}</p>}
          </form>
        </FadeIn>

        <div className="mt-20 flex flex-col gap-8">
          {loading && <p className="text-sm opacity-40">Loading reflections…</p>}
          {!loading && loadError && (
            <p role="status" className="text-sm opacity-50">Reflections are temporarily unavailable. Please try again later.</p>
          )}
          {!loading && !loadError && reflections.length === 0 && (
            <p className="text-sm opacity-40">No reflections have been published yet.</p>
          )}
          {reflections.map((reflection, index) => (
            <FadeIn key={reflection.id} delay={index * 0.05}>
              <motion.blockquote
                className="border-l-2 border-violet-accent/20 pl-6"
                whileHover={{ borderColor: "rgba(139, 126, 200, 0.5)" }}
              >
                <p className="leading-relaxed opacity-70">&ldquo;{reflection.text}&rdquo;</p>
                <cite className="mt-3 block text-xs opacity-40 not-italic">
                  {reflection.name} · {formatDate(reflection.created_at)}
                </cite>
              </motion.blockquote>
            </FadeIn>
          ))}
          {!loading && !loadError && hasMore && (
            <div className="mt-4 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={loadMore}
                disabled={loadingMore}
                className="border border-charcoal/20 px-8 py-3 text-xs tracking-[0.3em] uppercase transition-all hover:border-violet-accent disabled:opacity-40 dark:border-warm-white/20"
                data-cursor-hover
              >
                {loadingMore ? "Loading…" : "See more reflections"}
              </button>
              {moreError && <p role="status" className="text-sm opacity-50">Could not load more reflections. Please try again.</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
