import * as React from 'react';

type Tier = 'bronze' | 'silver' | 'gold' | 'galactic';
type Kind = 'left' | 'right' | 'pair';

interface Palette {
  main: string;
  dark: string;
  light: string;
}

const palettes: Record<Tier, Palette> = {
  bronze: { main: '#cd7f32', dark: '#7a4a14', light: '#f0b97a' },
  silver: { main: '#c4cad4', dark: '#6b7585', light: '#ffffff' },
  gold: { main: '#f2c230', dark: '#9a6b00', light: '#fff1b0' },
  galactic: { main: '#4c2a9e', dark: '#1a0f4d', light: '#ffffff' },
};

// A sock pointing right. Mirrored for left socks.
const SOCK_PATH =
  'M30 12 H58 V66 Q58 72 66 75 L84 82 Q96 88 90 98 Q86 104 76 104 H38 Q22 104 24 88 Z';

const stars: [number, number, number][] = [
  [36, 30, 1.8],
  [48, 44, 1.2],
  [40, 58, 1.6],
  [50, 22, 1.1],
  [70, 92, 1.8],
  [58, 98, 1.2],
  [80, 86, 1.4],
  [44, 84, 1.3],
  [34, 70, 1.1],
  [54, 70, 1.5],
];

function parseTitle(title: string): { kind: Kind; tier: Tier } {
  const t = title.toLowerCase();
  const kind: Kind = t.includes('matching') ? 'pair' : t.includes('left') ? 'left' : 'right';
  const tier: Tier = t.includes('galactic')
    ? 'galactic'
    : t.includes('gold')
      ? 'gold'
      : t.includes('silver')
        ? 'silver'
        : 'bronze';
  return { kind, tier };
}

function Pattern({ tier, palette }: { tier: Tier; palette: Palette }) {
  switch (tier) {
    case 'bronze': // horizontal stripes
      return (
        <>
          {[32, 46, 60, 74, 88].map((y) => (
            <rect key={y} x={0} y={y} width={100} height={6} fill={palette.light} opacity={0.55} />
          ))}
        </>
      );
    case 'silver': // dots
      return (
        <>
          {[34, 48, 62, 76, 90].flatMap((y) =>
            [32, 44, 56, 68, 80].map((x) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={2.6} fill={palette.light} opacity={0.9} />
            )),
          )}
        </>
      );
    case 'gold': // diagonal stripes
      return (
        <>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <line
              key={i}
              x1={i * 16}
              y1={0}
              x2={i * 16 - 60}
              y2={120}
              stroke={palette.light}
              strokeWidth={5}
              opacity={0.55}
            />
          ))}
        </>
      );
    case 'galactic': // stars
      return (
        <>
          {stars.map(([x, y, r]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={palette.light} />
          ))}
        </>
      );
  }
}

function Sock({ tier, uid, transform }: { tier: Tier; uid: string; transform?: string }) {
  const palette = palettes[tier];
  const fill = tier === 'galactic' ? `url(#${uid}-grad)` : palette.main;

  return (
    <g transform={transform}>
      <path d={SOCK_PATH} fill={fill} />
      <g clipPath={`url(#${uid}-clip)`}>
        <Pattern tier={tier} palette={palette} />
        <rect x={28} y={12} width={32} height={14} fill={palette.dark} />
        <ellipse cx={30} cy={92} rx={10} ry={11} fill={palette.dark} opacity={0.8} />
        <circle cx={86} cy={94} r={10} fill={palette.dark} opacity={0.8} />
      </g>
      <path
        d={SOCK_PATH}
        fill="none"
        stroke={palette.dark}
        strokeWidth={3}
        strokeLinejoin="round"
      />
    </g>
  );
}

interface SockImageProps {
  title: string; // the card title, e.g. 'Left Sock - Gold Tier'
  width?: number;
}

export default function SockImage({ title, width }: SockImageProps) {
  // useId contains colons, which can break url(#...) references
  const uid = React.useId().replace(/:/g, '');
  const { kind, tier } = parseTitle(title);
  const w = width ?? (kind === 'pair' ? 160 : 90);

  const mirrored = 'translate(100,0) scale(-1,1)';

  return (
    <svg
      viewBox={kind === 'pair' ? '0 0 200 116' : '0 0 100 116'}
      width={w}
      role="img"
      aria-label={title}
      style={{ display: 'block', margin: '0 auto', height: 'auto' }}
    >
      <defs>
        <clipPath id={`${uid}-clip`}>
          <path d={SOCK_PATH} />
        </clipPath>
        <linearGradient id={`${uid}-grad`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6d3fe0" />
          <stop offset="1" stopColor="#1a0f4d" />
        </linearGradient>
      </defs>

      {kind === 'pair' && (
        <>
          <Sock tier={tier} uid={uid} transform={mirrored} />
          <Sock tier={tier} uid={uid} transform="translate(100,0)" />
        </>
      )}
      {kind === 'left' && <Sock tier={tier} uid={uid} transform={mirrored} />}
      {kind === 'right' && <Sock tier={tier} uid={uid} />}
    </svg>
  );
}