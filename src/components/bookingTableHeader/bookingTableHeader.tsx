import { TableHead, TableHeader, TableRow } from "../ui/table";
import { format, isWeekend } from 'date-fns';
import { formatOptions, useTranslation } from '@/lib/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BookingTableHeaderProps {
    interval: Array<Date>;
}

export function BookingTableHeader({ interval }: BookingTableHeaderProps) {
    const { language } = useLanguage();
    const t = useTranslation(language);
    const options = formatOptions(language);

    window.__localeId__ = options.locale;
    // Группируем даты по месяцам
    const months = interval.reduce((acc, date) => {
        const monthKey = format(date, 'yyyy-MM');
        if (!acc[monthKey]) {
            acc[monthKey] = {
                name: format(date, 'LLLL yyyy'),
                dates: []
            };
        }
        acc[monthKey].dates.push(date);
        return acc;
    }, {} as Record<string, { name: string; dates: Date[] }>);

    return (
        <TableHeader>
            <TableRow>
                <TableHead className="w-[200px] min-w-[200px] bg-white dark:bg-gray-800 border-r shadow-[1px_0_0_0_rgba(0,0,0,0.1)]">
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
                    >
                        {month.name}
                    </TableHead>
                ))}
            </TableRow>
            <TableRow>
                <TableHead className="w-[200px] min-w-[200px] bg-white dark:bg-gray-800 border-r shadow-[1px_0_0_0_rgba(0,0,0,0.1)]">
                    <div className="flex items-center gap-2 p-2">
                        {t.table.object}
                    </div>
                </TableHead>
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
                                {format(day, 'EEEEEE')}
                            </div>
                        </div>
                    </TableHead>
                ))}
            </TableRow>
        </TableHeader>
    )
}