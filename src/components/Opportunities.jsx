import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Opportunities = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs") // BACKEND URL
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to fetch opportunities right now");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#05070F] text-white px-6 py-28 flex justify-center">
      <div className="max-w-6xl w-full text-center">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold mb-4"
        >
          Explore <span className="text-cyan-400">Opportunities</span>
        </motion.h1>

        <p className="text-gray-400 mb-14 max-w-2xl mx-auto">
          Discover internships and job opportunities curated using AI-powered
          aggregation from multiple platforms.
        </p>

        {/* LOADING */}
        {loading && (
          <p className="text-cyan-400 text-lg animate-pulse">
            Fetching latest opportunities...
          </p>
        )}

        {/* ERROR */}
        {error && (
          <p className="text-red-400 text-lg">
            {error}
          </p>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && jobs.length === 0 && (
          <p className="text-gray-400 text-lg">
            No opportunities available at the moment.
          </p>
        )}

        {/* JOB CARDS */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {jobs.map((job, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="w-full max-w-sm bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left hover:border-cyan-400 transition"
            >
              <h3 className="text-lg font-bold mb-1">
                {job.title}
              </h3>

              <p className="text-sm text-gray-400 mb-2">
                {job.company_name}
              </p>

              <p className="text-sm text-cyan-400 mb-4">
                📍 {job.location}
              </p>

              <a
                href={job.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-sm font-semibold text-black bg-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-300 transition"
              >
                View Opportunity
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Opportunities;
