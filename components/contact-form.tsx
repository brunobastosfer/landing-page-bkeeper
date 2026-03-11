"use client"

import { useState } from "react"
import { Send, MessageCircle, Mail, CheckCircle2 } from "lucide-react"

const revenueOptions = [
  "Até R$ 10.000/mês",
  "R$ 10.000 – R$ 50.000/mês",
  "R$ 50.000 – R$ 150.000/mês",
  "R$ 150.000 – R$ 500.000/mês",
  "Acima de R$ 500.000/mês",
]

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  revenue: string
  message: string
}

export function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    revenue: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!form.revenue) {
      setError("Por favor, informe o faturamento anual.")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Erro ao enviar mensagem.")
      setSuccess(true)
      setForm({ name: "", email: "", phone: "", company: "", revenue: "", message: "" })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao enviar mensagem.")
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    "w-full bg-secondary border border-border text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all duration-200"

  return (
    <section id="contato" className="py-24 sm:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/4 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left info */}
          <div>
            <span className="inline-block text-gold text-xs font-bold tracking-widest uppercase mb-4">
              Entre em contato
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-foreground leading-tight text-balance mb-6">
              Pronto para{" "}
              <span className="gold-shimmer">decolar?</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 text-pretty">
              Preencha o formulário e nossa equipe entrará em contato em até 24 horas. Vamos entender seu negócio e apresentar a melhor estratégia para você.
            </p>

            <div className="space-y-5">
              <a
                href="https://wa.me/5517991215076"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:border-gold/40 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors shrink-0">
                  <MessageCircle size={22} className="text-[#25D366]" />
                </div>
                <div>
                  <p className="text-foreground font-bold text-sm">WhatsApp</p>
                  <p className="text-muted-foreground text-sm">+55 17 99121-5076</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <Mail size={22} className="text-gold" />
                </div>
                <div>
                  <p className="text-foreground font-bold text-sm">E-mail</p>
                  <p className="text-muted-foreground text-sm">bkeeperads.contato@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="bg-card border border-border rounded-3xl p-8 relative overflow-hidden">
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-[80px]" />

            {success ? (
              <div className="flex flex-col items-center text-center py-12 gap-4">
                <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-gold" />
                </div>
                <h3 className="text-foreground font-black text-xl">Mensagem enviada!</h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Obrigado pelo contato! Nossa equipe retornará em até 24 horas.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 text-gold text-sm font-bold hover:underline"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <h3 className="text-foreground font-black text-xl mb-6">Fale com nosso time</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-foreground text-xs font-bold mb-1.5 uppercase tracking-wide" htmlFor="name">
                      Nome *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Seu nome"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-foreground text-xs font-bold mb-1.5 uppercase tracking-wide" htmlFor="email">
                      E-mail *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="seu@email.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-foreground text-xs font-bold mb-1.5 uppercase tracking-wide" htmlFor="phone">
                      Telefone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(17) 99999-9999"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-foreground text-xs font-bold mb-1.5 uppercase tracking-wide" htmlFor="company">
                      Empresa
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Nome da empresa"
                      value={form.company}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-foreground text-xs font-bold mb-1.5 uppercase tracking-wide" htmlFor="revenue">
                    Faturamento Mensal *
                  </label>
                  <select
                    id="revenue"
                    name="revenue"
                    required
                    value={form.revenue}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>
                      Selecione o faturamento
                    </option>
                    {revenueOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-card">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-foreground text-xs font-bold mb-1.5 uppercase tracking-wide" htmlFor="message">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Conte sobre seu projeto ou desafio..."
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm font-medium">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gold text-primary-foreground py-3.5 rounded-xl font-bold text-base hover:bg-gold-muted transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed gold-glow"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
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
