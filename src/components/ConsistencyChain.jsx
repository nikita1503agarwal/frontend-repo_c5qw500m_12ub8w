import { motion } from 'framer-motion';

const moodPalette = {
  Motivated: ['#ff7a59', '#ff3d3d'],
  Calm: ['#60a5fa', '#93c5fd'],
  Tired: ['#9ca3af', '#d1d5db'],
  Excited: ['#f472b6', '#f97316'],
  Lazy: ['#a1a1aa', '#e4e4e7'],
};

function getGradientFor(mood) {
  const [a, b] = moodPalette[mood] || moodPalette.Calm;
  return `linear-gradient(135deg, ${a}, ${b})`;
}

export default function ConsistencyChain({ entries = [], baseMood = 'Calm' }) {
  const nodes = entries.length ? entries : Array.from({ length: 7 }, (_, i) => ({
    day: i,
    mood: baseMood,
    intensity: Math.max(0.2, Math.sin(i) * 0.5 + 0.5),
  }));

  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur shadow p-5">
      <h3 className="font-semibold text-slate-800 mb-4">Consistency Chain</h3>
      <div className="relative h-28 w-full">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 24" preserveAspectRatio="none">
          {nodes.map((n, i) => (
            <motion.circle
              key={i}
              cx={8 + i * (84 / Math.max(1, nodes.length - 1))}
              cy={12}
              r={5}
              fill="url(#g)"
              style={{ filter: `drop-shadow(0 0 ${n.intensity * 8}px rgba(0,0,0,0.25))` }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.9, scale: 1 }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 120, damping: 14 }}
            />
          ))}
          <defs>
            <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor={moodPalette[baseMood]?.[0] || moodPalette.Calm[0]} />
              <stop offset="100%" stopColor={moodPalette[baseMood]?.[1] || moodPalette.Calm[1]} />
            </linearGradient>
          </defs>
        </svg>
        <div
          className="absolute inset-0 rounded-xl"
          style={{ background: getGradientFor(baseMood), opacity: 0.08 }}
        />
      </div>
      <p className="mt-3 text-sm text-slate-600">
        Your chain glows brighter with consistency. Each node is a day; color reflects mood.
      </p>
    </div>
  );
}
