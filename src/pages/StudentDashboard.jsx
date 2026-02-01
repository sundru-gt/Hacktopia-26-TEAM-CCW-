import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const student = JSON.parse(localStorage.getItem("student"));
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!student?._id) return;

    fetch(`http://127.0.0.1:8000/student/recommended-jobs/${student._id}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setJobs([]);
        setLoading(false);
      });
  }, [student]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] text-white px-6 py-10">

      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto text-center mb-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-extrabold"
        >
          Student Dashboard
        </motion.h1>
        <p className="text-gray-400 mt-2">
          Welcome to{" "}
          <span className="text-cyan-400 font-semibold">CampusHire</span>
        </p>
      </div>

      {/* ================= PROFILE ================= */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-cyan-300 text-center">
            {student?.name}
          </h2>
          <p className="text-gray-400 text-center text-sm mt-1">
            {student?.email}
          </p>

          <p className="text-center mt-4">
            Predicted Role:{" "}
            <span className="text-cyan-400 font-bold">
              {student?.predicted_role || "General Software Role"}
            </span>
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {student?.skills?.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-sm rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">

        {/* Resume */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold mb-2">Resume Manager</h3>
          <p className="text-sm text-gray-400 mb-4">
            Upload, update or view your resume
          </p>

          <div className="flex gap-3">
            <Link
              to="/resume"
              className="flex-1 text-center py-2 rounded-lg bg-cyan-500 text-black font-bold"
            >
              Upload / Update
            </Link>
            <Link
              to="/resume/view"
              className="flex-1 text-center py-2 rounded-lg border border-cyan-400 text-cyan-400"
            >
              View
            </Link>
          </div>
        </motion.div>

        {/* Mock Interview */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold mb-2">AI Mock Interview</h3>
          <p className="text-sm text-gray-400 mb-4">
            Role-specific interview practice
          </p>
          <Link
            to="/mock-interview"
            className="block text-center py-2 rounded-lg bg-cyan-500 text-black font-bold"
          >
            Start Interview
          </Link>
        </motion.div>

        {/* Explore */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold mb-2">Explore Opportunities</h3>
          <p className="text-sm text-gray-400 mb-4">
            Browse all openings
          </p>
          <Link
            to="/opportunities"
            className="block text-center py-2 rounded-lg border border-white text-white"
          >
            View All Jobs
          </Link>
        </motion.div>
      </div>

      {/* ================= RECOMMENDED JOBS ================= */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Recommended Opportunities
        </h2>

        {loading && (
          <p className="text-center text-gray-400">
            Loading opportunities...
          </p>
        )}

        {!loading && jobs.length === 0 && (
          <p className="text-center text-gray-400">
            No matching opportunities found yet.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <motion.div
              key={job._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-cyan-300">
                {job.role}
              </h3>
              <p className="text-gray-400 text-sm">
                {job.company_name}
              </p>

              <div className="mt-3 text-sm text-gray-300 space-y-1">
                <p>💰 CTC: {job.ctc || "Not disclosed"}</p>
                <p>📅 Apply by: {job.last_date || "Open"}</p>
              </div>

              {job.eligibility_branch && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.eligibility_branch.map((b, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded-full bg-cyan-400/10 text-cyan-300"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <Link
                  to="/opportunities"
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-bold"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
