
import React from 'react';

const MapLegend = () => {
  return (
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
          <span className="text-sm">Kardus Besar ({'>'}50 kg)</span>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
