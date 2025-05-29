
import React from 'react';
import Header from '@/components/Header';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20 bg-gradient-to-br from-green-50 via-blue-50 to-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cara <span className="text-gradient">KARDUSKULAKU</span> Bekerja
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Platform iklan kardus bekas berbasis peta yang menghubungkan pemilik kardus dengan pengepul.
            Ikuti langkah-langkah sederhana berikut untuk memulai.
          </p>
        </div>
      </div>
      <HowItWorks />
      <Features />
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
