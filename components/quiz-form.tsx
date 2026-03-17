"use client"

import { useState } from "react"
import { CheckCircle, ChevronRight, ChevronLeft, AlertCircle, Loader2 } from "lucide-react"

// ─── Questions ────────────────────────────────────────────────────────────────

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

// ─── Props ────────────────────────────────────────────────────────────────────

interface QuizFormProps {
  /** Nome da empresa já coletado pelo formulário de contato */
  companyName: string
  onComplete?: () => void
}

// ─── Component ────────────────────────────────────────────────────────────────

export function QuizForm({ companyName, onComplete }: QuizFormProps) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [done, setDone] = useState(false)
  const [sendState, setSendState] = useState<SendState>("idle")
  const [sendError, setSendError] = useState("")

  const question = questions[current]
  const selected = answers[question?.id] ?? []
  const progress = ((current + 1) / questions.length) * 100
  const isLast = current === questions.length - 1
  const canAdvance = selected.length > 0

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
        setDone(true)
        onComplete?.()
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
  }

  // ── Done state ────────────────────────────────────────────────────────────

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#E6BF46]/10 border border-[#E6BF46]/30 flex items-center justify-center">
          <CheckCircle size={32} className="text-[#E6BF46]" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Respostas enviadas!</h3>
        <p className="text-[#f5f0e8]/60 max-w-sm text-sm leading-relaxed">
          Recebemos tudo. Em breve um especialista da{" "}
          <strong className="text-foreground">Bkeeper ADS</strong> entrará em contato com uma solução personalizada para o seu negócio.
        </p>
      </div>
    )
  }

  // ── Quiz ──────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-5">
      {/* header: empresa + progresso */}
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 rounded-full border border-[#E6BF46]/30 bg-[#E6BF46]/5 text-[#E6BF46] text-xs font-semibold truncate max-w-[60%]">
          {companyName}
        </span>
        <span className="text-[#f5f0e8]/40 text-xs font-medium">
          {current + 1} / {questions.length}
        </span>
      </div>

      {/* progress bar */}
      <div className="h-1 rounded-full bg-[#2e2e2e] w-full overflow-hidden">
        <div
          className="h-1 rounded-full bg-[#E6BF46] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* question */}
      <div>
        <span className="inline-block px-3 py-1 rounded-full border border-[#E6BF46]/30 bg-[#E6BF46]/5 text-[#E6BF46] text-xs font-semibold mb-3">
          Pergunta {question.id} de {questions.length}
        </span>
        <h3 className="text-lg font-bold text-foreground leading-snug text-balance">
          {question.text}
        </h3>
        {question.multi && (
          <p className="text-[#f5f0e8]/40 text-xs mt-1">
            Pode selecionar mais de uma opção.
          </p>
        )}
      </div>

      {/* options */}
      <div className="flex flex-col gap-2.5">
        {question.options.map((option) => {
          const isSelected = selected.includes(option)
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border font-semibold text-sm transition-all duration-150 ${
                isSelected
                  ? "border-[#E6BF46] bg-[#E6BF46]/10 text-[#E6BF46]"
                  : "border-[#2e2e2e] bg-[#1a1a1a] text-[#f5f0e8]/70 hover:border-[#E6BF46]/40 hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`w-4 h-4 flex-shrink-0 flex items-center justify-center transition-colors border-2 ${
                    question.multi ? "rounded-md" : "rounded-full"
                  } ${isSelected ? "border-[#E6BF46] bg-[#E6BF46]" : "border-[#444]"}`}
                >
                  {isSelected && (
                    <svg width="8" height="6" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#080808" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
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
          <AlertCircle size={15} className="flex-shrink-0" />
          {sendError}
        </div>
      )}

      {/* navigation */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={goBack}
          disabled={current === 0 || sendState === "loading"}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#2e2e2e] text-[#f5f0e8]/50 text-sm font-semibold hover:border-[#E6BF46]/30 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={15} />
          Voltar
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={!canAdvance || sendState === "loading"}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#E6BF46] text-[#080808] text-sm font-bold hover:bg-[#c9a83a] disabled:opacity-40 disabled:cursor-not-allowed transition-all gold-glow"
        >
          {sendState === "loading" ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Enviando...
            </>
          ) : isLast ? (
            <>
              Enviar respostas
              <ChevronRight size={15} />
            </>
          ) : (
            <>
              Próxima
              <ChevronRight size={15} />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
