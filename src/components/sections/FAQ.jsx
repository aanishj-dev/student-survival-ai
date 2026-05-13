function FAQ() {
  const faqs = [
    {
      question: "Can international students work in the UK?",
      answer:
        "Usually yes, but work limits depend on your visa conditions. Always check your BRP/eVisa and university guidance.",
    },
    {
      question: "How can students save money on food?",
      answer:
        "Cook in batches, use supermarket own-brand products, avoid frequent delivery, and plan meals weekly.",
    },
    {
      question: "What should I do in a medical emergency?",
      answer:
        "Call 999 for emergencies. Use NHS 111 for urgent but non-life-threatening medical advice.",
    },
    {
      question: "Where can students find part-time jobs?",
      answer:
        "Try Indeed, LinkedIn, university job boards, local restaurants, retail shops, warehouses, and company websites.",
    },
  ]

  return (
    <section className="mx-auto max-w-5xl px-6 pb-24">
      <h2 className="mb-10 text-center text-4xl font-black">
        Student FAQ
      </h2>

      <div className="space-y-5">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <h3 className="text-xl font-bold text-cyan-400">
              {faq.question}
            </h3>

            <p className="mt-3 text-slate-300">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQ