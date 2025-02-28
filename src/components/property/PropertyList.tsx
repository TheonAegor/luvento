import React from 'react';
import { useProperties } from '../../api/apiHooks';

export const PropertyList: React.FC = () => {
  const { data, isLoading, error } = useProperties({
    pagination: { limit: 10, offset: 0 }
  });

  // const createProperty = useCreateProperty({
  //   onSuccess: () => {
  //     // Обработка успешного создания
  //     console.log('Объект успешно создан');
  //   },
  // });

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <div>
      {data?.properties.map((property) => (
        <div key={property.uuid}>
          <h3>{property.name}</h3>
          <p>{property.address}</p>
        </div>
      ))}
    </div>
  );
}; 