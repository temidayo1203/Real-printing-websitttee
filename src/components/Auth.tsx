import { useState } from "react";
import { supabase } from "../supabase";

const CARDS = [
  { img: "/photos/figma/prod-sweat.jpg", tag: "Streetwear Stack", tilt: -7 },
  { img: "/photos/figma/prod-tshirts.jpg", tag: "Grow & Flow DTG", tilt: -3 },
  { img: "/photos/figma/testimonial-photo.jpg", tag: "Screen Printing on Demand", tilt: 2 },
  { img: "/photos/figma/prod-bags.png", tag: "Brown Tote Bags", tilt: 6 },
];

export default function Auth({ mode = "signup" }: { mode?: "signup" | "login" }) {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const isSignup = mode === "signup";

  async function google() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/#/" },
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErr("Enter a valid email to continue.");
      return;
    }
    setErr("");
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: window.location.origin + "/#/" },
    });
    setBusy(false);
    if (error) { setErr(error.message); return; }
    setLinkSent(true);
  }

  return (
    <div className="auth">
      <div className="auth-left">
        <a className="wordmark" href="/">
          <img src="/photos/figma/logo-mark.svg" alt="" className="rmark" />
          <span>eal Printing.ng</span>
        </a>
        <div className="auth-form">
          <h1>Welcome to Real Printing</h1>
          <p className="auth-sub">
            Create an account or sign in with your Google account to continue.
          </p>
          <button type="button" className="auth-google" onClick={google}>
            Continue with Google
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.6 12.3c0-.8-.07-1.5-.2-2.2H12v4.3h5.9c-.25 1.4-1 2.5-2.2 3.3v2.8h3.6c2.1-1.9 3.3-4.8 3.3-8.2z"/>
              <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.3 1.1-3.7 1.1-2.8 0-5.2-1.9-6.1-4.6H2.2v2.9C4 20.4 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.9 14c-.2-.7-.4-1.4-.4-2.1s.2-1.4.4-2.1V6.9H2.2C1.4 8.6 1 10.2 1 12s.4 3.4 1.2 5.1L5.9 14z"/>
              <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2C17.5 2.1 15 1 12 1 7.7 1 4 3.6 2.2 7.1L5.9 10c.9-2.7 3.3-4.6 6.1-4.6z"/>
            </svg>
          </button>
          {linkSent ? (
            <p className="auth-link-sent">
              Check your inbox — we sent a sign-in link to <b>{email}</b>.
              Click it and you're in.
            </p>
          ) : (
          <form onSubmit={submit} noValidate>
            <input
              type="email"
              className={err ? "auth-err" : ""}
              placeholder="Jamesonfab@gmail.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErr(""); }}
            />
            {err && <p className="auth-err-text">{err}</p>}
            <button type="submit" className="auth-continue" disabled={busy}>
              {busy ? "Sending link…" : "Continue"}
            </button>
          </form>
          )}
          <p className="auth-switch">
            {isSignup ? (
              <>Already have a account? <a href="#/login">Login</a></>
            ) : (
              <>New here? <a href="#/signup">Create an account</a></>
            )}
          </p>
        </div>
        <p className="auth-legal">
          By clicking {isSignup ? "Sign Up" : "Login"}, you agree to our{" "}
          <a href="#/legal">Terms of Service</a> and <a href="#/legal">Privacy</a>
        </p>
      </div>
      <div className="auth-right">
        <div className="auth-cards">
          {CARDS.map((c, i) => (
            <figure key={i} style={{ transform: `rotate(${c.tilt}deg)` }}>
              <img src={c.img} alt={c.tag} />
              <figcaption><i />{c.tag}</figcaption>
            </figure>
          ))}
        </div>
        <div className="auth-pitch">
          <h2>Get your store Black Friday-ready</h2>
          <p>
            Shoppers will soon look for the best holiday deals. Polish your lineup,
            build easy-to-shop gifting collections, and have your best offers ready
            before the rush hits.
          </p>
        </div>
      </div>
    </div>
  );
}
