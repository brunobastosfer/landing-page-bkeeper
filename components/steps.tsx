"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Diagnóstico Profundo",
    description:
      "Entendemos sua empresa, seu mercado e seu público para identificar as melhores oportunidades de crescimento digital.",
    color: "#E6BF46",
  },
  {
    number: "02",
    title: "Posicionamento Estratégico",
    description:
      "Definimos uma estratégia personalizada de marketing digital para atrair clientes qualificados e gerar oportunidades reais de negócio.",
    color: "#E6BF46",
  },
  {
    number: "03",
    title: "Gestão Inteligente",
    description:
      "Configuramos campanhas, páginas e sistemas necessários para iniciar a captação de leads e clientes para sua empresa.",
    color: "#E6BF46",
  },
  {
    number: "04",
    title: "Otimização Contínua",
    description:
      "Monitoramos dados, analisamos resultados e ajustamos campanhas constantemente para melhorar o desempenho e reduzir custos.",
    color: "#E6BF46",
  },
  {
    number: "05",
    title: "Relatórios Transparentes",
    description:
      "Identificamos as estratégias que geram mais retorno e ampliamos os investimentos para escalar o crescimento do seu negócio.",
    color: "#E6BF46",
  }
]

export function Steps() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="passos" className="py-28 px-6 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#E6BF46]/30 bg-[#E6BF46]/5 text-[#E6BF46] text-sm font-semibold mb-4">
            Nossa metodologia
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-balance">
            Como transformamos sua{" "}
            <span className="gold-shimmer">ideia em resultado</span>
          </h2>
          <p className="mt-4 text-[#f5f0e8]/55 text-base max-w-xl mx-auto text-pretty">
            Clique em cada etapa para entender o que acontece no processo.
          </p>
        </div>

        {/* Desktop: mind-map radial layout */}
        <div className="hidden md:block">
          {/* Central node */}
          <div className="relative flex items-center justify-center" style={{ height: 700 }}>
            {/* SVG connector lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 900 700"
              preserveAspectRatio="xMidYMid meet"
            >
              {steps.map((_, i) => {
                // Positions for 8 nodes in a circle
                const angle = (i / steps.length) * 2 * Math.PI - Math.PI / 2
                const rx = 290
                const ry = 260
                const cx = 450
                const cy = 350
                const x = cx + rx * Math.cos(angle)
                const y = cy + ry * Math.sin(angle)
                const isActive = active === i
                return (
                  <line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={x}
                    y2={y}
                    stroke={isActive ? "#E6BF46" : "#2a2a2a"}
                    strokeWidth={isActive ? 2 : 1}
                    strokeDasharray={isActive ? "none" : "4 4"}
                    style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                  />
                )
              })}
            </svg>

            {/* Center hub */}
            <div className="absolute z-10 flex items-center justify-center rounded-full border-2 border-[#E6BF46] bg-[#080808]"
              style={{ width: 120, height: 120, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
              <div className="text-center">
                <div className="text-[#E6BF46] font-black text-xl leading-none">8</div>
                <div className="text-[#f5f0e8]/60 text-[10px] font-semibold tracking-widest uppercase mt-1">Passos</div>
              </div>
            </div>

            {/* Step nodes */}
            {steps.map((step, i) => {
              const angle = (i / steps.length) * 2 * Math.PI - Math.PI / 2
              const rx = 290
              const ry = 260
              const cx = 50
              const cy = 50
              const x = cx + rx * Math.cos(angle)
              const y = cy + ry * Math.sin(angle)
              const isActive = active === i

              return (
                <button
                  key={i}
                  onClick={() => setActive(isActive ? null : i)}
                  className="absolute z-20 group"
                  style={{
                    left: `calc(50% + ${rx * Math.cos(angle)}px)`,
                    top: `calc(50% + ${ry * Math.sin(angle)}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                  aria-label={step.title}
                >
                  <div
                    className="flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 text-center"
                    style={{
                      width: 130,
                      height: 100,
                      backgroundColor: isActive ? "#E6BF46" : "#111111",
                      borderColor: isActive ? "#E6BF46" : "#2a2a2a",
                      boxShadow: isActive ? "0 0 24px rgba(230,191,70,0.35)" : "none",
                    }}
                  >
                    <span
                      className="font-black text-2xl leading-none"
                      style={{ color: isActive ? "#080808" : "#E6BF46" }}
                    >
                      {step.number}
                    </span>
                    <span
                      className="text-[11px] font-bold leading-tight mt-1.5 px-2"
                      style={{ color: isActive ? "#080808" : "#f5f0e8" }}
                    >
                      {step.title}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Description panel */}
          <div
            className="mx-auto max-w-xl rounded-2xl border border-[#E6BF46]/30 bg-[#111111] px-8 py-6 text-center transition-all duration-300"
            style={{
              opacity: active !== null ? 1 : 0,
              transform: active !== null ? "translateY(0)" : "translateY(8px)",
              pointerEvents: active !== null ? "auto" : "none",
              minHeight: 100,
            }}
          >
            {active !== null && (
              <>
                <p className="text-[#E6BF46] font-black text-lg mb-2">{steps[active].title}</p>
                <p className="text-[#f5f0e8]/70 text-sm leading-relaxed">{steps[active].description}</p>
              </>
            )}
          </div>
        </div>

        {/* Mobile: vertical stepper */}
        <div className="flex flex-col gap-0 md:hidden">
          {steps.map((step, i) => {
            const isActive = active === i
            return (
              <div key={i} className="flex gap-4">
                {/* Left timeline */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setActive(isActive ? null : i)}
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-black text-sm transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? "#E6BF46" : "#111111",
                      borderColor: isActive ? "#E6BF46" : "#2a2a2a",
                      color: isActive ? "#080808" : "#E6BF46",
                      boxShadow: isActive ? "0 0 16px rgba(230,191,70,0.4)" : "none",
                    }}
                  >
                    {step.number}
                  </button>
                  {i < steps.length - 1 && (
                    <div
                      className="w-px flex-1 my-1 transition-colors duration-300"
                      style={{ backgroundColor: isActive ? "#E6BF46" : "#242424", minHeight: 24 }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="pb-6 flex-1 pt-1.5">
                  <button
                    onClick={() => setActive(isActive ? null : i)}
                    className="w-full text-left"
                  >
                    <h3 className="font-bold text-foreground text-base mb-1">{step.title}</h3>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: isActive ? 200 : 0, opacity: isActive ? 1 : 0 }}
                  >
                    <p className="text-[#f5f0e8]/60 text-sm leading-relaxed pr-2">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="#contato"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#E6BF46] text-[#080808] font-bold text-base hover:bg-[#c9a83a] transition-all duration-200 gold-glow group"
          >
            Começar agora
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
