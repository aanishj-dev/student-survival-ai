const stats = [
  { value: "8+", label: "AI tools", icon: "🧠" },
  { value: "24/7", label: "Student support", icon: "⚡" },
  { value: "UK", label: "Focused guidance", icon: "🇬🇧" },
  { value: "MVP", label: "Full-stack project", icon: "🚀" },
]

function StatsBar() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-2xl shadow-cyan-500/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-cyan-400/30 hover:bg-white/10 hover:shadow-cyan-400/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-500/10 opacity-0 transition group-hover:opacity-100"></div>

            <div className="relative z-10">
              <div className="mb-3 text-3xl transition duration-500 group-hover:scale-125 group-hover:rotate-6">{stat.icon}</div>

              <h3 className="text-4xl font-black text-cyan-300 transition duration-500 group-hover:text-cyan-200">
                {stat.value}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatsBar