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
                  "Google Meu Negócio & SEO Local",
                  "Desenvolvimento de Softwares (Web & Mobile)",
                  "Automações & Integrações",
                  "Estrutura de Conversões",
                  "Tráfego Pago (Google & Meta Ads)"
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
                    href="mailto:atendimento@bkeeperads.com.br"
                    className="text-sm text-[#f5f0e8]/50 hover:text-[#E6BF46] transition-colors"
                  >
                    atendimento@bkeeperads.com.br
                  </a>
                </li>
              </ul>

            </div>
          </div>
        </div>

        <div className="border-t border-[#1e1e1e] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#f5f0e8]/30">
            © 2022 Bkeeper ADS. Todos os direitos reservados.
          </p>
          <p className="text-xs text-[#f5f0e8]/30">
            Feito com tecnologia e estratégia.
          </p>
        </div>
      </div>
    </footer>
  )
}
