import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import { useCallback } from "react"

export default function Starfield() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine)
  }, [])

  const particlesOptions = {
    particles: {
      number: { value: 80 },
      color: { value: ["#ff00ff", "#00ffff", "#ffff00"] },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: { min: 1, max: 5 } },
      move: { enable: true, speed: 1, direction: "none", random: true }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" }
      }
    },
    background: { color: { value: "transparent" } }
  }

  return (
    <>
      <div className="fixed inset-0 -z-10 opacity-70">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Stars radius={300} depth={60} count={5000} factor={7} saturation={0} fade speed={1} />
        </Canvas>
      </div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
      />
    </>
  )
}