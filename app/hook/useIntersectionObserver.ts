type ObserverProp = {
  target: string[];
  insert: string;
  threshold?: number;
};

// app/hook/useIntersectionObserver.ts
export default function useIntersectionObserver({
  target,
  insert,
  threshold = 0.2,
}: ObserverProp) {
  const observer = new IntersectionObserver(
    (entries) => {
      let delay = 0;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.remove(...target);
          el.classList.add(insert);
          el.style.transitionDelay = `${delay}s`;
          delay += 0.3;
        }
      });
    },
    { threshold: threshold },
  );
  const selector = target.map((cls) => `.${cls}`).join(", ");
  document.querySelectorAll(selector).forEach((el) => observer.observe(el));
  return observer;
}
