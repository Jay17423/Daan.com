
import React from 'react'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import DonationCategories from '../components/DonationCategories'
import HowItWorks from '../components/HowItWorks'
import VolunteerCTA from '../components/VolunteerCTA'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function LandingPage() {
  return (
    <div className="bg-gray-50 font-sans antialiased text-gray-900">
      <Header />
      <main>
        <Hero />
        <Stats />
        <DonationCategories />
        <HowItWorks />
        <VolunteerCTA/>
      </main>
      <Footer />
    </div>
  )
}
