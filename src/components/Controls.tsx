interface ControlsProps {
  isPlaying: boolean;
  speed: number;
  onTogglePlay: () => void;
  onSpeedChange: (speed: number) => void;
}

export default function Controls({ isPlaying, speed, onTogglePlay, onSpeedChange }: ControlsProps) {
  const speedPresets = [
    { label: '0.5x', value: 0.5 },
    { label: '1x', value: 1 },
    { label: '2x', value: 2 },
    { label: '5x', value: 5 },
    { label: '10x', value: 10 },
  ];

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-2xl px-6 py-4 shadow-2xl z-10 flex items-center gap-6">
      {/* Play/Pause Button */}
      <button
        onClick={onTogglePlay}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform active:scale-95"
        title={isPlaying ? '暂停' : '播放'}
      >
        {isPlaying ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Speed Control */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-400 text-center">速度调节</label>
        <div className="flex items-center gap-1">
          {speedPresets.map(preset => (
            <button
              key={preset.value}
              onClick={() => onSpeedChange(preset.value)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                speed === preset.value
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Speed Slider */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400 text-center">自定义速度</label>
        <input
          type="range"
          min="0.1"
          max="20"
          step="0.1"
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          className="w-28 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <span className="text-xs text-blue-400 text-center font-mono">{speed.toFixed(1)}x</span>
      </div>
    </div>
  );
}
