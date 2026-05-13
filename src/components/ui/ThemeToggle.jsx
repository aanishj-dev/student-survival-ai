import { useEffect, useState } from "react"

function ThemeToggle() {
  const [lightMode, setLightMode] = useState(
    localStorage.getItem("theme") === "light"
  )

  useEffect(() => {
    if (lightMode) {
      document.body.classList.add("light-mode")
      localStorage.setItem("theme", "light")
    } else {
      document.body.classList.remove("light-mode")
      localStorage.setItem("theme", "dark")
    }
  }, [lightMode])

  return (
    <button
      onClick={() => setLightMode(!lightMode)}
      className="fixed bottom-6 left-6 z-50 rounded-full bg-white px-5 py-4 font-bold text-black shadow-lg transition hover:scale-110"
    >
      {lightMode ? "🌙" : "☀️"}
    </button>
  )
}

export default ThemeToggle