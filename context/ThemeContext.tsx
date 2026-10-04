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

      if (prefersReduced || typeof document === 'undefined') {
        applyTheme(next);
        setTheme(next);
        return;
      }

      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? 0;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      const newPaper = THEMES[next].paper;

      // Keep the current theme rendered underneath and grow a new-theme-colored overlay
      // outward from the click point, so the new theme visibly spreads from where the
      // user clicked (not away from it). Flip the real DOM to the new theme only once
      // the overlay already fully covers the screen, then drop it — no visible pop, and
      // unlike the View Transitions API this never needs to snapshot the whole page.
      const overlay = document.createElement('div');
      overlay.style.cssText = `position:fixed;inset:0;z-index:200;pointer-events:none;background:${newPaper};clip-path:circle(0px at ${x}px ${y}px);`;
      document.body.appendChild(overlay);

      const anim = overlay.animate(
        [{ clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(${radius}px at ${x}px ${y}px)` }],
        { duration: 600, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' }
      );
      anim.onfinish = () => {
        applyTheme(next);
        setTheme(next);
        overlay.remove();
      };
      anim.oncancel = () => overlay.remove();
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
