'use client';

import { usePathname, useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import CompassMark from '@/components/CompassMark';

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

function stripQueryHash(href: string) {
  return href.split('#')[0].split('?')[0] || '/';
}

type NavigateFn = (href: string) => void;

const CurtainContext = createContext<NavigateFn | null>(null);

export function CurtainProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const pendingPath = useRef<string | null>(null);
  const busy = useRef(false);

  const reveal = useCallback(() => {
    const c = curtainRef.current;
    if (!c) {
      busy.current = false;
      return;
    }
    // Give the new route a frame to paint behind the curtain before wiping it away.
    requestAnimationFrame(() => {
      setTimeout(() => {
        const out = c.animate(
          [{ transform: 'translateY(0)' }, { transform: 'translateY(-101%)' }],
          { duration: 620, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' }
        );
        out.onfinish = () => {
          c.getAnimations({ subtree: true }).forEach((a) => a.cancel());
          busy.current = false;
        };
      }, 90);
    });
  }, []);

  // Once the route actually lands on the page we covered for, wipe the curtain away.
  useEffect(() => {
    if (pendingPath.current && pathname === pendingPath.current) {
      pendingPath.current = null;
      reveal();
    }
  }, [pathname, reveal]);

  const navigate = useCallback<NavigateFn>(
    (href) => {
      if (busy.current) return;
      const targetPath = stripQueryHash(href);

      if (targetPath === pathname) {
        router.push(href);
        return;
      }

      const c = curtainRef.current;
      const prefersReduced =
        typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!c || prefersReduced) {
        router.push(href);
        return;
      }

      busy.current = true;
      const label = labelFor(targetPath);
      if (labelRef.current) labelRef.current.textContent = label;

      const E = 'cubic-bezier(.76,0,.24,1)';
      labelRef.current?.animate(
        [
          { opacity: 0, transform: 'translateY(28px)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 460, delay: 190, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'both' }
      );
      markRef.current?.animate(
        [
          { transform: 'rotate(-180deg) scale(.5)', opacity: 0 },
          { transform: 'rotate(0deg) scale(1)', opacity: 1 },
        ],
        { duration: 680, delay: 90, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'both' }
      );

      const inAnim = c.animate(
        [{ transform: 'translateY(101%)' }, { transform: 'translateY(0)' }],
        { duration: 380, easing: E, fill: 'forwards' }
      );
      pendingPath.current = targetPath;

      inAnim.onfinish = () => {
        // The curtain now fully covers the viewport — safe to swap the page underneath.
        router.push(href);
        // Fallback in case the pathname effect never fires (e.g. navigation got cancelled).
        setTimeout(() => {
          if (pendingPath.current === targetPath) {
            pendingPath.current = null;
            reveal();
          }
        }, 1500);
      };
    },
    [pathname, router, reveal]
  );

  return (
    <CurtainContext.Provider value={navigate}>
      {children}
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
            fontFamily: 'var(--font-fraunces), Georgia, serif',
            fontWeight: 600,
            fontSize: 'clamp(32px,4.4vw,56px)',
            letterSpacing: '-0.02em',
            color: 'var(--on-deep)',
          }}
        />
      </div>
    </CurtainContext.Provider>
  );
}

export function useCurtainNavigate() {
  const ctx = useContext(CurtainContext);
  if (!ctx) throw new Error('useCurtainNavigate must be used within CurtainProvider');
  return ctx;
}
