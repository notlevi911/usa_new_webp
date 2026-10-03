'use client';

import { useEffect, useRef, useState } from 'react';
import { CATEGORIES } from '@/lib/products';

const INK = 'var(--ink)';
const PAPER = 'var(--paper)';

type Chip = { id: string; label: string; count: number };

export default function CategoryChips({
  cat,
  onChange,
  counts,
}: {
  cat: string;
  onChange: (id: string) => void;
  counts: Record<string, number>;
}) {
  const chipsRef = useRef<HTMLDivElement>(null);
  const [canL, setCanL] = useState(false);
  const [canR, setCanR] = useState(true);

  const chips: Chip[] = [
    { id: 'all', label: 'All', count: counts.all ?? 0 },
    ...CATEGORIES.map((c) => ({ id: c.id, label: c.name, count: counts[c.id] ?? 0 })),
  ];

  const check = () => {
    const c = chipsRef.current;
    if (!c) return;
    setCanL(c.scrollLeft > 4);
    setCanR(c.scrollLeft + c.clientWidth < c.scrollWidth - 4);
  };

  useEffect(() => {
    const c = chipsRef.current;
    if (!c) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && c.scrollWidth > c.clientWidth) {
        e.preventDefault();
        c.scrollLeft += e.deltaY;
      }
    };
    c.addEventListener('wheel', onWheel, { passive: false });

    let down: { x: number; l: number; moved: boolean } | null = null;
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') down = { x: e.clientX, l: c.scrollLeft, moved: false };
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - down.x;
      if (Math.abs(dx) > 4) {
        down.moved = true;
        c.style.scrollBehavior = 'auto';
        c.scrollLeft = down.l - dx;
      }
    };
    const onPointerUp = () => {
      if (down && down.moved) {
        const stop = (ev: Event) => {
          ev.stopPropagation();
          ev.preventDefault();
        };
        c.addEventListener('click', stop, { capture: true, once: true });
        setTimeout(() => c.removeEventListener('click', stop, true), 0);
      }
      c.style.scrollBehavior = 'smooth';
      down = null;
    };
    c.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const onResize = () => check();
    window.addEventListener('resize', onResize);
    requestAnimationFrame(check);

    return () => {
      c.removeEventListener('wheel', onWheel);
      c.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const scrollBy = (dir: number) => {
    const c = chipsRef.current;
    if (c) c.scrollBy({ left: dir * Math.max(200, c.clientWidth * 0.7), behavior: 'smooth' });
  };

  const selectChip = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    const b = e.currentTarget;
    const c = chipsRef.current;
    if (c && b) {
      const bl = b.offsetLeft - c.offsetLeft;
      if (bl < c.scrollLeft + 40 || bl + b.offsetWidth > c.scrollLeft + c.clientWidth - 40) {
        c.scrollTo({ left: bl - c.clientWidth / 2 + b.offsetWidth / 2, behavior: 'smooth' });
      }
    }
    onChange(id);
  };

  return (
    <div style={{ position: 'relative', flex: '1 1 520px', minWidth: 0, display: 'flex', alignItems: 'center' }}>
      {canL && (
        <>
          <span
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 72,
              background: 'linear-gradient(to right,var(--paper) 45%,transparent)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll categories left"
            className="icon-btn"
            style={{
              position: 'absolute',
              left: 0,
              zIndex: 2,
              width: 34,
              height: 34,
              borderRadius: '50%',
              border: '1px solid var(--line)',
              background: 'var(--card)',
              color: 'var(--ink)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
              transition: 'border-color .2s ease,transform .2s ease',
            }}
          >
            ←
          </button>
        </>
      )}
      <div
        ref={chipsRef}
        onScroll={check}
        style={{
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
          flex: 1,
          minWidth: 0,
          padding: '2px 0',
          scrollbarWidth: 'none',
          scrollBehavior: 'smooth',
          scrollPadding: '0 44px',
        }}
      >
        {chips.map((c) => {
          const on = cat === c.id;
          return (
            <button
              key={c.id}
              onClick={(e) => selectChip(c.id, e)}
              style={{
                flex: 'none',
                border: `1px solid ${on ? INK : 'var(--line)'}`,
                background: on ? INK : 'transparent',
                color: on ? PAPER : INK,
                borderRadius: 999,
                padding: '8px 14px',
                fontSize: 13,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background .2s ease,color .2s ease,border-color .2s ease',
              }}
            >
              {c.label} <span style={{ opacity: 0.6, marginLeft: 4, fontVariantNumeric: 'tabular-nums' }}>{c.count}</span>
            </button>
          );
        })}
      </div>
      {canR && (
        <>
          <span
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 72,
              background: 'linear-gradient(to left,var(--paper) 45%,transparent)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll categories right"
            className="icon-btn"
            style={{
              position: 'absolute',
              right: 0,
              zIndex: 2,
              width: 34,
              height: 34,
              borderRadius: '50%',
              border: '1px solid var(--line)',
              background: 'var(--card)',
              color: 'var(--ink)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
              transition: 'border-color .2s ease,transform .2s ease',
            }}
          >
            →
          </button>
        </>
      )}
    </div>
  );
}
