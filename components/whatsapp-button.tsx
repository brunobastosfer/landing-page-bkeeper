"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"

export function WhatsAppButton() {
  const [tooltip, setTooltip] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {tooltip && (
        <div className="bg-card border border-border rounded-2xl px-4 py-3 shadow-xl max-w-[220px] text-right">
          <p className="text-foreground font-bold text-sm">Fale conosco!</p>
          <p className="text-muted-foreground text-xs mt-0.5">Atendimento via WhatsApp</p>
        </div>
      )}
      <a
        href="https://wa.me/5517991215076"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
        aria-label="Entrar em contato pelo WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 hover:shadow-[#25D366]/40 hover:shadow-xl"
      >
        <MessageCircle size={26} className="text-white" />
      </a>
    </div>
  )
}
