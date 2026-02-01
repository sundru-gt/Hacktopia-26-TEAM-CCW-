import React from "react";
import { motion } from "framer-motion";

const TnpCoordinators = () => {
  return (
    <div className="min-h-screen bg-[#05070F] text-white px-6 py-28 flex justify-center">
      <div className="max-w-6xl w-full text-center">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-6"
        >
          Training & Placement <span className="text-cyan-400">Coordinators</span>
        </motion.h1>

        <p className="text-gray-400 max-w-3xl mx-auto mb-16 text-lg">
          The Training & Placement Cell of the Indian Institute of Information
          Technology, Bhagalpur is led by a dedicated team of faculty members
          and student coordinators who ensure smooth execution of placement
          activities and industry collaboration.
        </p>

        {/* COORDINATORS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">

          {/* CARD 1 */}
          <motion.div
            whileHover={{ y: -8 }}
            className="w-full max-w-sm bg-white/10 backdrop-blur-2xl border border-cyan-400/40 rounded-3xl p-8 text-left shadow-xl"
          >
            <div className="w-20 h-20 rounded-full bg-cyan-400/20 flex items-center justify-center text-3xl font-bold text-cyan-400 mb-6">
              F
            </div>

            <h3 className="text-xl font-bold mb-1">
              Faculty In-Charge
            </h3>

            <p className="text-cyan-400 font-semibold mb-2">
              Training & Placement Cell
            </p>

            <p className="text-sm text-gray-300 mb-4">
              Indian Institute of Information Technology, Bhagalpur
            </p>

            <span className="inline-block text-xs px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-400">
              Faculty Coordinator
            </span>
          </motion.div>

          {/* CARD 2 */}
          <motion.div
            whileHover={{ y: -8 }}
            className="w-full max-w-sm bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 text-left shadow-xl hover:border-cyan-400 transition"
          >
            <div className="w-20 h-20 rounded-full bg-cyan-400/20 flex items-center justify-center text-3xl font-bold text-cyan-400 mb-6">
              S
            </div>

            <h3 className="text-xl font-bold mb-1">
              Student Coordinator
            </h3>

            <p className="text-cyan-400 font-semibold mb-2">
              Placement Operations
            </p>

            <p className="text-sm text-gray-300 mb-4">
              Final Year Undergraduate Student
            </p>

            <span className="inline-block text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300">
              Student Coordinator
            </span>
          </motion.div>

          {/* CARD 3 */}
          <motion.div
            whileHover={{ y: -8 }}
            className="w-full max-w-sm bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 text-left shadow-xl hover:border-cyan-400 transition"
          >
            <div className="w-20 h-20 rounded-full bg-cyan-400/20 flex items-center justify-center text-3xl font-bold text-cyan-400 mb-6">
              S
            </div>

            <h3 className="text-xl font-bold mb-1">
              Student Coordinator
            </h3>

            <p className="text-cyan-400 font-semibold mb-2">
              Industry Outreach
            </p>

            <p className="text-sm text-gray-300 mb-4">
              Final Year Undergraduate Student
            </p>

            <span className="inline-block text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300">
              Student Coordinator
            </span>
          </motion.div>

        </div>

        {/* FOOTNOTE */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-xs text-gray-500 tracking-wide"
        >
          Official representatives of the Training & Placement Cell,
          Indian Institute of Information Technology, Bhagalpur
        </motion.p>

      </div>
    </div>
  );
};

export default TnpCoordinators;
