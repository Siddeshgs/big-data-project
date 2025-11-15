import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import Starfield from '../components/Starfield'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [stats, setStats] = useState({ videos: 0, views: 0, categories: 0 })

  useEffect(() => {
    axios.get("http://localhost:8000/top-categories")
      .then(res => {
        const totalViews = res.data.reduce((sum: number, item: any) => sum + (item["avg(views)"] || 0), 0)
        setStats({
          videos: 40977,  // From dataset
          views: Math.round(totalViews),
          categories: res.data.length
        })
      })
      .catch(() => {
        setStats({ videos: 40977, views: 12500000, categories: 15 })
      })
  }, [])

  return (
    <>
      <Starfield />
      <div className="min-h-screen flex flex-col items-center justify-center relative pt-24">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, type: "spring" }}
          className="text-center z-10 mb-12"
        >
          <h1 className="text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-pulse">
            YouTube Nebula Pro
          </h1>
          
        </motion.div>

        <Canvas className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 z-0" camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={0.8} />
          <OrbitControls enableZoom={false} autoRotate />
          <Sphere args={[1.5, 128, 128]} scale={2.5}>
            <MeshDistortMaterial color="#ff00ff" distort={0.6} speed={3} roughness={0} />
          </Sphere>
        </Canvas>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-4xl z-10 px-6">
          {Object.entries(stats).map(([key, value]) => (
            <motion.div
              key={key}
              whileHover={{ scale: 1.1, rotateY: 10 }}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl text-center border border-purple-500/50 hover:border-cyan-400/50 transition"
            >
              <h3 className="text-5xl font-bold text-pink-400">{(value as number).toLocaleString()}</h3>
              <p className="text-cyan-300 capitalize mt-2 text-lg">{key}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}