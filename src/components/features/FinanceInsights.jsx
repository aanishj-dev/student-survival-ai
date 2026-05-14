import { useState } from "react"
import ReactMarkdown from "react-markdown"

function FinanceInsights() {
  const [income, setIncome] = useState("")
  const [rent, setRent] = useState("")
  const [food, setFood] = useState("")
  const [transport, setTransport] = useState("")
  const [other, setOther] = useState("")
  const [analysis, setAnalysis] = useState("")
  const [loading, setLoading] = useState(false)

  async function generateInsights() {
    setLoading(true)

    const totalExpenses =
      Number(rent) +
      Number(food) +
      Number(transport) +
      Number(other)

    const savings = Number(income) - totalExpenses

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: `
Analyze this UK student monthly budget.

Income: £${income}
Rent: £${rent}
Food: £${food}
Transport: £${transport}
Other: £${other}
Savings: £${savings}

Give:
1. Financial health score out of 10
2. Spending analysis
3. Savings advice
4. What to improve
5. Smart UK student money tips
`,
        }),
      })

      const data = await response.json()
      const answer = data.answer || "Could not generate finance insights."

setAnalysis(answer)

const saved = JSON.parse(localStorage.getItem("aiHistory")) || []

localStorage.setItem(
  "aiHistory",
  JSON.stringify([
    {
      tool: "AI Finance Insights",
      content: answer,
    },
    ...saved,
  ])
)
    } catch (error) {
      setAnalysis("Could not generate insights.")
    }

    setLoading(false)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <h2 className="text-3xl font-black sm:text-5xl">
        AI Finance Insights
      </h2>

      <p className="mx-auto mb-10 max-w-2xl text-center text-slate-400">
        Get AI-powered analysis of your student finances.
      </p>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="number"
            placeholder="Monthly income (£)"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="rounded-2xl bg-black p-4 text-white outline-none"
          />

          <input
            type="number"
            placeholder="Rent (£)"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            className="rounded-2xl bg-black p-4 text-white outline-none"
          />

          <input
            type="number"
            placeholder="Food (£)"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            className="rounded-2xl bg-black p-4 text-white outline-none"
          />

          <input
            type="number"
            placeholder="Transport (£)"
            value={transport}
            onChange={(e) => setTransport(e.target.value)}
            className="rounded-2xl bg-black p-4 text-white outline-none"
          />

          <input
            type="number"
            placeholder="Other expenses (£)"
            value={other}
            onChange={(e) => setOther(e.target.value)}
            className="rounded-2xl bg-black p-4 text-white outline-none"
          />
        </div>

        <button
          onClick={generateInsights}
          className="mt-5 rounded-2xl bg-white px-8 py-4 font-bold text-black"
        >
          {loading ? "Analyzing..." : "Generate AI Insights"}
        </button>

        {analysis && (
  <div className="prose prose-invert mt-6 max-w-none rounded-2xl border border-white/10 bg-black p-6 leading-8 text-slate-300">
    <ReactMarkdown>{analysis}</ReactMarkdown>
  </div>
)}
      </div>
    </section>
  )
}

export default FinanceInsights