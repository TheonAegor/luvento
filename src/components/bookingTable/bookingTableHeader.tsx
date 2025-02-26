import { TableHead, TableHeader, TableRow } from "../ui/table";
import { format, isWeekend, isFirstDayOfMonth } from 'date-fns';
import { useTranslation } from '@/lib/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BookingTableHeaderProps {
    interval: Array<Date>;
}

export function BookingTableHeader({ interval }: BookingTableHeaderProps) {
    const { language } = useLanguage();
    const t = useTranslation(language);

    // Группируем даты по месяцам
    const months = interval.reduce((acc, date) => {
        const monthKey = format(date, 'yyyy-MM');
        if (!acc[monthKey]) {
            acc[monthKey] = {
                name: format(date, 'LLLL yyyy'),
                dates: [],
                colSpan: 0 // добавляем счетчик дней
            };
        }
        acc[monthKey].dates.push(date);
        acc[monthKey].colSpan++; // увеличиваем счетчик для каждого дня
        return acc;
    }, {} as Record<string, { name: string; dates: Date[]; colSpan: number }>);

    return (
        <TableHeader>
            <TableRow>
                <TableHead className="sticky left-0 z-20 w-[200px] min-w-[200px] bg-white dark:bg-gray-800 border-r shadow-[1px_0_0_0_rgba(0,0,0,0.1)]">
                    <div className="flex items-center gap-2 p-2">
                        <Search className="w-4 h-4 text-gray-500" />
                        <Input 
                            type="search"
                            placeholder={t.table.searchPlaceholder}
                            className="h-8"
                        />
                    </div>
                </TableHead>
                {Object.values(months).map(month => (
                    <TableHead
                        key={month.name}
                        colSpan={month.colSpan} // используем colSpan для растягивания
                        className="text-center border-b"
                    >
                        {month.name}
                    </TableHead>
                ))}
            </TableRow>
            <TableRow>
                <TableHead className="sticky left-0 z-20 w-[200px] min-w-[200px] bg-white dark:bg-gray-800 border-r shadow-[1px_0_0_0_rgba(0,0,0,0.1)]">
                    <div className="flex items-center gap-2 p-2">
                        {t.table.object}
                    </div>
                </TableHead>
                {interval.map((day) => (
                    <TableHead 
                        key={format(day, 'yyyy-MM-dd')}
                        className={`
                            ${isWeekend(day) ? 'bg-gray-200' : ''}
                            ${isFirstDayOfMonth(day) ? 'border-l-2 border-gray-300' : ''}
                        `}
                    >
                        <div>
                            <div>{format(day, 'd')}</div>
                            <div>
                                {format(day, 'EEEEEE')}
                            </div>
                        </div>
                    </TableHead>
                ))}
            </TableRow>
        </TableHeader>
    )
}