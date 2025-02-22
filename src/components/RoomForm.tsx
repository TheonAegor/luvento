import { useState } from 'react';
import { CreateRoomDto, RoomType } from '../types/room';
import styles from '../styles/RoomForm.module.css';

interface RoomFormProps {
    onSubmit: (room: CreateRoomDto) => void;
    onCancel: () => void;
}

const defaultRoom: CreateRoomDto = {
    house_uuid: '',
    type: RoomType.HOTEL_ROOM,
    number: 0,
    floor: 1,
    description: '',
    base_price: 0,
    capacity: { adults: 2, children: 0 },
    area: 0,
    amenities: [],
    source_id: 1,
    rating: 5
};

export function RoomForm({ onSubmit, onCancel }: RoomFormProps) {
    const [formData, setFormData] = useState<CreateRoomDto>(defaultRoom);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className={styles.formContainer}>
            <h2>Добавление нового объекта</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Тип объекта</label>
                    <select
                        value={formData.type}
                        onChange={e => setFormData({
                            ...formData,
                            type: e.target.value as RoomType
                        })}
                    >
                        <option value={RoomType.HOTEL_ROOM}>Номер в отеле</option>
                        <option value={RoomType.APARTMENT}>Квартира</option>
                        <option value={RoomType.STUDIO}>Студия</option>
                        <option value={RoomType.PENTHOUSE}>Пентхаус</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label>Номер</label>
                    <input
                        type="number"
                        value={formData.number}
                        onChange={e => setFormData({
                            ...formData,
                            number: parseInt(e.target.value)
                        })}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Этаж</label>
                    <input
                        type="number"
                        value={formData.floor}
                        onChange={e => setFormData({
                            ...formData,
                            floor: parseInt(e.target.value)
                        })}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Базовая цена</label>
                    <input
                        type="number"
                        value={formData.base_price}
                        onChange={e => setFormData({
                            ...formData,
                            base_price: parseFloat(e.target.value)
                        })}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Описание</label>
                    <textarea
                        value={formData.description}
                        onChange={e => setFormData({
                            ...formData,
                            description: e.target.value
                        })}
                        rows={4}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Вместимость</label>
                    <div className={styles.formRow}>
                        <input
                            type="number"
                            placeholder="Взрослых"
                            value={formData.capacity.adults}
                            onChange={e => setFormData({
                                ...formData,
                                capacity: {
                                    ...formData.capacity,
                                    adults: parseInt(e.target.value)
                                }
                            })}
                            min="1"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Детей"
                            value={formData.capacity.children}
                            onChange={e => setFormData({
                                ...formData,
                                capacity: {
                                    ...formData.capacity,
                                    children: parseInt(e.target.value)
                                }
                            })}
                            min="0"
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>Площадь (м²)</label>
                    <input
                        type="number"
                        value={formData.area}
                        onChange={e => setFormData({
                            ...formData,
                            area: parseInt(e.target.value)
                        })}
                        required
                    />
                </div>

                <div className={styles.formActions}>
                    <button type="submit" className={styles.submitButton}>
                        Создать объект
                    </button>
                    <button type="button" onClick={onCancel} className={styles.cancelButton}>
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    );
} 