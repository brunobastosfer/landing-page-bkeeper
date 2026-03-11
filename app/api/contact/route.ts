import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const OWNER_EMAIL = "atendimento@bkeeperads.com.br"

// Email recebido por você
function buildLeadEmailHtml(
  name: string,
  email: string,
  phone: string | undefined,
  revenue: string,
  message: string
) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #080808; color: #f5f0e8; padding: 32px; border-radius: 12px;">
      <div style="text-align:center; margin-bottom: 28px;">
        <h1 style="color: #E6BF46; font-size: 24px; margin: 0;">Bkeeper ADS</h1>
        <p style="color: #888; font-size: 13px; margin-top: 4px;">Novo lead recebido pelo site</p>
      </div>

      <table style="width:100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #242424; color: #888; font-size: 13px; width: 140px;">Nome</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #242424; color: #f5f0e8; font-size: 14px; font-weight: 600;">${name}</td>
        </tr>

        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #242424; color: #888; font-size: 13px;">E-mail</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #242424; font-size: 14px;">
            <a href="mailto:${email}" style="color:#E6BF46; text-decoration:none;">${email}</a>
          </td>
        </tr>

        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #242424; color: #888; font-size: 13px;">Telefone</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #242424; color: #f5f0e8; font-size: 14px;">
            ${phone || "Não informado"}
          </td>
        </tr>

        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #242424; color: #888; font-size: 13px;">Faturamento</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #242424; color: #f5f0e8; font-size: 14px; font-weight: 600;">
            ${revenue}
          </td>
        </tr>
      </table>

      <div style="margin-top: 24px;">
        <p style="color: #888; font-size: 13px; margin-bottom: 8px;">Mensagem:</p>
        <div style="background: #111; border: 1px solid #242424; border-radius: 8px; padding: 16px; color: #f5f0e8; font-size: 14px; line-height: 1.6;">
          ${message.replace(/\n/g, "<br/>")}
        </div>
      </div>

      <div style="margin-top: 32px; text-align: center;">
        <a href="https://wa.me/5517991215076?text=Olá%20${encodeURIComponent(
    name
  )}" 
        target="_blank"
        style="display: inline-block; padding: 12px 28px; background: #E6BF46; color: #080808; font-weight: 700; border-radius: 8px; text-decoration: none; font-size: 14px;">
          Responder via WhatsApp
        </a>
      </div>
    </div>
  `
}

// Email confirmação cliente
function buildClientEmailHtml(name: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #080808; color: #f5f0e8; padding: 32px; border-radius: 12px;">
      
      <div style="text-align:center; margin-bottom: 28px;">
        <h1 style="color:#E6BF46;">Bkeeper ADS</h1>
      </div>

      <h2 style="font-size:20px; margin-bottom:12px;">
        Olá ${name}, recebemos sua mensagem!
      </h2>

      <p style="color:#ccc; line-height:1.6;">
        Obrigado por entrar em contato com a <strong>Bkeeper ADS</strong>.
        Nossa equipe analisará sua mensagem e retornará em breve.
      </p>

      <div style="margin-top:28px; text-align:center;">
        <a href="https://wa.me/5517991215076"
        target="_blank"
        style="display:inline-block; padding:12px 28px; background:#E6BF46; color:#080808; font-weight:700; border-radius:8px; text-decoration:none;">
          Falar no WhatsApp
        </a>
      </div>

      <p style="margin-top:28px; font-size:12px; color:#555; text-align:center;">
        © ${new Date().getFullYear()} Bkeeper ADS
      </p>
    </div>
  `
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Configuração de e-mail ausente." },
        { status: 500 }
      )
    }

    const body = await req.json()

    const {
      name,
      email,
      phone,
      revenue,
      message,
      company,   // honeypot
      formTime   // tempo do formulário
    } = body

    // Honeypot anti bot
    if (company) {
      return NextResponse.json({ success: true })
    }

    // Delay anti bot (menos de 3s)
    if (formTime && formTime < 3000) {
      return NextResponse.json({ success: true })
    }

    if (!name?.trim() || !email?.trim() || !revenue?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Preencha todos os campos obrigatórios." },
        { status: 400 }
      )
    }

    if (message.length < 10 || name.length < 3) {
      return NextResponse.json({ success: true })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Informe um e-mail válido." },
        { status: 400 }
      )
    }

    // EMAIL PARA VOCÊ
    const leadEmail = await resend.emails.send({
      from: "Bkeeper ADS <contato@bkeeperads.com.br>",
      to: [OWNER_EMAIL],
      replyTo: [email],
      subject: `Novo lead do site - ${name}`,
      html: buildLeadEmailHtml(name, email, phone, revenue, message),
      text: `
Novo lead recebido

Nome: ${name}
Email: ${email}
Telefone: ${phone || "Não informado"}
Faturamento: ${revenue}

Mensagem:
${message}
      `
    })

    if (leadEmail.error) {
      console.error("Erro ao enviar lead:", leadEmail.error)
      throw new Error("Erro ao enviar lead")
    }

    // EMAIL PARA CLIENTE
    await resend.emails.send({
      from: "Bkeeper ADS <contato@bkeeperads.com.br>",
      to: [email],
      subject: "Recebemos sua mensagem - Bkeeper ADS",
      html: buildClientEmailHtml(name),
      text: `
Olá ${name},

Recebemos sua mensagem e em breve nossa equipe irá responder.

Bkeeper ADS
      `
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Erro no formulário:", err)

    return NextResponse.json(
      { error: "Erro ao enviar mensagem. Tente novamente." },
      { status: 500 }
    )
  }
}