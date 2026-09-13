"use client";

import { useEffect, useRef, useState } from "react";
import { whenScrollSettles } from "@/components/scrollIdle";

/**
 * A muted clip that loops like a GIF. The poster frame is a plain image, and
 * the clip itself isn't attached until the card is on screen and scrolling has
 * stopped, so starting a video can never land in the middle of a scroll. A
 * small loader sits over the poster until the clip is actually playing, then
 * the video fades in. Off screen it pauses. With reduced motion only the
 * poster shows.
 */
export function LoopVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [attached, setAttached] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    let visible = false;
    let cancel = () => {};

    const start = () => {
      cancel();
      cancel = whenScrollSettles(() => {
        if (!visible) return;
        // set directly so the source is in place before play() is called
        if (!video.getAttribute("src")) video.src = src;
        setAttached(true);
        video.play().catch(() => {});
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else {
        cancel();
        if (!video.paused) video.pause();
      }
    });
    observer.observe(video);
    return () => {
      cancel();
      observer.disconnect();
    };
  }, [src]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        aria-hidden
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={ref}
        aria-label={label}
        muted
        loop
        playsInline
        preload="none"
        onPlaying={() => setPlaying(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${playing ? "opacity-100" : "opacity-0"}`}
      />
      {attached && !playing ? <Loader /> : null}
    </>
  );
}

function Loader() {
  return (
    <span
      role="status"
      className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border-[1.25px] border-ink bg-paper-2 px-2.5 py-1.5"
      style={{ boxShadow: "2px 2px 0 var(--ink)" }}
    >
      <span className="sr-only">Loading video</span>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden
          className="video-loader-dot h-1.5 w-1.5 rounded-full bg-ink"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}
