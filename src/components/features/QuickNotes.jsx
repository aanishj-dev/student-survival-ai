import { useEffect, useState } from "react";

function QuickNotes() {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedNote = localStorage.getItem("student-note");

    if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("student-note", note);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-xl">
          📝
        </div>

        <div>
          <h3 className="text-2xl font-black text-white">
            Quick Notes
          </h3>

          <p className="text-sm text-slate-400">
            Save important student reminders
          </p>
        </div>
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your reminder, visa deadline, rent note, interview date..."
        className="h-44 w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white outline-none transition focus:border-cyan-400/40"
      />

      <div className="mt-5 flex items-center gap-4">
        
        <button
          onClick={handleSave}
          className="rounded-2xl bg-cyan-400 px-6 py-3 font-bold text-black transition hover:scale-105"
        >
          Save Notes
        </button>

        {saved && (
          <p className="text-sm text-emerald-400">
            Notes saved successfully
          </p>
        )}
      </div>
    </div>
  );
}

export default QuickNotes;