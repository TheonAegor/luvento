import { PropertyForm } from "./PropertyForm";
import { Property, PropertyModel } from "@/types/property";

export function PropertyList() {
  const handlePropertySubmit = (propertyData: Partial<Property>) => {
    const newProperty = new PropertyModel(propertyData);
    // Здесь логика сохранения нового объекта
    console.log("Новый объект:", newProperty.toJSON());
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>Объекты недвижимости</h2>
        <PropertyForm onSubmit={handlePropertySubmit} />
      </div>
      {/* Остальной код компонента */}
    </div>
  );
} 