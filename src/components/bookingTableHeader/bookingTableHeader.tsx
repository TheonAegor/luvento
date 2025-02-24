import { TableHead, TableHeader, TableRow } from "../ui/table";
import { format, isWeekend, isToday, isSameMonth } from 'date-fns';
import { ru } from 'date-fns/locale';
interface BookingTableHeaderProps {
    interval: Array<Date>;
}

export function BookingTableHeader({ interval }: BookingTableHeaderProps) {
        // Группируем даты по месяцам
        const months = interval.reduce((acc, date) => {
            const monthKey = format(date, 'yyyy-MM');
            if (!acc[monthKey]) {
                acc[monthKey] = {
                    name: format(date, 'LLLL yyyy', { locale: ru }),
                    dates: []
                };
            }
            acc[monthKey].dates.push(date);
            return acc;
        }, {} as Record<string, { name: string; dates: Date[] }>);

    return (
        <TableHeader>
            <TableRow>
                <TableHead> // TODO: appartment columne
                </TableHead>
                {Object.values(months).map(month => (
                <TableHead
                        key={month.name}
                    >
                        {month.name}
                    </TableHead>
                ))}
            </TableRow>
            <TableRow>
                <TableHead>Объект</TableHead>
                {interval.map((day) => (
                    <TableHead 
                        key={format(day, 'yyyy-MM-dd')}
                        className={`
                            ${isWeekend(day) ? 'bg-gray-200' : ''}
                        `}
                    >
                        <div >
                            <div>{format(day, 'd')}</div>
                            <div>
                                {format(day, 'EEEEEE', { locale: ru })}
                            </div>
                        </div>
                    </TableHead>
                ))}
            </TableRow>
        </TableHeader>
    )
}