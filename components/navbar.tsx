"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Logo } from "./logo"

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#inicio" aria-label="Ir para o início">
            <Logo />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm font-semibold tracking-wide transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            ))}
            <a
              href="https://wa.me/5517991215076"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 inline-flex items-center gap-2 bg-gold text-primary-foreground px-5 py-2 rounded-full text-sm font-bold hover:bg-gold-muted transition-all duration-200 shadow-md hover:shadow-gold/30 hover:shadow-lg"
            >
              Fale Conosco
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-card border-b border-border`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4" aria-label="Navegação mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-gold font-semibold text-base py-1 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/5517991215076"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center bg-gold text-primary-foreground px-5 py-2.5 rounded-full font-bold hover:bg-gold-muted transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Fale Conosco
          </a>
        </nav>
      </div>
    </header>
  )
}
