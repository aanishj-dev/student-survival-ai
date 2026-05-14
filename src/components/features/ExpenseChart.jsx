import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

function ExpenseChart({ rent, food, transport, other }) {
  const data = [
    { name: "Rent", value: Number(rent) },
    { name: "Food", value: Number(food) },
    { name: "Transport", value: Number(transport) },
    { name: "Other", value: Number(other) },
  ].filter((item) => item.value > 0)

  if (data.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-400">
        Add expenses to see your spending chart.
      </div>
    )
  }

  const colors = ["#22c55e", "#06b6d4", "#a855f7", "#f97316"]

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
      <h4 className="mb-4 text-xl font-bold text-cyan-400">
        Expense Breakdown
      </h4>

     <div className="w-full h-[300px]">
  <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ExpenseChart