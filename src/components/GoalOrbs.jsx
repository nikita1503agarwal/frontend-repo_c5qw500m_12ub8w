import { useMemo } from 'react';
import { PlusCircle } from 'lucide-react';

function glowForConsistency(c) {
  const clamped = Math.max(0, Math.min(1, c));
  const intensity = 0.4 + clamped * 0.6;
  return `drop-shadow(0 0 ${12 + clamped * 20}px rgba(0,0,0,${0.25 + clamped * 0.25}))`;
}

export default function GoalOrbs({ goals, onAdd, onSelect }) {
  const empty = !goals || goals.length === 0;

  const gridCols = useMemo(() => {
    const n = Math.max(1, Math.min(4, (goals?.length || 1)));
    return `grid-cols-${Math.min(3, n)}`;
  }, [goals]);

  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur shadow p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800">Vibe Orbs</h3>
        <button onClick={onAdd} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 text-white px-3 py-1.5 text-sm hover:bg-slate-800">
          <PlusCircle className="w-4 h-4" /> Add Goal
        </button>
      </div>
      {empty ? (
        <p className="text-slate-600">No goals yet. Add one to start your glow.</p>
      ) : (
        <div className={`grid ${gridCols} sm:grid-cols-3 gap-4`}>
          {goals.map((g) => (
            <button
              key={g.id}
              onClick={() => onSelect(g)}
              className="group relative h-28 rounded-full overflow-hidden flex items-center justify-center"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${g.color}55, ${g.color}22 60%, transparent 70%)`,
                filter: glowForConsistency(g.consistency || 0.5),
              }}
            >
              <div className="absolute inset-0 bg-white/20 mix-blend-overlay" />
              <span className="relative z-10 text-slate-800 font-medium">
                {g.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
