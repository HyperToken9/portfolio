/**
 * Runs `fn` once the page has stopped scrolling for a moment (and the browser
 * is idle), so work like starting a video or updating the URL stays out of
 * the frames a scroll needs. Returns a function that cancels it.
 */
export function whenScrollSettles(fn: () => void, quiet = 180) {
  let timer = 0;
  let idle = 0;

  const arm = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      window.removeEventListener("scroll", arm);
      idle = hasIdleCallback()
        ? window.requestIdleCallback(fn, { timeout: 500 })
        : window.setTimeout(fn, 0);
    }, quiet);
  };

  window.addEventListener("scroll", arm, { passive: true });
  arm();

  return () => {
    window.clearTimeout(timer);
    window.removeEventListener("scroll", arm);
    if (hasIdleCallback()) window.cancelIdleCallback(idle);
    else window.clearTimeout(idle);
  };
}

// Safari has no requestIdleCallback, though the DOM types say it always exists.
function hasIdleCallback() {
  return typeof (window as Partial<Window>).requestIdleCallback === "function";
}
