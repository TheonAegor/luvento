import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { BookingTableHeader } from "../bookingTableHeader/bookingTableHeader";
import { useState, useEffect, useCallback, useRef } from "react";
import { addMonths, endOfMonth, isToday, isFirstDayOfMonth, isWeekend } from "date-fns";
import { startOfMonth } from "date-fns";
import { format, subMonths } from "date-fns";
import { eachDayOfInterval } from "date-fns/eachDayOfInterval";
import { defaultDateLib } from "../classes/dateLib";
import { Room } from "@/types/room";
import { Booking, BookingSelection } from "@/types/booking";
import { useHorizontalScroll } from "../helpers/userHorizontalScroll";
import BookingForm from './BookingSlider';
import { BookingFormData } from "@/types/booking";
interface Selection {
  startApartmentId: string;
  endApartmentId: string;
  startDate: Date;
  endDate: Date;
}

interface CalendarDayProps {
    date: Date;
    isSelected: boolean;
    isToday: boolean;
    onClick: (date: Date) => void;
  }

function CalendarDay({ date, isSelected, isToday, onClick }: CalendarDayProps) {
    return (
        <TableCell className={`${isSelected ? 'bg-blue-500 text-white' : ''}`} onClick={() => onClick(date)}>
        </TableCell>
    )
}

interface BookingTableProps {
    apartments: Room[];
    bookings: Booking[];
    onBookingCreate: (booking: Omit<Booking, 'uuid' | 'create_date' | 'update_date'>) => void;
    onSelectionChange?: (selection: Selection) => void;
}

function BookingTable({ apartments, bookings, onBookingCreate, onSelectionChange }: BookingTableProps) {
    const [isSelecting, setIsSelecting] = useState(false);
    const [selection, setSelection] = useState<Selection | null>(null);
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    const containerRef = useRef<HTMLTableElement>(null);
    const scrollRef = useHorizontalScroll(containerRef);
    const [bookingSelection, setBookingSelection] = useState<BookingSelection | null>(null);

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

    // Функция проверки, забронирована ли ячейка
    const isBooked = (roomId: string, date: Date) => {
        return bookings.some(booking => 
            booking.room_uuid === roomId &&
            date >= booking.start_date &&
            date <= booking.end_date
        );
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

    // Новый обработчик для завершения выделения
    const handleMouseUp = () => {
        setIsSelecting(false);
        if (selection) {
            setIsSliderOpen(true);
        }
    };

    const handleSliderClose = () => {
        setIsSliderOpen(false);
        setSelection(null);
    };

    /**
     * Обработчик отправки формы бронирования
     * @param formData - данные формы + выбранные даты и комнаты
     */
    const handleBookingSubmit = async (formData: BookingFormData & BookingSelection) => {
        try {    // Здесь будет отправка данных на сервер
        console.log('Отправка данных бронирования:', formData);
            const newBooking = {
                room_uuid: formData.rooms[0],
                start_date: formData.arrival_date,
                end_date: formData.departure_date,
                guest_name: `${formData.client_name} ${formData.client_surname}`,
                guest_phone: formData.phone,
                guest_email: formData.email,
                status: BookingStatus.CONFIRMED
            };
            
            onBookingCreate(newBooking);
            setSelection(null);
            setBookingSelection(null);
            
        } catch (error) {
            console.error('Ошибка при создании бронирования:', error);
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

    return (
        <>
            <div ref={scrollRef} onMouseUp={handleMouseUp}>
                <Table>
                    <BookingTableHeader interval={daysInRange} />
                    <TableBody>
                    {apartments.map(room => (
                                    <TableRow key={room.uuid}>
                                        <TableCell className="sticky left-0 z-20 w-[200px] min-w-[200px] bg-white dark:bg-gray-800 border-r shadow-[1px_0_0_0_rgba(0,0,0,0.1)]">
                                            <div className="p-2">
                                                {room.number}
                                            </div>
                                        </TableCell>
                                        {daysInRange.map(day => (
                                            <TableCell
                                                key={format(day, 'yyyy-MM-dd')}
                                                className={`${isSelected(room.uuid, day) ? 'bg-blue-500 text-white' : ''} ${isToday(day) ? 'bg-blue-500 text-white' : ''} ${isWeekend(day) ? 'bg-gray-200' : ''}`}

                                                onMouseDown={() => !isBooked(room.uuid, day) && handleMouseDown(room.uuid, day)}
                                                onMouseEnter={() => handleMouseEnter(room.uuid, day)}
                                            >
                                                    {room.base_price} ₽
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                    </TableBody>
                </Table>
            </div>
            {/* <BookingSlider 
                selection={bookingSelection}
                onClose={handleSliderClose} 
                onSubmit={handleBookingSubmit} 
            /> */}
        </>
    )
}

export { CalendarDay, BookingTable };