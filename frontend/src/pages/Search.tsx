import { useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import Starfield from "../components/Starfield"

export default function Search() {
  const [q, setQ] = useState("")
  const [results, setResults] = useState<any[]>([])

  const search = () => {
    if (!q.trim()) return
    axios.get(`http://localhost:8000/search?q=${encodeURIComponent(q)}`)
      .then(res => setResults(res.data))
      .catch(() => setResults([]))
  }

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.onresult = (e: any) => {
        setQ(e.results[0][0].transcript)
        search()
      }
      recognition.start()
    } else {
      alert("Voice search not supported in this browser.")
    }
  }

  return (
    <>
      <Starfield />
      <div className="min-h-screen pt-24 p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <h1 className="text-5xl font-bold text-center mb-10 text-pink-400">Holo Search</h1>
          <div className="flex gap-2 justify-center">
            <input
              type="text"
              placeholder="Search the nebula..."
              className="flex-1 p-4 rounded-l-full bg-white/10 backdrop-blur-lg text-xl text-center text-white placeholder-gray-400 border border-purple-500 focus:border-cyan-400"
              value={q}
              onChange={e => setQ(e.target.value)}
              onKeyPress={e => e.key === "Enter" && search()}
            />
            <button
              onClick={search}
              className="bg-gradient-to-r from-pink-600 to-purple-600 px-8 py-4 rounded-r-full font-bold hover:scale-105 transition shadow-lg"
            >
              Search
            </button>
            <button
              onClick={startVoiceSearch}
              className="bg-cyan-600 p-4 rounded-full hover:scale-105 transition shadow-lg"
              title="Voice Search"
            >
              🎙️
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {results.map((v) => (
            <motion.div
              key={v.video_id}
              whileHover={{ y: -20, rotateX: 15, scale: 1.05 }}
              className="bg-gradient-to-br from-purple-600/80 to-pink-600/80 p-1 rounded-2xl shadow-xl backdrop-blur-sm border border-white/20"
            >
              <div className="bg-black/50 rounded-2xl p-4 h-full flex flex-col">
                <img src={v.thumbnail_link || "https://via.placeholder.com/300x200?text=Thumbnail"} alt={v.title} className="w-full h-48 object-cover rounded-xl" />
                <h3 className="text-lg font-bold mt-3 text-cyan-400 line-clamp-2">{v.title}</h3>
                <p className="text-sm text-pink-300 mb-2">@{v.channel_title}</p>
                <div className="flex justify-between text-xs mt-auto pt-2 text-gray-300">
                  <span>Views: {v.views?.toLocaleString()}</span>
                  <span>Likes: {v.likes?.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}