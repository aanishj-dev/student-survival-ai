import { useEffect, useState } from "react"

function SavedHistory() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("aiHistory")) || []
    setHistory(saved)
  }, [])

  function clearHistory() {
    localStorage.removeItem("aiHistory")
    setHistory([])
  }

  function exportHistory() {
  const text = history
    .map((item, index) => {
      return `${index + 1}. ${item.tool}\n\n${item.content}\n\n----------------------\n`
    })
    .join("\n")

  const blob = new Blob([text], { type: "text/plain" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = "student-survival-ai-history.txt"
  link.click()

  URL.revokeObjectURL(url)
}

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <h2 className="mb-4 text-center text-4xl font-black">
        Saved AI History
      </h2>

      <p className="mx-auto mb-10 max-w-2xl text-center text-slate-400">
        Your recent AI-generated results are saved locally on your device.
      </p>

      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        {history.length === 0 ? (
          <p className="text-slate-400">No saved AI results yet.</p>
        ) : (
          <div className="space-y-5">
            {history.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-black p-5"
              >
                <p className="text-sm text-cyan-400">{item.tool}</p>
                <p className="mt-2 whitespace-pre-wrap text-slate-300">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-4">
  <button
    onClick={exportHistory}
    className="rounded-2xl bg-cyan-400 px-6 py-3 font-bold text-black"
  >
    Export History
  </button>

  <button
    onClick={clearHistory}
    className="rounded-2xl bg-red-500 px-6 py-3 font-bold text-white"
  >
    Clear History
  </button>
</div>
        )}
      </div>
    </section>
  )
}

export default SavedHistory