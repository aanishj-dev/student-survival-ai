import { motion } from "framer-motion";
import WaterSplashCanvas from "../effects/WaterSplashCanvas";

function Hero() {
  return (
    <section id="home" className="mx-auto mt-14 max-w-[1120px] px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative isolate w-full overflow-hidden rounded-[3rem] border border-white/10 bg-black/70 px-4 py-10 sm:px-8 sm:py-14"
      >
        {/* Premium cursor particle effect */}
        <WaterSplashCanvas />

        {/* Background glow */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-500 blur-[120px]"></div>

          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-purple-600 blur-[120px]"></div>

          <div className="absolute bottom-0 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-blue-500 blur-[120px]"></div>
        </div>

        {/* Main content */}
        <div className="relative z-20 flex flex-col items-center px-5 pt-14 pb-10 text-center sm:px-8 md:pt-16 md:pb-12">

          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-5 rounded-full border border-white/20 bg-black/40 px-5 py-2 text-sm text-slate-300 backdrop-blur-xl"
          >
            Built for international students in the UK
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl"
          >
            Your AI assistant for surviving student life in the UK.
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8"
          >
            Get help with budgeting, accommodation, jobs, transport,
            emergency support, visa reminders, and everyday student life.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-10 flex flex-col gap-5 sm:flex-row"
          >
            <a
              href="#features"
              className="group relative overflow-hidden rounded-2xl bg-white px-8 py-4 font-bold text-black transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]"
            >
              <span className="relative z-10">Explore Features</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
            </a>

            <a
              href="#dashboard"
              className="group relative overflow-hidden rounded-2xl border border-white/20 bg-black/40 px-8 py-4 font-bold text-white transition-all duration-500 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)]"
            >
              <span className="relative z-10">Try AI Chat</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
            </a>
          </motion.div>

          {/* Feature badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-5"
          >
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-cyan-300 backdrop-blur-xl">
              ⚡ AI Powered
            </div>

            <div className="rounded-2xl border border-purple-400/20 bg-purple-400/10 px-5 py-3 text-purple-300 backdrop-blur-xl">
              🚀 Real-Time Tools
            </div>

            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-3 text-emerald-300 backdrop-blur-xl">
              💼 UK Student Ready
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;