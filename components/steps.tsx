import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Imersão no Negócio",
    description:
      "Entendemos profundamente seus desafios, objetivos e visão. Mergulhamos na cultura da sua empresa para garantir que a solução seja perfeita para você.",
  },
  {
    number: "02",
    title: "Diagnóstico e Estratégia",
    description:
      "Realizamos análise técnica e estratégica completa, definindo a melhor arquitetura e tecnologias para gerar máximo retorno no seu investimento.",
  },
  {
    number: "03",
    title: "Planejamento Detalhado",
    description:
      "Estruturamos escopo, cronograma e estimativas claras. Você sabe exatamente o que esperar, quando esperar e qual será o investimento.",
  },
  {
    number: "04",
    title: "Desenvolvimento Ágil",
    description:
      "Construímos com metodologias ágeis, entregando funcionalidades iterativamente. Você valida continuamente e pode ajustar conforme necessário.",
  },
  {
    number: "05",
    title: "Testes e Qualidade",
    description:
      "Garantimos estabilidade, segurança e performance através de testes rigorosos. Sua solução chegará ao mercado confiável e otimizada.",
  },
  {
    number: "06",
    title: "Implantação Segura",
    description:
      "Realizamos lançamento em produção com estratégia zero-downtime. O sistema está pronto para operação desde o primeiro dia.",
  },
  {
    number: "07",
    title: "Crescimento Acelerado",
    description:
      "Impulsionamos seus resultados com marketing digital e tráfego pago. Transformamos visitas em leads, leads em clientes e clientes em receita.",
  },
  {
    number: "08",
    title: "Evolução Contínua",
    description:
      "Monitoramos performance em tempo real e evoluímos constantemente. Seu sistema cresce junto com o seu negócio, sempre otimizado.",
  },
]

export function Steps() {
  return (
    <section id="passos" className="py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#E6BF46]/30 bg-[#E6BF46]/5 text-[#E6BF46] text-sm font-semibold mb-4">
            Nossa metodologia
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-balance">
            8 passos para o{" "}
            <span className="gold-shimmer">sucesso do seu projeto</span>
          </h2>
          <p className="mt-4 text-[#f5f0e8]/55 text-lg max-w-2xl mx-auto text-pretty">
            Processo estruturado e comprovado que transforma sua visão em realidade.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Card */}
              <div className="flex flex-col h-full p-6 rounded-xl border border-[#242424] bg-[#111111] hover:border-[#E6BF46]/40 hover:bg-[#141414] transition-all duration-300 group">
                {/* Número grande */}
                <div className="text-6xl font-black mb-4" style={{ color: "#E6BF46" }}>
                  {step.number}
                </div>

                {/* Título */}
                <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>

                {/* Descrição */}
                <p className="text-[#f5f0e8]/55 text-sm leading-relaxed flex-grow">
                  {step.description}
                </p>

                {/* Connector arrow */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block">
                    <ArrowRight size={20} className="text-[#E6BF46]/30" />
                  </div>
                )}
              </div>

              {/* Mobile connector */}
              {index < steps.length - 1 && (
                <div className="h-6 lg:hidden flex items-center justify-center mt-4">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-[#E6BF46] to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="#contato"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#E6BF46] text-[#080808] font-bold text-base hover:bg-[#c9a83a] transition-all duration-200 gold-glow group"
          >
            Começar meu projeto agora
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
