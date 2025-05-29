import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Package } from 'lucide-react';
import { Listing } from '@/types/listing';

interface CardboardListingsProps {
  listings: Listing[];
}

const CardboardListings = ({ listings }: CardboardListingsProps) => {
  return (
    <div className="space-y-4">
      {listings.length > 0 ? (
        listings.map((listing) => (
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
  );
};

export default CardboardListings;
