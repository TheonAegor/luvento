// import React from 'react';
import { useProperties } from "@/api/apiHooks";

function Properties() {
  const { data, isLoading, error } = useProperties({
    pagination: { limit: 10, offset: 0 }
  });


  return (
<div className="container mx-auto p-4">
  <h1 className="text-2xl font-bold mb-4">Объекты недвижимости</h1>
  
  {isLoading && (
    <div className="flex justify-center items-center py-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-2"></div>
        <p>Loading...</p>
      </div>
    </div>
  )}
  
  {error && (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{error.message}</span>
    </div>
  )}
  
  {!isLoading && !error && (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.properties.map((property) => (
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
  )}
  
  {!isLoading && !error && data?.properties.length === 0 && (
    <div className="text-center py-8 text-gray-500">
      Нет доступных объектов недвижимости
    </div>
  )}
</div>
  );
}

export default Properties; 