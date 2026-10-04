import { Planet } from '../data/planets';

interface PlanetInfoProps {
  planet: Planet;
  onClose: () => void;
}

export default function PlanetInfo({ planet, onClose }: PlanetInfoProps) {
  return (
    <div className="absolute top-4 right-4 w-80 bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-2xl z-10 animate-fade-in">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700"
      >
        ✕
      </button>
      
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-full shadow-lg"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${lighten(planet.color)}, ${planet.color})`,
            boxShadow: `0 0 20px ${planet.color}40`
          }}
        />
        <div>
          <h2 className="text-2xl font-bold text-white">{planet.name}</h2>
          <p className="text-sm text-gray-400">{planet.nameEn}</p>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-4 leading-relaxed">{planet.description}</p>

      <div className="space-y-3">
        <InfoRow
          icon="📏"
          label="直径"
          value={`${planet.diameter.toLocaleString()} km`}
        />
        <InfoRow
          icon="☀️"
          label="与太阳距离"
          value={`${planet.distanceFromSun} 百万 km`}
        />
        <InfoRow
          icon="🔄"
          label="公转周期"
          value={formatOrbitalPeriod(planet.orbitalPeriod)}
        />
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg px-3 py-2">
      <span className="text-lg">{icon}</span>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm text-white font-medium">{value}</p>
      </div>
    </div>
  );
}

function formatOrbitalPeriod(days: number): string {
  if (days < 365) {
    return `${days} 天`;
  }
  const years = (days / 365.25).toFixed(1);
  return `${years} 年 (${days.toLocaleString()} 天)`;
}

function lighten(color: string): string {
  const num = parseInt(color.replace('#', ''), 16);
  const R = Math.min(255, (num >> 16) + 60);
  const G = Math.min(255, ((num >> 8) & 0x00FF) + 60);
  const B = Math.min(255, (num & 0x0000FF) + 60);
  return `rgb(${R}, ${G}, ${B})`;
}
