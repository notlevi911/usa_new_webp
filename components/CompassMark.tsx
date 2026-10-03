export default function CompassMark({ size = 30, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 64 64"
      style={{ width: size, height: size, color: 'var(--ink)', display: 'block', ...style }}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <g fill="currentColor" opacity=".85">
        <path d="M32 32 L46 18 L35.2 34.4 Z" />
        <path d="M32 32 L46 46 L29.6 35.2 Z" />
        <path d="M32 32 L18 46 L28.8 29.6 Z" />
        <path d="M32 32 L18 18 L34.4 28.8 Z" />
      </g>
      <g stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
        <path d="M32 8 L35.5 28.5 L32 32 Z" fill="currentColor" />
        <path d="M32 8 L28.5 28.5 L32 32 Z" fill="none" />
        <path d="M56 32 L35.5 35.5 L32 32 Z" fill="currentColor" />
        <path d="M56 32 L35.5 28.5 L32 32 Z" fill="none" />
        <path d="M32 56 L28.5 35.5 L32 32 Z" fill="currentColor" />
        <path d="M32 56 L35.5 35.5 L32 32 Z" fill="none" />
        <path d="M8 32 L28.5 28.5 L32 32 Z" fill="currentColor" />
        <path d="M8 32 L28.5 35.5 L32 32 Z" fill="none" />
      </g>
    </svg>
  );
}
