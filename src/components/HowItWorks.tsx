
import React from 'react';
import { UserPlus, MapPin, Users, Star } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Daftar Gratis',
      description: 'Buat akun sebagai penjual kardus atau pengepul hanya dalam 2 menit.',
      forCustomer: 'Daftar sebagai penjual dan mulai posting iklan kardus Anda.',
      forCollector: 'Daftar sebagai pengepul dan pilih paket sesuai kebutuhan bisnis.'
    },
    {
      icon: MapPin,
      title: 'Posting atau Cari',
      description: 'Penjual posting iklan, pengepul mencari di peta interaktif.',
      forCustomer: 'Upload foto kardus, tentukan berat, dan lokasi akan terdeteksi otomatis.',
      forCollector: 'Gunakan peta untuk menemukan kardus bekas sesuai kategori dan radius.'
    },
    {
      icon: Users,
      title: 'Kontak Langsung',
      description: 'Hubungi penjual atau pembeli langsung melalui kontak yang tersedia.',
      forCustomer: 'Tunggu pengepul menghubungi Anda atau tanggapi penawaran.',
      forCollector: 'Akses detail kontak penjual dan koordinasikan pengambilan.'
    },
    {
      icon: Star,
      title: 'Transaksi Sukses',
      description: 'Selesaikan transaksi dengan aman dan berikan rating.',
      forCustomer: 'Selesaikan penjualan dan dapatkan rating dari pembeli.',
      forCollector: 'Ambil kardus sesuai kesepakatan dan berikan rating penjual.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cara Kerja <span className="text-gradient">KARDUSKULAKU</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Proses yang mudah dan efisien untuk menghubungkan penjual dan pembeli kardus bekas 
            dalam 4 langkah sederhana.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 transform -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                {/* Step Number & Icon */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-primary flex items-center justify-center text-primary font-bold text-sm">
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {step.description}
                </p>

                {/* Role-specific details */}
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4 text-left">
                    <div className="text-sm font-medium text-green-800 mb-2">Untuk Penjual:</div>
                    <div className="text-sm text-green-700">{step.forCustomer}</div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 text-left">
                    <div className="text-sm font-medium text-blue-800 mb-2">Untuk Pengepul:</div>
                    <div className="text-sm text-blue-700">{step.forCollector}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
