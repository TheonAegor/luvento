import {BookingTableHeader} from './BookingTableHeader';
import { useState, useRef, useEffect } from 'react';
import styles from '../styles/BookingTable.module.css';
import { Selection } from '../classes/BookingTable';
import { 
    format, 
    eachDayOfInterval, 
    addMonths, 
    subMonths, 
    startOfMonth,
    endOfMonth,
    isWeekend 
} from 'date-fns';

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
    const tableRef = useRef<HTMLDivElement>(null);

    // Начальный диапазон: текущий месяц + 2 месяца вперед и 1 назад
    const [dateRange, setDateRange] = useState({
        start: startOfMonth(subMonths(new Date(), 1)),
        end: endOfMonth(addMonths(new Date(), 2))
    });

    const containerRef = useRef<HTMLTableElement>(null);
    
    const daysInRange = eachDayOfInterval({
        start: dateRange.start,
        end: dateRange.end
    });


            // Обработчик прокрутки
    const handleScroll = () => {
        if (!containerRef.current) return;
        
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        const scrollRatio = scrollLeft / (scrollWidth - clientWidth);

        // Если прокрутили близко к краю, добавляем даты
        if (scrollRatio > 0.7) {
            setDateRange(prev => ({
                ...prev,
                end: endOfMonth(addMonths(prev.end, 1))
            }));
        } else if (scrollRatio < 0.3) {
            setDateRange(prev => ({
                ...prev,
                start: startOfMonth(subMonths(prev.start, 1))
            }));
        }
    };

    // Кнопки навигации по месяцам
    const scrollToMonth = (direction: 'prev' | 'next') => {
        if (!containerRef.current) return;
        
        const cellWidth = 40; // ширина ячейки
        const daysToScroll = 30; // примерно месяц
        
        containerRef.current.scrollBy({
            left: direction === 'next' ? cellWidth * daysToScroll : -(cellWidth * daysToScroll),
            behavior: 'smooth'
        });
    };

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

    // Обработчик кликов вне таблицы
    // Убирает выделение при клике вне таблицы
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
                setSelection(null);
                setIsSelecting(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>  
        <div className={styles.navigationControls}>
        <button 
            className={styles.navigationButton}
            onClick={() => scrollToMonth('prev')}
        >
            ← Предыдущий месяц
        </button>
        <button 
            className={styles.navigationButton}
            onClick={() => scrollToMonth('next')}
        >
            Следующий месяц →
        </button>
    </div>
        <div 
            className={styles.bookingTableContainer}
            ref={tableRef}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <table className={styles.bookingTable}
                ref={containerRef}
                onScroll={handleScroll}
            >
                <BookingTableHeader currentMonth={currentMonth} />
                <tbody>
                    {apartments.map(apartment => (
                        <tr key={apartment.id}>
                            <td className={styles.apartmentColumn}>{apartment.name}</td>
                            {daysInRange.map(day => (
                                <td
                                    key={format(day, 'yyyy-MM-dd')}
                                    className={`${styles.bookingCell} ${
                                        isSelected(apartment.id, day) ? styles.selected : ''
                                    } ${isWeekend(day) ? styles.weekendCell : ''}`}
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
        </>
    );
}