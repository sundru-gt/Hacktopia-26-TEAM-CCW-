import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const TnpDashboard = () => {
  /* ================= STATES ================= */
  const [stats, setStats] = useState(null);
  const COLORS = ["#22d3ee", "#1e293b"];

  const [students, setStudents] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [studentError, setStudentError] = useState("");

  const [recruiters, setRecruiters] = useState([]);

  const [showRecruiterModal, setShowRecruiterModal] = useState(false);
  const placementRatioData = [
  { name: "Placed", value: 42 },
  { name: "Not Placed", value: 58 },
];

const eligibilityData = [
  { name: "Eligible", value: 68 },
  { name: "Not Eligible", value: 32 },
];

const branchData = [
  { branch: "CSE", placed: 22 },
  { branch: "IT", placed: 15 },
  { branch: "ECE", placed: 10 },
];


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
      const data = await res.json();
      setStudents(Array.isArray(data) ? data : []);
      setShowStudents(true);
    } catch {
      setStudentError("Failed to load students");
      setShowStudents(true);
    } finally {
      setLoadingStudents(false);
    }
  };

  /* ================= FETCH RECRUITERS ================= */
  useEffect(() => {
    fetch("http://127.0.0.1:8000/tnp/recruiters")
      .then((res) => res.json())
      .then((data) => setRecruiters(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

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

    const res = await fetch("http://127.0.0.1:8000/tnp/recruiter/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    alert(data.message || "Recruiter added");

    setShowRecruiterModal(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* ================= HEADER ================= */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-extrabold">
            TnP Coordinator Dashboard
          </h1>
          <p className="text-gray-400 text-sm">
            Centralized placement intelligence ·{" "}
            <span className="text-cyan-400 font-semibold">CampusHire</span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Total Students", value: stats?.total_students },
            { title: "Placement Ready", value: `${stats?.placement_ready || 0}%` },
            { title: "Avg Mock Score", value: `${stats?.avg_mock_score || 0}/100` },
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

            {!showStudents ? (
              <button
                onClick={loadStudents}
                className="px-4 py-2 bg-cyan-500 text-black rounded-lg font-semibold"
              >
                View Students
              </button>
            ) : (
              <button
                onClick={() => setShowStudents(false)}
                className="flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <X size={18} /> Close
              </button>
            )}
          </div>

          {showStudents && (
            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
              {students.map((s) => (
                <div
                  key={s._id}
                  className="bg-black/40 border border-white/10 rounded-xl p-4"
                >
                  <p className="font-bold text-cyan-400">{s.name}</p>
                  <p className="text-sm text-gray-400">{s.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= RECRUITER ENGAGEMENT ================= */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recruiter Engagement</h2>
            <button
              onClick={() => setShowRecruiterModal(true)}
              className="px-4 py-2 bg-cyan-500 text-black rounded-lg font-semibold"
            >
              + Add Recruiter
            </button>
          </div>

          {recruiters.length === 0 ? (
            <p className="text-gray-400">No recruiters added yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recruiters.map((r) => (
                <div
                  key={r._id}
                  className="bg-black/40 border border-white/10 rounded-xl p-4"
                >
                  <p className="font-bold text-cyan-400">{r.company_name}</p>
                  <p className="text-sm text-gray-400">{r.role}</p>
                  <p className="text-xs text-gray-500 mt-1">{r.ctc}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= PLACEMENT ANALYSIS ================= */}
        {/* ================= PLACEMENT ANALYSIS ================= */}
<div className="space-y-6">
  <h2 className="text-xl font-bold">Placement Analysis</h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* ===== PIE CHART ===== */}
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 h-[280px]">
      <p className="text-gray-400 text-sm mb-2">Placement Ratio</p>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={placementRatioData}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={4}
          >
            {placementRatioData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>

    {/* ===== ELIGIBILITY BAR ===== */}
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 h-[280px]">
      <p className="text-gray-400 text-sm mb-2">Eligibility Breakdown</p>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={eligibilityData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#22d3ee" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* ===== BRANCH WISE ===== */}
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 h-[280px]">
      <p className="text-gray-400 text-sm mb-2">Branch-wise Placement</p>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={branchData}>
          <XAxis dataKey="branch" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="placed" fill="#38bdf8" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>

  </div>
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

            <input
              placeholder="Company Name"
              className="w-full mb-4 p-3 rounded-xl bg-black/40 border border-white/10"
              onChange={(e) =>
                setRecruiter({ ...recruiter, company_name: e.target.value })
              }
            />

            <div className="flex justify-end gap-4">
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
