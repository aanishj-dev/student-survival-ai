import { useState } from "react"
import CopyButton from "../ui/CopyButton";
import DownloadButton from "../ui/DownloadButton";

export default function InternationalStudentAssistant() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])

  async function generateGuidance(selectedQuestion) {
    if (!selectedQuestion.trim()) return

    setLoading(true)
    setAnswer("")

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: `
You are an AI International Student Assistant for students in the UK.

Student question:
${selectedQuestion}

Give:
- practical UK guidance
- student-friendly advice
- step-by-step help
- simple formatting
- emergency warnings if necessary
          `,
        }),
      })

      const data = await response.json()
      const result = data.answer || "Could not generate student guidance."

      setAnswer(result)

      setHistory((previous) => [
        {
          question: selectedQuestion,
          answer: result,
        },
        ...previous,
      ])
    } catch (error) {
      setAnswer("Something went wrong.")
    }

    setLoading(false)
  }

  function askAssistant() {
    generateGuidance(question)
  }

  const categoryButtons = [
    {
      label: "Visa Basics",
      question: "What are the most important UK student visa rules?",
    },
    {
      label: "NHS / GP",
      question: "How do I register with a GP and use the NHS?",
    },
    {
      label: "Banking",
      question: "How do I open a UK student bank account?",
    },
    {
      label: "Accommodation",
      question: "How can I avoid accommodation scams in the UK?",
    },
    {
      label: "Jobs",
      question: "What jobs can international students do in the UK?",
    },
    {
      label: "Emergency Help",
      question: "What should I do during a student emergency in the UK?",
    },
  ]

  const quickQuestions = [
    "I just arrived in the UK. What should I do first this week?",
    "How do I register with a GP and NHS?",
    "What documents do I need for a UK bank account?",
    "What should I do in an emergency as an international student?",
  ]

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm backdrop-blur-xl">
      <h2 className="text-3xl font-black text-white">
        International Student Assistant
      </h2>

      <p className="mt-3 text-slate-400">
        Get help with visas, accommodation, budgeting, NHS, banking,
        university support, and settling in the UK.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        {categoryButtons.map((tag) => (
          <button
            key={tag.label}
            onClick={() => {
              setQuestion(tag.question)
              generateGuidance(tag.question)
            }}
            className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-cyan-300 transition hover:scale-105 hover:bg-cyan-400/20"
          >
            {tag.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {quickQuestions.map((item) => (
          <button
            key={item}
            onClick={() => setQuestion(item)}
            className="rounded-2xl border border-white/10 bg-black/50 p-4 text-left text-sm text-slate-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-200"
          >
            {item}
          </button>
        ))}
      </div>

      <textarea
        rows="6"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask anything about student life in the UK..."
        className="mt-6 w-full rounded-2xl border border-white/10 bg-black p-5 text-white outline-none"
      />

      <button
        onClick={askAssistant}
        className="mt-5 rounded-2xl bg-cyan-400 px-8 py-4 font-bold text-black transition hover:scale-105"
      >
        {loading ? "Generating..." : "Get Student Guidance"}
      </button>

      {answer && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-black p-6">
          <div className="mb-5 flex flex-wrap gap-3">
            <CopyButton text={answer} />
            <DownloadButton text={answer} filename="student-guidance.txt" />
          </div>

          <div className="mb-6 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4 text-sm leading-7 text-yellow-200">
            <strong>Important:</strong> This tool gives general student guidance only.
            For visa, medical, legal, or emergency issues, always confirm with official UK sources,
            your university support team, NHS 111, or emergency services.
          </div>

          <h3 className="mb-4 text-2xl font-black text-white">
            AI Guidance
          </h3>

          <div className="whitespace-pre-wrap text-slate-300">
            {answer}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-black p-6">
          <h3 className="mb-4 text-2xl font-black text-white">
            Recent Student Help
          </h3>

          <div className="space-y-4">
            {history.map((item, index) => (
              <button
                key={index}
                onClick={() => setAnswer(item.answer)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
              >
                <p className="text-sm text-slate-300">
                  {item.question}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}