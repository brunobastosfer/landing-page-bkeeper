import { Logo } from "./logo"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo />
          <p className="text-muted-foreground text-sm text-center">
            © {year} Bkeeper Ads. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://wa.me/5517991215076"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-gold text-sm font-semibold transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="#servicos"
              className="text-muted-foreground hover:text-gold text-sm font-semibold transition-colors"
            >
              Serviços
            </a>
            <a
              href="#contato"
              className="text-muted-foreground hover:text-gold text-sm font-semibold transition-colors"
            >
              Contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
