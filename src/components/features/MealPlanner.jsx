import { useState } from "react"
import { getStudentProfile } from "../../utils/studentProfile"
import ReactMarkdown from "react-markdown"
import CopyButton from "../ui/CopyButton"
import DownloadButton from "../ui/DownloadButton"

function MealPlanner({ onMealPlanGenerated }) {
  const [budget, setBudget] = useState("")
  const [diet, setDiet] = useState("")
  const [plan, setPlan] = useState("")
  const [loading, setLoading] = useState(false)

  async function generateMealPlan() {
    if (!budget.trim()) return

    const profile = getStudentProfile()

    setLoading(true)
    setPlan("")

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: `Create a simple UK student meal plan for one week.

Use realistic 2026 UK supermarket prices from Aldi, Lidl, Tesco, and Asda.
Avoid unrealistic cheap pricing.
Mention when prices are approximate.

Student profile:
Name: ${profile.name}
City: ${profile.city}
University: ${profile.university}
Monthly budget: £${profile.budget}
Main goal: ${profile.goal}

Weekly food budget: £${budget}
Diet preference: ${diet || "no preference"}

Keep it cheap, practical, realistic for UK supermarkets, and easy to cook.`,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Server error")
      }

      const data = await response.json()
      const answer = data.answer || "Could not generate meal plan."

      setPlan(answer)
      if (onMealPlanGenerated) {
  onMealPlanGenerated(answer)
}

      const saved = JSON.parse(localStorage.getItem("aiHistory")) || []

      localStorage.setItem(
        "aiHistory",
        JSON.stringify([
          {
            tool: "AI Meal Planner",
            content: answer,
          },
          ...saved,
        ])
      )
    } catch (error) {
      console.error("Meal planner error:", error)
      setPlan(`Error: ${error.message}`)
    }

    setLoading(false)
  }

  return (
    <section id="meal-planner" className="mx-auto max-w-5xl px-6 pb-24">
      <h2 className="mb-4 text-center text-4xl font-black">
        AI Meal Planner
      </h2>

      <p className="mx-auto mb-10 max-w-2xl text-center text-slate-400">
        Generate a cheap weekly meal plan based on your student food budget.
      </p>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="number"
            placeholder="Weekly food budget (£)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
          />

          <input
            type="text"
            placeholder="Diet preference e.g. halal, vegetarian, high protein"
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
          />
        </div>

        <button
          onClick={generateMealPlan}
          className="mt-5 rounded-2xl bg-white px-8 py-4 font-bold text-black transition hover:scale-105"
        >
          {loading ? "Generating..." : "Generate Meal Plan"}
        </button>

        {plan && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-black p-6 text-slate-300 shadow-2xl">
            <div className="mb-6 flex flex-wrap gap-3">
              <CopyButton text={plan} />
              <DownloadButton text={plan} filename="meal-plan.txt" />
            </div>

            <div className="mb-6">
              <h3 className="text-3xl font-bold text-white">
                Estimated UK Supermarket Cost Breakdown
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Budget-friendly student meal pricing based on average UK supermarket costs.
              </p>
            </div>

            <div className="mb-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">
              <p className="text-sm leading-7 text-yellow-200">
                <strong className="text-yellow-100">Price accuracy:</strong>{" "}
                Estimated only. This app does not yet use live supermarket prices.
                Always compare with current prices from Aldi, Lidl, Tesco, or Asda before shopping.
              </p>
            </div>

            <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-white">
              <ReactMarkdown>{plan}</ReactMarkdown>
            </div>

            <div className="mt-8 rounded-2xl border border-green-400/20 bg-green-400/10 p-4">
              <h4 className="mb-3 text-lg font-bold text-green-300">
                Cheap Alternatives
              </h4>

              <ul className="space-y-2 text-sm text-slate-300">
                <li>🥚 Eggs instead of salmon</li>
                <li>🍚 Rice instead of quinoa</li>
                <li>🥦 Frozen vegetables instead of fresh packs</li>
                <li>🥫 Canned beans for cheaper protein</li>
              </ul>
            </div>

            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="text-sm text-slate-500">
                Prices are estimated using average UK supermarket data and may vary by
                location, season, and store availability.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default MealPlanner