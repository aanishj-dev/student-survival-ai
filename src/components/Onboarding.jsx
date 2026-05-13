import { useState } from "react"

function Onboarding() {
  const [name, setName] = useState(localStorage.getItem("studentName") || "")
  const [city, setCity] = useState(localStorage.getItem("studentCity") || "")
  const [university, setUniversity] = useState(localStorage.getItem("studentUniversity") || "")
  const [budget, setBudget] = useState(localStorage.getItem("studentBudget") || "")
  const [goal, setGoal] = useState(localStorage.getItem("studentGoal") || "")
  const [saved, setSaved] = useState(false)

  function saveProfile(e) {
    e.preventDefault()

    localStorage.setItem("studentName", name)
    localStorage.setItem("studentCity", city)
    localStorage.setItem("studentUniversity", university)
    localStorage.setItem("studentBudget", budget)
    localStorage.setItem("studentGoal", goal)

    setSaved(true)
  }

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <h2 className="mb-4 text-center text-4xl font-black">
        Personal Student Profile
      </h2>

      <p className="mx-auto mb-10 max-w-2xl text-center text-slate-400">
        Set up your profile so the assistant can feel more personalised.
      </p>

      <form
        onSubmit={saveProfile}
        className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-500/5"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
          />

          <input
            type="text"
            placeholder="City e.g. Huddersfield"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
          />

          <input
            type="text"
            placeholder="University name"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
          />

          <input
            type="number"
            placeholder="Monthly budget (£)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
          />
        </div>

        <textarea
          rows="4"
          placeholder="Main goal e.g. save money, find job, improve CV, manage studies"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="mt-4 w-full rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
        />

        <button
          type="submit"
          className="mt-5 rounded-2xl bg-cyan-400 px-8 py-4 font-bold text-black transition hover:scale-105"
        >
          Save Profile
        </button>

        {saved && (
          <p className="mt-5 text-green-400">
            Profile saved successfully.
          </p>
        )}
      </form>
    </section>
  )
}

export default Onboarding