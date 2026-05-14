import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db, auth } from "../../firebase";

function Reviews() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);

  async function fetchReviews() {
    if (!user) {
  return;
}
    const q = query(
      collection(db, "reviews"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setReviews(data);
  }

 useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((currentUser) => {
    setUser(currentUser);
  });

  fetchReviews();

  return () => unsubscribe();
}, []);

async function fetchReviews() {
  try {
    const q = query(
      collection(db, "reviews"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setReviews(data);
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
}

async function handleSubmit(e) {
  e.preventDefault();

  try {
    await addDoc(collection(db, "reviews"), {
      name: name || "Anonymous",
      photo: user?.photoURL || "",
      message,
      rating,
      createdAt: serverTimestamp(),
    });

    setName("");
    setMessage("");
    setRating(5);

    fetchReviews();
  } catch (error) {
    console.error(error);
  }
}
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <h2 className="text-3xl font-black sm:text-5xl">
        Student Reviews
      </h2>

      <p className="mb-12 text-center text-slate-400">
        Real feedback from students using the platform
      </p>

     <form
  onSubmit={handleSubmit}
  className="mx-auto mb-16 max-w-2xl space-y-5 rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-8 backdrop-blur-xl"
>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
        />

        <textarea
          placeholder="Write your review..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="4"
          className="w-full rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
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
          className="w-full rounded-2xl bg-cyan-400 py-4 font-bold text-black transition hover:scale-[1.02]"
        >
          Submit Review
        </button>
      </form>

      <div className="flex flex-col items-center gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <div className="mb-3 flex items-center justify-between">
                <img
  src={review.photo}
  alt=""
  className="mb-3 h-12 w-12 rounded-full border border-cyan-400"
/>
              <h3 className="text-xl font-bold text-white">
                {review.name}
              </h3>

              <span className="text-cyan-300">
                {"⭐".repeat(review.rating)}
              </span>
            </div>

            <p className="text-slate-300">
              {review.message}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Reviews;