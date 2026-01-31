import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const Login = () => {
  const [role, setRole] = useState("student");

  // ✅ REQUIRED STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 text-black " +
    "placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500";

  // 🔥 LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();

    // ✅ role based endpoint
    const endpoint =
      role === "student"
        ? "http://127.0.0.1:8000/student/login"
        : "http://127.0.0.1:8000/tnp/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      // ✅ store according to role
      if (role === "student") {
        localStorage.setItem("student", JSON.stringify(data.student));
        navigate("/dashboard/student");
      } else {
        localStorage.setItem("tnp", JSON.stringify(data.tnp));
        navigate("/dashboard/tnp");
      }

      alert("Login successful ✅");

    } catch (err) {
      alert("Login failed ❌");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-2xl border border-white/10"
      >
        {/* LEFT */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-cyan-500/20 via-indigo-500/10 to-purple-500/20">
          <div>
            <h1 className="text-4xl font-extrabold text-white">
              CampusHire
            </h1>
            <p className="mt-4 text-gray-300 text-lg">
              AI-powered placement intelligence platform
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-10 flex flex-col justify-center bg-white/90">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>

          {/* Role Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            {["student", "tnp"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  role === r
                    ? "bg-cyan-500 text-white"
                    : "text-gray-600"
                }`}
              >
                {r === "student" ? "Student Login" : "TnP Coordinator"}
              </button>
            ))}
          </div>

          {/* FORM */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-xl"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-cyan-600 font-semibold">
              Create Account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
