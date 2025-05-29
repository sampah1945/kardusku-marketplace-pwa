
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Recycle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <div className="text-center px-4">
        <div className="p-4 rounded-full gradient-primary inline-flex mb-6 animate-bounce">
          <Recycle className="h-10 w-10 text-white" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Halaman Tidak Ditemukan</h2>
        
        <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
          Sepertinya halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        
        <Button size="lg" className="gradient-primary" asChild>
          <Link to="/">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Kembali ke Beranda
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
