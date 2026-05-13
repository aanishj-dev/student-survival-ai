import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../../firebase";
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
    <div className="fixed top-5 right-5 z-50">
      {user ? (
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#0b1020]/95 px-3 py-2 backdrop-blur-xl shadow-xl">

          {/* PROFILE IMAGE */}
          <img
            src={user.photoURL}
            alt=""
            className="h-10 w-10 rounded-full border-2 border-cyan-400 object-cover"
          />

          {/* USER NAME */}
          <p className="hidden sm:block max-w-[120px] truncate text-sm font-medium text-white">
            {user.displayName}
          </p>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="rounded-xl border border-white/10 bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="rounded-2xl bg-cyan-400 px-6 py-3 font-bold text-black transition hover:scale-105"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}

export default Login;