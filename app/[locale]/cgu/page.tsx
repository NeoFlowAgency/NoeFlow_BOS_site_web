import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function CGUPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 prose prose-sm prose-slate">
          <h1 className="text-3xl font-bold text-[#040741]">Conditions Générales d'Utilisation</h1>
          <p className="text-[#6B7280]">Dernière mise à jour : 2025</p>

          <h2>1. Objet</h2>
          <p>
            Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation du site marketing de NeoFlow BOS (le "Site") édité par NeoFlow Agency.
            Ce site a pour objet la présentation de NeoFlow BOS, un logiciel SaaS de gestion commerciale.
          </p>

          <h2>2. Accès au site</h2>
          <p>
            L'accès au Site est libre et gratuit. NeoFlow Agency se réserve le droit de modifier, suspendre ou interrompre l'accès au Site à tout moment, sans préavis.
          </p>

          <h2>3. Propriété intellectuelle</h2>
          <p>
            L'ensemble des éléments constituant le Site (textes, graphismes, logiciels, etc.) est protégé par les dispositions du Code de la propriété intellectuelle.
            Toute reproduction, même partielle, est interdite sans autorisation préalable de NeoFlow Agency.
          </p>

          <h2>4. Liens hypertextes</h2>
          <p>
            Le Site peut contenir des liens vers des sites tiers. NeoFlow Agency n'est pas responsable du contenu de ces sites ni de leur politique de confidentialité.
          </p>

          <h2>5. Limitation de responsabilité</h2>
          <p>
            NeoFlow Agency ne saurait être tenue responsable des dommages directs ou indirects résultant de l'utilisation du Site ou de l'impossibilité d'y accéder.
          </p>

          <h2>6. Droit applicable</h2>
          <p>
            Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux français seront compétents.
          </p>

          <h2>7. Contact</h2>
          <p>Pour toute question relative aux CGU : neoflowagency05@gmail.com</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
