import { useState } from "react"
import ReactMarkdown from "react-markdown"

function StudentChat() {
  const [question, setQuestion] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi, I’m your Student Survival AI. Ask me about budgeting, jobs, food, transport, or student life in the UK.",
    },
  ])

  async function handleSend() {
    if (question.trim() === "") return

    const userQuestion = question

    const userMessage = {
      role: "user",
      text: userQuestion,
    }

    setMessages((prev) => [...prev, userMessage])
    setQuestion("")
    setIsTyping(true)

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userQuestion,
        }),
      })

      const data = await response.json()

      const botMessage = {
        role: "bot",
        text:
  data.answer ||
  data.error ||
  "Sorry, I could not generate a response right now.",
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage = {
        role: "bot",
        text: "Connection failed. Please make sure the AI server is running.",
      }

      setMessages((prev) => [...prev, errorMessage])
    }

    setIsTyping(false)
  }

  return (
    <section id="chat" className="mx-auto max-w-5xl px-6 pb-24">
      <h2 className="mb-4 text-center text-4xl font-black">
        AI Student Guide
      </h2>

      <p className="mx-auto mb-10 max-w-2xl text-center text-slate-400">
        Ask questions about UK student life, budgeting, jobs, food, transport,
        and emergency support.
      </p>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="mb-6 h-96 space-y-4 overflow-y-auto rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.role === "user"
                  ? "ml-auto max-w-xl rounded-2xl bg-white px-5 py-3 text-black"
                  : "max-w-xl rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-white"
              }
            ><ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          ))}

          {isTyping && (
            <div className="max-w-xs rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-slate-300">
              AI is typing...
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <input
            type="text"
            placeholder="Ask something like: How can I save money as a student?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend()
            }}
            className="flex-1 rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
          />

          <button
            onClick={handleSend}
            className="rounded-2xl bg-white px-8 py-4 font-bold text-black transition hover:scale-105"
          >
            Send
          </button>
        </div>
      </div>
    </section>
  )
}

export default StudentChat