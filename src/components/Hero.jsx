import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-pink-100 via-indigo-100 to-sky-100 shadow-xl">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/ezRAY9QD27kiJcur/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="relative z-10 h-full flex items-center">
        <div className="px-6 md:px-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/60" />
          <div className="relative">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 drop-shadow-sm">
              VibeChain
            </h1>
            <p className="mt-3 max-w-xl text-slate-700 md:text-lg">
              Track goals through color, mood and motion. Build a glowing chain of consistency — no charts, just vibes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
