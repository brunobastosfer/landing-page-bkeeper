"use client"

import { useState } from "react"
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

type FormState = "idle" | "loading" | "success" | "error"

const revenueOptions = [
  "Menos de R$250.000 / ano",
  "R$250.000 – R$1.000.000 / ano",
  "R$1.000.000 – R$2.500.000 / ano",
  "R$2.500.000 – R$5.000.000 / ano",
  "Mais de R$5.000.000 / ano",
]

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState("loading")
    setErrorMsg("")

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      revenue: (form.elements.namedItem("revenue") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Erro ao enviar mensagem")
      setState("success")
      form.reset()
    } catch (err) {
      setState("error")
      setErrorMsg(err instanceof Error ? err.message : "Erro inesperado. Tente novamente.")
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2e2e2e] text-foreground text-sm placeholder-[#555] focus:outline-none focus:border-[#E6BF46] focus:ring-1 focus:ring-[#E6BF46]/30 transition-all"

  const labelClass = "block text-sm font-semibold text-[#f5f0e8]/80 mb-1.5"

  return (
    <section id="contato" className="py-28 px-6 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute left-0 bottom-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 0% 100%, rgba(230,191,70,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — info */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#E6BF46]/30 bg-[#E6BF46]/5 text-[#E6BF46] text-sm font-semibold mb-6">
              Entre em contato
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-balance leading-tight mb-6">
              Pronto para{" "}
              <span className="gold-shimmer">atrair mais clientes para sua empresa?</span>
            </h2>
            <p className="text-[#f5f0e8]/60 text-lg leading-relaxed mb-10">
              Preencha o formulário e um especialista da Bkeeper ADS entrará em
              contato para entender seus objetivos e apresentar a melhor solução.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E6BF46]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#E6BF46] font-bold text-sm">01</span>
                </div>
                <div>
                  <p className="font-bold text-foreground">Análise gratuita</p>
                  <p className="text-sm text-[#f5f0e8]/55">Entendemos seu negócio sem custo algum</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E6BF46]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#E6BF46] font-bold text-sm">02</span>
                </div>
                <div>
                  <p className="font-bold text-foreground">Estratégia personalizada</p>
                  <p className="text-sm text-[#f5f0e8]/55">Proposta feita especialmente para você</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E6BF46]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#E6BF46] font-bold text-sm">03</span>
                </div>
                <div>
                  <p className="font-bold text-foreground">Resultados mensuráveis</p>
                  <p className="text-sm text-[#f5f0e8]/55">Acompanhamento claro das métricas e evolução dos resultados com base em dados reais.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="rounded-2xl border border-[#242424] bg-[#111111] p-8">
            {state === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <CheckCircle size={56} className="text-[#E6BF46]" />
                <h3 className="text-xl font-bold text-foreground">Mensagem enviada!</h3>
                <p className="text-[#f5f0e8]/60 max-w-sm">
                  Obrigado pelo contato. Nossa equipe retornará em breve.
                </p>
                <button
                  onClick={() => setState("idle")}
                  className="mt-4 px-6 py-2.5 rounded-xl border border-[#E6BF46]/40 text-[#E6BF46] font-semibold text-sm hover:bg-[#E6BF46]/10 transition-colors"
                >
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Nome completo <span className="text-[#E6BF46]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="João Silva"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      E-mail <span className="text-[#E6BF46]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="joao@empresa.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Telefone / WhatsApp
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(17) 99999-9999"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="revenue" className={labelClass}>
                    Faturamento anual da empresa <span className="text-[#E6BF46]">*</span>
                  </label>
                  <select
                    id="revenue"
                    name="revenue"
                    required
                    defaultValue=""
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>
                      Selecione uma faixa
                    </option>
                    {revenueOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#1a1a1a]">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Mensagem <span className="text-[#E6BF46]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Conte-nos sobre seu projeto ou desafio atual..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {state === "error" && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#E6BF46] text-[#080808] font-bold text-base hover:bg-[#c9a83a] disabled:opacity-60 disabled:cursor-not-allowed transition-all gold-glow"
                >
                  {state === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Enviar mensagem
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
