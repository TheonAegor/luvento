import { format, isWeekend, isToday, isSameMonth } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from '../styles/BookingTable.module.css';

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
        <thead>
            <tr className={styles.monthRow}>
                <th className={styles.apartmentColumn}></th>
                {Object.values(months).map(month => (
                    <th 
                        key={month.name}
                        colSpan={month.dates.length}
                        className={styles.monthCell}
                    >
                        {month.name}
                    </th>
                ))}
            </tr>
            <tr>
                <th className={styles.apartmentColumn}>Квартира</th>
                {interval.map((day) => (
                    <th 
                        key={format(day, 'yyyy-MM-dd')}
                        className={`
                            ${styles.dateColumn}
                            ${isWeekend(day) ? styles.weekendCell : ''}
                            ${isToday(day) ? styles.todayCell : ''}
                            ${!isSameMonth(day, interval[interval.indexOf(day) - 1] || day) ? styles.monthStart : ''}
                        `}
                    >
                        <div className={styles.dateHeader}>
                            <div>{format(day, 'd')}</div>
                            <div className={styles.dayName}>
                                {format(day, 'EEEEEE', { locale: ru })}
                            </div>
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    );
}