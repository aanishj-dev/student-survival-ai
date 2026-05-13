import { useState } from "react"
import ReactMarkdown from "react-markdown"

function StudentPlanner() {
  const [hours, setHours] = useState("")
  const [jobHours, setJobHours] = useState("")
  const [goals, setGoals] = useState("")
  const [plan, setPlan] = useState("")
  const [loading, setLoading] = useState(false)

  async function generatePlan() {
    if (!hours.trim()) return

    setLoading(true)
    setPlan("")

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: `
Create a balanced daily routine for a UK international student.

Study hours: ${hours}
Part-time work hours: ${jobHours}
Goals: ${goals}

Include:
1. Morning routine
2. Study schedule
3. Work-life balance
4. Fitness/rest
5. Productivity advice
6. Sleep recommendations
`,
        }),
      })

      const data = await response.json()

      const answer = data.answer || "Could not generate planner."

setPlan(answer)

const saved = JSON.parse(localStorage.getItem("aiHistory")) || []

localStorage.setItem(
  "aiHistory",
  JSON.stringify([
    {
      tool: "AI Daily Student Planner",
      content: answer,
    },
    ...saved,
  ])
)
    } catch (error) {
      setPlan("Connection failed.")
    }

    setLoading(false)
  }

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <h2 className="mb-4 text-center text-4xl font-black">
        AI Daily Student Planner
      </h2>

      <p className="mx-auto mb-10 max-w-2xl text-center text-slate-400">
        Generate a balanced routine for study, work, fitness, and productivity.
      </p>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="number"
            placeholder="Study hours per day"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="rounded-2xl bg-black p-4 text-white outline-none"
          />

          <input
            type="number"
            placeholder="Part-time work hours"
            value={jobHours}
            onChange={(e) => setJobHours(e.target.value)}
            className="rounded-2xl bg-black p-4 text-white outline-none"
          />
        </div>

        <textarea
          rows="5"
          placeholder="Goals e.g. better grades, gym, coding, job hunting"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          className="mt-4 w-full rounded-2xl bg-black p-4 text-white outline-none"
        />

        <button
          onClick={generatePlan}
          className="mt-5 rounded-2xl bg-white px-8 py-4 font-bold text-black transition hover:scale-105"
        >
          {loading ? "Generating..." : "Generate Planner"}
        </button>

        {plan && (
  <div className="prose prose-invert mt-6 max-w-none rounded-2xl border border-white/10 bg-black p-6 leading-8 text-slate-300">
    <ReactMarkdown>{plan}</ReactMarkdown>
  </div>
)}
      </div>
    </section>
  )
}

export default StudentPlanner