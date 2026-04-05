import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.eu',   // Zoho Europe — si ton compte est sur zoho.com, remplace par smtp.zoho.com
  port: 465,
  secure: true,            // true pour port 465 (SSL)
  auth: {
    user: process.env.ZOHO_EMAIL,     // contacte@neoflow-agency.cloud
    pass: process.env.ZOHO_PASSWORD,  // App Password (ou mot de passe Zoho si pas de 2FA)
  },
})

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  await transporter.sendMail({
    from: `NeoFlow BOS <${process.env.ZOHO_EMAIL}>`,
    to,
    subject,
    html,
  })
}
