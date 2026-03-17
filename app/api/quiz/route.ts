import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const OWNER_EMAIL = "atendimento@bkeeperads.com.br"

const QUESTION_LABELS: Record<number, string> = {
  1: "Como sua empresa gera clientes atualmente?",
  2: "Sua empresa já investe em anúncios pagos?",
  3: "Principal objetivo com marketing digital",
  4: "Maior desafio para crescer",
  5: "Ativos digitais que possui",
  6: "Soluções de interesse",
}

function buildQuizEmailHtml(
  companyName: string,
  answers: Record<number, string[]>
) {
  const rows = Object.entries(answers)
    .map(([qid, opts]) => {
      const label = QUESTION_LABELS[Number(qid)] ?? `Pergunta ${qid}`
      const value = opts.join(", ")
      return `
<tr>
<td style="padding:16px 0;border-bottom:1px solid #242424;color:#888;font-size:13px;width:200px;vertical-align:top">
${label}
</td>
<td style="padding:16px 0;border-bottom:1px solid #242424;color:#fff;font-weight:600;font-size:14px">
${value}
</td>
</tr>`
    })
    .join("")

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
Novo quiz respondido
</div>

<div style="font-size:13px;color:#8a8a8a">
Respostas enviadas pelo quiz do site
</div>

</td>
</tr>

<tr>
<td style="padding-bottom:24px">
<div style="background:#E6BF46/10;border:1px solid #E6BF46;border-radius:10px;padding:16px 20px;display:inline-block">
<div style="font-size:12px;color:#888;margin-bottom:4px;text-transform:uppercase;letter-spacing:1px">Empresa</div>
<div style="font-size:18px;font-weight:900;color:#E6BF46">${companyName}</div>
</div>
</td>
</tr>

<tr>
<td>

<table width="100%" style="border-collapse:collapse">
${rows}
</table>

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
    const { companyName, answers } = body as {
      companyName: string
      answers: Record<number, string[]>
    }

    if (!companyName?.trim()) {
      return NextResponse.json(
        { error: "Informe o nome da empresa." },
        { status: 400 }
      )
    }

    if (!answers || Object.keys(answers).length === 0) {
      return NextResponse.json(
        { error: "Respostas não encontradas." },
        { status: 400 }
      )
    }

    const result = await resend.emails.send({
      from: "Bkeeper ADS <contato@bkeeperads.com.br>",
      to: [OWNER_EMAIL],
      subject: `${companyName} - quiz`,
      html: buildQuizEmailHtml(companyName, answers),
      text: Object.entries(answers)
        .map(([qid, opts]) => `${QUESTION_LABELS[Number(qid)] ?? `Pergunta ${qid}`}: ${opts.join(", ")}`)
        .join("\n"),
    })

    if (result.error) {
      console.error("Erro ao enviar quiz:", result.error)
      throw new Error("Erro ao enviar quiz")
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Erro no quiz:", err)
    return NextResponse.json(
      { error: "Erro ao enviar respostas. Tente novamente." },
      { status: 500 }
    )
  }
}
