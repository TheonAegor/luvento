import React from 'react';
import { Room } from '@/types/room';

interface PropertiesProps {
  properties: Room[];
}

const Properties: React.FC<PropertiesProps> = ({ properties }) => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Мои объекты</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.uuid} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold">{property.number}</h2>
            <p className="text-gray-600">{property.description || 'Описание отсутствует'}</p>
            <p className="mt-2">Базовая цена: {property.base_price} ₽</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties; 