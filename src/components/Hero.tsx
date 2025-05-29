
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Recycle, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full gradient-primary opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full gradient-secondary opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-primary/10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-slide-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2" />
              Platform #1 Daur Ulang Kardus Indonesia
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Jual Beli <span className="text-gradient">Kardus Bekas</span><br />
              Jadi Mudah & Menguntungkan
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Platform iklan kardus bekas berbasis peta yang menghubungkan pemilik kardus dengan pengepul. 
              Dapatkan harga terbaik dan temukan pembeli terdekat dengan mudah.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="gradient-primary text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl" 
                asChild
              >
                <Link to="/register">
                  Mulai Jual Kardus
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                asChild
              >
                <Link to="/map">
                  <MapPin className="mr-2 h-5 w-5" />
                  Lihat Peta Kardus
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-sm text-gray-600">Kardus Terjual</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-600">Pengepul Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-gray-600">Kota Terjangkau</div>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="grid grid-cols-1 gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass-effect rounded-2xl p-6 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Peta Interaktif</h3>
              <p className="text-gray-600">
                Temukan kardus bekas di sekitar Anda dengan peta yang mudah digunakan dan real-time updates.
              </p>
            </div>
            
            <div className="glass-effect rounded-2xl p-6 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg gradient-secondary flex items-center justify-center mb-4">
                <Recycle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ramah Lingkungan</h3>
              <p className="text-gray-600">
                Berkontribusi untuk lingkungan yang lebih bersih dengan mendaur ulang kardus bekas.
              </p>
            </div>
            
            <div className="glass-effect rounded-2xl p-6 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Komunitas Terpercaya</h3>
              <p className="text-gray-600">
                Bergabung dengan komunitas pengepul dan penjual kardus terpercaya di seluruh Indonesia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
