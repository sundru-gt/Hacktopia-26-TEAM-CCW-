import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TnpDashboard = () => {
  /* ================= STATES ================= */
  const [stats, setStats] = useState(null);

  const [students, setStudents] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [studentError, setStudentError] = useState("");

  const [showRecruiterModal, setShowRecruiterModal] = useState(false);

  const [recruiter, setRecruiter] = useState({
    company_name: "",
    role: "",
    ctc: "",
    hr_email: "",
    eligibility_branch: "",
    min_cgpa: "",
    description: "",
  });

  /* ================= FETCH STATS ================= */
  useEffect(() => {
    fetch("http://127.0.0.1:8000/tnp/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {});
  }, []);

  /* ================= FETCH STUDENTS ================= */
  const loadStudents = async () => {
    setLoadingStudents(true);
    setStudentError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/tnp/students");

      if (!res.ok) throw new Error("API not found");

      const data = await res.json();

      if (Array.isArray(data)) {
        setStudents(data);
      } else {
        setStudents([]);
        setStudentError("Invalid data from server");
      }

      setShowStudents(true);
    } catch (err) {
      setStudents([]);
      setStudentError("Failed to load students");
      setShowStudents(true);
    } finally {
      setLoadingStudents(false);
    }
  };

  /* ================= SAVE RECRUITER ================= */
  const saveRecruiter = async () => {
    const payload = {
      ...recruiter,
      eligibility_branch: recruiter.eligibility_branch
        .split(",")
        .map((b) => b.trim()),
      min_cgpa: recruiter.min_cgpa
        ? parseFloat(recruiter.min_cgpa)
        : null,
    };

    const res = await fetch("http://127.0.0.1:8000/recruiter/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    alert(data.message || "Recruiter added");

    setShowRecruiterModal(false);
    setRecruiter({
      company_name: "",
      role: "",
      ctc: "",
      hr_email: "",
      eligibility_branch: "",
      min_cgpa: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* ================= HEADER ================= */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold">
              TnP Coordinator Dashboard
            </h1>
            <p className="text-gray-400 text-sm">
              Centralized placement intelligence ·{" "}
              <span className="text-cyan-400 font-semibold">CampusHire</span>
            </p>
          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Total Students", value: stats?.total_students },
            {
              title: "Placement Ready",
              value: `${stats?.placement_ready || 0}%`,
            },
            {
              title: "Avg Mock Score",
              value: `${stats?.avg_mock_score || 0}/100`,
            },
            { title: "Active Recruiters", value: stats?.active_recruiters },
          ].map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <p className="text-gray-400 text-sm">{s.title}</p>
              <p className="text-3xl font-extrabold text-cyan-400 mt-2">
                {s.value ?? "—"}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ================= STUDENTS ================= */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Students</h2>

            {!showStudents && (
              <button
                onClick={loadStudents}
                className="px-4 py-2 bg-cyan-500 text-black rounded-lg font-semibold"
              >
                View Students
              </button>
            )}
          </div>

          {loadingStudents && (
            <p className="text-gray-400">Loading students...</p>
          )}

          {studentError && (
            <p className="text-red-400">{studentError}</p>
          )}

          {showStudents &&
            Array.isArray(students) &&
            students.length === 0 &&
            !loadingStudents && (
              <p className="text-gray-400">No students found</p>
            )}

          {showStudents &&
            Array.isArray(students) &&
            students.length > 0 && (
              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
                {students.map((s, i) => (
                  <div
                    key={s._id || i}
                    className="bg-black/40 border border-white/10 rounded-xl p-4"
                  >
                    <p className="font-bold text-cyan-400">{s.name}</p>
                    <p className="text-sm text-gray-400">{s.email}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mt-4">
                      <div>
                        <span className="text-gray-400">Branch</span>
                        <p className="font-semibold mt-1">{s.branch}</p>
                      </div>

                      <div>
                        <span className="text-gray-400">CGPA</span>
                        <p className="font-semibold mt-1">{s.cgpa}</p>
                      </div>

                      <div>
                        <span className="text-gray-400">Skills</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {Array.isArray(s.skills) && s.skills.length > 0 ? (
                            s.skills.map((sk, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300"
                              >
                                {sk}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500 text-xs">
                              No skills
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>

        {/* ================= ADD RECRUITER BUTTON ================= */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex justify-end">
          <button
            onClick={() => setShowRecruiterModal(true)}
            className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400"
          >
            + Add Recruiter
          </button>
        </div>
      </div>

      {/* ================= ADD RECRUITER MODAL ================= */}
      {showRecruiterModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#020617] border border-white/10 rounded-3xl p-8 w-full max-w-2xl"
          >
            <h2 className="text-2xl font-extrabold mb-6 text-cyan-400">
              Add Recruiter
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["Company Name", "company_name"],
                ["Role", "role"],
                ["CTC / Stipend", "ctc"],
                ["HR Email", "hr_email"],
                ["Eligible Branches", "eligibility_branch"],
                ["Min CGPA", "min_cgpa"],
              ].map(([label, key]) => (
                <input
                  key={key}
                  placeholder={label}
                  value={recruiter[key]}
                  onChange={(e) =>
                    setRecruiter({ ...recruiter, [key]: e.target.value })
                  }
                  className="p-3 rounded-xl bg-black/40 border border-white/10"
                />
              ))}
            </div>

            <textarea
              rows="4"
              placeholder="Job Description"
              value={recruiter.description}
              onChange={(e) =>
                setRecruiter({ ...recruiter, description: e.target.value })
              }
              className="w-full mt-4 p-4 rounded-xl bg-black/40 border border-white/10"
            />

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowRecruiterModal(false)}
                className="px-6 py-2 border border-white/20 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={saveRecruiter}
                className="px-6 py-2 bg-cyan-500 text-black rounded-xl font-bold"
              >
                Save Recruiter
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TnpDashboard;
