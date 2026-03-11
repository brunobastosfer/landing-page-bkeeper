import {
  Code2,
  LayoutDashboard,
  Users,
  TrendingUp,
  Eye,
  Glasses,
} from "lucide-react"

const services = [
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
  {
    icon: LayoutDashboard,
    title: "Monitoramento de Dados",
    description:
      "Dashboards inteligentes e monitoramento em tempo real para que você tenha total controle sobre os dados do seu negócio.",
    items: [
      "Dashboards em Tempo Real",
      "Analytics Avançado",
      "Alertas Automatizados",
      "Relatórios Personalizados",
      "Integração com BI",
    ],
  },
  {
    icon: Users,
    title: "Equipe de Tecnologia",
    description:
      "Fornecemos profissionais qualificados para integrar sua equipe de tecnologia, com expertise em diversas stacks e metodologias.",
    items: [
      "Desenvolvedores Full-Stack",
      "Designers UI/UX",
      "DevOps & Cloud",
      "Tech Leads Experientes",
      "Gestão de Projetos",
    ],
  },
  {
    icon: TrendingUp,
    title: "Tráfego Pago & Marketing",
    description:
      "Estratégias de marketing digital e tráfego pago para impulsionar a visibilidade e o crescimento da sua empresa no mercado.",
    items: [
      "Google Ads & Meta Ads",
      "SEO & Performance",
      "Estratégia de Conteúdo",
      "Growth Hacking",
      "Análise de Métricas",
    ],
  },
  {
    icon: Eye,
    title: "Visão Computacional",
    description:
      "Soluções avançadas de visão computacional para automação, análise de imagens e reconhecimento de padrões com IA.",
    items: [
      "Reconhecimento de Objetos",
      "Análise de Imagens com IA",
      "Detecção em Tempo Real",
      "Automação Visual",
      "Modelos de Deep Learning",
    ],
  },
  {
    icon: Glasses,
    title: "Realidade Aumentada",
    description:
      "Experiências imersivas de realidade aumentada para varejo, treinamento, marketing e aplicações industriais.",
    items: [
      "AR para E-commerce",
      "Treinamentos Imersivos",
      "Campanhas de Marketing AR",
      "Visualização de Produtos 3D",
      "Aplicações Industriais",
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
            Da estratégia à execução — marketing, tecnologia e inovação em um único lugar.
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
