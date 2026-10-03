'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ElementType, ReactNode } from 'react';
import { observeReveal } from '@/lib/revealObserver';

type RevealProps = {
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  [key: string]: unknown;
};

export default function Reveal({ as: Tag = 'div', delay = 0, style, className, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // One-time client-only correction (motion preference unknown at SSR time), not a render-time read.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    return observeReveal(el, () => setVisible(true));
  }, []);

  const revealTransition = `opacity .45s ease ${delay}ms, transform .55s cubic-bezier(.2,.7,.2,1) ${delay}ms`;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(12px)',
        ...style,
        transition: [revealTransition, style?.transition].filter(Boolean).join(', '),
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
