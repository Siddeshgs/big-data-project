import { useEffect, useState } from "react"
import axios from "axios"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { motion } from "framer-motion"
import Starfield from "../components/Starfield"

const COLORS = ["#ff00ff", "#00ffff", "#ffff00", "#ff00aa", "#00ffaa", "#ffaa00", "#aa00ff", "#00aaff"]

export default function Categories() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    axios.get("http://localhost:8000/top-categories")
      .then(res => setData(res.data.map((d: any) => ({ name: d.category, value: Math.round(d["avg(views)"]) }))))
      .catch(() => setData([
        { name: "Entertainment", value: 1487265 },
        { name: "Music", value: 1354821 },
        { name: "Comedy", value: 1023847 }
      ]))
  }, [])

  return (
    <>
      <Starfield />
      <div className="min-h-screen flex items-center justify-center pt-24 p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-4xl bg-white/5 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-purple-500/50"
        >
          <h1 className="text-5xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500">
            Category Cosmos
          </h1>
          <ResponsiveContainer width="100%" height={500}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={180}
                innerRadius={60}
                label={({ name, value }) => `${name}\n${value.toLocaleString()}`}
              >
                {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </>
  )
}