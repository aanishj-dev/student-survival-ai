import Hero3D from "./Hero3D"

function Hero() {
  return (
    <section className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2">
      <div>
        <div className="mb-5 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-300 backdrop-blur">
          AI-powered survival system for international students
        </div>

        <h2 className="text-5xl font-black leading-tight md:text-7xl">
          Survive, plan, and grow in the UK with your personal AI assistant.
        </h2>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
          Budget smarter, plan meals, find student jobs, review your CV,
          organise your routine, and get instant AI guidance for UK student life.
        </p>

        <div className="mt-10 flex flex-col gap-5 sm:flex-row">
          <a
            href="#chat"
            className="rounded-2xl bg-cyan-400 px-8 py-4 font-bold text-black shadow-lg shadow-cyan-400/20 transition hover:scale-105"
          >
            Try AI Assistant
          </a>

          <a
            href="#features"
            className="rounded-2xl border border-white/20 bg-white/5 px-8 py-4 font-bold backdrop-blur transition hover:bg-white/10"
          >
            Explore Tools
          </a>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-cyan-500/10 backdrop-blur">
        <Hero3D />
      </div>
    </section>
  )
}

export default Hero