import { useState } from "react"

import BudgetTracker from "./features/BudgetTracker"
import StudentChat from "./features/StudentChat";
import JobFinder from "./features/JobFinder"
import CVReviewer from "./features/CVReviewer"
import StudentPlanner from "./features/StudentPlanner"
import FinanceInsights from "./features/FinanceInsights"
import EmergencyHub from "./features/EmergencyHub"
import SavedHistory from "./SavedHistory"
import InternationalStudentAssistant from "./features/InternationalStudentAssistant"
import MealPlanner from "./features/MealPlanner"
import QuickNotes from "./features/QuickNotes";

function Dashboard() {
  const [activeTool, setActiveTool] = useState("Budget")
  const [search, setSearch] = useState("")

  const studentName = localStorage.getItem("studentName") || "Student"
  const studentCity = localStorage.getItem("studentCity") || "your city"
  const studentGoal = localStorage.getItem("studentGoal") || "student success"

  const tools = [
    { name: "Budget", icon: "💸", title: "Budget Tracker", component: <BudgetTracker /> },
    { name: "AI Chat", icon: "🤖", title: "AI Student Guide", component: <StudentChat /> },
   
    {
  name: "Meals",
  icon: "🍱",
  title: "AI Meal Planner",
  component: <MealPlanner />,
},
    { name: "Jobs", icon: "💼", title: "AI UK Job Finder", component: <JobFinder /> },
    { name: "CV", icon: "📄", title: "AI CV Reviewer", component: <CVReviewer /> },
    { name: "Planner", icon: "🗓️", title: "Daily Student Planner", component: <StudentPlanner /> },
    { name: "Finance", icon: "📊", title: "Finance Insights", component: <FinanceInsights /> },
 {
  name: "Student Help",
  icon: "🌍",
  title: "International Student Assistant",
  component: <InternationalStudentAssistant />,
},

    
    { name: "Emergency", icon: "🚨", title: "Emergency Hub", component: <EmergencyHub /> },
    { name: "History", icon: "📁", title: "Saved AI History", component: <SavedHistory /> },
  ]

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.title.toLowerCase().includes(search.toLowerCase())
  )

  const currentTool = tools.find((tool) => tool.name === activeTool)

  return (
    <section id="dashboard" className="mx-auto max-w-7xl px-6 pb-24">
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
          Control Centre
        </p>

        <h2 className="text-5xl font-black text-white">
          Student Survival Dashboard
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-slate-400">
          Welcome, {studentName}. Your dashboard is personalised for life in{" "}
          {studentCity}, focused on {studentGoal}.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <h3 className="mb-5 text-sm font-black uppercase tracking-[0.25em] text-cyan-400">
            AI Tools
          </h3>

          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-5 w-full rounded-2xl border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-cyan-400"
          />

          <div className="flex flex-col gap-3">
            {filteredTools.length > 0 ? (
              filteredTools.map((tool) => (
                <button
                  key={tool.name}
                  onClick={() => setActiveTool(tool.name)}
                 className={`group relative w-full overflow-hidden rounded-3xl border px-6 py-5 text-left transition-all duration-300 ${
  activeTool === tool.name
    ? "border-cyan-400 bg-cyan-400 text-black shadow-2xl shadow-cyan-500/30 scale-[1.02]"
    : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400/30 hover:bg-white/10 hover:scale-[1.01] hover:text-white"
}`}
                >
                  <span className="relative z-10 mr-3 text-lg">{tool.icon}</span>
                  <span className="relative z-10">{tool.name}</span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-full"></span>
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
  <div className="absolute -left-10 top-0 h-full w-32 rotate-12 bg-cyan-400/10 blur-2xl"></div>
</div>
                </button>
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-slate-400">
                No tools found. Try “CV”, “Meals”, or “Finance”.
              </div>
            )}
          </div>
        </aside>

        <main className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-8 rounded-3xl border border-white/10 bg-black/30 p-6">
            <h3 className="text-2xl font-black text-white">
              {currentTool?.title}
            </h3>

            <p className="mt-2 text-slate-400">
              Active tool: {currentTool?.name}
            </p>
          </div>

          {currentTool?.component}
          <QuickNotes />
        </main>
      </div>
    </section>
  )
}

export default Dashboard