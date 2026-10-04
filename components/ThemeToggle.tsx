'use client';

import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle({ style }: { style?: React.CSSProperties }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="theme-toggle"
      style={{
        position: 'relative',
        width: 58,
        height: 30,
        borderRadius: 999,
        border: '1px solid var(--line)',
        background: 'var(--card)',
        cursor: 'pointer',
        padding: 0,
        flex: 'none',
        transition: 'border-color .3s ease,background .3s ease',
        ...style,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 3,
          left: 3,
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: 'var(--ink)',
          color: 'var(--paper)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateX(${isDark ? '28px' : '0px'})`,
          transition: 'transform .55s cubic-bezier(.68,-0.45,.32,1.45)',
        }}
      >
        {isDark ? (
          <svg viewBox="0 0 16 16" style={{ width: 12, height: 12, display: 'block' }}>
            <path d="M12.5 10.2A5.6 5.6 0 0 1 5.8 3.5 5.6 5.6 0 1 0 12.5 10.2Z" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" style={{ width: 13, height: 13, display: 'block' }}>
            <circle cx="8" cy="8" r="3" fill="currentColor" />
            <path
              d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6L13 13M3 13l1.4-1.4M11.6 4.4L13 3"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
