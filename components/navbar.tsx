"use client"

import { useState, useEffect } from "react"
import { Logo } from "@/components/logo"
import { Menu, X } from "lucide-react"

const links = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080808]/95 backdrop-blur-md border-b border-[#242424]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Logo size="sm" />

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-semibold text-[#f5f0e8]/70 hover:text-[#E6BF46] transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contato"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#E6BF46] text-[#080808] text-sm font-bold hover:bg-[#c9a83a] transition-colors duration-200"
        >
          Falar com especialista
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0e0e0e] border-t border-[#242424] px-6 py-6 flex flex-col gap-5">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base font-semibold text-[#f5f0e8]/80 hover:text-[#E6BF46] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="inline-flex justify-center px-5 py-3 rounded-lg bg-[#E6BF46] text-[#080808] font-bold text-sm mt-2"
          >
            Falar com especialista
          </a>
        </div>
      )}
    </header>
  )
}
