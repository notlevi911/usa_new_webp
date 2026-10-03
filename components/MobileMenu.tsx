'use client';

import TransitionLink from './TransitionLink';
import { useEffect, useRef } from 'react';

const ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Product range', href: '/#range' },
  { label: 'Quality', href: '/#quality' },
  { label: 'Clients', href: '/#clients' },
  { label: 'Contact', href: '/contact' },
];

const pad = (n: number) => String(n).padStart(2, '0');

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !menuRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const el = menuRef.current;
    el.animate(
      [{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)' }],
      { duration: 520, easing: 'cubic-bezier(.76,0,.24,1)' }
    );
    el.querySelectorAll('[data-menu-item]').forEach((node, i) => {
      node.animate(
        [
          { opacity: 0, transform: 'translateY(24px)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 560, delay: 160 + i * 55, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' }
      );
    });
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 45,
        background: 'var(--paper)',
        padding: '96px 24px 32px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}
    >
      {ITEMS.map((item, i) => (
        <TransitionLink
          key={item.label}
          data-menu-item=""
          href={item.href}
          onClick={onClose}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 16,
            padding: '16px 0',
            borderBottom: '1px solid var(--line)',
            color: 'var(--ink)',
          }}
        >
          <span style={{ fontSize: 12, color: 'var(--muted)', fontVariantNumeric: 'tabular-nums' }}>{pad(i + 1)}</span>
          <span
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontWeight: 600,
              fontSize: 32,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {item.label}
          </span>
        </TransitionLink>
      ))}
      <div data-menu-item="" style={{ marginTop: 'auto', paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
        <a href="tel:+919432569419" style={{ color: 'var(--ink)' }}>
          +91 94325 69419
        </a>
        <a href="mailto:unitedsupplyagency@gmail.com" style={{ color: 'var(--ink)' }}>
          unitedsupplyagency@gmail.com
        </a>
      </div>
    </div>
  );
}
