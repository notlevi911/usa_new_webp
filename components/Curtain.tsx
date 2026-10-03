'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import CompassMark from './CompassMark';

const LABELS: Record<string, string> = {
  '/': 'Home',
  '/products': 'Products',
  '/contact': 'Contact',
};

function labelFor(path: string) {
  if (path.startsWith('/products')) return LABELS['/products'];
  if (path.startsWith('/contact')) return LABELS['/contact'];
  return LABELS['/'];
}

export default function Curtain() {
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const prevPath = useRef(pathname);
  const label = useRef('');

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    label.current = labelFor(pathname);

    const c = curtainRef.current;
    if (!c) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lab = labelRef.current;
    const mk = markRef.current;
    if (lab) lab.textContent = label.current;
    const E = 'cubic-bezier(.76,0,.24,1)';

    lab?.animate(
      [
        { opacity: 0, transform: 'translateY(28px)' },
        { opacity: 1, transform: 'none' },
      ],
      { duration: 520, delay: 260, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'both' }
    );
    mk?.animate(
      [
        { transform: 'rotate(-180deg) scale(.5)', opacity: 0 },
        { transform: 'rotate(0deg) scale(1)', opacity: 1 },
      ],
      { duration: 760, delay: 140, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'both' }
    );

    const inAnim = c.animate(
      [{ transform: 'translateY(101%)' }, { transform: 'translateY(0)' }],
      { duration: 560, easing: E, fill: 'forwards' }
    );
    inAnim.onfinish = () => {
      setTimeout(() => {
        const outAnim = c.animate(
          [{ transform: 'translateY(0)' }, { transform: 'translateY(-101%)' }],
          { duration: 680, easing: E, fill: 'forwards' }
        );
        outAnim.onfinish = () => {
          c.getAnimations({ subtree: true }).forEach((a) => a.cancel());
        };
      }, 380);
    };
  }, [pathname]);

  return (
    <div
      ref={curtainRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'var(--deep)',
        transform: 'translateY(101%)',
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
      }}
    >
      <span ref={markRef} style={{ display: 'block' }}>
        <CompassMark size={48} style={{ color: 'var(--on-deep)' }} />
      </span>
      <span
        ref={labelRef}
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontWeight: 600,
          fontSize: 'clamp(32px,4.4vw,56px)',
          letterSpacing: '-0.02em',
          color: 'var(--on-deep)',
        }}
      />
    </div>
  );
}
