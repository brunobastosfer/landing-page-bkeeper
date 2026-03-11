import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const OWNER_EMAIL = "atendimento@bkeeperads.com.br"

// EMAIL QUE VOCÊ RECEBE (LEAD)
function buildLeadEmailHtml(
  name: string,
  email: string,
  phone: string | undefined,
  revenue: string,
  message: string
) {
  const cleanPhone = phone ? phone.replace(/\D/g, "") : ""

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;900&display=swap" rel="stylesheet">
</head>

<body style="margin:0;background:#0b0b0b;font-family:'Nunito',Arial,sans-serif;padding:40px 0">

<table width="100%">
<tr>
<td align="center">

<table width="620" style="background:#111;border-radius:14px;padding:40px">

<tr>
<td align="center" style="padding-bottom:30px">

<img src="https://bkeeperads.com.br/bee-icon.png" width="48" style="display:block;margin-bottom:10px"/>

<div style="font-size:22px;font-weight:900;color:#ffffff;letter-spacing:-0.5px">
Bkeeper
</div>

<div style="font-size:11px;font-weight:800;color:#E6BF46;letter-spacing:4px;text-transform:uppercase">
Ads
</div>

</td>
</tr>

<tr>
<td style="padding-bottom:30px">

<div style="font-size:20px;font-weight:700;color:#ffffff;margin-bottom:6px">
Novo lead recebido
</div>

<div style="font-size:13px;color:#8a8a8a">
Lead enviado pelo formulário do site
</div>

</td>
</tr>

<tr>
<td>

<table width="100%" style="border-collapse:collapse">

<tr>
<td style="padding:16px 0;border-bottom:1px solid #242424;color:#888;font-size:13px;width:140px">
Nome
</td>

<td style="padding:16px 0;border-bottom:1px solid #242424;color:#fff;font-weight:600">
${name}
</td>
</tr>

<tr>
<td style="padding:16px 0;border-bottom:1px solid #242424;color:#888;font-size:13px">
E-mail
</td>

<td style="padding:16px 0;border-bottom:1px solid #242424">
<a href="mailto:${email}" style="color:#E6BF46;text-decoration:none">
${email}
</a>
</td>
</tr>

<tr>
<td style="padding:16px 0;border-bottom:1px solid #242424;color:#888;font-size:13px">
Telefone
</td>

<td style="padding:16px 0;border-bottom:1px solid #242424;color:#fff">
${phone || "Não informado"}
</td>
</tr>

<tr>
<td style="padding:16px 0;border-bottom:1px solid #242424;color:#888;font-size:13px">
Faturamento
</td>

<td style="padding:16px 0;border-bottom:1px solid #242424;color:#fff;font-weight:600">
${revenue}
</td>
</tr>

</table>

</td>
</tr>

<tr>
<td style="padding-top:28px">

<div style="font-size:13px;color:#888;margin-bottom:10px">
Mensagem
</div>

<div style="background:#0b0b0b;border:1px solid #242424;border-radius:8px;padding:18px;color:#fff;font-size:14px;line-height:1.7">
${message.replace(/\n/g, "<br/>")}
</div>

</td>
</tr>

${cleanPhone
      ? `
<tr>
<td align="center" style="padding-top:35px">

<a href="https://wa.me/${cleanPhone}?text=Olá%20${encodeURIComponent(name)}"
style="
display:inline-block;
background:#E6BF46;
color:#000;
padding:14px 28px;
border-radius:8px;
font-weight:700;
text-decoration:none;
font-size:14px;
">
Conversar com cliente no WhatsApp
</a>

</td>
</tr>
`
      : ""
    }

</table>

</td>
</tr>
</table>

</body>
</html>
`
}

// EMAIL DE CONFIRMAÇÃO PARA CLIENTE
function buildClientEmailHtml(name: string) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;900&display=swap" rel="stylesheet">
</head>

<body style="margin:0;background:#0b0b0b;font-family:'Nunito',Arial,sans-serif;padding:40px 0">

<table width="100%">
<tr>
<td align="center">

<table width="600" style="background:#111;border-radius:14px;padding:40px">

<tr>
<td align="center" style="padding-bottom:30px">

<img src="https://bkeeperads.com.br/bee-icon.png" width="48" style="display:block;margin-bottom:10px"/>

<div style="font-size:22px;font-weight:900;color:#fff">
Bkeeper
</div>

<div style="font-size:11px;font-weight:800;color:#E6BF46;letter-spacing:4px;text-transform:uppercase">
Ads
</div>

</td>
</tr>

<tr>
<td>

<div style="font-size:20px;font-weight:700;color:#fff;margin-bottom:14px">
Olá ${name} 👋
</div>

<div style="color:#b8b8b8;line-height:1.7;font-size:15px">
Recebemos sua mensagem e nossa equipe irá analisar seu pedido.
</div>

<div style="color:#b8b8b8;line-height:1.7;font-size:15px;margin-top:10px">
Em breve entraremos em contato com você.
</div>

</td>
</tr>

<tr>
<td style="padding-top:32px">

<div style="font-size:12px;color:#6a6a6a;text-align:center">
© ${new Date().getFullYear()} Bkeeper ADS
</div>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
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
      company,
      formTime
    } = body

    // Honeypot
    if (company) {
      return NextResponse.json({ success: true })
    }

    // Delay anti-bot
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
      replyTo: email,
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