import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Starfield from "../components/Starfield"

export default function Live() {
  const [video, setVideo] = useState<any>({ title: "Connecting...", views: 0 })

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/live")
    ws.onopen = () => console.log("Live stream connected")
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data)
      setVideo(data)
      // Voice readout
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(`${data.views} live views for ${data.title}`)
        speechSynthesis.speak(utterance)
      }
    }
    ws.onerror = () => setVideo({ title: "Connection Error", views: 0 })
    return () => ws.close()
  }, [])

  return (
    <>
      <Starfield />
      <div className="min-h-screen flex items-center justify-center pt-24">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="text-center relative z-10"
        >
          <motion.div
            animate={{ boxShadow: ["0 0 30px #ff00ff", "0 0 100px #ff00ff", "0 0 30px #ff00ff"] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-80 h-80 rounded-full bg-gradient-to-r from-pink-600 to-purple-700 p-3 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 animate-pulse opacity-20 rounded-full"></div>
            <div className="bg-black rounded-full w-full h-full flex flex-col items-center justify-center relative z-10">
              <p className="text-5xl font-bold text-cyan-400">{video.views.toLocaleString()}</p>
              <p className="text-pink-400 mt-2 text-lg">LIVE VIEWS</p>
            </div>
          </motion.div>
          <h2 className="text-3xl mt-8 text-pink-300 font-semibold max-w-2xl mx-auto px-4">{video.title}</h2>
        </motion.div>
      </div>
    </>
  )
}