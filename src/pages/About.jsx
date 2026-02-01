import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-[#05070F] text-white px-6 py-28 flex justify-center">
      <div className="max-w-5xl w-full text-center">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-6"
        >
          About <span className="text-cyan-400">CampusHire</span>
        </motion.h1>

        <p className="text-gray-400 max-w-3xl mx-auto mb-14 text-lg">
          CampusHire is the official digital platform designed to streamline
          and modernize the Training & Placement process at our institute.
        </p>

        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 text-left shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">
            Official Training & Placement Cell Platform
          </h2>

          <p className="text-gray-200 mb-6 leading-relaxed">
            CampusHire is the <span className="font-semibold text-white">
            official Training & Placement Cell (TnP) platform of the Indian Institute
            of Information Technology, Bhagalpur</span>.
            It serves as a centralized system to manage placement activities,
            student readiness, recruiter interactions, and opportunity discovery
            in a structured and transparent manner.
          </p>

          <p className="text-gray-200 mb-6 leading-relaxed">
            The platform is built with a vision to reduce manual effort,
            improve coordination, and empower students with the right tools
            to prepare for internships and full-time roles in the industry.
          </p>

          {/* FEATURES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-cyan-400 mb-2">
                For Students
              </h3>
              <p className="text-sm text-gray-200">
                Access job and internship opportunities, practice AI-powered
                mock interviews, and track placement readiness in one place.
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-cyan-400 mb-2">
                For Recruiters
              </h3>
              <p className="text-sm text-gray-200">
                Connect directly with the institute, post opportunities,
                and reach skilled students efficiently.
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-cyan-400 mb-2">
                For TnP Cell
              </h3>
              <p className="text-sm text-gray-200">
                Manage placement drives, monitor student participation,
                and gain actionable insights through dashboards.
              </p>
            </div>
          </div>

          {/* FOOTER TEXT */}
          <p className="text-gray-400 text-sm mt-10 text-center">
            Built with a focus on transparency, efficiency, and student success.
          </p>
        </motion.div>

        {/* BOTTOM NOTE */}
        <p className="mt-10 text-xs text-gray-500 tracking-wide">
          © Training & Placement Cell, Indian Institute of Information Technology, Bhagalpur
        </p>

      </div>
    </div>
  );
};

export default About;
