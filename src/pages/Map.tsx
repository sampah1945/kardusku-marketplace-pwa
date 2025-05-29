
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Filter, MapPin, Search, Weight, Package } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

  // Map placeholder component (would be replaced by Mapbox/Google Maps integration)
  const MapPlaceholder = () => (
    <div className="w-full h-[calc(100vh-16rem)] bg-blue-50 rounded-lg flex items-center justify-center relative overflow-hidden border">
      <div className="absolute inset-0 bg-opacity-10" style={{ background: 'url("https://placehold.co/1600x900/e0f2fe/2196F3/png?text=Interactive+Map")' }}></div>
      
      {/* Map pins - these would be positioned with real coordinates */}
      {mockListings.map((listing) => {
        // Random positions for demo
        const left = 20 + Math.random() * 60;
        const top = 20 + Math.random() * 60;
        
        return (
          <div 
            key={listing.id} 
            className="absolute animate-pulse cursor-pointer transition-transform hover:scale-110" 
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 ${
              listing.category === 'small' ? 'bg-green-500' : 
              listing.category === 'medium' ? 'bg-blue-500' : 'bg-amber-500'
            }`}>
              <MapPin className="h-4 w-4 text-white" />
            </div>
            {/* Info popup that would appear on hover */}
            <div className="absolute left-3 -top-24 opacity-0 hover:opacity-100 transition-opacity bg-white p-3 rounded-lg shadow-lg w-40">
              <div className="font-medium text-sm">{listing.title}</div>
              <div className="text-xs text-gray-500">{listing.location}</div>
              <div className="flex items-center mt-1 text-xs">
                <Weight className="h-3 w-3 mr-1" />
                <span>{listing.weight} kg</span>
                <span className="mx-1">•</span>
                <span>{listing.distance}</span>
              </div>
            </div>
          </div>
        );
      })}
      
      <div className="z-10 text-center bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Peta Interaktif</h3>
        <p className="text-sm text-gray-600">Saat ini menampilkan mockup data.<br />Integrasi peta akan diimplementasikan.</p>
      </div>
    </div>
  );

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
          <div className="lg:w-64 space-y-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter Kardus
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Kategori Berat</label>
                  <div className="space-y-2">
                    <Button 
                      variant={activeFilter === 'all' ? 'default' : 'outline'} 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => setActiveFilter('all')}
                    >
                      Semua Kategori
                    </Button>
                    <Button 
                      variant={activeFilter === 'small' ? 'default' : 'outline'} 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => setActiveFilter('small')}
                    >
                      Kecil (1-10 kg)
                    </Button>
                    <Button 
                      variant={activeFilter === 'medium' ? 'default' : 'outline'} 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => setActiveFilter('medium')}
                    >
                      Sedang (11-50 kg)
                    </Button>
                    <Button 
                      variant={activeFilter === 'large' ? 'default' : 'outline'} 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => setActiveFilter('large')}
                    >
                      Besar (>50 kg)
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Jarak Radius</label>
                  <div className="mb-2">
                    <Slider 
                      defaultValue={[5]} 
                      max={25} 
                      step={1} 
                      value={radiusValue}
                      onValueChange={setRadiusValue}
                    />
                  </div>
                  <div className="text-sm text-gray-600 flex justify-between">
                    <span>0 km</span>
                    <span>{radiusValue[0]} km</span>
                    <span>25 km</span>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Urutkan</label>
                  <Select defaultValue="nearest">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih urutan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nearest">Jarak Terdekat</SelectItem>
                      <SelectItem value="newest">Terbaru</SelectItem>
                      <SelectItem value="weight_asc">Berat: Rendah ke Tinggi</SelectItem>
                      <SelectItem value="weight_desc">Berat: Tinggi ke Rendah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full gradient-primary">
                  Terapkan Filter
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-4">Legenda Peta</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">Kardus Kecil (1-10 kg)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm">Kardus Sedang (11-50 kg)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-amber-500 rounded-full mr-2"></div>
                  <span className="text-sm">Kardus Besar (>50 kg)</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map and Listings */}
          <div className="lg:flex-1">
            <Tabs defaultValue="map">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="map">Peta</TabsTrigger>
                  <TabsTrigger value="list">Daftar</TabsTrigger>
                </TabsList>
                
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    placeholder="Cari lokasi atau area..." 
                    className="pl-9 pr-4 w-64" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <TabsContent value="map">
                <MapPlaceholder />
              </TabsContent>
              
              <TabsContent value="list">
                <div className="space-y-4">
                  {filteredListings.length > 0 ? (
                    filteredListings.map((listing) => (
                      <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden flex">
                        <div className="w-1/3">
                          <img 
                            src={listing.imageUrl} 
                            alt={listing.title} 
                            className="w-full h-40 object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-medium">{listing.title}</h3>
                            <Badge 
                              className={`${
                                listing.category === 'small' ? 'bg-green-500' : 
                                listing.category === 'medium' ? 'bg-blue-500' : 'bg-amber-500'
                              }`}
                            >
                              {listing.weight} kg
                            </Badge>
                          </div>
                          
                          <div className="flex items-center text-gray-600 text-sm mt-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            {listing.location}
                            <span className="mx-1">•</span>
                            {listing.distance}
                          </div>
                          
                          <p className="text-sm text-gray-500 mt-2">
                            Dipasang {listing.date}
                          </p>
                          
                          <div className="mt-4 flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                              Kontak tersedia untuk pengepul terdaftar
                            </span>
                            <Button size="sm" className="gradient-primary">
                              <Package className="h-4 w-4 mr-2" />
                              Detail
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                      <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Tidak Ada Kardus Ditemukan</h3>
                      <p className="text-gray-600">
                        Tidak ada kardus bekas yang sesuai dengan filter Anda saat ini.
                        Coba ubah filter atau cari di area yang lebih luas.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Map;
