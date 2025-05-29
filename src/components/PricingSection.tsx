
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, MapPin, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  const plans = [
    {
      name: 'Pengepul Kecil',
      price: 'GRATIS',
      subtitle: 'Cocok untuk pengepul pemula',
      features: [
        'Akses kardus 1-10 kg',
        'Radius 0-1 km dari lokasi terdaftar',
        'Lokasi tetap (tidak bisa diubah)',
        'Kontak penjual terbatas',
        'Support dasar'
      ],
      buttonText: 'Mulai Gratis',
      buttonVariant: 'outline' as const,
      popular: false,
      icon: Users
    },
    {
      name: 'Pengepul Sedang',
      price: 'Rp 100,000',
      period: '/bulan',
      subtitle: 'Untuk bisnis yang berkembang',
      features: [
        'Akses kardus 1-100 kg',
        'Radius 0-10 km dari lokasi terdaftar',
        'Lokasi tetap (tidak bisa diubah)',
        'Akses kontak penjual lengkap',
        'Filter pencarian lanjutan',
        'Support prioritas',
        'Statistik penjualan'
      ],
      buttonText: 'Pilih Paket',
      buttonVariant: 'default' as const,
      popular: true,
      icon: MapPin
    },
    {
      name: 'Pengepul Besar',
      price: 'Rp 200,000',
      period: '/bulan',
      subtitle: 'Untuk skala enterprise',
      features: [
        'Akses semua berat kardus',
        'Tanpa batasan radius',
        'Dapat mengubah lokasi',
        'Akses data lengkap',
        'Priority listing',
        'Analytics dashboard',
        'Support 24/7',
        'API access'
      ],
      buttonText: 'Pilih Paket',
      buttonVariant: 'default' as const,
      popular: false,
      icon: Star
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Paket <span className="text-gradient">Berlangganan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan bisnis pengepulan kardus Anda. 
            Untuk penjual kardus, seluruh fitur gratis!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                plan.popular ? 'border-primary scale-105' : 'border-gray-100 hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="gradient-primary text-white px-6 py-2 rounded-full text-sm font-medium">
                    Paling Populer
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto rounded-2xl ${plan.popular ? 'gradient-primary' : 'bg-gray-100'} flex items-center justify-center mb-4`}>
                  <plan.icon className={`h-8 w-8 ${plan.popular ? 'text-white' : 'text-gray-600'}`} />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.subtitle}</p>
                
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  {plan.period && <span className="text-gray-600 ml-1">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${plan.popular ? 'gradient-primary text-white hover:scale-105' : ''}`}
                variant={plan.buttonVariant}
                size="lg"
                asChild
              >
                <Link to="/register">
                  {plan.buttonText}
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Customer CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto border-2 border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Untuk Penjual Kardus</h3>
            <p className="text-gray-600 mb-6">
              Semua fitur posting iklan kardus bekas GRATIS selamanya! 
              Tidak ada biaya tersembunyi.
            </p>
            <Button size="lg" className="gradient-primary text-white hover:scale-105 transition-transform duration-200" asChild>
              <Link to="/register">
                Mulai Jual Kardus Gratis
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
