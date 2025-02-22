import { format, isWeekend, isToday } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from '../styles/BookingTable.module.css';

interface BookingTableHeaderProps {
    interval: Array<Date>;
}

export function BookingTableHeader({ interval }: BookingTableHeaderProps) {

    return (
        <thead>
            <tr>
                <th className={styles.apartmentColumn}>Квартира</th>
                {interval.map((day) => (
                    <th 
                        key={format(day, 'yyyy-MM-dd')}
                        className={`
                            ${styles.dateColumn}
                            ${isWeekend(day) ? styles.weekendCell : ''}
                            ${isToday(day) ? styles.todayCell : ''}
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