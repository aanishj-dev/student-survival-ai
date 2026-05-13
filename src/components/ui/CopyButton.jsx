import { useState } from "react"

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  async function copyText() {
    await navigator.clipboard.writeText(text)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1800)
  }

  return (
    <>
      <button
        onClick={copyText}
        className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300 transition hover:bg-cyan-400 hover:text-black"
      >
        {copied ? "Copied ✓" : "Copy Result"}
      </button>

      {copied && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-cyan-400/30 bg-black px-6 py-4 text-sm font-bold text-cyan-300 shadow-2xl shadow-cyan-500/20">
          Result copied to clipboard
        </div>
      )}
    </>
  )
}

export default CopyButton