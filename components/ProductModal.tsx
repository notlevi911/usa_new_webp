'use client';

import { useEffect, useRef } from 'react';
import type { Product } from '@/lib/products';

const INK = 'var(--ink)';
const PAPER = 'var(--paper)';

export default function ProductModal({
  product,
  added,
  onClose,
  onToggle,
  onPrev,
  onNext,
}: {
  product: Product;
  added: boolean;
  onClose: () => void;
  onToggle: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !modalRef.current) return;
    modalRef.current.animate(
      [
        { opacity: 0.2, transform: 'translateX(28px)' },
        { opacity: 1, transform: 'none' },
      ],
      { duration: 380, easing: 'cubic-bezier(.2,.7,.2,1)' }
    );
  }, [product.n]);

  function handleClose() {
    const m = modalRef.current;
    const o = overlayRef.current;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!m || prefersReduced) {
      onClose();
      return;
    }
    if (closingRef.current) return;
    closingRef.current = true;
    o?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: 'ease', fill: 'forwards' });
    const a = m.animate(
      [
        { opacity: 1, transform: 'none' },
        { opacity: 0, transform: 'translateY(24px) scale(.98)' },
      ],
      { duration: 300, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' }
    );
    a.onfinish = () => {
      closingRef.current = false;
      onClose();
    };
  }

  const rows = [
    { k: 'Family', v: product.catName },
    ...Object.entries(product.rows).map(([k, v]) => ({ k, v })),
  ];

  return (
    <div
      ref={overlayRef}
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 80,
        background: 'rgba(27,36,30,.55)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(12px,3vw,40px)',
      }}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        style={{
          width: '100%',
          maxWidth: 980,
          maxHeight: '100%',
          overflow: 'auto',
          background: 'var(--paper)',
          borderRadius: 8,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))',
        }}
      >
        <div style={{ position: 'relative', minHeight: 240, aspectRatio: '1/1', background: 'var(--paper-2)' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'repeating-linear-gradient(135deg,var(--paper-2) 0 10px,var(--card) 10px 20px)',
            }}
          >
            <span
              style={{
                fontSize: 11,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                background: 'var(--card)',
                border: '1px solid var(--line)',
                borderRadius: 999,
                padding: '5px 11px',
              }}
            >
              Photo coming soon
            </span>
          </div>
        </div>
        <div style={{ padding: 'clamp(24px,3.5vw,44px)', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              No. {product.num} · {product.catName}
            </span>
            <button
              onClick={handleClose}
              aria-label="Close"
              style={{
                border: '1px solid var(--line)',
                background: 'none',
                borderRadius: 999,
                width: 36,
                height: 36,
                cursor: 'pointer',
                fontSize: 16,
                color: 'var(--ink)',
              }}
            >
              ✕
            </button>
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontWeight: 600,
              fontSize: 'clamp(28px,3.2vw,40px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            {product.name}
          </h2>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--ink-soft)' }}>{product.full}</p>
          <div style={{ borderTop: '1px solid var(--ink)' }}>
            {rows.map((r) => (
              <div
                key={r.k}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px minmax(0,1fr)',
                  gap: 12,
                  padding: '12px 0',
                  borderBottom: '1px solid var(--line)',
                  fontSize: 14,
                }}
              >
                <span style={{ color: 'var(--muted)' }}>{r.k}</span>
                <span>{r.v}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingTop: 8 }}>
            <button
              onClick={onToggle}
              style={{
                border: '1px solid var(--ink)',
                background: added ? INK : 'transparent',
                color: added ? PAPER : INK,
                borderRadius: 999,
                padding: '13px 22px',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {added ? 'Added to enquiry' : 'Add to enquiry'}
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={onPrev}
                aria-label="Previous product"
                style={{
                  border: '1px solid var(--line)',
                  background: 'none',
                  borderRadius: 999,
                  width: 42,
                  height: 42,
                  cursor: 'pointer',
                  color: 'var(--ink)',
                }}
              >
                ←
              </button>
              <button
                onClick={onNext}
                aria-label="Next product"
                style={{
                  border: '1px solid var(--line)',
                  background: 'none',
                  borderRadius: 999,
                  width: 42,
                  height: 42,
                  cursor: 'pointer',
                  color: 'var(--ink)',
                }}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
