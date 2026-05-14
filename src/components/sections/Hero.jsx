import { motion } from "framer-motion";
import ParticlesBackground from "./ParticlesBackground";

function Hero() {
  return (
    <section id="home" className="mx-auto mt-14 max-w-[1320px] px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative isolate overflow-hidden rounded-[3rem] border border-white/10 bg-black/70 px-4 py-10 sm:px-8 sm:py-14"
      >
        {/* Premium cursor particle effect */}
        <ParticlesBackground />

        {/* Background glow */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-500 blur-[120px]"></div>
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-purple-500 blur-[120px]"></div>
          <div className="absolute bottom-[-5rem] left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-blue-500 blur-[120px]"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center px-5 pt-14 pb-10 text-center sm:px-8 md:pt-16 md:pb-12">

          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-5 rounded-full border border-white/20 bg-black/40 px-5 py-2 text-sm text-slate-300 backdrop-blur-xl"
          >
            Built for international students in the UK
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-7xl lg:text-8xl"
          >
            Your AI assistant for surviving student life in the UK.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-5 max-w-xl px-2 text-sm leading-6 text-slate-300 sm:max-w-2xl sm:px-0 sm:text-lg sm:leading-8"
          >
            Get help with budgeting, accommodation, jobs, transport,
            emergency support, visa reminders, and everyday student life.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-8 flex w-full flex-col gap-4 sm:mt-10 sm:w-auto sm:flex-row"
          >
            <a
              href="#features"
              className="group relative w-full overflow-hidden rounded-2xl bg-white px-6 py-3 text-center font-bold text-black transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] sm:w-auto sm:px-8 sm:py-4"
            >
              <span className="relative z-10">Explore Features</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
            </a>

            <a
              href="#dashboard"
              className="group relative w-full overflow-hidden rounded-2xl border border-white/20 bg-black/40 px-6 py-3 text-center font-bold text-white transition-all duration-500 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)] sm:w-auto sm:px-8 sm:py-4"
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
            className="mt-10 flex flex-wrap items-center justify-center gap-3 px-3 sm:mt-12 sm:gap-5 sm:px-0"
          >
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-cyan-300 backdrop-blur-xl">
              ⚡ AI Powered
            </div>

            <div className="rounded-2xl border border-purple-400/20 bg-purple-400/10 px-5 py-3 text-purple-300 backdrop-blur-xl">
              💼 Real-Time Tools
            </div>

            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-3 text-emerald-300 backdrop-blur-xl">
              🇬🇧 UK Student Ready
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}

export default Hero;