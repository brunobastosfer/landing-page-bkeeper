"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 200, suffix: "+", label: "Projetos entregues" },
  { value: 150, suffix: "+", label: "Clientes satisfeitos" },
  { value: 98, suffix: "%", label: "Taxa de satisfação" },
  { value: 5, suffix: "x", label: "ROI médio para clientes" },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1800
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.3 }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [target])

  return (
    <span ref={ref} className="text-5xl sm:text-6xl font-black text-gold">
      {count}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gold/5" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gold/20" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center gap-2">
              <Counter target={stat.value} suffix={stat.suffix} />
              <span className="text-muted-foreground text-sm font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
