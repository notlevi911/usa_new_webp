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
      const oldPaper = THEMES[theme].paper;

      // Swap the theme instantly underneath, then cover it with a flat, old-colored
      // overlay whose circular clip shrinks away from the click point. This reads the
      // same as a radial reveal but — unlike the View Transitions API — never needs to
      // snapshot the whole (content-heavy) page twice, so it stays smooth everywhere.
      applyTheme(next);
      setTheme(next);

      const overlay = document.createElement('div');
      overlay.style.cssText = `position:fixed;inset:0;z-index:200;pointer-events:none;background:${oldPaper};clip-path:circle(${radius}px at ${x}px ${y}px);`;
      document.body.appendChild(overlay);

      const anim = overlay.animate(
        [{ clipPath: `circle(${radius}px at ${x}px ${y}px)` }, { clipPath: `circle(0px at ${x}px ${y}px)` }],
        { duration: 600, easing: 'cubic-bezier(.76,0,.24,1)' }
      );
      const cleanup = () => overlay.remove();
      anim.onfinish = cleanup;
      anim.oncancel = cleanup;
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
