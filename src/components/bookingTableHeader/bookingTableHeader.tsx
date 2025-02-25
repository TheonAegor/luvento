import { TableHead, TableHeader, TableRow } from "../ui/table";
import { format, isWeekend } from 'date-fns';
import { formatOptions, useTranslation } from '@/lib/i18n';
import { useLanguage } from '@/contexts/LanguageContext';

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
                <TableHead></TableHead>
                {Object.values(months).map(month => (
                <TableHead
                        key={month.name}
                    >
                        {month.name}
                    </TableHead>
                ))}
            </TableRow>
            <TableRow>
                <TableHead>{t.table.object}</TableHead>
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