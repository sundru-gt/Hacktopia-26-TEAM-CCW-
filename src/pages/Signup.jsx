import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Signup = () => {
  const [role, setRole] = useState("student");
  const [resume, setResume] = useState(null);
  const [parsing, setParsing] = useState(false);
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    branch: "",
    cgpa: "",
    skills: "",
    password: "",
  });

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500";

  // ================= RESUME PARSE =================
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
    } catch (err) {
      alert("Resume parsing failed");
    } finally {
      setParsing(false);
    }
  };

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  // ================= STUDENT SIGNUP =================
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (role === "student") {
    try {
      const res = await fetch("http://127.0.0.1:8000/student/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...studentData,
          skills: studentData.skills.split(",").map(s => s.trim()),
        }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      alert("Account created successfully 🎉");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] to-[#0f172a] px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl grid md:grid-cols-2 rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl"
      >
        {/* LEFT */}
        <div className="hidden md:flex flex-col justify-between p-10 text-white">
          <h1 className="text-4xl font-extrabold">CampusHire</h1>
          <p className="text-gray-300">
            Resume driven placement platform
          </p>
        </div>

        {/* RIGHT */}
        <div className="p-10 bg-white">
          <h2 className="text-3xl font-bold mb-6">Create Account</h2>

          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            {["student", "tnp"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-lg font-semibold ${
                  role === r
                    ? "bg-cyan-500 text-white"
                    : "text-gray-600"
                }`}
              >
                {r === "student" ? "Student" : "TnP"}
              </button>
            ))}
          </div>

          {role === "student" && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Resume */}
              <div className="border-2 border-dashed rounded-xl p-4 text-center">
                <input
                  type="file"
                  accept=".pdf"
                  hidden
                  id="resume"
                  onChange={(e) =>
                    handleResumeUpload(e.target.files[0])
                  }
                />
                <label
                  htmlFor="resume"
                  className="cursor-pointer text-cyan-600 font-semibold"
                >
                  Upload Resume (PDF)
                </label>

                {parsing && (
                  <p className="text-sm mt-2 text-cyan-600">
                    Parsing resume…
                  </p>
                )}
              </div>

              <input name="name" placeholder="Full Name" value={studentData.name} onChange={handleChange} className={inputClass} />
              <input name="email" placeholder="Email" value={studentData.email} onChange={handleChange} className={inputClass} />
              <input name="branch" placeholder="Branch" value={studentData.branch} onChange={handleChange} className={inputClass} />
              <input name="cgpa" placeholder="CGPA" value={studentData.cgpa} onChange={handleChange} className={inputClass} />
              <input name="skills" placeholder="Skills" value={studentData.skills} onChange={handleChange} className={inputClass} />
              <input name="password" type="password" placeholder="Password" value={studentData.password} onChange={handleChange} className={inputClass} />

              <button
                type="submit"
                className="w-full bg-cyan-500 text-white py-3 rounded-xl font-bold"
              >
                Create Student Account
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
