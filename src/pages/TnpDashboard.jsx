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
  const COLORS = ["#22d3ee", "#1e293b"];

  /* ================= STATES ================= */
  const [stats, setStats] = useState(null);

  const [students, setStudents] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);

  const [recruiters, setRecruiters] = useState([]);
  const [showRecruiterModal, setShowRecruiterModal] = useState(false);

  const [recruiter, setRecruiter] = useState({
    company_name: "",
    role: "",
    ctc: "",
    hr_email: "",
    eligibility_branch: "",
    min_cgpa: "",
    last_date: "",
    description: "",
  });

  /* ================= ANALYTICS (STATIC FOR NOW) ================= */
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

  /* ================= FETCH STATS ================= */
  useEffect(() => {
    fetch("http://127.0.0.1:8000/tnp/stats")
      .then((res) => res.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  /* ================= LOAD STUDENTS ================= */
  const loadStudents = async () => {
    setLoadingStudents(true);
    const res = await fetch("http://127.0.0.1:8000/tnp/students");
    const data = await res.json();
    setStudents(Array.isArray(data) ? data : []);
    setShowStudents(true);
    setLoadingStudents(false);
  };

  /* ================= LOAD RECRUITERS ================= */
  const loadRecruiters = () => {
    fetch("http://127.0.0.1:8000/recruiter/list")
      .then((res) => res.json())
      .then((data) => setRecruiters(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    loadRecruiters();
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

    const res = await fetch("http://127.0.0.1:8000/recruiter/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    alert(data.message || "Recruiter added");

    setShowRecruiterModal(false);
    loadRecruiters(); // 🔥 refresh without reload
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* HEADER */}
      <div className="border-b border-white/10 px-6 py-6">
        <h1 className="text-3xl font-extrabold">TnP Coordinator Dashboard</h1>
        <p className="text-gray-400 text-sm">
          Placement Intelligence ·{" "}
          <span className="text-cyan-400">CampusHire</span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

        {/* ================= STUDENTS ================= */}
        <div className="bg-white/5 p-6 rounded-2xl">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Students</h2>
            {!showStudents ? (
              <button
                onClick={loadStudents}
                className="bg-cyan-500 px-4 py-2 text-black rounded-lg"
              >
                View Students
              </button>
            ) : (
              <button onClick={() => setShowStudents(false)}>
                <X />
              </button>
            )}
          </div>

          {showStudents && (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {students.map((s) => (
                <div key={s._id} className="bg-black/40 p-3 rounded-xl">
                  <p className="font-bold text-cyan-400">{s.name}</p>
                  <p className="text-sm text-gray-400">{s.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= RECRUITERS ================= */}
        <div className="bg-white/5 p-6 rounded-2xl">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Recruiters</h2>
            <button
              onClick={() => setShowRecruiterModal(true)}
              className="bg-cyan-500 px-4 py-2 text-black rounded-lg"
            >
              + Add Recruiter
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recruiters.map((r) => (
              <div key={r._id} className="bg-black/40 p-4 rounded-xl">
                <p className="font-bold text-cyan-400">{r.company_name}</p>
                <p className="text-sm text-gray-400">{r.role}</p>
                <p className="text-xs text-gray-500">
                  {r.ctc} · Apply by {r.last_date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= PLACEMENT ANALYSIS ================= */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Placement Analysis</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Placement Ratio */}
            <div className="bg-white/5 p-4 rounded-2xl h-[260px]">
              <p className="text-sm text-gray-400 mb-2">Placement Ratio</p>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={placementRatioData}
                    dataKey="value"
                    innerRadius={50}
                    outerRadius={80}
                  >
                    {placementRatioData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Eligibility */}
            <div className="bg-white/5 p-4 rounded-2xl h-[260px]">
              <p className="text-sm text-gray-400 mb-2">
                Eligibility Breakdown
              </p>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={eligibilityData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#22d3ee" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Branch-wise */}
            <div className="bg-white/5 p-4 rounded-2xl h-[260px]">
              <p className="text-sm text-gray-400 mb-2">
                Branch-wise Placement
              </p>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={branchData}>
                  <XAxis dataKey="branch" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="placed" fill="#38bdf8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      </div>

      {/* ================= ADD RECRUITER MODAL ================= */}
      {showRecruiterModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-[#020617] p-8 rounded-3xl w-full max-w-xl space-y-4">
            <h2 className="text-2xl font-bold text-cyan-400">
              Add Recruiter
            </h2>

            {[
              "company_name",
              "role",
              "ctc",
              "hr_email",
              "eligibility_branch",
              "min_cgpa",
            ].map((k) => (
              <input
                key={k}
                placeholder={k.replace("_", " ").toUpperCase()}
                className="w-full p-3 bg-black/40 rounded-xl"
                onChange={(e) =>
                  setRecruiter({ ...recruiter, [k]: e.target.value })
                }
              />
            ))}

            <input
              type="date"
              className="w-full p-3 bg-black/40 rounded-xl"
              onChange={(e) =>
                setRecruiter({ ...recruiter, last_date: e.target.value })
              }
            />

            <textarea
              placeholder="Job Description"
              rows={3}
              className="w-full p-3 bg-black/40 rounded-xl"
              onChange={(e) =>
                setRecruiter({ ...recruiter, description: e.target.value })
              }
            />

            <div className="flex justify-end gap-4">
              <button onClick={() => setShowRecruiterModal(false)}>
                Cancel
              </button>
              <button
                onClick={saveRecruiter}
                className="bg-cyan-500 px-6 py-2 text-black rounded-xl"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TnpDashboard;
