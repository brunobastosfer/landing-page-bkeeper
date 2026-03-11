import { Zap, Shield, BarChart3, Rocket } from "lucide-react"

const pillars = [
  {
    icon: Zap,
    title: "Agilidade",
    description: "Entregas rápidas sem abrir mão da qualidade. Metodologias ágeis para resultados em tempo recorde.",
  },
  {
    icon: Shield,
    title: "Confiabilidade",
    description: "Transparência total em cada etapa. Você acompanha tudo em tempo real com relatórios detalhados.",
  },
  {
    icon: BarChart3,
    title: "Dados",
    description: "Decisões baseadas em dados reais, não achismo. Analytics avançado para cada estratégia.",
  },
  {
    icon: Rocket,
    title: "Soluções completas",
    description: "Integramos tráfego pago, páginas de conversão e automações para gerar mais clientes.",
  },
]

export function About() {
  return (
    <section id="sobre" className="py-28 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute right-0 top-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 100% 0%, rgba(230,191,70,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#E6BF46]/30 bg-[#E6BF46]/5 text-[#E6BF46] text-sm font-semibold mb-6">
              Quem somos
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-balance leading-tight mb-6">
              A colmeia que{" "}
              <span className="gold-shimmer">trabalha pelo</span>{" "}
              seu sucesso
            </h2>
            <p className="text-[#f5f0e8]/60 text-lg leading-relaxed mb-6">
              A Bkeeper Ads nasceu da união entre estratégia digital e geração de oportunidades de negócio.
            </p>
            <p className="text-[#f5f0e8]/60 text-lg leading-relaxed mb-6">
              Inspirados no trabalho das abelhas, acreditamos que crescimento real acontece através de organização, consistência e estratégia.
            </p>
            <p className="text-[#f5f0e8]/60 text-lg leading-relaxed mb-6">
              Assim como a polinização fortalece ecossistemas inteiros, nossas campanhas conectam empresas ao público certo, gerando novos clientes e expandindo sua presença no mercado.
            </p>
            <p className="text-[#f5f0e8]/60 text-lg leading-relaxed mb-10">
              Nosso foco é simples: ajudar empresas a crescer através de estratégias digitais inteligentes e orientadas por dados.
            </p>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E6BF46] text-[#080808] font-bold text-sm hover:bg-[#c9a83a] transition-colors"
            >
              Quero atrair mais clientes
            </a>
          </div>

          {/* Right — pillars */}
          <div className="grid grid-cols-2 gap-5">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className="p-6 rounded-2xl border border-[#242424] bg-[#111111] flex flex-col gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#E6BF46]/10 flex items-center justify-center">
                    <Icon size={20} className="text-[#E6BF46]" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{pillar.title}</h3>
                  <p className="text-sm text-[#f5f0e8]/55 leading-relaxed">{pillar.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
