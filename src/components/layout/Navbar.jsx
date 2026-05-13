import React, { useEffect, useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../../firebase";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 40);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  const user = JSON.parse(localStorage.getItem("studentUser"));

const handleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = {
      name: result.user.displayName,
      photo: result.user.photoURL,
      email: result.user.email,
    };

    localStorage.setItem("studentUser", JSON.stringify(user));

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

 const handleLogout = async () => {
  await signOut(auth);

  localStorage.removeItem("studentUser");

  window.location.reload();
};

 return (
  <nav
  className={`sticky top-0 z-50 w-full px-4 py-4 md:px-8 transition-all duration-500 ${
    scrolled
      ? "backdrop-blur-2xl bg-black/70 border-b border-cyan-400/10 shadow-[0_10px_40px_rgba(0,255,255,0.08)]"
      : "bg-transparent"
  }`}
>
    <div className="mx-auto flex max-w-[1120px] items-center justify-between rounded-[2rem] border border-white/10 bg-black/40 px-5 py-4 shadow-2xl shadow-cyan-500/5 backdrop-blur-2xl">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">

        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/20 to-cyan-500/5">
          <div className="absolute inset-0 bg-cyan-400/10 blur-xl"></div>

          <span className="relative text-lg font-black text-cyan-300">
            S
          </span>
        </div>

        <div>
          <h1 className="text-xl font-black tracking-tight text-white">
            Student Survival AI
          </h1>

          <p className="mt-0.5 text-[11px] uppercase tracking-[0.35em] text-slate-500">
            AI Student Toolkit
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      {user ? (
        <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 transition duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05]">

          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md"></div>

            <img
              src={user.photo}
              alt={user.name}
              className="relative h-11 w-11 rounded-full border border-cyan-400/30 object-cover"
            />
          </div>

          <div className="hidden sm:block">
            <p className="max-w-[140px] truncate text-sm font-semibold text-white">
              {user.name}
            </p>

            <p className="text-xs text-slate-400">
              Active Session
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:border-red-400/40 hover:bg-red-500/10"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="group relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-6 py-3 font-semibold text-cyan-100 transition duration-300 hover:scale-[1.02] hover:border-cyan-300/40 hover:bg-cyan-400/20"
        >
          <span className="relative z-10">
            Sign in with Google
          </span>

          <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
            <div className="absolute -left-10 top-0 h-full w-20 rotate-12 bg-white/20 blur-xl"></div>
          </div>
        </button>
      )}
    </div>
  </nav>
);
}

export default Navbar;