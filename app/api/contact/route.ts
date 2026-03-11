import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// Domínio bkeeperads.com.br verificado no Resend.
// "from": noreply@bkeeperads.com.br
// "to": bkeeperads.contato@gmail.com
// "replyTo": e-mail de quem preencheu o formulário — ao clicar em "Responder", a resposta vai direto para o cliente.

function buildEmailHtml(name: string, email: string, phone: string | undefined, revenue: string, message: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #080808; color: #f5f0e8; padding: 32px; border-radius: 12px;">
      <div style="text-align:center; margin-bottom: 28px;">
        <h1 style="color: #E6BF46; font-size: 24px; margin: 0;">Bkeeper ADS</h1>
        <p style="color: #888; font-size: 13px; margin-top: 4px;">Nova mensagem recebida pelo site</p>
      </div>

      <table style="width:100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #242424; color: #888; font-size: 13px; width: 140px;">Nome</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #242424; color: #f5f0e8; font-size: 14px; font-weight: 600;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #242424; color: #888; font-size: 13px;">E-mail</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #242424; font-size: 14px;"><a href="mailto:${email}" style="color:#E6BF46; text-decoration:none;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #242424; color: #888; font-size: 13px;">Telefone</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #242424; color: #f5f0e8; font-size: 14px;">${phone || "Não informado"}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #242424; color: #888; font-size: 13px;">Faturamento Anual</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #242424; color: #f5f0e8; font-size: 14px; font-weight: 600;">${revenue}</td>
        </tr>
      </table>

      <div style="margin-top: 24px;">
        <p style="color: #888; font-size: 13px; margin-bottom: 8px;">Mensagem:</p>
        <div style="background: #111; border: 1px solid #242424; border-radius: 8px; padding: 16px; color: #f5f0e8; font-size: 14px; line-height: 1.6;">${message.replace(/\n/g, "<br/>")}</div>
      </div>

      <div style="margin-top: 32px; text-align: center;">
        <a href="https://wa.me/5517991215076" style="display: inline-block; padding: 12px 28px; background: #E6BF46; color: #080808; font-weight: 700; border-radius: 8px; text-decoration: none; font-size: 14px;">
          Responder via WhatsApp
        </a>
      </div>

      <p style="margin-top: 24px; text-align: center; font-size: 11px; color: #444;">
        © ${new Date().getFullYear()} Bkeeper ADS — bkeeperads.contato@gmail.com
      </p>
    </div>
  `
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("[Resend] RESEND_API_KEY não definida.")
      return NextResponse.json(
        { error: "Configuração de e-mail ausente. Entre em contato pelo WhatsApp." },
        { status: 500 }
      )
    }

    const body = await req.json()
    const { name, email, phone, revenue, message } = body

    if (!name?.trim() || !email?.trim() || !revenue?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Preencha todos os campos obrigatórios." },
        { status: 400 }
      )
    }

    // Valida formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Informe um e-mail válido." },
        { status: 400 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: "Bkeeper ADS <noreply@bkeeperads.com.br>",
      to: ["atendimento@bkeeperads.com.br"],
      cc: ["bkeeperads.contato@gmail.com"],
      replyTo: [`${name} <${email}>`],
      subject: `[Bkeeper ADS] Nova mensagem de ${name}`,
      html: buildEmailHtml(name, email, phone, revenue, message),
    })

    if (error) {
      console.error("[Resend error]", JSON.stringify(error))
      return NextResponse.json(
        { error: "Falha ao enviar o e-mail. Tente novamente ou fale pelo WhatsApp." },
        { status: 500 }
      )
    }

    console.log("[Resend] E-mail enviado com sucesso. ID:", data?.id)
    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error("[Contact API error]", message)
    return NextResponse.json(
      { error: "Erro interno ao enviar. Tente novamente ou fale pelo WhatsApp." },
      { status: 500 }
    )
  }
}
