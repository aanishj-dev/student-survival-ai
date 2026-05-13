import { useEffect, useState } from "react"
import ExpenseChart from "./ExpenseChart";


function BudgetTracker() {
  const [income, setIncome] = useState(
  localStorage.getItem("income") || ""
)

const [rent, setRent] = useState(
  localStorage.getItem("rent") || ""
)

const [food, setFood] = useState(
  localStorage.getItem("food") || ""
)

const [transport, setTransport] = useState(
  localStorage.getItem("transport") || ""
)

const [other, setOther] = useState(
  localStorage.getItem("other") || ""
)
useEffect(() => {
  localStorage.setItem("income", income)
  localStorage.setItem("rent", rent)
  localStorage.setItem("food", food)
  localStorage.setItem("transport", transport)
  localStorage.setItem("other", other)
}, [income, rent, food, transport, other])

  const totalExpenses =
    Number(rent) + Number(food) + Number(transport) + Number(other)
    const remaining = Number(income) - totalExpenses

const savingsRate =
  Number(income) > 0
    ? ((remaining / Number(income)) * 100).toFixed(1)
    : 0

  return (
    <section id="tools" className="mx-auto max-w-6xl px-6 pb-24">
      <h2 className="mb-4 text-center text-4xl font-black">
        Student Budget Tracker
      </h2>

      <p className="mx-auto mb-10 max-w-2xl text-center text-slate-400">
        Enter your monthly income and expenses to quickly see how much money you
        have left.
      </p>

      <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 md:grid-cols-2">
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Monthly income (£)"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
          />

          <input
            type="number"
            placeholder="Rent (£)"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
          />

          <input
            type="number"
            placeholder="Food (£)"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
          />

          <input
            type="number"
            placeholder="Transport (£)"
            value={transport}
            onChange={(e) => setTransport(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
          />

          <input
            type="number"
            placeholder="Other expenses (£)"
            value={other}
            onChange={(e) => setOther(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
          />
          
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <h3 className="text-2xl font-bold">Monthly Summary</h3>
          

          <div className="mt-6 space-y-4 text-lg">
            <p>Total Expenses: £{totalExpenses}</p>
            <p>Savings Rate: {savingsRate}%</p>
            
            <ExpenseChart
  rent={rent}
  food={food}
  transport={transport}
  other={other}
/>

            <p
              className={
                remaining >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              Remaining Balance: £{remaining}
            </p>

           <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
  <h4 className="mb-3 text-xl font-bold text-cyan-400">
    AI Spending Advice
  </h4>

  <p className="leading-7 text-slate-300">
    {remaining > 500
      ? "Excellent financial management. You have strong savings potential this month."
      : remaining > 200
      ? "Your spending looks healthy. Consider saving part of your remaining balance."
      : remaining >= 0
      ? "Your budget is stable, but reducing unnecessary expenses would help."
      : "Your expenses are higher than your income. Try reducing food delivery, subscriptions, or transport costs."}
  </p>
</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BudgetTracker