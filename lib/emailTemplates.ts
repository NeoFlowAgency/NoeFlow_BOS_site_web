export function enterpriseConfirmationEmail(name: string, company: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Demande reçue — NeoFlow BOS</title>
</head>
<body style="margin:0;padding:0;background:#F8F9FF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F9FF;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#040741 0%,#313ADF 100%);border-radius:16px 16px 0 0;padding:36px 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background:rgba(255,255,255,0.12);border-radius:10px;width:36px;height:36px;text-align:center;vertical-align:middle;">
                          <span style="color:white;font-size:18px;font-weight:900;line-height:36px;">N</span>
                        </td>
                        <td style="padding-left:10px;">
                          <span style="color:white;font-size:15px;font-weight:700;letter-spacing:-0.3px;">NeoFlow <span style="color:#B4B8F8;">BOS</span></span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:24px;">
                    <div style="display:inline-block;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:50px;padding:6px 14px;font-size:11px;color:rgba(255,255,255,0.75);font-weight:600;text-transform:uppercase;letter-spacing:0.8px;">
                      Demande Enterprise
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:16px;">
                    <h1 style="margin:0;color:white;font-size:26px;font-weight:800;line-height:1.2;letter-spacing:-0.5px;">
                      Votre demande a bien<br/>été reçue.
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:white;padding:36px 40px;">

              <p style="margin:0 0 8px;color:#6B7280;font-size:14px;line-height:1.6;">
                Bonjour <strong style="color:#040741;">${name}</strong>,
              </p>
              <p style="margin:0 0 28px;color:#6B7280;font-size:14px;line-height:1.7;">
                Nous avons bien reçu votre demande Enterprise pour <strong style="color:#040741;">${company}</strong>.
                Notre équipe va l'examiner et vous recontactera dans les <strong style="color:#313ADF;">24 à 48 heures</strong>.
              </p>

              <!-- Divider -->
              <div style="height:1px;background:linear-gradient(90deg,transparent,#E8EAFF,transparent);margin-bottom:28px;"></div>

              <!-- What happens next -->
              <p style="margin:0 0 16px;color:#040741;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;">La suite</p>

              <table width="100%" cellpadding="0" cellspacing="0">
                ${[
                  ['01', 'Analyse de votre dossier', 'Notre équipe étudie vos besoins et prépare une réponse adaptée à votre structure.'],
                  ['02', 'Prise de contact', 'Un membre de l\'équipe NeoFlow vous contacte par email ou téléphone pour un échange.'],
                  ['03', 'Démonstration personnalisée', 'On vous montre NeoFlow BOS configuré pour votre activité, sans engagement.'],
                ].map(([num, title, desc]) => `
                <tr>
                  <td style="padding-bottom:18px;vertical-align:top;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="vertical-align:top;padding-right:14px;padding-top:2px;">
                          <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#313ADF,#6B77E8);text-align:center;line-height:28px;font-size:10px;font-weight:800;color:white;font-family:monospace;">${num}</div>
                        </td>
                        <td>
                          <p style="margin:0 0 3px;font-size:13px;font-weight:700;color:#040741;">${title}</p>
                          <p style="margin:0;font-size:12px;color:#9CA3AF;line-height:1.6;">${desc}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                `).join('')}
              </table>

              <!-- Divider -->
              <div style="height:1px;background:linear-gradient(90deg,transparent,#E8EAFF,transparent);margin:8px 0 28px;"></div>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://bos.neoflow-agency.cloud/signup" style="display:inline-block;background:linear-gradient(135deg,#313ADF,#040741);color:white;text-decoration:none;font-size:13px;font-weight:700;padding:13px 28px;border-radius:12px;letter-spacing:0.2px;">
                      Explorer NeoFlow BOS →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F8F9FF;border-radius:0 0 16px 16px;padding:24px 40px;border-top:1px solid #E8EAFF;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#040741;">NeoFlow Agency</p>
                    <p style="margin:0;font-size:11px;color:#9CA3AF;line-height:1.6;">
                      Le Business Operating System pour les magasins de meubles et literie.<br/>
                      Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`
}
