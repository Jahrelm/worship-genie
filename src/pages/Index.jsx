
import React from 'react';
import Hero from '../components/homepage/Hero';
import DailyVerse from '../components/homepage/DailyVerse';
import FeaturesSection from '../components/homepage/FeaturesSection';
import QuickAccessSection from '../components/homepage/QuickAccessSection';
import QuoteSection from '../components/homepage/QuoteSection';
import Footer from '../components/homepage/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=2000&q=80')] bg-fixed bg-cover bg-center">
      <Hero />
      <DailyVerse />
      <FeaturesSection />
      <QuickAccessSection />
      <QuoteSection />
      <Footer />
    </div>
  );
};

export default Index;
