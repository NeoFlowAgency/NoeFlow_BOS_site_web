import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import PainPoints from '@/components/sections/PainPoints'
import SolutionOverview from '@/components/sections/SolutionOverview'
import FeaturesBento from '@/components/sections/FeaturesBento'
import NeoChatSection from '@/components/sections/NeoChatSection'
import ComparisonTable from '@/components/sections/ComparisonTable'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
import FinalCTA from '@/components/sections/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <PainPoints />
        <div className="section-divider" />
        <SolutionOverview />
        <div className="section-divider" />
        <FeaturesBento />
        <div className="section-divider" />
        <NeoChatSection />
        <div className="section-divider" />
        <ComparisonTable />
        <div className="section-divider" />
        <Pricing />
        <div className="section-divider" />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
