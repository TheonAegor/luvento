import { useState } from "react";
import { Property, PropertyType } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropertyFormProps {
  onSubmit: (property: Partial<Property>) => void;
  parentUUID?: string;
}

export function PropertyForm({ onSubmit, parentUUID }: PropertyFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Property>>({
    name: "",
    parent_uuid: parentUUID || "",
    address: "",
    phone: "",
    email: "",
    type: PropertyType.HOTEL,
    number: 0,
    floor: 0,
    base_price: 0,
    description: "",
    geo_data: {
      latitude: 0,
      longitude: 0,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    navigate('/properties'); // Возвращаемся к списку объектов после сохранения
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      type: Number(value) as PropertyType,
    }));
  };

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Добавление объекта</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Название</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Тип объекта</Label>
            <Select
              value={formData.type?.toString()}
              onValueChange={handleTypeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PropertyType.HOTEL.toString()}>Отель</SelectItem>
                <SelectItem value={PropertyType.APARTMENT.toString()}>Апартаменты</SelectItem>
                <SelectItem value={PropertyType.HOUSE.toString()}>Дом</SelectItem>
                <SelectItem value={PropertyType.HOSTEL.toString()}>Хостел</SelectItem>
                <SelectItem value={PropertyType.VILLA.toString()}>Вилла</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Адрес</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">Номер</Label>
              <Input
                id="number"
                name="number"
                type="number"
                value={formData.number}
                onChange={handleNumberChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="floor">Этаж</Label>
              <Input
                id="floor"
                name="floor"
                type="number"
                value={formData.floor}
                onChange={handleNumberChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="base_price">Базовая цена</Label>
            <Input
              id="base_price"
              name="base_price"
              type="number"
              value={formData.base_price}
              onChange={handleNumberChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Широта</Label>
              <Input
                id="latitude"
                name="latitude"
                type="number"
                value={formData.geo_data?.latitude}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    geo_data: {
                      ...prev.geo_data!,
                      latitude: Number(e.target.value),
                    },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Долгота</Label>
              <Input
                id="longitude"
                name="longitude"
                type="number"
                value={formData.geo_data?.longitude}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    geo_data: {
                      ...prev.geo_data!,
                      longitude: Number(e.target.value),
                    },
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full min-h-[100px] px-3 py-2 border rounded-md"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/properties')}
            >
              Отмена
            </Button>
            <Button type="submit">Сохранить</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
