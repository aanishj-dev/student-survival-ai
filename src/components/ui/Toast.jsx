function Toast({ message }) {
  if (!message) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-cyan-400/30 bg-black px-6 py-4 text-sm font-bold text-cyan-300 shadow-2xl shadow-cyan-500/20">
      {message}
    </div>
  )
}

export default Toast