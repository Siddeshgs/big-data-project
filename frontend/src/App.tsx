import { BrowserRouter, Routes, Route } from "react-router-dom"
import { createContext, useState } from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Live from "./pages/Live"
import Categories from "./pages/Categories"
import Trends from "./pages/Trends"
import Search from "./pages/Search"

export const ThemeContext = createContext({ darkMode: false, setDarkMode: (v: boolean) => {} })

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={darkMode ? "dark-mode" : ""}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/live" element={<Live />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  )
}

export default App