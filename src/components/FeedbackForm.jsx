import { useState } from "react";

function FeedbackForm() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");

  return (
    <section id="feedback" className="mx-auto max-w-5xl px-6 pb-24">
      <h2 className="mb-4 text-center text-4xl font-black">
        Feedback
      </h2>

      <p className="mx-auto mb-10 max-w-2xl text-center text-slate-400">
        Share feedback to help improve the student survival assistant.
      </p>

      <form
        action="https://formspree.io/f/xbdwbdwa"
        method="POST"
        className="space-y-5"
      >
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
          required
        />

        <textarea
          name="message"
          placeholder="Write your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows="5"
          className="w-full rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
          required
        />

        <button
          type="submit"
          className="w-full rounded-2xl bg-cyan-300 px-6 py-4 font-black text-black transition hover:scale-[1.02]"
        >
          Submit Feedback
        </button>
      </form>
    </section>
  );
}

export default FeedbackForm;