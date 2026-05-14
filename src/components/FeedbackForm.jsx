import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase";

function FeedbackForm() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);

  const loadReviews = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "reviews"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReviews(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !feedback) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "reviews"), {
        name,
        review: feedback,
        rating,
        createdAt: serverTimestamp(),
      });

      setName("");
      setFeedback("");
      setRating(5);

      loadReviews();

      alert("Review submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to submit review");
    }
  };

  return (
    <section id="feedback" className="mx-auto max-w-5xl px-6 pb-24">
      <h2 className="mb-4 text-center text-4xl font-black text-white">
        Feedback
      </h2>

      <p className="mx-auto mb-10 max-w-2xl text-center text-slate-400">
        Share feedback to help improve the student survival assistant.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
          required
        />

        <textarea
          placeholder="Write your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows="5"
          className="w-full rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
          required
        />

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
        >
          <option value={5}>5 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={2}>2 Stars</option>
          <option value={1}>1 Star</option>
        </select>

        <button
          type="submit"
          className="w-full rounded-2xl bg-cyan-400 py-4 text-lg font-bold text-black transition hover:scale-[1.02]"
        >
          Submit Review
        </button>
      </form>

      <div className="mt-14 space-y-5">
        <h3 className="text-3xl font-black text-white">
          Public Reviews
        </h3>

        {reviews.length === 0 ? (
          <p className="text-slate-400">
            No reviews yet.
          </p>
        ) : (
          reviews.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-black/70 p-5 text-white"
            >
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-xl font-bold">
                  {item.name}
                </h4>

                <span className="text-cyan-400">
                  {item.rating} ⭐
                </span>
              </div>

              <p className="text-slate-300">
                {item.review}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default FeedbackForm;