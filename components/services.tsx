"use client"

import { useState } from "react"
import {
  Code2,
  BarChart3,
  Users,
  TrendingUp,
  Eye,
  Layers,
  ChevronRight,
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
    icon: BarChart3,
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
      "Fornecemos profissionais qualificados para integrar sua equipe com expertise em diversas stacks e metodologias.",
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
      "Estratégias de marketing digital e tráfego pago para impulsionar a visibilidade e o crescimento da sua empresa.",
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
      "Soluções de IA com visão computacional para automatizar processos, detectar padrões e extrair inteligência das imagens.",
    items: [
      "Reconhecimento de Objetos",
      "Análise de Imagem & Vídeo",
      "Controle de Qualidade por IA",
      "Detecção de Anomalias",
      "Processamento em Tempo Real",
    ],
  },
  {
    icon: Layers,
    title: "Realidade Aumentada",
    description:
      "Experiências imersivas de AR para produtos, treinamentos e campanhas de marketing que encantam e engajam.",
    items: [
      "AR para E-commerce",
      "Treinamento Empresarial em AR",
      "Experiências Interativas",
      "Visualização 3D de Produtos",
      "Campanhas de Marketing em AR",
    ],
  },
]

export function Services() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="servicos" className="py-24 sm:py-32 relative">
      {/* Section background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-gold text-xs font-bold tracking-widest uppercase mb-3">
            O que fazemos
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground text-balance mb-4">
            Soluções completas para sua{" "}
            <span className="gold-shimmer">empresa crescer</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Do tráfego pago ao desenvolvimento de software avançado, temos o que
            você precisa para competir no mercado digital.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            const isHovered = hovered === i
            return (
              <div
                key={service.title}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative rounded-2xl border p-7 cursor-default transition-all duration-300 ${
                  isHovered
                    ? "border-gold/50 bg-card shadow-xl shadow-gold/10 -translate-y-1"
                    : "border-border bg-card hover:border-border"
                }`}
              >
                {/* Corner accent */}
                <div
                  className={`absolute top-0 right-0 w-20 h-20 rounded-bl-[100px] rounded-tr-2xl transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  } bg-gold/10`}
                />

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 transition-all duration-300 ${
                    isHovered ? "bg-gold text-primary-foreground scale-110" : "bg-secondary text-gold"
                  }`}
                >
                  <Icon size={22} />
                </div>

                <h3 className="text-foreground font-bold text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <ChevronRight
                        size={14}
                        className={`shrink-0 transition-colors ${
                          isHovered ? "text-gold" : "text-border"
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
