function LoaderScreen() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="mx-auto h-24 w-24 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent"></div>

        <h1 className="mt-8 text-4xl font-black text-white">
          Student Survival AI
        </h1>

        <p className="mt-3 text-slate-400">
          Loading your AI student assistant...
        </p>
      </div>
    </div>
  )
}

export default LoaderScreen