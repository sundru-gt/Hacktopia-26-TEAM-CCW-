import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bg from "../assets/hero.jpeg";
import logo from "../assets/logo1.png";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Opportunities", link: "/opportunities" },
    { name: "Mock Interview", link: "/mock-interview" },
    { name: "TnP Coordinators", link: "/tnp" },
    { name: "About", link: "/about" },
  ];

  return (
    <div className="w-full min-h-screen overflow-x-hidden font-[Inter]">
      {/* ================= NAVBAR ================= */}
      <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="CampusHire"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-white font-extrabold text-xl md:text-2xl tracking-wide">
                CampusHire
              </h1>
              <p className="text-[10px] text-cyan-400 tracking-widest uppercase">
                Placement Intelligence Platform
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-8 text-white font-medium">
            {menuItems.map((item, idx) => (
              <li key={idx} className="relative group">
                <Link
                  to={item.link}
                  className="hover:text-cyan-400 transition"
                >
                  {item.name}
                </Link>
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}

            {/* Auth Buttons */}
            <div className="flex items-center gap-3 ml-6">
              <Link
                to="/login"
                className="px-5 py-2 rounded-xl border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition font-semibold"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 rounded-xl bg-cyan-400 text-black hover:bg-cyan-300 transition font-semibold shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="text-white text-3xl lg:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <FiMenu />
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-xl flex flex-col px-6 py-8 text-white">
          <button
            className="self-end text-4xl mb-12"
            onClick={() => setMenuOpen(false)}
          >
            <FiX />
          </button>

          <ul className="flex flex-col items-center gap-8 text-2xl font-semibold">
            {menuItems.map((item, idx) => (
              <li key={idx} onClick={() => setMenuOpen(false)}>
                <Link className="hover:text-cyan-400" to={item.link}>
                  {item.name}
                </Link>
              </li>
            ))}

            <Link
              to="/login"
              className="w-3/4 text-center py-3 rounded-xl border border-cyan-400 text-cyan-400"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="w-3/4 text-center py-3 rounded-xl bg-cyan-400 text-black font-bold"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </Link>
          </ul>
        </div>
      )}

      {/* ================= HERO SECTION ================= */}
      <section
        className="min-h-screen flex items-center justify-center px-6 text-center relative"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90"></div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="relative z-10 max-w-4xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 md:p-14 shadow-2xl"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            AI-Powered Placement <br />
            <span className="text-cyan-400">Intelligence Platform</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200">
            Automate opportunity discovery, conduct resume-aware mock interviews,
            and enable data-driven placement planning for Training & Placement Cells.
          </p>

         

          {/* CTA */}
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <Link to="/mock-interview">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="bg-cyan-400 text-black px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-cyan-300 transition"
              >
                Start AI Mock Interview
              </motion.button>
            </Link>

            <Link to="/opportunities">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="border border-white text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-black transition"
              >
                Explore Opportunities
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;
