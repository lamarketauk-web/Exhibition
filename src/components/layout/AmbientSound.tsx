"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AUDIO_SRC = "/rosalia_v2.mp3";
const STORAGE_KEY = "exhibition-ambient-sound-muted";
const DEFAULT_VOLUME = 0.18;

let sharedAudio: HTMLAudioElement | null = null;
let sharedMuted = true;
const subscribers = new Set<(muted: boolean) => void>();

function notifySubscribers() {
  // ds
  subscribers.forEach((subscriber) => subscriber(sharedMuted));
}

function ensureAudio() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!sharedAudio) {
    sharedAudio = new Audio(AUDIO_SRC);
    sharedAudio.loop = true;
    sharedAudio.preload = "auto";
    sharedAudio.muted = sharedMuted;
  }

  sharedAudio.volume = DEFAULT_VOLUME;

  return sharedAudio;
}

export default function AmbientSound() {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMuted = window.localStorage.getItem(STORAGE_KEY);
      if (storedMuted !== null) {
        sharedMuted = storedMuted === "true";
      }
    }

    const audio = ensureAudio();
    if (audio) {
      audio.muted = sharedMuted;
    }

    setIsMuted(sharedMuted);

    const handleMuteChange = (muted: boolean) => setIsMuted(muted);
    subscribers.add(handleMuteChange);

    return () => {
      subscribers.delete(handleMuteChange);
    };
  }, []);

  const toggleSound = async () => {
    const audio = ensureAudio();
    if (!audio) return;

    const nextMuted = !sharedMuted;
    sharedMuted = nextMuted;

    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, String(nextMuted));
    }

    if (nextMuted) {
      audio.muted = true;
      audio.pause();
    } else {
      audio.muted = false;

      try {
        await audio.play();
      } catch {
        sharedMuted = true;
        audio.muted = true;
        if (typeof window !== "undefined") {
          window.localStorage.setItem(STORAGE_KEY, "true");
        }
      }
    }

    notifySubscribers();
  };

  return (
    <button
      onClick={() => {
        void toggleSound();
      }}
      aria-label={isMuted ? "Enable ambient sound" : "Mute ambient sound"}
      className="group flex items-center gap-2 rounded-full border border-charcoal/10 px-4 py-2 text-xs tracking-widest uppercase transition-colors hover:border-violet-accent/50 dark:border-warm-white/10"
      data-cursor-hover
    >
      <motion.span
        animate={{ opacity: isMuted ? 0.4 : 1 }}
        className="flex items-center gap-2"
      >
        {isMuted ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
        <span>{isMuted ? "Sound Off" : "Sound On"}</span>
      </motion.span>
    </button>
  );
}
