
import React from 'react';
import Header from '@/components/Header';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20 bg-gradient-to-br from-green-50 via-blue-50 to-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Paket <span className="text-gradient">Berlangganan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan bisnis pengepulan kardus Anda.
            Gratis untuk penjual kardus, berlangganan untuk pengepul.
          </p>
        </div>
      </div>
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Pricing;
