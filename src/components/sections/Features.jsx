const features = [
  {
    icon: "💸",
    title: "Budget Tracker",
    text: "Track rent, groceries, travel, subscriptions, and weekly spending.",
  },
  {
    icon: "🍔",
    title: "Cheap Food Finder",
    text: "Discover affordable food ideas and student discount options.",
  },
  {
    icon: "💼",
    title: "Part-Time Jobs",
    text: "Get student-friendly UK job suggestions based on your skills.",
  },
  {
    icon: "🤖",
    title: "AI Student Guide",
    text: "Ask questions about visas, transport, NHS, university life, and more.",
  },
]

function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="mb-10 text-center text-4xl font-black">
        Survival Tools
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur transition hover:-translate-y-2 hover:bg-white/10"
          >
            <div className="mb-4 text-4xl">{feature.icon}</div>

            <h3 className="text-2xl font-bold">{feature.title}</h3>

            <p className="mt-4 text-slate-300">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features