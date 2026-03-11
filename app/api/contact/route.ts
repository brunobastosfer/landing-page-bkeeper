import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, revenue, message } = body

    if (!name || !email || !revenue) {
      return NextResponse.json(
        { error: "Nome, e-mail e faturamento são obrigatórios." },
        { status: 400 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: "Bkeeper Ads <onboarding@resend.dev>",
      to: ["bkeeperads.contato@gmail.com"],
      replyTo: email,
      subject: `Novo contato de ${name} — Bkeeper Ads`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #080808; color: #f5f0e8; padding: 32px; border-radius: 16px;">
          <div style="border-bottom: 2px solid #E6BF46; padding-bottom: 20px; margin-bottom: 24px;">
            <h1 style="color: #E6BF46; margin: 0; font-size: 24px;">Bkeeper <span style="font-size: 14px; letter-spacing: 4px;">ADS</span></h1>
            <p style="color: #888; margin: 4px 0 0;">Novo contato via formulário do site</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #242424; color: #888; font-size: 13px; width: 160px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Nome</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #242424; color: #f5f0e8; font-size: 15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #242424; color: #888; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">E-mail</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #242424; color: #f5f0e8; font-size: 15px;"><a href="mailto:${email}" style="color: #E6BF46;">${email}</a></td>
            </tr>
            ${phone ? `<tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #242424; color: #888; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Telefone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #242424; color: #f5f0e8; font-size: 15px;">${phone}</td>
            </tr>` : ""}
            ${company ? `<tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #242424; color: #888; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Empresa</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #242424; color: #f5f0e8; font-size: 15px;">${company}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #242424; color: #888; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Faturamento</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #242424;">
                <span style="background: #E6BF46; color: #080808; font-size: 13px; font-weight: bold; padding: 3px 10px; border-radius: 20px;">${revenue}</span>
              </td>
            </tr>
            ${message ? `<tr>
              <td colspan="2" style="padding-top: 16px;">
                <p style="color: #888; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Mensagem</p>
                <p style="color: #f5f0e8; font-size: 15px; line-height: 1.6; margin: 0; background: #111; border: 1px solid #242424; border-radius: 8px; padding: 16px;">${message}</p>
              </td>
            </tr>` : ""}
          </table>

          <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #242424; text-align: center; color: #555; font-size: 12px;">
            Bkeeper Ads &mdash; bkeeperads.contato@gmail.com
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("[Resend error]", error)
      return NextResponse.json({ error: "Erro ao enviar e-mail." }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error("[Contact API error]", err)
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 })
  }
}
