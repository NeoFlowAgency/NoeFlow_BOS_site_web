import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { sendTelegramMessage } from '@/lib/telegram'
import { enterpriseConfirmationEmail } from '@/lib/emailTemplates'

export async function POST(req: NextRequest) {
  try {
    const { company, name, email, phone, stores, message } = await req.json()

    if (!company || !name || !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Telegram notification
    const text = `🏢 <b>Demande Enterprise</b>

<b>Société :</b> ${company}
<b>Contact :</b> ${name}
<b>Email :</b> ${email}
<b>Téléphone :</b> ${phone || '—'}
<b>Nb magasins :</b> ${stores || '—'}
<b>Message :</b>
${message || '—'}`

    await sendTelegramMessage(text)

    // Confirmation email to the prospect
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const resend = new Resend(resendKey)
      await resend.emails.send({
        from: 'NeoFlow BOS <noreply@neoflow-agency.cloud>',
        to: email,
        subject: `Votre demande Enterprise a bien été reçue — NeoFlow BOS`,
        html: enterpriseConfirmationEmail(name, company),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[enterprise route]', e)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
