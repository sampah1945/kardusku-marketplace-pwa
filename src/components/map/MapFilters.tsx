
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Filter, Search } from 'lucide-react';

interface MapFiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  radiusValue: number[];
  setRadiusValue: (value: number[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const MapFilters = ({
  activeFilter,
  setActiveFilter,
  radiusValue,
  setRadiusValue,
  searchQuery,
  setSearchQuery
}: MapFiltersProps) => {
  return (
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
                Besar ({'>'}50 kg)
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
        <h3 className="text-lg font-medium mb-4">Search</h3>
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Cari lokasi atau area..." 
            className="pl-9 pr-4" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default MapFilters;
