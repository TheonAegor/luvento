import { format, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from '../styles/BookingTable.module.css';

interface BookingTableHeaderProps {
    currentMonth: Date;
}

export default function BookingTableHeader({ currentMonth }: BookingTableHeaderProps) {
    // Получаем все дни текущего месяца
    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth)
    });

    return (
        <thead>
            <tr>
                <th className={styles.apartmentColumn}>Квартира</th>
                {daysInMonth.map((day) => (
                    <th 
                        key={format(day, 'yyyy-MM-dd')}
                        className={styles.dateColumn}
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