"use client"

import { useEffect, useState } from "react"
import { ArrowRight, ChevronDown } from "lucide-react"

const typingPhrases = [
  "Tráfego Pago",
  "Marketing Digital",
  "Desenvolvimento de Software",
  "Visão Computacional",
  "Realidade Aumentada",
  "Dashboards em Tempo Real",
  "Crescimento Inteligente",
]

function TypingText() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const current = typingPhrases[phraseIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex))
        setCharIndex((i) => i + 1)
        if (charIndex === current.length) {
          timeout = setTimeout(() => setIsDeleting(true), 1800)
        }
      }, 60)
    } else if (isDeleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex))
        setCharIndex((i) => i - 1)
        if (charIndex === 0) {
          setIsDeleting(false)
          setPhraseIndex((i) => (i + 1) % typingPhrases.length)
        }
      }, 35)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, phraseIndex])

  return (
    <span className="gold-shimmer typing-cursor font-black">
      {displayed}
    </span>
  )
}

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center honeycomb-bg overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold/4 blur-[100px] rounded-full" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(230,191,70,1) 1px, transparent 1px), linear-gradient(90deg, rgba(230,191,70,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-gold/30 bg-gold/10 text-gold text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          Tecnologia que gera resultados
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-foreground leading-tight text-balance mb-4">
          Impulsione seu negócio com
        </h1>
        <div className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight min-h-[1.2em] mb-8">
          <TypingText />
        </div>

        {/* Subheadline */}
        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-12 text-pretty">
          Unimos estratégia, criatividade e tecnologia de ponta para transformar sua empresa em uma máquina de resultados — do primeiro clique à conversão.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contato"
            className="group inline-flex items-center gap-2 bg-gold text-primary-foreground px-8 py-3.5 rounded-full font-bold text-base hover:bg-gold-muted transition-all duration-200 gold-glow hover:scale-105"
          >
            Começar agora
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="https://wa.me/5517991215076"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-full font-bold text-base hover:border-gold/50 hover:text-gold transition-all duration-200"
          >
            Falar no WhatsApp
          </a>
        </div>

        {/* Scroll indicator */}
        <a
          href="#servicos"
          className="mt-20 inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
          aria-label="Ver serviços"
        >
          <span className="text-xs font-semibold tracking-widest uppercase">Nossos serviços</span>
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </div>
    </section>
  )
}
