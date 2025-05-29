
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdPostingForm from '@/components/ads/AdPostingForm';

const PostAd = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-20">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Posting Iklan Kardus Bekas</h1>
          <p className="text-gray-600">
            Iklan Anda akan aktif selama 24 jam dan dapat dilihat oleh pengguna lain
          </p>
        </div>

        <AdPostingForm onSuccess={handleSuccess} />
      </main>
      
      <Footer />
    </div>
  );
};

export default PostAd;
