import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Signup = () => {
  const [role, setRole] = useState("student");
  const [resume, setResume] = useState(null);
  const [parsing, setParsing] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ================= STUDENT STATE ================= */
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    branch: "",
    cgpa: "",
    skills: "",
    password: "",
  });

  /* ================= TNP STATE (ADDED) ================= */
  const [tnpData, setTnpData] = useState({
    name: "",
    email: "",
    institute: "",
    institute_code: "",
    password: "",
  });

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 text-black " +
    "placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500";

  /* ================= RESUME PARSE ================= */
  const handleResumeUpload = async (file) => {
    if (!file) return;

    setResume(file);
    setParsing(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/parse-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setStudentData((prev) => ({
        ...prev,
        name: data.name || "",
        email: data.email || "",
        branch: data.branch || "",
        cgpa: data.cgpa || "",
        skills: Array.isArray(data.skills)
          ? data.skills.join(", ")
          : "",
      }));
    } catch {
      alert("Resume parsing failed");
    } finally {
      setParsing(false);
    }
  };

  const handleStudentChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleTnpChange = (e) => {
    setTnpData({ ...tnpData, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      /* ---------- STUDENT ---------- */
      if (role === "student") {
        const res = await fetch("http://127.0.0.1:8000/student/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: studentData.name,
            email: studentData.email,
            branch: studentData.branch,
            cgpa: studentData.cgpa,
            skills: studentData.skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
            password: studentData.password,
          }),
        });

        const data = await res.json();
        if (data.error) return alert(data.error);

        alert("✅ Student account created");
        navigate("/login");
      }

      /* ---------- TNP (ADDED) ---------- */
      if (role === "tnp") {
        const res = await fetch("http://127.0.0.1:8000/tnp/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tnpData),
        });

        const data = await res.json();
        if (data.error) return alert(data.error);

        alert("✅ TNP account created");
        navigate("/login");
      }
    } catch {
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] to-[#0f172a] px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-2xl border border-white/10"
      >
        {/* LEFT */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-indigo-500/20 to-cyan-500/10">
          <div>
            <h1 className="text-4xl font-extrabold text-white">
              Join CampusHire
            </h1>
            <p className="mt-4 text-gray-300">
              Resume-driven placement intelligence platform
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-10 bg-white/90">
          <h2 className="text-3xl font-bold mb-6">Create Account</h2>

          {/* ROLE TOGGLE */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            {["student", "tnp"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-lg font-semibold ${
                  role === r ? "bg-cyan-500 text-white" : "text-gray-600"
                }`}
              >
                {r === "student" ? "Student" : "TnP"}
              </button>
            ))}
          </div>

          {/* ================= STUDENT FORM (UNCHANGED) ================= */}
          {role === "student" && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="border-2 border-dashed rounded-xl p-4 text-center">
                <input
                  type="file"
                  accept=".pdf"
                  hidden
                  id="resume"
                  onChange={(e) => handleResumeUpload(e.target.files[0])}
                />
                <label htmlFor="resume" className="cursor-pointer text-cyan-600">
                  Upload Resume (PDF)
                </label>
                {parsing && (
                  <p className="text-sm text-cyan-600 mt-2">
                    Parsing resume...
                  </p>
                )}
              </div>

              {["name","email","branch","cgpa","skills","password"].map((f) => (
                <input
                  key={f}
                  name={f}
                  type={f === "password" ? "password" : "text"}
                  value={studentData[f]}
                  onChange={handleStudentChange}
                  placeholder={f.toUpperCase()}
                  className={inputClass}
                />
              ))}

              <button className="w-full bg-cyan-500 py-3 rounded-xl font-bold text-white">
                {loading ? "Creating..." : "Create Student Account"}
              </button>
            </form>
          )}

          {/* ================= TNP FORM (ADDED) ================= */}
          {role === "tnp" && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {[
                ["name","Name"],
                ["email","Official Email"],
                ["institute","Institute Name"],
                ["institute_code","Institute Code"],
                ["password","Password"],
              ].map(([key,label]) => (
                <input
                  key={key}
                  name={key}
                  type={key === "password" ? "password" : "text"}
                  value={tnpData[key]}
                  onChange={handleTnpChange}
                  placeholder={label}
                  className={inputClass}
                />
              ))}

              <button className="w-full bg-cyan-500 py-3 rounded-xl font-bold text-white">
                {loading ? "Creating..." : "Create TNP Account"}
              </button>
            </form>
          )}

          <p className="text-center mt-6 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
