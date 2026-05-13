import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useEffect, useState } from "react";

function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  async function handleLogin() {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div className="fixed top-5 right-6 z-50">
      {user ? (
        <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/60 px-3 py-2 backdrop-blur-xl">

          <img
            src={user.photoURL}
            alt="profile"
            className="h-10 w-10 rounded-full border-2 border-cyan-400 object-cover shrink-0"
          />

          <button
            onClick={handleLogout}
            className="rounded-xl border border-white/10 bg-black px-4 py-2 text-white transition hover:bg-white hover:text-black"
          >
            Logout
          </button>

        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="rounded-2xl bg-cyan-400 px-5 py-3 font-bold text-black transition hover:scale-105"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}

export default Login;