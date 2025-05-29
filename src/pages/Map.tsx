
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MapFilters from '@/components/map/MapFilters';
import MapLegend from '@/components/map/MapLegend';
import MapTabs from '@/components/map/MapTabs';
import { useCardboardAds } from '@/hooks/useCardboardAds';

const Map = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [radiusValue, setRadiusValue] = useState([5]);
  
  const { ads, loading, error } = useCardboardAds();
  
  // Transform ads to match the existing listing interface
  const transformedListings = ads.map(ad => ({
    id: ad.id,
    title: `Kardus ${ad.weight} kg`,
    location: ad.location.address,
    distance: '0 km', // Would calculate based on user location
    weight: ad.weight,
    category: ad.weight <= 10 ? 'small' : ad.weight <= 50 ? 'medium' : 'large',
    date: new Date(ad.createdAt).toLocaleDateString('id-ID'),
    imageUrl: ad.images?.[0] || 'https://placehold.co/400x300/4CAF50/FFFFFF/png?text=Kardus',
    description: ad.description,
    contactInfo: ad.contactInfo,
    cardboardType: ad.cardboardType,
  }));
  
  // Filter the listings based on active filter and search
  const filteredListings = transformedListings.filter(listing => {
    const matchesCategory = activeFilter === 'all' || listing.category === activeFilter;
    const matchesSearch = searchQuery === '' || 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.cardboardType?.some(type => 
        type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary text-white rounded"
            >
              Coba Lagi
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Peta Kardus Bekas</h1>
          <p className="text-gray-600">
            Temukan kardus bekas di sekitar lokasi Anda dengan mudah
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Menampilkan {filteredListings.length} dari {transformedListings.length} iklan aktif
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="space-y-6">
            <MapFilters
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              radiusValue={radiusValue}
              setRadiusValue={setRadiusValue}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <MapLegend />
          </div>
          
          {/* Map and Listings */}
          <MapTabs filteredListings={filteredListings} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Map;
