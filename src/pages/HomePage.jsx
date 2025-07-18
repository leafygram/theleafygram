import React from 'react';
import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WellnessPacks from '@/components/WellnessPacks';
import HowItWorks from '@/components/HowItWorks';
import TrialCta from '@/components/TrialCta';
import Testimonials from '@/components/Testimonials.jsx';
import Contact from '@/components/Contact.jsx';
import Footer from '@/components/Footer.jsx';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>LeafyGrams - Fresh Microgreens, Tailored to Your Health Goals</title>
        <meta name="description" content="Weekly microgreen packs for hair fall, weight loss, immunity, and detox. Fresh, chemical-free microgreens delivered to your doorstep. Try your trial pack today!" />
      </Helmet>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <div id="home">
            <Hero />
          </div>
          <div id="wellness-packs">
            <WellnessPacks />
          </div>
          <div id="how-it-works">
            <HowItWorks />
          </div>
          <TrialCta />
          <div id="testimonials">
            <Testimonials />
          </div>
          <div id="contact">
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default HomePage;