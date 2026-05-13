function ToolNavigator() {
  const tools = [
    { title: "Budget Tracker", text: "Track expenses", href: "#tools", icon: "💸" },
    { title: "AI Chat", text: "Ask UK student questions", href: "#chat", icon: "🤖" },
    { title: "Meal Planner", text: "Plan cheap meals", href: "#meal-planner", icon: "🍱" },
    { title: "Job Finder", text: "Find student jobs", href: "#job-finder", icon: "💼" },
    { title: "CV Reviewer", text: "Improve your CV", href: "#cv-reviewer", icon: "📄" },
    { title: "Emergency Hub", text: "Quick UK support", href: "#emergency", icon: "🚨" },
  ]

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <h2 className="mb-10 text-center text-4xl font-black">
        Quick Access Tools
      </h2>

      <div className="grid gap-5 md:grid-cols-3">
        {tools.map((tool) => (
          <a
            key={tool.title}
            href={tool.href}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-500/5 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-400/40 hover:bg-cyan-400/10"
          >
            <div className="text-4xl">{tool.icon}</div>
            <h3 className="mt-4 text-2xl font-bold">{tool.title}</h3>
            <p className="mt-2 text-slate-400">{tool.text}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

export default ToolNavigator