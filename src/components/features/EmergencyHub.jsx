function EmergencyHub() {
  const supportItems = [
    {
      title: "Emergency",
      number: "999",
      text: "Call for police, ambulance, or fire emergency.",
    },
    {
      title: "NHS Non-Emergency",
      number: "111",
      text: "Use for urgent medical advice when it is not life-threatening.",
    },
    {
      title: "Mental Health Support",
      number: "Samaritans: 116 123",
      text: "Free emotional support available 24/7 in the UK.",
    },
    {
      title: "University Support",
      number: "Student Services",
      text: "Contact your university for housing, finance, wellbeing, and academic help.",
    },
  ]

  return (
    <section id="emergency" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <h2 className="mb-4 text-center text-4xl font-black">
        UK Emergency Support Hub
      </h2>

      <p className="mx-auto mb-10 max-w-2xl text-center text-slate-400">
        Quick support information for international students living in the UK.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {supportItems.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5"
          >
            <h3 className="text-3xl font-black sm:text-5xl">{item.title}</h3>

            <p className="mt-3 text-3xl font-black text-cyan-400">
              {item.number}
            </p>

            <p className="mt-4 text-slate-300">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default EmergencyHub