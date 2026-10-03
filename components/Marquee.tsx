'use client';

import { useEffect, useRef } from 'react';

export default function Marquee({ names }: { names: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const items = [...names, ...names, ...names, ...names];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }], { duration: 38000, iterations: Infinity });
  }, []);

  return (
    <div style={{ marginTop: 'clamp(48px,6vw,80px)', borderTop: '1px solid var(--deep-line)', borderBottom: '1px solid var(--deep-line)', padding: 'clamp(22px,3vw,36px) 0', overflow: 'hidden' }}>
      <div ref={ref} style={{ display: 'flex', width: 'max-content', alignItems: 'center', willChange: 'transform' }}>
        {items.map((name, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 'none' }}>
            <span
              style={{
                fontFamily: 'var(--font-fraunces), Georgia, serif',
                fontWeight: 400,
                fontSize: 'clamp(34px,5vw,72px)',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
                color: 'var(--on-deep)',
                padding: '0 clamp(24px,3vw,44px)',
              }}
            >
              {name}
            </span>
            <svg viewBox="0 0 20 20" style={{ width: 14, height: 14, flex: 'none' }} aria-hidden="true">
              <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="var(--on-deep-muted)" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
