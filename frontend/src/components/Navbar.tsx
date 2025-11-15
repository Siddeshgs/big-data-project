import { NavLink, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useContext } from "react"
import { ThemeContext } from "../App"

export default function Navbar() {
  const { darkMode, setDarkMode } = useContext(ThemeContext)
  const location = useLocation()

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl p-4 border-b border-purple-500/30"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-600">
          YouTube Nebula Pro
        </h1>
        <div className="flex items-center space-x-8">
          {["Home", "Live", "Categories", "Trends", "Search"].map((name) => (
            <NavLink
              key={name}
              to={name === "Home" ? "/" : `/${name.toLowerCase()}`}
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-400 font-bold text-lg shadow-lg"
                  : "text-gray-300 hover:text-cyan-400 transition text-lg"
              }
            >
              {name}
            </NavLink>
          ))}
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </motion.nav>
  )
}