import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 studentId localStorage se
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    if (!studentId) {
      navigate("/login");
      return;
    }

    const fetchStudent = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/student/${studentId}`
        );
        const data = await res.json();

        if (data.error) {
          alert("Session expired. Login again.");
          navigate("/login");
          return;
        }

        setStudent(data);
      } catch (err) {
        console.error("Failed to fetch student:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        <p className="animate-pulse text-cyan-400 text-lg">
          Loading dashboard…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-8">
      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Student Dashboard
        </h1>
        <p className="text-gray-400 mt-2">
          Welcome to{" "}
          <span className="text-cyan-400 font-semibold">CampusHire</span>
        </p>
      </div>

      {/* ================= PROFILE CARD ================= */}
      <div className="max-w-7xl mx-auto mb-12">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-cyan-400">
              {student.name}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {student.email}
            </p>
            <p className="text-gray-300 mt-2">
              Branch:{" "}
              <span className="font-semibold">{student.branch}</span>
            </p>
            <p className="text-gray-300 mt-1">
              CGPA:{" "}
              <span className="font-semibold">{student.cgpa}</span>
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {student.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <Link
            to="/profile"
            className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition text-center"
          >
            Update Profile
          </Link>
        </motion.div>
      </div>

      {/* ================= STATS ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            title: "Opportunity Match Score",
            value: "82%",
            desc: "Based on your skills",
          },
          {
            title: "Mock Interview Score",
            value: "74 / 100",
            desc: "Latest evaluation",
          },
          {
            title: "Placement Readiness",
            value: "Intermediate",
            desc: "2 skill gaps found",
          },
        ].map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl"
          >
            <h3 className="text-gray-300 text-sm mb-2">
              {card.title}
            </h3>
            <p className="text-3xl font-bold text-cyan-400">
              {card.value}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              {card.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <h2 className="text-xl font-bold mb-6">
            Recommended Opportunities
          </h2>
          <p className="text-gray-400">
            🔜 Jobs matching logic next step
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <h2 className="text-xl font-bold mb-4">
              Quick Actions
            </h2>
            <div className="flex flex-col gap-4">
              <Link
                to="/mock-interview"
                className="text-center py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition"
              >
                Take AI Mock Interview
              </Link>
              <Link
                to="/resume"
                className="text-center py-3 rounded-xl border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition font-semibold"
              >
                Upload / Update Resume
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
