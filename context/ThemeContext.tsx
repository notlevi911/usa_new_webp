'use client';

import { createContext, useCallback, useContext, useLayoutEffect, useRef, useState } from 'react';
import { THEME_STORAGE_KEY, THEMES, type ThemeName } from '@/lib/theme';

type ThemeContextValue = {
  theme: ThemeName;
  toggleTheme: (origin?: { x: number; y: number }) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: ThemeName) {
  const root = document.documentElement;
  const vars = THEMES[theme];
  Object.keys(vars).forEach((key) => root.style.setProperty('--' + key, vars[key]));
  root.style.colorScheme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* storage unavailable */
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>('light');
  const mounted = useRef(false);

  useLayoutEffect(() => {
    let initial: ThemeName = 'light';
    try {
      initial = (localStorage.getItem(THEME_STORAGE_KEY) as ThemeName) || 'light';
    } catch {
      /* storage unavailable */
    }
    applyTheme(initial);
    // One-time client-only hydration from localStorage (unavailable during SSR), not a render-time read.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initial);
    mounted.current = true;
  }, []);

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: ThemeName = theme === 'dark' ? 'light' : 'dark';
      const prefersReduced =
        typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const supportsViewTransition = typeof document !== 'undefined' && 'startViewTransition' in document;

      if (!supportsViewTransition || prefersReduced) {
        applyTheme(next);
        setTheme(next);
        return;
      }

      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? 0;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

      type ViewTransitionDocument = Document & {
        startViewTransition: (cb: () => void | Promise<void>) => { ready: Promise<void> };
      };
      const vtDoc = document as ViewTransitionDocument;

      const transition = vtDoc.startViewTransition(() => {
        applyTheme(next);
        setTheme(next);
      });

      transition.ready
        .then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 950, easing: 'cubic-bezier(.76,0,.24,1)', pseudoElement: '::view-transition-new(root)' }
          );
        })
        .catch(() => {});
    },
    [theme]
  );

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
