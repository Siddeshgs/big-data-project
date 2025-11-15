import { useEffect, useState } from "react"
import axios from "axios"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"
import Starfield from "../components/Starfield"

export default function Trends() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    axios.get("http://localhost:8000/monthly-trends")
      .then(res => setData(res.data.map((d: any) => ({ month: d.month, views: Math.round(d["avg(views)"]) }))))
      .catch(() => setData([
        { month: "2017-11", views: 800000 },
        { month: "2017-12", views: 950000 },
        { month: "2018-01", views: 1100000 },
        { month: "2018-02", views: 1050000 },
        { month: "2018-03", views: 1200000 }
      ]))
  }, [])

  return (
    <>
      <Starfield />
      <div className="min-h-screen flex items-center justify-center pt-24 p-6">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-6xl"
        >
          <h1 className="text-5xl font-bold text-center mb-10 text-cyan-400">Time Warp Trends</h1>
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-purple-600/50">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff00ff" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ff00ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip formatter={(v: number) => v.toLocaleString()} />
                <Area type="monotone" dataKey="views" stroke="#ff00ff" fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </>
  )
}