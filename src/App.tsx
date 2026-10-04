import { useState } from 'react';
import SolarSystemCanvas from './components/SolarSystemCanvas';
import PlanetInfo from './components/PlanetInfo';
import Controls from './components/Controls';
import { Planet } from './data/planets';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  return (
    <div className="w-screen h-screen bg-[#0a0a1a] overflow-hidden relative">
      {/* Title */}
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-3xl">🌌</span>
          交互式太阳系
        </h1>
        <p className="text-sm text-gray-400 mt-1">点击行星查看详细信息</p>
      </div>

      {/* Solar System Canvas */}
      <SolarSystemCanvas
        isPlaying={isPlaying}
        speed={speed}
        selectedPlanet={selectedPlanet}
        onSelectPlanet={setSelectedPlanet}
      />

      {/* Planet Info Panel */}
      {selectedPlanet && (
        <PlanetInfo
          planet={selectedPlanet}
          onClose={() => setSelectedPlanet(null)}
        />
      )}

      {/* Controls */}
      <Controls
        isPlaying={isPlaying}
        speed={speed}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onSpeedChange={setSpeed}
      />

      {/* Legend */}
      <div className="absolute top-4 right-4 z-0">
        {!selectedPlanet && (
          <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3">
            <p className="text-xs text-gray-400 mb-2 font-medium">行星列表</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {['水星', '金星', '地球', '火星', '木星', '土星', '天王星', '海王星'].map((name, i) => (
                <div key={name} className="flex items-center gap-1.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: getPlanetColor(i) }}
                  />
                  <span className="text-xs text-gray-300">{name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getPlanetColor(index: number): string {
  const colors = ['#b5b5b5', '#e8cda0', '#4da6ff', '#e07040', '#d4a574', '#f0d890', '#7de8e8', '#4466ff'];
  return colors[index] || '#ffffff';
}
