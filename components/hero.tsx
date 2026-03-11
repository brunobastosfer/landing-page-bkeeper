"use client"

import { useEffect, useState } from "react"
import { ArrowRight, ChevronDown } from "lucide-react"

const phrases = [
  "Mais Clientes",
  "Tráfego Pago Estratégico",
  "Presença Forte no Google",
  "Automações",
]

export function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const current = phrases[phraseIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex))
        setCharIndex((c) => c + 1)
      }, 80)
    } else if (!isDeleting && charIndex > current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800)
    } else if (isDeleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex))
        setCharIndex((c) => c - 1)
      }, 45)
    } else {
      setIsDeleting(false)
      setPhraseIndex((i) => (i + 1) % phrases.length)
      setCharIndex(0)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, phraseIndex])

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden honeycomb-bg"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(230,191,70,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Top-left decorative hex lines */}
      <div className="absolute top-20 left-6 opacity-20 hidden lg:block">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <polygon points="60,5 110,32 110,88 60,115 10,88 10,32" stroke="#E6BF46" strokeWidth="1" fill="none" />
          <polygon points="60,20 95,39 95,81 60,100 25,81 25,39" stroke="#E6BF46" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-balance leading-tight mb-6">
          Sua empresa merece{" "}
          <br className="hidden md:block" />
          <span
            className="typing-cursor"
            style={{
              color: "#E6BF46",
              display: "inline-block",
              minWidth: "2ch",
            }}
          >
            {displayed}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-[#f5f0e8]/60 max-w-2xl mx-auto leading-relaxed mb-10 text-pretty">
          Ajudamos empresas a gerar clientes todos os dias através de estratégias digitais inteligentes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contato"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#E6BF46] text-[#080808] font-bold text-base hover:bg-[#c9a83a] transition-all duration-200 gold-glow"
          >
            Agendar análise gratuita
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#servicos"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#242424] text-[#f5f0e8]/70 font-semibold text-base hover:border-[#E6BF46]/40 hover:text-[#E6BF46] transition-all duration-200"
          >
            Ver serviços
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { value: "+100.000", label: "Leads gerados para clientes" },
            { value: "+150", label: "Empresas atendidas" },
            { value: "+4M", label: "Investidos em anúncios gerenciados" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-black" style={{ color: "#E6BF46" }}>
                {stat.value}
              </div>
              <div className="text-xs text-[#f5f0e8]/50 mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#servicos"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#f5f0e8]/30 hover:text-[#E6BF46] transition-colors"
        aria-label="Rolar para baixo"
      >
        <ChevronDown size={24} className="animate-bounce" />
      </a>
    </section>
  )
}
