import { useState } from "react"
import ReactMarkdown from "react-markdown"

function CVReviewer() {
  const [cv, setCv] = useState("")
  const [review, setReview] = useState("")
  const [loading, setLoading] = useState(false)

  async function analyzeCV() {
    if (!cv.trim()) return

    setLoading(true)
    setReview("")

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: `
Review this CV for UK student/graduate jobs.

Give:
1. ATS improvement tips
2. Missing skills
3. Better wording suggestions
4. CV strengths
5. Overall rating out of 10

CV:
${cv}
`,
        }),
      })

      const data = await response.json()

      const answer = data.answer || "Could not review CV."

setReview(answer)

const saved = JSON.parse(localStorage.getItem("aiHistory")) || []

localStorage.setItem(
  "aiHistory",
  JSON.stringify([
    {
      tool: "AI CV Reviewer",
      content: answer,
    },
    ...saved,
  ])
)
    } catch (error) {
      setReview("Connection failed.")
    }

    setLoading(false)
  }

  return (
    <section id="cv-reviewer" className="mx-auto max-w-6xl px-6 pb-24">
      <h2 className="mb-4 text-center text-4xl font-black">
        AI CV Reviewer
      </h2>

      <p className="mx-auto mb-10 max-w-2xl text-center text-slate-400">
        Paste your CV and get AI-powered improvement suggestions.
      </p>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <textarea
          rows="12"
          placeholder="Paste your CV here..."
          value={cv}
          onChange={(e) => setCv(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-black p-5 text-white outline-none"
        />

        <button
          onClick={analyzeCV}
          className="mt-5 rounded-2xl bg-white px-8 py-4 font-bold text-black transition hover:scale-105"
        >
          {loading ? "Analyzing..." : "Review CV"}
        </button>

        {review && (
  <div className="mt-6 prose prose-invert max-w-none rounded-2xl border border-white/10 bg-black p-5 leading-7 text-slate-300">
    <ReactMarkdown>{review}</ReactMarkdown>
  </div>
)}
      </div>
    </section>
  )
}

export default CVReviewer