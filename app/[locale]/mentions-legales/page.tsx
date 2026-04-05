import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 prose prose-sm prose-slate">
          <h1 className="text-3xl font-bold text-[#040741]">Mentions légales</h1>
          <p className="text-[#6B7280]">Dernière mise à jour : 2025</p>

          <h2>Éditeur du site</h2>
          <p>
            NeoFlow Agency<br />
            Email : neoflowagency05@gmail.com<br />
            Site : neoflow-agency.cloud
          </p>

          <h2>Hébergement</h2>
          <p>
            Vercel Inc.<br />
            340 Pine Street, Suite 701, San Francisco, CA 94104, USA<br />
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, sons, logiciels) est la propriété exclusive de NeoFlow Agency, sauf mentions contraires.
            Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, est strictement interdite sans accord préalable écrit de NeoFlow Agency.
          </p>

          <h2>Données personnelles</h2>
          <p>
            Les informations collectées via les formulaires de contact sont utilisées uniquement pour répondre à vos demandes.
            Elles ne sont pas partagées avec des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en contactant neoflowagency05@gmail.com.
          </p>

          <h2>Cookies</h2>
          <p>
            Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire ou de suivi n'est utilisé.
          </p>

          <h2>Limitation de responsabilité</h2>
          <p>
            NeoFlow Agency s'efforce d'assurer l'exactitude et la mise à jour des informations présentes sur ce site. Cependant, NeoFlow Agency ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
