import * as React from 'react';
import Globe from 'react-globe.gl';
import type { GlobeMethods } from 'react-globe.gl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Link as RouterLink } from 'react-router-dom';

type Status = 'accounted' | 'in dryer' | 'missing';

interface Sock {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: Status;
  lastPing: string;
}

const statusColours: Record<Status, string> = {
  accounted: '#4ade80',
  'in dryer': '#fbbf24',
  missing: '#f87171',
};

// '#f87171' -> '248,113,113', so the ring can fade out with an alpha value
const hexToRgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
};

const patterns = ['Red', 'Blue', 'Argyle', 'Striped', 'Polka-dot', 'Grey', 'Neon', 'Wool'];

function pickStatus(): Status {
  const r = Math.random();
  if (r < 0.55) return 'accounted';
  if (r < 0.75) return 'in dryer';
  return 'missing';
}

function generateSocks(count: number): Sock[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${Math.random() < 0.5 ? 'Left' : 'Right'} ${
      patterns[Math.floor(Math.random() * patterns.length)]
    } sock`,
    // Uniform distribution over the sphere, so points do not cluster at the poles
    lat: (Math.asin(2 * Math.random() - 1) * 180) / Math.PI,
    lng: Math.random() * 360 - 180,
    status: pickStatus(),
    lastPing: `${Math.floor(Math.random() * 59) + 1} min ago`,
  }));
}

export default function SockTracker() {
  const globeRef = React.useRef<GlobeMethods | undefined>(undefined);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(600);
  const [selected, setSelected] = React.useState<Sock | null>(null);

  const socks = React.useMemo(() => generateSocks(5937), []);
  const missingCount = socks.filter((s) => s.status === 'missing').length;
  // A sample of socks of every status (the list is already random)
  const rings = React.useMemo(() => socks.slice(0, 150), [socks]);

  // Keep the globe the same width as its container
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleGlobeReady = () => {
    const globe = globeRef.current;
    if (!globe) return;
    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    globe.pointOfView({ lat: 20, lng: 0, altitude: 2.2 });
  };

  const handlePointClick = (point: object) => {
    const sock = point as Sock;
    setSelected(sock);
    const globe = globeRef.current;
    if (!globe) return;
    globe.controls().autoRotate = false;
    globe.pointOfView({ lat: sock.lat, lng: sock.lng, altitude: 1.4 }, 800);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'left' }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
        SockSat Tracker
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        Tracking {socks.length} socks worldwide. {missingCount} are currently missing.
        Mars coverage coming soon.
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
        {(Object.keys(statusColours) as Status[]).map((status) => (
          <Chip
            key={status}
            label={status}
            size="small"
            variant="outlined"
            sx={{ borderColor: statusColours[status], color: statusColours[status] }}
          />
        ))}
      </Box>

      <Box
        ref={containerRef}
        sx={{ bgcolor: '#0b1020', borderRadius: 2, overflow: 'hidden', lineHeight: 0 }}
      >
        <Globe
          ref={globeRef}
          width={width}
          height={Math.min(width, 560)}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
          onGlobeReady={handleGlobeReady}
          pointsData={socks}
          pointLat="lat"
          pointLng="lng"
          pointColor={(d) => statusColours[(d as Sock).status]}
          pointAltitude={0.02}
          pointRadius={0.4}
          pointLabel={(d) => {
            const s = d as Sock;
            return `<b>${s.name}</b><br/>${s.status}<br/>Last ping: ${s.lastPing}`;
          }}
          onPointClick={handlePointClick}
          ringsData={rings}
          ringLat="lat"
          ringLng="lng"
          ringColor={(d: any) => (t: number) =>
            `rgba(${hexToRgb(statusColours[(d as Sock).status])},${1 - t})`
          }
          ringMaxRadius={15}
          ringPropagationSpeed={4}
          ringRepeatPeriod={2500}
        />
      </Box>

      <Paper variant="outlined" sx={{ mt: 2, p: 3, minHeight: 120 }}>
        {selected ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
              <Typography variant="h6">{selected.name}</Typography>
              <Chip
                label={selected.status}
                size="small"
                sx={{ bgcolor: statusColours[selected.status], color: '#0b1020' }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Sock ID #{selected.id} at {selected.lat.toFixed(2)}, {selected.lng.toFixed(2)}.
              Last ping {selected.lastPing}.
            </Typography>
            {selected.status === 'missing' && (
              <Button variant="contained" size="small" component={RouterLink} to="/find-sock" sx={{ mt: 2 }}>
                Request recovery ($9.99)
              </Button>
            )}
          </>
        ) : (
          <Typography color="text.secondary">
            Click a point on the globe to inspect a sock.
          </Typography>
        )}
      </Paper>
    </Box>
  );
}