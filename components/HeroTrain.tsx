'use client';

import { useEffect, useRef } from 'react';

export default function HeroTrain() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = svgRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const train = root.querySelector('[data-train]') as SVGGElement | null;
    if (!train) return;

    const D = 16000;
    const SPEED = 2360 / D;
    const loop = { duration: D, iterations: Infinity };
    train.animate([{ transform: 'translateX(0px)' }, { transform: 'translateX(2360px)' }], { ...loop, easing: 'linear' });

    const body = root.querySelector('[data-body]');
    body?.animate(
      [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-1.4px)' },
        { transform: 'translateY(0)' },
        { transform: 'translateY(-.6px)' },
        { transform: 'translateY(0)' },
      ],
      { duration: 760, iterations: Infinity }
    );

    const wp = (r: number) => Math.round((2 * Math.PI * r) / SPEED);
    root.querySelectorAll('[data-wheel]').forEach((w) => {
      const el = w as SVGGElement;
      const r = +(el.getAttribute('data-wheel') || 0);
      el.style.transformBox = 'fill-box';
      el.style.transformOrigin = 'center';
      el.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], { duration: wp(r), iterations: Infinity });
    });

    const rod = root.querySelector('[data-rod]');
    if (rod) {
      const keyframes: Keyframe[] = [];
      for (let i = 0; i <= 16; i++) {
        const a = (i / 16) * Math.PI * 2;
        keyframes.push({ transform: `translate(${(Math.cos(a) * 7).toFixed(2)}px,${(Math.sin(a) * 7).toFixed(2)}px)` });
      }
      rod.animate(keyframes, { duration: wp(17), iterations: Infinity });
    }

    const arm = root.querySelector('[data-arm]') as SVGGElement | null;
    if (arm) {
      arm.style.transformBox = 'fill-box';
      arm.style.transformOrigin = 'left center';
      arm.animate(
        [
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(0deg)', offset: 0.3 },
          { transform: 'rotate(-44deg)', offset: 0.36 },
          { transform: 'rotate(-40deg)', offset: 0.38 },
          { transform: 'rotate(-40deg)', offset: 0.9 },
          { transform: 'rotate(4deg)', offset: 0.95 },
          { transform: 'rotate(0deg)', offset: 0.97 },
          { transform: 'rotate(0deg)', offset: 1 },
        ],
        { ...loop, easing: 'ease-in-out' }
      );
    }

    const lamp = root.querySelector('[data-lamp]');
    lamp?.animate(
      [
        { fill: 'var(--paper)', offset: 0 },
        { fill: 'var(--paper)', offset: 0.34 },
        { fill: 'var(--ink)', offset: 0.37 },
        { fill: 'var(--ink)', offset: 0.92 },
        { fill: 'var(--paper)', offset: 0.95 },
        { fill: 'var(--paper)', offset: 1 },
      ],
      loop
    );

    const birds = root.querySelector('[data-birds]');
    birds?.animate(
      [
        { transform: 'translate(1700px,120px)' },
        { transform: 'translate(900px,96px)', offset: 0.5 },
        { transform: 'translate(-120px,110px)' },
      ],
      { duration: 34000, iterations: Infinity, easing: 'linear' }
    );

    const puffs = root.querySelectorAll('[data-puff]');
    puffs.forEach((p, i) => {
      const el = p as SVGCircleElement;
      el.style.transformBox = 'fill-box';
      el.style.transformOrigin = 'center';
      const dx = -170 - (i % 3) * 40;
      const dy = -60 - (i % 4) * 14;
      const sc = 2 + (i % 3) * 0.5;
      const dur = 2200;
      el.animate(
        [
          { transform: 'translate(0,0) scale(.35)', opacity: 0 },
          { transform: 'translate(-14px,-20px) scale(.9)', opacity: 1, offset: 0.12 },
          { transform: `translate(${dx * 0.55}px,${dy * 0.85}px) scale(${sc * 0.7})`, opacity: 0.8, offset: 0.55 },
          { transform: `translate(${dx}px,${dy}px) scale(${sc})`, opacity: 0 },
        ],
        { duration: dur, delay: i * (dur / puffs.length), iterations: Infinity, easing: 'cubic-bezier(.2,.6,.3,1)' }
      );
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1600 420"
      preserveAspectRatio="xMidYMax slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <pattern id="usa-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="5" height="5" style={{ fill: 'var(--paper)' }} />
          <line x1="0" y1="0" x2="0" y2="5" strokeWidth="1.3" style={{ stroke: 'var(--ink)' }} />
        </pattern>
        <pattern id="usa-stone" width="32" height="16" patternUnits="userSpaceOnUse">
          <rect width="32" height="16" style={{ fill: 'var(--paper)' }} />
          <path d="M0 .5 H32 M0 8.5 H32 M8 0 V8 M24 8 V16" strokeWidth=".8" opacity=".45" fill="none" style={{ stroke: 'var(--ink)' }} />
        </pattern>
        <pattern id="usa-bay" x="-20" y="0" width="130" height="420" patternUnits="userSpaceOnUse">
          <path
            d="M0 266 H130 V420 H108 V310 A43 43 0 0 0 22 310 V420 H0 Z"
            fill="url(#usa-stone)"
            strokeWidth="1.5"
            style={{ stroke: 'var(--ink)' }}
          />
          <path d="M14 310 A51 51 0 0 1 116 310" fill="none" strokeWidth="1.5" style={{ stroke: 'var(--ink)' }} />
        </pattern>
        <pattern id="usa-water" width="90" height="16" patternUnits="userSpaceOnUse">
          <path d="M6 4 H34 M50 11 H82" strokeWidth="1" opacity=".35" style={{ stroke: 'var(--ink)' }} />
        </pattern>
      </defs>
      <path
        d="M0 236 C 180 196, 360 222, 560 204 S 900 172, 1110 206 S 1440 182, 1600 214"
        fill="none"
        strokeWidth="1.2"
        opacity=".3"
        style={{ stroke: 'var(--ink)' }}
      />
      <path
        d="M0 252 C 240 226, 420 246, 700 232 S 1180 222, 1600 240"
        fill="none"
        strokeWidth="1"
        opacity=".2"
        style={{ stroke: 'var(--ink)' }}
      />
      <rect x="0" y="398" width="1600" height="22" fill="url(#usa-water)" />
      <g data-birds="" opacity=".55">
        <path d="M0 0 q6 -6 12 0 q6 -6 12 0" fill="none" strokeWidth="1.4" style={{ stroke: 'var(--ink)' }} />
        <path transform="translate(34 -14) scale(.8)" d="M0 0 q6 -6 12 0 q6 -6 12 0" fill="none" strokeWidth="1.4" style={{ stroke: 'var(--ink)' }} />
        <path transform="translate(58 6) scale(.65)" d="M0 0 q6 -6 12 0 q6 -6 12 0" fill="none" strokeWidth="1.4" style={{ stroke: 'var(--ink)' }} />
      </g>
      <g transform="translate(1388 250)">
        <rect x="-3" y="-118" width="6" height="118" style={{ fill: 'var(--ink)' }} />
        <rect x="-8" y="-122" width="16" height="5" style={{ fill: 'var(--ink)' }} />
        <circle data-lamp="" cx="0" cy="-92" r="5" strokeWidth="1.5" style={{ fill: 'var(--paper)', stroke: 'var(--ink)' }} />
        <g transform="translate(3 -108)">
          <g data-arm="">
            <rect x="0" y="-4" width="46" height="8" style={{ fill: 'var(--ink)' }} />
            <rect x="32" y="-4" width="4" height="8" style={{ fill: 'var(--paper)' }} />
          </g>
        </g>
      </g>
      <g transform="translate(0 250)">
        <g data-train="" style={{ transform: 'translateX(-40px)' }}>
          <g transform="translate(-33 -88)">
            {Array.from({ length: 11 }).map((_, i) => (
              <circle key={i} data-puff="" r="10" strokeWidth="1.4" opacity="0" style={{ fill: 'var(--paper)', stroke: 'var(--ink)' }} />
            ))}
          </g>
          <g data-body="" strokeWidth="2" strokeLinejoin="round" style={{ stroke: 'var(--ink)' }}>
            <rect x="-754" y="-32" width="754" height="4" stroke="none" style={{ fill: 'var(--ink)' }} />
            {[-438, -596, -754].map((x) => (
              <g key={x}>
                <rect x={x} y="-88" width="150" height="8" rx="4" style={{ fill: 'var(--ink)' }} />
                <rect x={x} y="-82" width="150" height="58" rx="5" style={{ fill: 'var(--paper)' }} />
                <rect x={x} y="-46" width="150" height="22" fill="url(#usa-hatch)" />
                {[14, 40, 66, 92, 118].map((o) => (
                  <rect key={o} x={x + o} y="-72" width="18" height="18" rx="2" style={{ fill: 'var(--paper)' }} />
                ))}
              </g>
            ))}
            <rect x="-280" y="-80" width="74" height="54" rx="3" fill="url(#usa-hatch)" />
            <rect x="-284" y="-84" width="82" height="6" style={{ fill: 'var(--ink)' }} />
            <rect x="-206" y="-100" width="68" height="6" rx="2" style={{ fill: 'var(--ink)' }} />
            <rect x="-200" y="-96" width="56" height="70" style={{ fill: 'var(--ink)' }} />
            <rect x="-188" y="-86" width="22" height="20" rx="2" style={{ fill: 'var(--paper)' }} />
            <rect x="-150" y="-62" width="128" height="36" rx="6" fill="url(#usa-hatch)" />
            <rect x="-30" y="-66" width="22" height="42" rx="4" style={{ fill: 'var(--ink)' }} />
            <rect x="-40" y="-86" width="14" height="24" style={{ fill: 'var(--ink)' }} />
            <rect x="-44" y="-90" width="22" height="6" rx="2" style={{ fill: 'var(--ink)' }} />
            <rect x="-96" y="-75" width="22" height="14" rx="7" style={{ fill: 'var(--ink)' }} />
            <rect x="-205" y="-28" width="205" height="6" style={{ fill: 'var(--ink)' }} />
            <rect x="-8" y="-30" width="8" height="12" style={{ fill: 'var(--ink)' }} />
          </g>
          <g style={{ stroke: 'var(--ink)', fill: 'var(--paper)' }}>
            {[
              [-418, 9],
              [-398, 9],
              [-328, 9],
              [-308, 9],
              [-576, 9],
              [-556, 9],
              [-486, 9],
              [-466, 9],
              [-734, 9],
              [-714, 9],
              [-644, 9],
              [-624, 9],
              [-60, 17],
              [-100, 17],
              [-140, 17],
              [-22, 10],
              [-262, 10],
              [-226, 10],
            ].map(([x, r], i) => (
              <g key={i} transform={`translate(${x} -${r})`}>
                <g data-wheel={r}>
                  <circle r={r} strokeWidth={r === 17 ? '2.2' : '1.8'} />
                  <path
                    d={r === 17 ? `M-17 0 H17 M0 -17 V17 M-11.9 -11.9 L11.9 11.9 M-11.9 11.9 L11.9 -11.9` : `M-${r} 0 H${r} M0 -${r} V${r}`}
                    strokeWidth="1.2"
                  />
                  <circle r={r === 17 ? 3 : 2} style={{ fill: 'var(--ink)' }} />
                </g>
              </g>
            ))}
          </g>
          <g data-rod="">
            <rect x="-146" y="-21" width="92" height="4" rx="2" style={{ fill: 'var(--ink)' }} />
            <circle cx="-140" cy="-19" r="3" style={{ fill: 'var(--ink)' }} />
            <circle cx="-100" cy="-19" r="3" style={{ fill: 'var(--ink)' }} />
            <circle cx="-60" cy="-19" r="3" style={{ fill: 'var(--ink)' }} />
          </g>
        </g>
      </g>
      <line x1="0" y1="251" x2="1600" y2="251" strokeWidth="2.5" style={{ stroke: 'var(--ink)' }} />
      <rect x="0" y="252" width="1600" height="14" fill="url(#usa-stone)" strokeWidth="1.5" style={{ stroke: 'var(--ink)' }} />
      <rect x="0" y="266" width="1600" height="154" fill="url(#usa-bay)" />
    </svg>
  );
}
