function AuthRequired({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md">

      <div className="w-[90%] max-w-md rounded-3xl border border-white/10 bg-[#0b1020] p-8 text-center shadow-2xl">

        <div className="mb-5 text-5xl">
          🔒
        </div>

        <h2 className="text-3xl font-black text-white">
          Sign in required
        </h2>

        <p className="mt-3 text-slate-400">
          Please sign in with your Google account to access this feature.
        </p>

        <button
          onClick={onClose}
          className="mt-6 rounded-2xl bg-cyan-400 px-6 py-3 font-bold text-black transition hover:scale-105"
        >
          Close
        </button>

      </div>

    </div>
  );
}

export default AuthRequired;