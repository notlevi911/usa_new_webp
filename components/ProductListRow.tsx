'use client';

import type { Product } from '@/lib/products';
import Reveal from './Reveal';

const INK = 'var(--ink)';
const PAPER = 'var(--paper)';

export default function ProductListRow({
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
      delay={delay}
      className="product-list-row"
      style={{ alignItems: 'center', borderBottom: '1px solid var(--line)', transition: 'background .2s ease' }}
    >
      <div style={{ width: 64, height: 48, position: 'relative', background: 'var(--paper-2)', borderRadius: 3, overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'repeating-linear-gradient(135deg,var(--paper-2) 0 10px,var(--card) 10px 20px)',
          }}
        />
      </div>
      <span className="product-list-num" style={{ fontSize: 13, color: 'var(--muted)', fontVariantNumeric: 'tabular-nums' }}>
        {product.num}
      </span>
      <div style={{ minWidth: 0 }}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onOpen();
          }}
          style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: 600, fontSize: 17, color: 'var(--ink)' }}
        >
          {product.name}
        </a>
        <p style={{ margin: '3px 0 0', fontSize: 12.5, color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {product.full}
        </p>
      </div>
      <button
        onClick={onToggle}
        style={{
          border: '1px solid var(--ink)',
          background: added ? INK : 'transparent',
          color: added ? PAPER : INK,
          borderRadius: 999,
          padding: '7px 12px',
          fontSize: 12,
          fontWeight: 500,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        {added ? 'Added' : 'Add'}
      </button>
    </Reveal>
  );
}
