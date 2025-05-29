
import React from 'react';
import { MapPin, Weight } from 'lucide-react';

interface Listing {
  id: number;
  title: string;
  location: string;
  distance: string;
  weight: number;
  category: string;
  date: string;
  imageUrl: string;
}

interface MapPlaceholderProps {
  listings: Listing[];
}

const MapPlaceholder = ({ listings }: MapPlaceholderProps) => {
  return (
    <div className="w-full h-[calc(100vh-16rem)] bg-blue-50 rounded-lg flex items-center justify-center relative overflow-hidden border">
      <div className="absolute inset-0 bg-opacity-10" style={{ background: 'url("https://placehold.co/1600x900/e0f2fe/2196F3/png?text=Interactive+Map")' }}></div>
      
      {/* Map pins - these would be positioned with real coordinates */}
      {listings.map((listing) => {
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
};

export default MapPlaceholder;
