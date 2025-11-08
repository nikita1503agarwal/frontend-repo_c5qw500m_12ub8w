import { useMemo, useState } from 'react';
import { Sparkles } from 'lucide-react';

const moodOptions = [
  { label: 'Happy', color: '#f59e0b' },
  { label: 'Tired', color: '#9ca3af' },
  { label: 'Motivated', color: '#ef4444' },
  { label: 'Lazy', color: '#a1a1aa' },
  { label: 'Calm', color: '#60a5fa' },
  { label: 'Excited', color: '#f472b6' },
];

function vibeSummary(mood) {
  switch (mood) {
    case 'Motivated':
      return 'Focused Energy';
    case 'Calm':
      return 'Serene Flow';
    case 'Tired':
      return 'Gentle Pace';
    case 'Excited':
      return 'Sparked Joy';
    case 'Lazy':
      return 'Soft Pause';
    default:
      return 'Balanced Vibes';
  }
}

export default function QuickLog({ goal, onLog }) {
  const [selected, setSelected] = useState('Motivated');

  const glow = useMemo(() => {
    const found = moodOptions.find((m) => m.label === selected);
    const color = found?.color || '#93c5fd';
    return {
      background: `radial-gradient(ellipse at center, ${color}55, transparent 60%)`,
      boxShadow: `0 10px 40px ${color}55`,
    };
  }, [selected]);

  function handleLog() {
    onLog?.({ mood: selected, date: new Date().toISOString() });
  }

  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur shadow p-5">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-slate-600" />
        <h3 className="font-semibold text-slate-800">Quick Log</h3>
        <span className="text-xs text-slate-500 ml-auto">{goal?.name || 'Select a goal'}</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {moodOptions.map((m) => (
          <button
            key={m.label}
            onClick={() => setSelected(m.label)}
            className={`rounded-xl border px-3 py-2 text-sm transition ${selected === m.label ? 'border-transparent text-slate-900' : 'border-slate-200 text-slate-600'}`}
            style={selected === m.label ? glow : undefined}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-slate-600">Your vibe: <span className="font-medium text-slate-800">{vibeSummary(selected)}</span></p>
        <button onClick={handleLog} className="rounded-lg bg-emerald-600 text-white px-4 py-2 shadow hover:bg-emerald-500">Log Today</button>
      </div>
    </div>
  );
}
