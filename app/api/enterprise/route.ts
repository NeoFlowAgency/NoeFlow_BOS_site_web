import { NextRequest, NextResponse } from 'next/server'
import { sendTelegramMessage } from '@/lib/telegram'

export async function POST(req: NextRequest) {
  try {
    const { company, name, email, phone, stores, message } = await req.json()

    if (!company || !name || !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const text = `🏢 <b>Demande Enterprise</b>

<b>Société :</b> ${company}
<b>Contact :</b> ${name}
<b>Email :</b> ${email}
<b>Téléphone :</b> ${phone || '—'}
<b>Nb magasins :</b> ${stores || '—'}
<b>Message :</b>
${message || '—'}`

    await sendTelegramMessage(text)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[enterprise route]', e)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
