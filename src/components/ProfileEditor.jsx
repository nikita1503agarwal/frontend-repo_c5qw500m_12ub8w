import { useState } from 'react';
import { User, Pencil, Image as ImageIcon } from 'lucide-react';

export default function ProfileEditor({ profile, onSave }) {
  const [name, setName] = useState(profile?.name || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [avatar, setAvatar] = useState(profile?.avatar || '');
  const [mood, setMood] = useState(profile?.mood || 'Calm');

  function handleAvatar(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result?.toString() || '');
    reader.readAsDataURL(file);
  }

  function submit(e) {
    e.preventDefault();
    onSave({ name, bio, avatar, mood });
  }

  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur shadow p-5">
      <div className="flex items-center gap-3 mb-4">
        <User className="w-5 h-5 text-slate-600" />
        <h3 className="font-semibold text-slate-800">Your Vibe</h3>
      </div>
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="col-span-1 flex items-center gap-3">
          <div className="relative w-14 h-14 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">
            {avatar ? (
              <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-6 h-6 text-slate-500" />
            )}
          </div>
          <div>
            <p className="text-sm text-slate-600">Avatar</p>
            <input type="file" accept="image/*" onChange={handleAvatar} className="mt-1 block text-sm" />
          </div>
        </label>

        <div>
          <label className="block text-sm text-slate-600">Name</label>
          <div className="mt-1 flex items-center gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="chill coder 🌙"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <Pencil className="w-4 h-4 text-slate-500" />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-slate-600">Vibe bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="gym beast 🔥"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
            rows={2}
          />
        </div>

        <div>
          <label className="block text-sm text-slate-600">Mood</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
          >
            {['Calm', 'Motivated', 'Tired', 'Excited'].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button className="rounded-lg bg-indigo-600 text-white px-4 py-2 shadow hover:bg-indigo-500 active:scale-[.99]">
            Save Vibe
          </button>
        </div>
      </form>
    </div>
  );
}
