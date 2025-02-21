import BookingTableHeader from './BookingTableHeader';
import { useState } from 'react';
import { format, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';
import styles from '../styles/BookingTable.module.css';
import { Selection } from '../classes/BookingTable';

interface Apartment {
    id: number;
    name: string;
    // другие поля...
}

interface BookingTableProps {
    apartments: Apartment[];
    currentMonth: Date;
    onSelectionChange?: (selection: Selection) => void;
}


export default function BookingTable({ apartments, currentMonth, onSelectionChange }: BookingTableProps) {
    const [isSelecting, setIsSelecting] = useState(false);
    const [selection, setSelection] = useState<Selection | null>(null);
    
    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth)
    });

    const handleMouseDown = (apartmentId: number, date: Date) => {
        setIsSelecting(true);
        const newSelection = {
            startApartmentId: apartmentId,
            endApartmentId: apartmentId,
            startDate: date,
            endDate: date
        };
        setSelection(newSelection);
    };

    const handleMouseEnter = (apartmentId: number, date: Date) => {
        if (isSelecting && selection) {
            const newSelection = {
                ...selection,
                endApartmentId: apartmentId,
                endDate: date
            };
            setSelection(newSelection);
        }
    };

    const isSelected = (apartmentId: number, date: Date) => {
        if (!selection) return false;
        
        const [minApartmentId, maxApartmentId] = [
            Math.min(selection.startApartmentId, selection.endApartmentId),
            Math.max(selection.startApartmentId, selection.endApartmentId)
        ];
        
        const [minDate, maxDate] = [
            new Date(Math.min(selection.startDate.getTime(), selection.endDate.getTime())),
            new Date(Math.max(selection.startDate.getTime(), selection.endDate.getTime()))
        ];
        
        return (
            apartmentId >= minApartmentId &&
            apartmentId <= maxApartmentId &&
            date >= minDate &&
            date <= maxDate
        );
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
        if (selection) {
            onSelectionChange?.(selection);
        }
    };


    return (
        <div 
            className={styles.bookingTableContainer}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <table className={styles.bookingTable}>
                <BookingTableHeader currentMonth={currentMonth} />
                <tbody>
                    {apartments.map(apartment => (
                        <tr key={apartment.id}>
                            <td className={styles.apartmentColumn}>{apartment.name}</td>
                            {daysInMonth.map(day => (
                                <td
                                    key={format(day, 'yyyy-MM-dd')}
                                    className={`${styles.bookingCell} ${
                                        isSelected(apartment.id, day) ? styles.selected : ''
                                    }`}
                                    onMouseDown={() => handleMouseDown(apartment.id, day)}
                                    onMouseEnter={() => handleMouseEnter(apartment.id, day)}
                                >
                                    {/* Здесь может быть контент ячейки */}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}