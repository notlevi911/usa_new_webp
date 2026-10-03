'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useEnquiry } from '@/context/EnquiryContext';
import TransitionLink from './TransitionLink';

export default function EnquiryPill() {
  const { count } = useEnquiry();
  const pathname = usePathname();
  const ref = useRef<HTMLAnchorElement>(null);
  const prevCount = useRef(count);

  useEffect(() => {
    if (count > prevCount.current && ref.current) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced) {
        ref.current.animate(
          [{ transform: 'scale(1)' }, { transform: 'scale(1.08)' }, { transform: 'scale(1)' }],
          { duration: 380, easing: 'ease-out' }
        );
      }
    }
    prevCount.current = count;
  }, [count]);

  if (count === 0 || pathname === '/contact') return null;

  return (
    <TransitionLink
      ref={ref}
      href="/contact"
      style={{
        position: 'fixed',
        right: 'clamp(16px,3vw,32px)',
        bottom: 'clamp(16px,3vw,32px)',
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 14px 12px 20px',
        border: 0,
        borderRadius: 999,
        background: 'var(--ink)',
        color: 'var(--paper)',
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer',
        boxShadow: '0 16px 40px -16px rgba(20,28,22,.6)',
        transition: 'transform .25s ease',
      }}
    >
      Enquiry list{' '}
      <span
        style={{
          minWidth: 26,
          height: 26,
          padding: '0 8px',
          borderRadius: 999,
          background: 'var(--paper)',
          color: 'var(--ink)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {count}
      </span>
    </TransitionLink>
  );
}
