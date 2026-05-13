function ProjectShowcase() {
  const techStack = [
    "React",
    "Vite",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "OpenAI API",
    "Local Storage",
    "Recharts",
  ]

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <h2 className="mb-4 text-center text-4xl font-black">
        Project Showcase
      </h2>

      <p className="mx-auto mb-10 max-w-3xl text-center text-slate-400">
        A full-stack AI web application built to help international students in
        the UK manage budgeting, meals, jobs, emergency support, and daily
        student-life questions.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-2xl font-bold text-cyan-400">
            Technologies Used
          </h3>

          <div className="mt-5 flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-black px-4 py-2 text-sm text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-2xl font-bold text-cyan-400">
            CV Project Description
          </h3>

          <p className="mt-5 leading-7 text-slate-300">
            Built an AI-powered student survival assistant using React,
            Tailwind CSS, Node.js, Express, and OpenAI API. The application
            includes budgeting tools, AI finance insights, meal planning,
            part-time job suggestions, emergency support information, and an
            interactive AI chatbot for international students in the UK.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ProjectShowcase