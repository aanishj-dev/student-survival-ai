import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"

function GroceryList({ mealPlanFromApp }) {
  const [mealPlan, setMealPlan] = useState("")
  const [list, setList] = useState("")
  const [loading, setLoading] = useState(false)
  useEffect(() => {
  if (mealPlanFromApp) {
    setMealPlan(mealPlanFromApp)
  }
}, [mealPlanFromApp])

  async function generateList() {
    if (!mealPlan.trim()) return

    setLoading(true)
    setList("")

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: `Create a realistic UK supermarket grocery list based on this meal plan.

Requirements:
- Categorise items
- Add estimated UK prices
- Mention Aldi/Lidl alternatives
- Include weekly total
- Keep student budget in mind
- Make output clean and readable

Meal plan:
${mealPlan}`,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Server error")
      }

      const data = await response.json()
      setList(data.answer || "Could not generate grocery list.")
    } catch (error) {
      console.error("Grocery list error:", error)
      setList(`Error: ${error.message}`)
    }

    setLoading(false)
  }

  return (
    <section id="grocery-list" className="mx-auto max-w-5xl px-6 pb-24">
      <h2 className="mb-4 text-center text-4xl font-black">
        Smart Grocery Generator
      </h2>

      <p className="mx-auto mb-10 max-w-2xl text-center text-slate-400">
        Turn your meal plan into a realistic UK supermarket shopping list.
      </p>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <textarea
          rows="10"
          placeholder="Paste your meal plan here..."
          value={mealPlan}
          onChange={(e) => setMealPlan(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-black p-5 text-white outline-none"
        />

        <button
          onClick={generateList}
          className="mt-5 rounded-2xl bg-white px-8 py-4 font-bold text-black transition hover:scale-105"
        >
          {loading ? "Generating..." : "Generate Grocery List"}
        </button>

        {list && (
          <div className="prose prose-invert mt-8 max-w-none rounded-2xl border border-white/10 bg-black p-6 leading-8 text-slate-300">
            <ReactMarkdown>{list}</ReactMarkdown>
          </div>
        )}
      </div>
    </section>
  )
}

export default GroceryList