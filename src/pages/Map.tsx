
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MapFilters from '@/components/map/MapFilters';
import MapLegend from '@/components/map/MapLegend';
import MapTabs from '@/components/map/MapTabs';

const Map = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [radiusValue, setRadiusValue] = useState([5]);
  
  // For Demo/UI purposes (would be replaced by real data from API)
  const mockListings = [
    {
      id: 1,
      title: 'Kardus Kecil - 2 kg',
      location: 'Kebayoran Baru, Jakarta Selatan',
      distance: '0.7 km',
      weight: 2,
      category: 'small',
      date: '2 jam yang lalu',
      imageUrl: 'https://placehold.co/400x300/4CAF50/FFFFFF/png?text=Kardus+2kg'
    },
    {
      id: 2,
      title: 'Kardus Sedang - 15 kg',
      location: 'Tebet, Jakarta Selatan',
      distance: '1.5 km',
      weight: 15,
      category: 'medium',
      date: '5 jam yang lalu',
      imageUrl: 'https://placehold.co/400x300/2196F3/FFFFFF/png?text=Kardus+15kg'
    },
    {
      id: 3,
      title: 'Kardus Besar - 50 kg',
      location: 'Pancoran, Jakarta Selatan',
      distance: '3.2 km',
      weight: 50,
      category: 'large',
      date: '1 hari yang lalu',
      imageUrl: 'https://placehold.co/400x300/8BC34A/FFFFFF/png?text=Kardus+50kg'
    },
    {
      id: 4,
      title: 'Kardus Sedang - 12 kg',
      location: 'Setiabudi, Jakarta Selatan',
      distance: '2.1 km',
      weight: 12,
      category: 'medium',
      date: '3 jam yang lalu',
      imageUrl: 'https://placehold.co/400x300/2196F3/FFFFFF/png?text=Kardus+12kg'
    },
  ];
  
  // Filter the listings based on active filter
  const filteredListings = mockListings.filter(listing => {
    if (activeFilter === 'all') return true;
    return listing.category === activeFilter;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Peta Kardus Bekas</h1>
          <p className="text-gray-600">
            Temukan kardus bekas di sekitar lokasi Anda dengan mudah
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
