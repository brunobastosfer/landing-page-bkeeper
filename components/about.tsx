import { Zap, Shield, Target, Lightbulb } from "lucide-react"

const pillars = [
  {
    icon: Target,
    title: "Foco em Resultados",
    description: "Cada estratégia é desenhada para maximizar o retorno sobre o investimento do seu negócio.",
  },
  {
    icon: Zap,
    title: "Velocidade de Entrega",
    description: "Metodologias ágeis e equipe dedicada garantem entregas rápidas sem sacrificar a qualidade.",
  },
  {
    icon: Lightbulb,
    title: "Inovação Constante",
    description: "Estamos sempre à frente das tendências em marketing digital e tecnologia.",
  },
  {
    icon: Shield,
    title: "Parceria de Confiança",
    description: "Transparência total nas métricas, relatórios e comunicação durante todo o processo.",
  },
]

export function About() {
  return (
    <section id="sobre" className="py-24 sm:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <span className="inline-block text-gold text-xs font-bold tracking-widest uppercase mb-4">
              Quem somos
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-foreground leading-tight text-balance mb-6">
              A colmeia que faz seu negócio{" "}
              <span className="gold-shimmer">produzir mais</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6 text-pretty">
              A Bkeeper Ads é uma empresa especializada em marketing digital, tráfego pago e desenvolvimento de tecnologia. Nossa missão é transformar negócios por meio de soluções inteligentes que unem criatividade e engenharia.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-8 text-pretty">
              Assim como uma colmeia funciona com precisão e eficiência, nossa equipe trabalha de forma integrada para garantir que cada projeto entregue resultados reais e mensuráveis para o seu negócio.
            </p>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-7 py-3 rounded-full font-bold hover:bg-gold-muted transition-all duration-200 text-sm"
            >
              Conheça nosso trabalho
            </a>
          </div>

          {/* Right: pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-gold/40 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <h3 className="text-foreground font-bold text-base mb-2">{pillar.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
