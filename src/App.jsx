import React from 'react'
import Navbar from './components/Navbar.jsx'
import HeroSection from './components/HeroSection.jsx'
import DayArcSection from './components/DayArcSection.jsx'
import PrivacyInsightsSection from './components/PrivacyInsightsSection.jsx'
import IntegrationsSection from './components/IntegrationsSection.jsx'
import GettingStartedSection from './components/GettingStartedSection.jsx'
import CtaBannerSection from './components/CtaBannerSection.jsx'

// Adjust global spacing between page sections in this single constant
const SECTION_SPACING = 'flex flex-col gap-16 sm:gap-20 lg:gap-[196px] pb-20 sm:pb-24 lg:pb-[120px]'

export default function App() {
  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#070707]">
      <Navbar />
      <main className={SECTION_SPACING}>
        <HeroSection />
        <DayArcSection />
        <PrivacyInsightsSection />
        <IntegrationsSection />
        <GettingStartedSection />
        <CtaBannerSection />
      </main>
    </div>
  )
}
