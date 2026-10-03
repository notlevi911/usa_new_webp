// A single shared IntersectionObserver for every <Reveal> instance on the page,
// instead of each one constructing its own. Cuts setup/teardown and per-frame
// observer overhead when a page has dozens of reveal-on-scroll elements.
let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, () => void>();

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callbacks.get(entry.target)?.();
          observer!.unobserve(entry.target);
          callbacks.delete(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: '0px 0px -12% 0px' }
  );
  return observer;
}

export function observeReveal(el: Element, onReveal: () => void) {
  callbacks.set(el, onReveal);
  getObserver().observe(el);
  return () => {
    observer?.unobserve(el);
    callbacks.delete(el);
  };
}
