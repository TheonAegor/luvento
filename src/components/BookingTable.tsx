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
    isWeekend,
    isToday,
    differenceInDays,
} from 'date-fns';
import { defaultDateLib } from '../classes/DateLib';
import { useHorizontalScroll } from 'src/helpers/userHorizontalScroll';
import { SIZES, CSS_VARS } from '../constants/sizes';
import { BookingForm } from './BookingForm';
import { BookingFormData, BookingSelection } from '../types/booking';
import { Modal } from './Modal';
import { Room } from '../types/room';
import { RoomPopup } from './RoomPopup';

interface BookingTableProps {
    apartments: Room[];
    currentMonth: Date;
    onSelectionChange?: (selection: Selection) => void;
}

/** Количество дней слева от текущей даты */
const OFFSET_DAYS = 4; // 4 дня до + текущий день = 5-й день

export default function BookingTable({ apartments, onSelectionChange }: BookingTableProps) {
    const [isSelecting, setIsSelecting] = useState(false);
    const [selection, setSelection] = useState<Selection | null>(null);
    const containerRef = useRef<HTMLTableElement>(null);
    const scrollRef = useHorizontalScroll(containerRef);
    const [bookingSelection, setBookingSelection] = useState<BookingSelection | null>(null);
    const [popup, setPopup] = useState<{
        room: Room;
        position: { x: number; y: number };
    } | null>(null);

    // Начальный диапазон: 3 месяца до и 3 месяца после текущего месяца
    const [dateRange, setDateRange] = useState(() => {
        const today = defaultDateLib.today();
        return {
            start: startOfMonth(subMonths(today, 1)),
            end: endOfMonth(addMonths(today, 3))
        };
    });

    const daysInRange = eachDayOfInterval({
        start: dateRange.start,
        end: dateRange.end
    });

    /**
     * Обработчик прокрутки таблицы.
     * Добавляет новые месяцы при приближении к краям таблицы:
     * - при прокрутке вправе добавляет месяц в конец
     * - при прокрутке влево добавляет месяц в начало
     */
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

    /**
     * Прокручивает таблицу на один месяц вперед или назад
     * @param direction - направление прокрутки ('prev' | 'next')
     */
    const scrollToMonth = (direction: 'prev' | 'next') => {
        if (!containerRef.current) return;
        
        const cellWidth = 40; // ширина ячейки
        const daysToScroll = 30; // примерно месяц
        
        containerRef.current.scrollBy({
            left: direction === 'next' ? cellWidth * daysToScroll : -(cellWidth * daysToScroll),
            behavior: 'smooth'
        });
    };

    /**
     * Прокручивает таблицу так, чтобы текущий день был пятым слева
     * после колонки с названием квартиры
     */
    const scrollToToday = () => {
        if (containerRef.current) {
            const today = defaultDateLib.today();
            const daysSinceStart = differenceInDays(today, dateRange.start);
            const scrollPosition = (daysSinceStart - OFFSET_DAYS) * (SIZES.CELL_WIDTH + 8) + (SIZES.APARTMENT_COLUMN_WIDTH + 8);
            
            containerRef.current.scrollLeft = scrollPosition;
        }
    };

    /**
     * Обработчик начала выделения ячеек
     * @param apartmentId - ID квартиры
     * @param date - дата выбранной ячейки
     */
    const handleMouseDown = (apartmentId: string, date: Date) => {
        setIsSelecting(true);
        const newSelection = {
            startApartmentId: apartmentId,
            endApartmentId: apartmentId,
            startDate: date,
            endDate: date
        };
        setSelection(newSelection);
    };

    /**
     * Обработчик перемещения мыши при выделении
     * Обновляет диапазон выделения при перемещении мыши с зажатой кнопкой
     * @param apartmentId - ID квартиры
     * @param date - дата ячейки
     */
    const handleMouseEnter = (apartmentId: string, date: Date) => {
        if (isSelecting && selection) {
            const newSelection = {
                ...selection,
                endApartmentId: apartmentId,
                endDate: date
            };
            setSelection(newSelection);
        }
    };

    /**
     * Проверяет, входит ли ячейка в текущее выделение
     * @param apartmentId - ID квартиры
     * @param date - дата ячейки
     * @returns true если ячейка входит в выделенный диапазон
     */
    const isSelected = (apartmentId: string, date: Date) => {
        if (!selection) return false;
        
        const [minApartmentId, maxApartmentId] = [
            selection.startApartmentId < selection.endApartmentId 
                ? selection.startApartmentId 
                : selection.endApartmentId,
            selection.startApartmentId < selection.endApartmentId 
                ? selection.endApartmentId 
                : selection.startApartmentId
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

    /**
     * Обработчик окончания выделения
     * Вызывает callback onSelectionChange с итоговым выделением
     */
    const handleMouseUp = () => {
        setIsSelecting(false);
        if (selection) {
            onSelectionChange?.(selection);
            handleSelectionComplete(selection);
        }
    };

    const handleSelectionComplete = (selection: Selection) => {
        setBookingSelection({
            rooms: [selection.startApartmentId.toString()], // преобразуйте ID в UUID
            arrival_date: selection.startDate,
            departure_date: selection.endDate
        });
    };

    /**
     * Обработчик отправки формы бронирования
     * @param formData - данные формы + выбранные даты и комнаты
     */
    const handleBookingSubmit = async (formData: BookingFormData & BookingSelection) => {
        try {
            // Здесь будет отправка данных на сервер
            console.log('Отправка данных бронирования:', formData);
            
            // После успешной отправки очищаем выделение
            setSelection(null);
            setBookingSelection(null);
            
        } catch (error) {
            console.error('Ошибка при создании бронирования:', error);
            // Здесь можно добавить обработку ошибок, например показ уведомления
        }
    };

    // Обработчик кликов вне таблицы
    useEffect(() => {
        /** Сбрасывает выделение при клике вне таблицы */
        const handleClickOutside = (event: MouseEvent) => {
            if (scrollRef.current && !scrollRef.current.contains(event.target as Node)) {
                setSelection(null);
                setIsSelecting(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [scrollRef]);

    // Начальная прокрутка к текущей дате
    useEffect(() => {
        if (containerRef.current) {
            const today = defaultDateLib.today();
            const daysSinceStart = differenceInDays(today, dateRange.start);
            const scrollPosition = daysSinceStart * SIZES.CELL_WIDTH + SIZES.APARTMENT_COLUMN_WIDTH;
            
            containerRef.current.scrollLeft = scrollPosition;
        }
    }, []);

    // Обработчик клика по ячейке
    const handleCellClick = (room: Room, event: React.MouseEvent) => {
        if (!isSelecting) {
            setPopup({
                room,
                position: {
                    x: event.clientX,
                    y: event.clientY
                }
            });
        }
    };

    return (
        <div style={CSS_VARS}>
            <div className={styles.navigationControls}>
                <button 
                    className={styles.navigationButton}
                    onClick={() => scrollToMonth('prev')}
                >
                    ← Предыдущий месяц
                </button>
                <button 
                    className={styles.navigationButton}
                    onClick={scrollToToday}
                >
                    Сегодня
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
                ref={scrollRef}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <table className={styles.bookingTable}
                    ref={containerRef}
                    onScroll={handleScroll}
                >
                    <BookingTableHeader interval={daysInRange} />
                    <tbody>
                        {apartments.map(room => (
                            <tr key={room.uuid}>
                                <td 
                                    className={styles.apartmentColumn}
                                    onClick={(e) => handleCellClick(room, e)}
                                >
                                    {room.number}
                                </td>
                                {daysInRange.map(day => (
                                    <td
                                        key={format(day, 'yyyy-MM-dd')}
                                        className={`
                                            ${styles.bookingCell}
                                            ${isWeekend(day) ? styles.weekendCell : ''}
                                            ${isSelected(room.uuid, day) ? styles.selected : ''}
                                            ${isToday(day) ? styles.todayCell : ''}
                                        `}
                                        onMouseDown={() => handleMouseDown(room.uuid, day)}
                                        onMouseEnter={() => handleMouseEnter(room.uuid, day)}
                                        onClick={(e) => handleCellClick(room, e)}
                                    >
                                        {/* Здесь может быть контент ячейки */}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal 
                isOpen={bookingSelection !== null}
                onClose={() => setBookingSelection(null)}
            >
                <BookingForm
                    selection={bookingSelection}
                    onSubmit={handleBookingSubmit}
                    onCancel={() => setBookingSelection(null)}
                />
            </Modal>
            
            {popup && (
                <RoomPopup
                    room={popup.room}
                    position={popup.position}
                    onClose={() => setPopup(null)}
                />
            )}
        </div>
    );
}