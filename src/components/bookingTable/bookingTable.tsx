import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { BookingTableHeader } from "./bookingTableHeader";
import { useState, useEffect, useCallback, useRef } from "react";
import { addMonths, endOfMonth, isToday, isWeekend } from "date-fns";
import { startOfMonth, format, subMonths } from "date-fns";
import { eachDayOfInterval } from "date-fns/eachDayOfInterval";
import { defaultDateLib } from "../classes/dateLib";
import { Room } from "@/types/room";
import { Booking, BookingSelection, BookingStatus } from "@/types/booking";
import { useHorizontalScroll } from "../helpers/userHorizontalScroll";
import BookingForm from './BookingSlider';
import { BookingFormData } from "@/types/booking";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface Selection {
  apartmentUUIDs: string[];
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
  );
}

interface BookingTableProps {
  apartments: Room[];
  bookings: Booking[];
  onBookingCreate: (booking: Booking) => void;
  onSelectionChange?: (selection: Selection) => void;
}

function BookingTable({ apartments, bookings, onBookingCreate, onSelectionChange }: BookingTableProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const containerRef = useRef<HTMLTableElement>(null);
  const scrollRef = useHorizontalScroll(containerRef);
  const [bookingSelection, setBookingSelection] = useState<BookingSelection[] | null>(null);

  const [dateRange, setDateRange] = useState(() => {
    const today = defaultDateLib.today();
    return {
      start: startOfMonth(subMonths(today, 1)),
      end: endOfMonth(addMonths(today, 3)),
    };
  });

  const daysInRange = eachDayOfInterval({
    start: dateRange.start,
    end: dateRange.end,
  });

  // Обработчик нажатия на день
  const handleMouseDown = (apartmentId: string, date: Date) => {
    setIsSelecting(true);
    const newSelection: Selection = {
      apartmentUUIDs: [apartmentId],
      startDate: date,
      endDate: date,
    };
    setSelection(newSelection);
    
    // Создаем массив с одним элементом BookingSelection
    setBookingSelection([{
      rooms: [apartmentId],
      arrival_date: date,
      departure_date: date,
    }]);
  };

  // Обработчик наведения на день
  const handleMouseEnter = (apartmentId: string, date: Date) => {
    if (isSelecting && selection !== null) {
      // Проверяем, есть ли уже этот apartmentId в массиве
      if (!selection.apartmentUUIDs.includes(apartmentId)) {
        // Добавляем новый apartmentId в массив
        const newApartmentUUIDs = [...selection.apartmentUUIDs, apartmentId];
        
        const newSelection: Selection = {
          apartmentUUIDs: newApartmentUUIDs,
          startDate: selection.startDate,
          endDate: selection.endDate, // Используем ту же дату окончания
        };
        setSelection(newSelection);
        
        // Обновляем массив BookingSelection для всех выбранных номеров
        // с одинаковым диапазоном дат
        const newBookingSelections = newApartmentUUIDs.map(roomId => ({
          rooms: [roomId],
          arrival_date: selection.startDate,
          departure_date: selection.endDate,
        }));
        
        setBookingSelection(newBookingSelections);
      } else if (date !== selection.endDate) {
        // Если apartmentId уже есть, но дата изменилась, обновляем дату окончания
        const newSelection: Selection = {
          ...selection,
          endDate: date,
        };
        setSelection(newSelection);
        
        // Обновляем массив BookingSelection с новой датой окончания
        const newBookingSelections = selection.apartmentUUIDs.map(roomId => ({
          rooms: [roomId],
          arrival_date: selection.startDate,
          departure_date: date,
        }));
        
        setBookingSelection(newBookingSelections);
      }
    }
  };

  const isBooked = (roomId: string, date: Date) => {
    return bookings.some(
      (booking) =>
        booking.room_uuid === roomId &&
        date >= booking.start_date &&
        date <= booking.end_date
    );
  };

  const isSelected = (apartmentId: string, date: Date) => {
    if (!selection) return false;

    const isApartmentSelected = selection.apartmentUUIDs.some(uuid => uuid === apartmentId);
    const isDateSelected = date >= selection.startDate && date <= selection.endDate;
    return isApartmentSelected && isDateSelected;
  };

  const handleSheetClose = () => {
    setIsSheetOpen(false);
    setSelection(null);
    setBookingSelection(null);
    setIsSelecting(false);
  };

  const handleBookingSubmit = async (formData: BookingFormData & { selections: BookingSelection[] }) => {
    try {
      console.log('Отправка данных бронирования:', formData);
      
      // Создаем массив для хранения новых бронирований
      const newBookings: Booking[] = [];
      
      // Для каждого выбранного номера создаем бронирование
      formData.selections.forEach(selection => {
        selection.rooms.forEach(roomId => {
          newBookings.push({
            uuid: crypto.randomUUID(),
            create_date: new Date(),
            update_date: new Date(),
            room_uuid: roomId,
            start_date: selection.arrival_date,
            end_date: selection.departure_date,
            guest_name: `${formData.client_name} ${formData.client_surname || ''}`,
            guest_phone: formData.phone || '',
            guest_email: formData.email || '',
            status: BookingStatus.PENDING,
          });
        });
      });

      // Отправляем каждое новое бронирование
      newBookings.forEach(newBooking => onBookingCreate(newBooking));
      
      handleSheetClose();
    } catch (error) {
      console.error('Ошибка при создании бронирования:', error);
    }
  };

  function handleMouseUp() {
    setIsSelecting(false);
    setIsSheetOpen(true);
  }

  useEffect(() => {
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
        <Table ref={containerRef}>
          <BookingTableHeader interval={daysInRange} />
          <TableBody>
            {apartments.map((room) => (
              <TableRow key={room.uuid}>
                <TableCell className="sticky left-0 z-20 w-[200px] min-w-[200px] bg-white dark:bg-gray-800 border-r shadow-[1px_0_0_0_rgba(0,0,0,0.1)]">
                  <div className="p-2">{room.number}</div>
                </TableCell>
                {daysInRange.map((day) => (
                  <TableCell
                    key={format(day, 'yyyy-MM-dd')}
                    className={`
                        ${isSelected(room.uuid, day) ? 'bg-blue-500 text-white' : ''} 
                        ${isToday(day) ? 'bg-blue-500 text-white' : ''} 
                        ${isWeekend(day) ? 'bg-gray-200' : ''}
                        ${isBooked(room.uuid, day) ? 'bg-red-500 text-white' : ''}
                    `}
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

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Создание бронирования</SheetTitle>
          </SheetHeader>
          <BookingForm
            selection={bookingSelection}
            onClose={handleSheetClose}
            onSubmit={handleBookingSubmit}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}

export { CalendarDay, BookingTable };