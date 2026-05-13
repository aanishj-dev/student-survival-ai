import { useState } from "react"
import Toast from "./Toast"

function DownloadButton({ text, filename = "ai-result.txt" }) {
  const [toast, setToast] = useState("")

  function downloadText() {
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = filename
    link.click()

    URL.revokeObjectURL(url)

    setToast("File downloaded")

    setTimeout(() => {
      setToast("")
    }, 1800)
  }

  return (
    <>
      <button
        onClick={downloadText}
        className="mb-4 ml-3 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white hover:text-black"
      >
        Download TXT
      </button>

      <Toast message={toast} />
    </>
  )
}

export default DownloadButton