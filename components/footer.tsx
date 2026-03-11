import { Logo } from "@/components/logo"
import { Instagram, Linkedin, Mail } from "lucide-react"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#1e1e1e] bg-[#080808] px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
          <div className="max-w-sm">
            <Logo size="sm" />
            <p className="mt-4 text-sm text-[#f5f0e8]/45 leading-relaxed">
              Marketing digital, tráfego pago e programação. Transformamos
              estratégia em resultado mensurável.
            </p>
          </div>

          <div className="flex flex-wrap gap-12">
            <div>
              <p className="text-xs font-bold text-[#E6BF46] uppercase tracking-widest mb-4">
                Serviços
              </p>
              <ul className="flex flex-col gap-2.5">
                {[
                  "Tráfego Pago",
                  "Desenvolvimento Web",
                  "Apps Mobile",
                  "Visão Computacional",
                  "Realidade Aumentada",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#servicos"
                      className="text-sm text-[#f5f0e8]/50 hover:text-[#E6BF46] transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold text-[#E6BF46] uppercase tracking-widest mb-4">
                Contato
              </p>
              <ul className="flex flex-col gap-2.5">
                <li className="text-sm text-[#f5f0e8]/50">+55 17 99121-5076</li>
                <li>
                  <a
                    href="mailto:bkeeperads.contato@gmail.com"
                    className="text-sm text-[#f5f0e8]/50 hover:text-[#E6BF46] transition-colors"
                  >
                    bkeeperads.contato@gmail.com
                  </a>
                </li>
              </ul>

              <div className="flex items-center gap-3 mt-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-lg border border-[#242424] flex items-center justify-center text-[#f5f0e8]/50 hover:text-[#E6BF46] hover:border-[#E6BF46]/40 transition-all"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-lg border border-[#242424] flex items-center justify-center text-[#f5f0e8]/50 hover:text-[#E6BF46] hover:border-[#E6BF46]/40 transition-all"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="mailto:bkeeperads.contato@gmail.com"
                  aria-label="Email"
                  className="w-9 h-9 rounded-lg border border-[#242424] flex items-center justify-center text-[#f5f0e8]/50 hover:text-[#E6BF46] hover:border-[#E6BF46]/40 transition-all"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1e1e1e] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#f5f0e8]/30">
            © 2019 Bkeeper ADS. Todos os direitos reservados.
          </p>
          <p className="text-xs text-[#f5f0e8]/30">
            Feito com tecnologia e estratégia.
          </p>
        </div>
      </div>
    </footer>
  )
}
