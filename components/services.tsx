import {
  TrendingUp,
  MapPin,
  LayoutTemplate,
  BarChart3,
  Zap,
  Code2,
} from "lucide-react"

const services = [
  {
    icon: TrendingUp,
    title: "Tráfego Pago (Google & Meta Ads)",
    description:
      "Estruturamos campanhas estratégicas para gerar leads qualificados e novos clientes todos os dias.",
    items: [
      "Google Ads (Pesquisa e Display)",
      "Meta Ads (Instagram e Facebook)",
      "Estratégia de Funil",
      "Otimização diária de campanhas",
      "Escala de resultados",
    ],
  },
  {
    icon: MapPin,
    title: "Google Meu Negócio & SEO Local",
    description:
      "Posicionamos sua empresa nas primeiras posições do Google para que clientes da sua região encontrem você primeiro.",
    items: [
      "Otimização completa do perfil",
      "Estratégia de avaliações",
      "SEO Local",
      "Postagens estratégicas",
      "Gestão e monitoramento",
    ],
  },
  {
    icon: LayoutTemplate,
    title: "Estrutura de Conversão (Landing Pages)",
    description:
      "Criamos páginas estratégicas para transformar visitantes em leads e clientes.",
    items: [
      "Landing pages de alta conversão",
      "Estrutura para campanhas de tráfego",
      "Integração com WhatsApp",
      "Otimização para conversão",
      "Testes de melhoria",
    ],
  },
  {
    icon: BarChart3,
    title: "Estratégia de Crescimento Digital",
    description:
      "Analisamos o seu negócio e estruturamos uma estratégia completa para gerar crescimento previsível.",
    items: [
      "Diagnóstico de marketing",
      "Planejamento de campanhas",
      "Análise de métricas",
      "Otimização de funil",
      "Escala de resultados",
    ],
  },
  {
    icon: Zap,
    title: "Automação e Integrações",
    description:
      "Automatizamos processos de captação e atendimento para que nenhum lead seja perdido.",
    items: [
      "Integração com CRM",
      "Automação de WhatsApp",
      "Gestão de leads",
      "Monitoramento de resultados",
    ],
  },
  {
    icon: Code2,
    title: "Desenvolvimento de Software",
    description:
      "Criamos produtos digitais sob medida: sites, plataformas SaaS, aplicativos mobile e sistemas web completos com tecnologia de ponta.",
    items: [
      "Sites e Landing Pages",
      "Plataformas SaaS",
      "Aplicativos Mobile (iOS & Android)",
      "Sistemas Web Personalizados",
      "APIs e Integrações",
    ],
  },
]

export function Services() {
  return (
    <section id="servicos" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#E6BF46]/30 bg-[#E6BF46]/5 text-[#E6BF46] text-sm font-semibold mb-4">
            O que fazemos
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-balance">
            Soluções completas para seu{" "}
            <span className="gold-shimmer">crescimento digital</span>
          </h2>
          <p className="mt-4 text-[#f5f0e8]/55 text-lg max-w-2xl mx-auto text-pretty">
            Da estratégia à execução — Soluções completas para atrair clientes, gerar oportunidades e escalar o crescimento da sua empresa no digital.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="group relative flex flex-col p-7 rounded-2xl border border-[#242424] bg-[#111111] hover:border-[#E6BF46]/40 transition-all duration-300 hover:bg-[#141414]"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#E6BF46]/10 border border-[#E6BF46]/20 flex items-center justify-center mb-5 group-hover:bg-[#E6BF46]/15 transition-colors">
                  <Icon size={22} className="text-[#E6BF46]" />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-[#f5f0e8]/55 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                <ul className="mt-auto flex flex-col gap-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#f5f0e8]/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E6BF46] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(230,191,70,0.2)" }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
