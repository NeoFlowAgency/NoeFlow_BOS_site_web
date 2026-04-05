import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 prose prose-sm prose-slate">
          <h1 className="text-3xl font-bold text-[#040741]">Politique de confidentialité</h1>
          <p className="text-[#6B7280]">Dernière mise à jour : 2025</p>

          <h2>1. Responsable du traitement</h2>
          <p>NeoFlow Agency — neoflowagency05@gmail.com</p>

          <h2>2. Données collectées</h2>
          <p>Nous collectons les données suivantes via les formulaires de contact :</p>
          <ul>
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Nom de la société (formulaire Enterprise)</li>
            <li>Numéro de téléphone (formulaire Enterprise, optionnel)</li>
            <li>Messages envoyés</li>
          </ul>

          <h2>3. Finalités du traitement</h2>
          <p>Ces données sont utilisées uniquement pour répondre à vos demandes de contact ou de démonstration.</p>

          <h2>4. Durée de conservation</h2>
          <p>Les données sont conservées pendant 12 mois à compter de votre demande, puis supprimées.</p>

          <h2>5. Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul>
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement</li>
            <li>Droit à la portabilité</li>
            <li>Droit d'opposition</li>
          </ul>
          <p>Pour exercer ces droits : neoflowagency05@gmail.com</p>

          <h2>6. Sécurité</h2>
          <p>Les données sont transmises via des connexions sécurisées (HTTPS). Aucune donnée sensible n'est stockée sur nos serveurs.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
