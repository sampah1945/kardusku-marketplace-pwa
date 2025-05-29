
import React from 'react';
import { MapPin, Clock, Shield, Star, Users, Recycle } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Lokasi Real-Time',
      description: 'Temukan kardus bekas terdekat dengan teknologi GPS yang akurat.',
      color: 'gradient-primary'
    },
    {
      icon: Clock,
      title: 'Proses Cepat',
      description: 'Posting iklan dalam hitungan menit, dapatkan pembeli dalam hitungan jam.',
      color: 'gradient-secondary'
    },
    {
      icon: Shield,
      title: 'Aman & Terpercaya',
      description: 'Semua pengguna terverifikasi dengan sistem keamanan berlapis.',
      color: 'gradient-primary'
    },
    {
      icon: Star,
      title: 'Harga Terbaik',
      description: 'Dapatkan harga kardus terbaik dengan sistem penawaran transparan.',
      color: 'gradient-secondary'
    },
    {
      icon: Users,
      title: 'Komunitas Besar',
      description: 'Bergabung dengan ribuan pengepul dan penjual di seluruh Indonesia.',
      color: 'gradient-primary'
    },
    {
      icon: Recycle,
      title: 'Ramah Lingkungan',
      description: 'Berkontribusi untuk planet yang lebih hijau melalui daur ulang.',
      color: 'gradient-secondary'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mengapa Memilih <span className="text-gradient">KARDUSKULAKU</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Platform yang dirancang khusus untuk memudahkan jual beli kardus bekas 
            dengan teknologi terdepan dan pengalaman pengguna yang optimal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
