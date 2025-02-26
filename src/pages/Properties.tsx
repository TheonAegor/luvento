// import React from 'react';
import { Property } from "@/types/property";

interface PropertiesProps {
  properties: Property[];
}

function Properties({ properties }: PropertiesProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Объекты недвижимости</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <div 
            key={property.uuid}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{property.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {property.address}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Номер: {property.number}, Этаж: {property.floor}
            </p>
            <p className="font-bold">
              {property.base_price} ₽/ночь
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Properties; 