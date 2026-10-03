'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import Reveal from '@/components/Reveal';
import CategoryChips from '@/components/CategoryChips';
import ProductCard from '@/components/ProductCard';
import ProductListRow from '@/components/ProductListRow';
import ProductModal from '@/components/ProductModal';
import { useEnquiry } from '@/context/EnquiryContext';
import { CATEGORIES, PRODUCTS, filterProducts, getProduct } from '@/lib/products';

const INK = 'var(--ink)';
const PAPER = 'var(--paper)';

type View = 'grid' | 'list';

export default function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAdded, toggle } = useEnquiry();

  const catParam = searchParams.get('cat');
  const cat = catParam && CATEGORIES.some((c) => c.id === catParam) ? catParam : 'all';

  const [q, setQ] = useState('');
  const [view, setView] = useState<View>('grid');
  const [detailId, setDetailId] = useState<number | null>(null);

  const setCat = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === 'all') params.delete('cat');
    else params.set('cat', id);
    const qs = params.toString();
    router.replace(qs ? `/products?${qs}` : '/products', { scroll: false });
  };

  const list = useMemo(() => filterProducts(cat, q), [cat, q]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: PRODUCTS.length };
    CATEGORIES.forEach((cat) => {
      c[cat.id] = PRODUCTS.filter((p) => p.cat === cat.id).length;
    });
    return c;
  }, []);

  const catLabel = cat === 'all' ? 'all families' : CATEGORIES.find((c) => c.id === cat)?.name ?? 'all families';
  const resultText = `${list.length} ${list.length === 1 ? 'part' : 'parts'} · ${catLabel}`;

  const detail = detailId != null ? getProduct(detailId) : null;

  const stepDetail = (dir: number) => {
    const arr = list.length ? list : PRODUCTS;
    const i = arr.findIndex((p) => p.n === detailId);
    const j = ((i < 0 ? 0 : i) + dir + arr.length) % arr.length;
    setDetailId(arr[j].n);
  };

  return (
    <main style={{ paddingTop: 64 }}>
      <section style={{ padding: 'clamp(56px,7vw,96px) 0 32px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
          <Reveal as="p" style={{ margin: '0 0 18px', fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            Catalogue
          </Reveal>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
            <Reveal
              as="h1"
              delay={80}
              style={{ margin: 0, fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: 600, fontSize: 'clamp(40px,6vw,84px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}
            >
              Product catalogue
            </Reveal>
            <Reveal as="p" delay={160} style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: '40ch' }}>
              Components for railway signalling relays. Add items to your enquiry list and send it to us in one message.
            </Reveal>
          </div>
        </div>
      </section>

      <div
        style={{
          position: 'sticky',
          top: 64,
          zIndex: 20,
          background: 'var(--glass)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderTop: '1px solid var(--line-2)',
          borderBottom: '1px solid var(--line-2)',
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '12px clamp(20px,4vw,48px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 16px' }}>
          <CategoryChips cat={cat} onChange={setCat} counts={counts} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: '1 1 320px', maxWidth: 440, marginLeft: 'auto' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                style={{ position: 'absolute', left: 13, width: 14, height: 14, color: 'var(--muted)', pointerEvents: 'none' }}
              >
                <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 11 L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search parts or material"
                aria-label="Search products"
                className="focus-ink"
                style={{
                  width: '100%',
                  minWidth: 0,
                  padding: '10px 14px 10px 36px',
                  border: '1px solid var(--line)',
                  borderRadius: 999,
                  background: 'var(--card)',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
            </div>
            <div role="group" aria-label="View" style={{ flex: 'none', display: 'flex', border: '1px solid var(--line)', borderRadius: 999, padding: 3, background: 'var(--card)' }}>
              <button
                onClick={() => setView('grid')}
                style={{ border: 0, borderRadius: 999, padding: '6px 12px', fontSize: 12, cursor: 'pointer', background: view === 'grid' ? INK : 'transparent', color: view === 'grid' ? PAPER : INK }}
              >
                Grid
              </button>
              <button
                onClick={() => setView('list')}
                style={{ border: 0, borderRadius: 999, padding: '6px 12px', fontSize: 12, cursor: 'pointer', background: view === 'list' ? INK : 'transparent', color: view === 'list' ? PAPER : INK }}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      <section style={{ padding: '32px 0 clamp(70px,9vw,120px)', minHeight: '50vh' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
          <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--muted)' }}>{resultText}</p>

          {list.length > 0 && view === 'grid' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,250px),1fr))', gap: 18 }}>
              {list.map((p, i) => (
                <ProductCard
                  key={p.n}
                  product={p}
                  delay={Math.min(i, 8) * 50}
                  added={isAdded(p.n)}
                  onOpen={() => setDetailId(p.n)}
                  onToggle={() => toggle(p.n)}
                />
              ))}
            </div>
          )}

          {list.length > 0 && view === 'list' && (
            <div style={{ borderTop: '1px solid var(--ink)' }}>
              {list.map((p, i) => (
                <ProductListRow
                  key={p.n}
                  product={p}
                  delay={Math.min(i, 10) * 25}
                  added={isAdded(p.n)}
                  onOpen={() => setDetailId(p.n)}
                  onToggle={() => toggle(p.n)}
                />
              ))}
            </div>
          )}

          {list.length === 0 && (
            <div style={{ padding: '80px 0', textAlign: 'center' }}>
              <p style={{ margin: 0, fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 26 }}>No parts match &ldquo;{q}&rdquo;.</p>
              <button
                onClick={() => {
                  setQ('');
                  setCat('all');
                }}
                style={{ marginTop: 18, border: '1px solid var(--ink)', background: 'none', borderRadius: 999, padding: '10px 18px', fontSize: 13, cursor: 'pointer' }}
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      {detail && (
        <ProductModal
          product={detail}
          added={isAdded(detail.n)}
          onClose={() => setDetailId(null)}
          onToggle={() => toggle(detail.n)}
          onPrev={() => stepDetail(-1)}
          onNext={() => stepDetail(1)}
        />
      )}
    </main>
  );
}
