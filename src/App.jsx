import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import ProfileEditor from './components/ProfileEditor';
import GoalOrbs from './components/GoalOrbs';
import ConsistencyChain from './components/ConsistencyChain';
import QuickLog from './components/QuickLog';

function loadLocal(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || ''); } catch { return fallback; }
}
function saveLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export default function App() {
  const [profile, setProfile] = useState(() => loadLocal('vibechain_profile', { name: '', bio: '', avatar: '', mood: 'Calm' }));
  const [goals, setGoals] = useState(() => loadLocal('vibechain_goals', []));
  const [activeGoalId, setActiveGoalId] = useState(() => loadLocal('vibechain_active', null));
  const [entries, setEntries] = useState(() => loadLocal('vibechain_entries', {})); // by goalId -> [{date, mood}]

  useEffect(() => saveLocal('vibechain_profile', profile), [profile]);
  useEffect(() => saveLocal('vibechain_goals', goals), [goals]);
  useEffect(() => saveLocal('vibechain_active', activeGoalId), [activeGoalId]);
  useEffect(() => saveLocal('vibechain_entries', entries), [entries]);

  function addGoal() {
    const name = prompt('Goal name (e.g., gym, study)');
    if (!name) return;
    const freq = prompt('Frequency (daily, 3x a week, weekly)', 'daily') || 'daily';
    const color = prompt('Mood theme color (hex or color name)', '#60a5fa') || '#60a5fa';
    const g = { id: crypto.randomUUID(), name, freq, color, consistency: 0.5 };
    setGoals((prev) => [...prev, g]);
    setActiveGoalId(g.id);
  }

  function selectGoal(g) { setActiveGoalId(g.id); }
  function saveProfile(p) { setProfile(p); }

  const activeGoal = useMemo(() => goals.find((g) => g.id === activeGoalId) || goals[0], [goals, activeGoalId]);

  function handleLog({ mood, date }) {
    if (!activeGoal) return;
    const id = activeGoal.id;
    const list = entries[id] || [];
    const updated = [...list, { mood, date }];
    const newEntries = { ...entries, [id]: updated };
    setEntries(newEntries);

    // Update consistency brightness locally (simple recency-weighted score)
    const recent = updated.slice(-14);
    const score = recent.reduce((acc, e) => acc + (e.mood === 'Lazy' ? 0.2 : e.mood === 'Tired' ? 0.4 : e.mood === 'Calm' ? 0.7 : e.mood === 'Happy' ? 0.8 : e.mood === 'Excited' ? 0.9 : 1), 0) / Math.max(1, recent.length);
    setGoals((prev) => prev.map((g) => g.id === id ? { ...g, consistency: score } : g));
  }

  const weeklyNodes = useMemo(() => {
    if (!activeGoal) return [];
    const list = entries[activeGoal.id] || [];
    const last7 = list.slice(-7);
    // pad to 7
    const pad = Array.from({ length: Math.max(0, 7 - last7.length) }, (_, i) => ({ mood: profile.mood, date: new Date(Date.now() - (i+last7.length)*86400000).toISOString(), intensity: 0.3 }));
    return [...pad.reverse(), ...last7];
  }, [entries, activeGoal, profile.mood]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-50 via-pink-50 to-amber-50">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <Hero />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProfileEditor profile={profile} onSave={saveProfile} />
            <GoalOrbs goals={goals} onAdd={addGoal} onSelect={selectGoal} />
            <ConsistencyChain entries={weeklyNodes} baseMood={profile.mood} />
          </div>
          <div className="space-y-6">
            <QuickLog goal={activeGoal} onLog={handleLog} />
            <div className="rounded-2xl bg-white/70 backdrop-blur shadow p-5">
              <h3 className="font-semibold text-slate-800 mb-2">Vibe Summary</h3>
              <p className="text-sm text-slate-600">This week: <span className="font-medium text-slate-800">{profile.mood === 'Motivated' ? '🔥 Focused Energy' : profile.mood === 'Calm' ? '🩵 Serene Flow' : profile.mood === 'Tired' ? '😴 Gentle Pace' : profile.mood === 'Excited' ? '✨ Sparked Joy' : '🌫 Soft Pause'}</span></p>
              <p className="text-sm text-slate-600 mt-1">Your chain glowed <span className="font-medium">{Math.round((goals.find(g=>g.id===activeGoal?.id)?.consistency || 0.5) * 100)}%</span> brighter than last week.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
