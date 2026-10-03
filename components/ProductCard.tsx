'use client';

import type { Product } from '@/lib/products';
import Reveal from './Reveal';

const INK = 'var(--ink)';
const PAPER = 'var(--paper)';

export default function ProductCard({
  product,
  delay,
  added,
  onOpen,
  onToggle,
}: {
  product: Product;
  delay: number;
  added: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className="product-card"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--line)',
        borderRadius: 6,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color .3s ease,box-shadow .35s ease,transform .35s cubic-bezier(.2,.7,.2,1)',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', background: 'var(--paper-2)', borderBottom: '1px solid var(--line)' }}>
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
        <span
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            pointerEvents: 'none',
            fontSize: 11,
            letterSpacing: '.08em',
            background: 'var(--paper)',
            border: '1px solid var(--line)',
            borderRadius: 999,
            padding: '3px 9px',
            color: 'var(--ink)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          No. {product.num}
        </span>
      </div>
      <div style={{ padding: '16px 16px 18px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <p style={{ margin: 0, fontSize: 11.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          {product.catName}
        </p>
        <h3
          style={{
            margin: 0,
            fontFamily: 'var(--font-fraunces), Georgia, serif',
            fontWeight: 600,
            fontSize: 20,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onOpen();
            }}
            className="name-link-hover"
            style={{ color: 'var(--ink)' }}
          >
            {product.name}
          </a>
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {product.specs.map((s) => (
            <span key={s} style={{ fontSize: 12, padding: '3px 8px', borderRadius: 4, background: 'var(--paper-2)', color: 'var(--ink-soft)' }}>
              {s}
            </span>
          ))}
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <button
            onClick={onOpen}
            style={{
              border: 0,
              background: 'none',
              padding: '6px 0',
              fontSize: 13,
              color: 'var(--ink)',
              cursor: 'pointer',
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            Details
          </button>
          <button
            onClick={onToggle}
            style={{
              border: '1px solid var(--ink)',
              background: added ? INK : 'transparent',
              color: added ? PAPER : INK,
              borderRadius: 999,
              padding: '8px 14px',
              fontSize: 12.5,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background .2s ease,color .2s ease',
            }}
          >
            {added ? 'Added to enquiry' : 'Add to enquiry'}
          </button>
        </div>
      </div>
    </Reveal>
  );
}
