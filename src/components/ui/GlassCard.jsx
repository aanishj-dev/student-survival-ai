function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-500/5 backdrop-blur-xl transition hover:border-cyan-400/30 hover:bg-white/10 ${className}`}
    >
      {children}
    </div>
  )
}

export default GlassCard