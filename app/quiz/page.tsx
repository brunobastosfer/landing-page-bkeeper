"use client"

import { useState, useEffect } from "react"
import { CheckCircle, ChevronRight, ChevronLeft, Clock, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/logo"

// ─── Questions from config.yaml ──────────────────────────────────────────────

type Question = {
  id: number
  text: string
  multi: boolean
  options: string[]
}

const questions: Question[] = [
  {
    id: 1,
    text: "Como sua empresa gera clientes atualmente?",
    multi: false,
    options: [
      "Indicação / boca a boca",
      "Redes sociais",
      "Google / SEO",
      "Anúncios pagos",
      "Não temos um processo definido",
    ],
  },
  {
    id: 2,
    text: "Sua empresa já investe em anúncios pagos?",
    multi: false,
    options: [
      "Sim, investimos atualmente",
      "Já investimos no passado",
      "Nunca investimos",
    ],
  },
  {
    id: 3,
    text: "Qual é o principal objetivo da sua empresa com marketing digital neste momento?",
    multi: false,
    options: [
      "Gerar mais leads",
      "Conseguir mais clientes",
      "Aumentar faturamento",
      "Expandir para novos mercados",
      "Melhorar presença online",
    ],
  },
  {
    id: 4,
    text: "Qual é o maior desafio da sua empresa hoje para crescer?",
    multi: false,
    options: [
      "Falta de clientes",
      "Leads com baixa qualidade",
      "Marketing que não gera resultado",
      "Falta de estratégia digital",
      "Baixa visibilidade online",
    ],
  },
  {
    id: 5,
    text: "Sua empresa possui algum desses ativos digitais?",
    multi: true,
    options: [
      "Site institucional",
      "Landing pages",
      "Google Meu Negócio otimizado",
      "CRM ou automação de marketing",
      "Nenhum desses",
    ],
  },
  {
    id: 6,
    text: "Sua empresa precisa ou tem interesse em alguma dessas soluções?",
    multi: true,
    options: [
      "Criação ou melhoria de site",
      "Landing pages para geração de leads",
      "Automação de marketing ou atendimento",
      "Integrações entre sistemas",
      "Desenvolvimento de software",
      "Não tenho certeza / preciso de orientação",
    ],
  },
]

// ─── Types ────────────────────────────────────────────────────────────────────

type Answers = Record<number, string[]>
type SendState = "idle" | "loading" | "error"

// ─── Main Component ───────────────────────────────────────────────────────────

export default function QuizPage() {
  const [step, setStep] = useState<"company" | "quiz" | "done">("company")
  const [companyName, setCompanyName] = useState("")
  const [companyError, setCompanyError] = useState("")
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [countdown, setCountdown] = useState(10)
  const [sendState, setSendState] = useState<SendState>("idle")
  const [sendError, setSendError] = useState("")

  const question = questions[current]
  const selected = answers[question?.id] ?? []
  const progress = step === "company" ? 0 : ((current + 1) / questions.length) * 100
  const isLast = current === questions.length - 1

  // countdown + redirect after done
  useEffect(() => {
    if (step !== "done") return
    if (countdown <= 0) {
      window.location.href = "/"
      return
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [step, countdown])

  function toggle(option: string) {
    const qid = question.id
    if (question.multi) {
      const prev = answers[qid] ?? []
      const isNone = option === "Nenhum desses"
      if (isNone) {
        setAnswers((a) => ({ ...a, [qid]: prev.includes(option) ? [] : [option] }))
      } else {
        const filtered = prev.filter((o) => o !== "Nenhum desses")
        const next = filtered.includes(option)
          ? filtered.filter((o) => o !== option)
          : [...filtered, option]
        setAnswers((a) => ({ ...a, [qid]: next }))
      }
    } else {
      setAnswers((a) => ({ ...a, [qid]: [option] }))
    }
  }

  function startQuiz() {
    if (!companyName.trim()) {
      setCompanyError("Informe o nome da sua empresa para continuar.")
      return
    }
    setCompanyError("")
    setStep("quiz")
  }

  async function goNext() {
    if (isLast) {
      setSendState("loading")
      setSendError("")
      try {
        const res = await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ companyName, answers }),
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || "Erro ao enviar respostas")
        setSendState("idle")
        setStep("done")
      } catch (err) {
        setSendState("error")
        setSendError(
          err instanceof Error ? err.message : "Erro inesperado. Tente novamente."
        )
      }
      return
    }
    setCurrent((c) => c + 1)
  }

  function goBack() {
    if (current > 0) setCurrent((c) => c - 1)
    else setStep("company")
  }

  const canAdvance = selected.length > 0

  // ── Done screen ──────────────────────────────────────────────────────────────
  if (step === "done") {
    return (
      <div className="min-h-screen bg-background honeycomb-bg flex flex-col items-center justify-center px-6">
        {/* subtle glow */}
        <div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(230,191,70,0.07) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 flex flex-col items-center text-center max-w-md gap-6">
          <div className="w-20 h-20 rounded-full bg-[#E6BF46]/10 border border-[#E6BF46]/30 flex items-center justify-center">
            <CheckCircle size={40} className="text-[#E6BF46]" />
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-balance leading-tight">
            Obrigado pelas{" "}
            <span className="gold-shimmer">suas respostas!</span>
          </h1>

          <p className="text-[#f5f0e8]/60 text-base leading-relaxed">
            Recebemos as informações sobre a sua empresa. Em breve um especialista da{" "}
            <strong className="text-foreground">Bkeeper ADS</strong> entrará em contato com uma solução personalizada para o seu negócio.
          </p>

          {/* countdown ring */}
          <div className="flex flex-col items-center gap-2 mt-2">
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" stroke="#242424" strokeWidth="4" fill="none" />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#E6BF46"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - countdown / 10)}`}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.9s linear" }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-black text-[#E6BF46]">
                {countdown}
              </span>
            </div>
            <p className="text-[#f5f0e8]/40 text-sm flex items-center gap-1.5">
              <Clock size={13} />
              Redirecionando para a página principal…
            </p>
          </div>

          <Link
            href="/"
            className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E6BF46] text-[#080808] font-bold text-sm hover:bg-[#c9a83a] transition-all gold-glow"
          >
            Ir agora
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    )
  }

  // ── Company name screen ────────────────────────────────────────────────────
  if (step === "company") {
    return (
      <div className="min-h-screen bg-background honeycomb-bg flex flex-col">
        <header className="flex items-center justify-between px-6 py-5 border-b border-[#1a1a1a]">
          <Link href="/" aria-label="Voltar para o início">
            <Logo />
          </Link>
        </header>

        <div className="h-1 bg-[#1a1a1a] w-full">
          <div className="h-1 bg-[#E6BF46] transition-all duration-500" style={{ width: "0%" }} />
        </div>

        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div
            className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(230,191,70,0.06) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 w-full max-w-2xl flex flex-col gap-8">
            <div className="text-center mb-2">
              <h1 className="text-2xl md:text-3xl font-black text-balance leading-tight mb-2">
                Responda rapidamente algumas perguntas para nos ajudar a entender melhor sua empresa e{" "}
                <span className="gold-shimmer">preparar uma solução personalizada</span> para o seu negócio.
              </h1>
              <p className="text-[#f5f0e8]/50 text-sm mt-3 flex items-center justify-center gap-1.5">
                <Clock size={14} />
                Leva menos de 1 minuto.
              </p>
            </div>

            <div className="rounded-2xl border border-[#242424] bg-[#111111] p-8 flex flex-col gap-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full border border-[#E6BF46]/30 bg-[#E6BF46]/5 text-[#E6BF46] text-xs font-semibold mb-4">
                  Antes de começar
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground leading-snug text-balance">
                  Qual é o nome da sua empresa?
                </h2>
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value)
                    if (companyError) setCompanyError("")
                  }}
                  onKeyDown={(e) => e.key === "Enter" && startQuiz()}
                  placeholder="Ex: Minha Empresa Ltda"
                  className={`w-full px-5 py-4 rounded-xl bg-[#1a1a1a] border text-foreground text-sm placeholder-[#555] focus:outline-none focus:ring-1 focus:ring-[#E6BF46]/30 transition-all ${
                    companyError
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-[#2e2e2e] focus:border-[#E6BF46]"
                  }`}
                />
                {companyError && (
                  <p className="flex items-center gap-1.5 text-red-400 text-xs">
                    <AlertCircle size={13} />
                    {companyError}
                  </p>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={startQuiz}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#E6BF46] text-[#080808] text-sm font-bold hover:bg-[#c9a83a] transition-all gold-glow"
                >
                  Começar
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // ── Quiz screen ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background honeycomb-bg flex flex-col">
      {/* header */}
      <header className="flex items-center justify-between px-6 py-5 border-b border-[#1a1a1a]">
        <Link href="/" aria-label="Voltar para o início">
          <Logo />
        </Link>
        <span className="text-[#f5f0e8]/40 text-sm font-medium">
          {current + 1} / {questions.length}
        </span>
      </header>

      {/* progress bar */}
      <div className="h-1 bg-[#1a1a1a] w-full">
        <div
          className="h-1 bg-[#E6BF46] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* subtle glow */}
        <div
          className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(230,191,70,0.06) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 w-full max-w-2xl flex flex-col gap-8">
          {/* company name badge */}
          {companyName && (
            <div className="flex items-center justify-center gap-2">
              <span className="px-4 py-1.5 rounded-full border border-[#E6BF46]/30 bg-[#E6BF46]/5 text-[#E6BF46] text-sm font-semibold">
                {companyName}
              </span>
            </div>
          )}

          {/* question card */}
          <div className="rounded-2xl border border-[#242424] bg-[#111111] p-8 flex flex-col gap-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full border border-[#E6BF46]/30 bg-[#E6BF46]/5 text-[#E6BF46] text-xs font-semibold mb-4">
                Pergunta {question.id} de {questions.length}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-foreground leading-snug text-balance">
                {question.text}
              </h2>
              {question.multi && (
                <p className="text-[#f5f0e8]/40 text-xs mt-1">
                  Pode selecionar mais de uma opção.
                </p>
              )}
            </div>

            {/* options */}
            <div className="flex flex-col gap-3">
              {question.options.map((option) => {
                const isSelected = selected.includes(option)
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggle(option)}
                    className={`w-full text-left px-5 py-4 rounded-xl border font-semibold text-sm transition-all duration-150 ${
                      isSelected
                        ? "border-[#E6BF46] bg-[#E6BF46]/10 text-[#E6BF46]"
                        : "border-[#2e2e2e] bg-[#1a1a1a] text-[#f5f0e8]/70 hover:border-[#E6BF46]/40 hover:text-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`w-5 h-5 rounded-${question.multi ? "md" : "full"} border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                          isSelected ? "border-[#E6BF46] bg-[#E6BF46]" : "border-[#444]"
                        }`}
                      >
                        {isSelected && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="#080808" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      {option}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* send error */}
            {sendState === "error" && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                <AlertCircle size={16} className="flex-shrink-0" />
                {sendError}
              </div>
            )}

            {/* navigation */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={goBack}
                disabled={sendState === "loading"}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-[#2e2e2e] text-[#f5f0e8]/50 text-sm font-semibold hover:border-[#E6BF46]/30 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={16} />
                Voltar
              </button>

              <button
                type="button"
                onClick={goNext}
                disabled={!canAdvance || sendState === "loading"}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#E6BF46] text-[#080808] text-sm font-bold hover:bg-[#c9a83a] disabled:opacity-40 disabled:cursor-not-allowed transition-all gold-glow"
              >
                {sendState === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Enviando...
                  </>
                ) : isLast ? (
                  <>
                    Enviar respostas
                    <ChevronRight size={16} />
                  </>
                ) : (
                  <>
                    Próxima
                    <ChevronRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
