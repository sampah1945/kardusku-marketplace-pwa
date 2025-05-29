
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MapPlaceholder from './MapPlaceholder';
import CardboardListings from './CardboardListings';
import { Listing } from '@/types/listing';

interface MapTabsProps {
  filteredListings: Listing[];
}

const MapTabs = ({ filteredListings }: MapTabsProps) => {
  return (
    <div className="lg:flex-1">
      <Tabs defaultValue="map">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="map">Peta</TabsTrigger>
            <TabsTrigger value="list">Daftar</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="map">
          <MapPlaceholder listings={filteredListings} />
        </TabsContent>
        
        <TabsContent value="list">
          <CardboardListings listings={filteredListings} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MapTabs;
