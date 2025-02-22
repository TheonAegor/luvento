import React, { useState } from 'react';
import { BookingFormData, BookingSelection } from '../types/booking';
import styles from '../styles/BookingForm.module.css';

interface BookingFormProps {
    selection: BookingSelection | null;
    onSubmit: (data: BookingFormData & BookingSelection) => void;
    onCancel: () => void;
}

export function BookingForm({ selection, onSubmit, onCancel }: BookingFormProps) {
    const [formData, setFormData] = useState<BookingFormData>({
        client_name: '',
        client_surname: '',
        email: '',
        phone: '',
        adults: 1,
        children: 0,
        tariff: 1,
        payment: 0,
        price_per: 0,
        amount_total: 0,
        is_hourly: false,
        notes: '',
        tag: ''
    });

    if (!selection) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            ...selection
        });
    };

    return (
        <div className={styles.formContainer}>
            <h2>Новое бронирование</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Имя клиента</label>
                    <input
                        type="text"
                        value={formData.client_name}
                        onChange={e => setFormData({...formData, client_name: e.target.value})}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Фамилия клиента</label>
                    <input
                        type="text"
                        value={formData.client_surname}
                        onChange={e => setFormData({...formData, client_surname: e.target.value})}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Телефон</label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        required
                    />
                </div>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>Взрослых</label>
                        <input
                            type="number"
                            min="1"
                            value={formData.adults}
                            onChange={e => setFormData({...formData, adults: +e.target.value})}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Детей</label>
                        <input
                            type="number"
                            min="0"
                            value={formData.children}
                            onChange={e => setFormData({...formData, children: +e.target.value})}
                        />
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label>Цена за ночь</label>
                    <input
                        type="number"
                        value={formData.price_per}
                        onChange={e => setFormData({...formData, price_per: +e.target.value})}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Примечания</label>
                    <textarea
                        value={formData.notes}
                        onChange={e => setFormData({...formData, notes: e.target.value})}
                    />
                </div>
                <div className={styles.formActions}>
                    <button type="submit" className={styles.submitButton}>
                        Создать бронирование
                    </button>
                    <button type="button" onClick={onCancel} className={styles.cancelButton}>
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    );
} 