'use client';

import { createContext, useCallback, useContext, useLayoutEffect, useRef, useState } from 'react';
import { THEME_STORAGE_KEY, THEMES, type ThemeName } from '@/lib/theme';

type ThemeContextValue = {
  theme: ThemeName;
  toggleTheme: () => void;
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

  const toggleTheme = useCallback(() => {
    const next: ThemeName = theme === 'dark' ? 'light' : 'dark';
    const prefersReduced =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof document === 'undefined') {
      applyTheme(next);
      setTheme(next);
      return;
    }

    // Animate the CSS custom properties themselves (typed via @property in globals.css)
    // directly on :root. Every element reading var(--ink), var(--paper), etc. repaints
    // with the interpolated value on its own — no per-component transition needed, and
    // nothing to snapshot, so the whole page visibly crossfades between themes.
    const from = THEMES[theme];
    const to = THEMES[next];
    const keyframes: PropertyIndexedKeyframes = {};
    Object.keys(to).forEach((key) => {
      keyframes['--' + key] = [from[key], to[key]];
    });

    const anim = document.documentElement.animate(keyframes, { duration: 420, easing: 'ease' });
    anim.onfinish = () => {
      applyTheme(next);
      setTheme(next);
    };
    anim.oncancel = () => {
      applyTheme(next);
      setTheme(next);
    };
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
