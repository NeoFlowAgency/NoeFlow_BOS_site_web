import { NextRequest, NextResponse } from 'next/server'
import { sendTelegramMessage } from '@/lib/telegram'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const text = `📩 <b>Nouveau message de contact</b>

<b>Nom :</b> ${name}
<b>Email :</b> ${email}
<b>Sujet :</b> ${subject || '—'}
<b>Message :</b>
${message}`

    await sendTelegramMessage(text)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[contact route]', e)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
