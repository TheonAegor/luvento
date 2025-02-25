import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { BookingTableHeader } from "../bookingTableHeader/bookingTableHeader";
import { useState } from "react";
import { addMonths, endOfMonth } from "date-fns";
import { startOfMonth } from "date-fns";
import { format, subMonths } from "date-fns";
import { eachDayOfInterval } from "date-fns/eachDayOfInterval";
import { defaultDateLib } from "../classes/dateLib";
import { Room } from "@/types/room";
import { Booking } from "@/types/booking";
import { formatOptions } from '@/lib/i18n';

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

    return (
        <Table>
            <BookingTableHeader interval={daysInRange} />
            <TableBody>
            {apartments.map(room => (
                            <TableRow key={room.uuid}>
                                <TableCell>
                                    {room.number}
                                </TableCell>
                                {daysInRange.map(day => (
                                    <TableCell
                                        key={format(day, 'yyyy-MM-dd')}
                                        className={``}
                                    >
                                            {room.base_price} ₽
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
            </TableBody>
        </Table>
    )
}

export { CalendarDay, BookingTable };