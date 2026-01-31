import React, { useState } from "react";
import { motion } from "framer-motion";

const TnpDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617] text-white">
      
      {/* ================= TOP BAR ================= */}
      <div className="border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              TnP Coordinator Dashboard
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Centralized placement intelligence ·{" "}
              <span className="text-cyan-400 font-semibold">CampusHire</span>
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition"
          >
            + Add Recruiter
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Total Students", value: "—" },
            { title: "Placement Ready", value: "— %" },
            { title: "Avg Mock Score", value: "— / 100" },
            { title: "Active Recruiters", value: "—" },
          ].map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
            >
              <p className="text-gray-400 text-sm">{s.title}</p>
              <p className="text-3xl font-extrabold text-cyan-400 mt-2">
                {s.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ================= STUDENTS ================= */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl p-6">
            <h2 className="text-xl font-bold mb-2">
              Student Readiness Overview
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              This data will be dynamically fetched from the student database.
            </p>

            {/* Placeholder State */}
            <div className="flex items-center justify-center h-48 border border-dashed border-white/10 rounded-xl text-gray-500">
              Student data will appear here
            </div>
          </div>

          {/* ================= RECRUITERS ================= */}
          <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl p-6">
            <h2 className="text-xl font-bold mb-2">
              Recruiter Engagement
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Companies added by the TnP Cell
            </p>

            {/* Placeholder */}
            <div className="space-y-3">
              <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-gray-500">
                Recruiter data will appear here
              </div>
            </div>
          </div>
        </div>

        {/* ================= ANALYTICS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "Skill gap trends across batches",
            "Branch-wise placement readiness",
            "Recruiter demand vs student skills",
          ].map((t, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
            >
              <h3 className="font-semibold text-cyan-400 mb-2">
                Placement Insight
              </h3>
              <p className="text-gray-400 text-sm">
                {t} will be visualized here.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= ADD RECRUITER MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#020617] border border-white/10 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Add Recruiter
            </h2>

            <input
              placeholder="Company Name"
              className="w-full mb-3 p-3 rounded-lg bg-black/40 border border-white/10"
            />
            <input
              placeholder="Role Offered"
              className="w-full mb-3 p-3 rounded-lg bg-black/40 border border-white/10"
            />
            <input
              placeholder="HR Email"
              className="w-full mb-4 p-3 rounded-lg bg-black/40 border border-white/10"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-white/20 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-cyan-500 text-black rounded-lg font-semibold"
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
