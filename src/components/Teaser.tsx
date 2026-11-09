import { useState } from "react";

// Signups are emailed to this address via formsubmit.co (no backend needed).
const WAITLIST_EMAIL = "printingreal18@gmail.com";

export default function Teaser() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function join(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    try {
      await fetch(`https://formsubmit.co/ajax/${WAITLIST_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, _subject: "New waitlist signup — Real Printing" }),
      });
      setSent(true);
    } catch {
      window.location.href = `mailto:${WAITLIST_EMAIL}?subject=Waitlist signup&body=Please add ${encodeURIComponent(email)} to the waitlist.`;
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="teaser">
      <div className="teaser-copy">
        <div>
          <h2>Something Big is Coming</h2>
          <p>
            Meet the future of printing in Nigeria. From custom apparel to business materials,
            we're building a faster, smarter way to place and manage print orders.
          </p>
        </div>
        {sent ? (
          <p className="wait-done">You're on the list — we'll reach out when it's ready.</p>
        ) : (
          <form className="wait-form" onSubmit={join}>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn-black" disabled={busy}>
              {busy ? "Joining…" : "Join the waitlist"}
            </button>
          </form>
        )}
      </div>
      <img className="teaser-img" src="/photos/figma/designer.png" alt="Preview of the upcoming Real Printing online designer" />
    </section>
  );
}
