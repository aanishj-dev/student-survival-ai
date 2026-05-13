import { useState } from "react"
import ReactMarkdown from "react-markdown"
function JobFinder() {
  const [skills, setSkills] = useState("")
  const [jobs, setJobs] = useState("")
  const [loading, setLoading] = useState(false)

  async function generateJobs() {
    if (!skills.trim()) return

    setLoading(true)
    setJobs("")

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: `Suggest UK student-friendly part-time jobs for someone with these skills: ${skills}. Include expected pay, where to apply, and beginner advice.`,
        }),
      })

      const data = await response.json()

      const answer = data.answer || "Could not generate jobs."

setJobs(answer)

const saved = JSON.parse(localStorage.getItem("aiHistory")) || []

localStorage.setItem(
  "aiHistory",
  JSON.stringify([
    {
      tool: "AI UK Job Finder",
      content: answer,
    },
    ...saved,
  ])
)
    } catch (error) {
      setJobs("Connection failed. Make sure server is running.")
    }

    setLoading(false)
  }

  return (
    <section id="job-finder" className="mx-auto max-w-5xl px-6 pb-24">
      <h2 className="mb-4 text-center text-4xl font-black">
        AI UK Job Finder
      </h2>

      <p className="mx-auto mb-10 max-w-2xl text-center text-slate-400">
        Find UK student-friendly jobs based on your current skills.
      </p>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <input
          type="text"
          placeholder="Example: communication, customer service, coding, warehouse"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
        />

        <button
          onClick={generateJobs}
          className="mt-5 rounded-2xl bg-white px-8 py-4 font-bold text-black transition hover:scale-105"
        >
          {loading ? "Searching..." : "Find Jobs"}
        </button>

      {jobs && (
  <div className="mt-6 prose prose-invert max-w-none rounded-2xl border border-white/10 bg-black p-5 leading-7 text-slate-300">
    <ReactMarkdown>{jobs}</ReactMarkdown>
  </div>
)}
      </div>
    </section>
  )
}

export default JobFinder