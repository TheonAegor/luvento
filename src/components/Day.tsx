import { type HTMLAttributes } from "react";
import CalendarDay from '../classes/CalendarDay.ts';
import { format } from 'date-fns';

export default function Day(
    props: {
        day: CalendarDay;
    }  & HTMLAttributes<HTMLDivElement>
) {
    const { day } = props;
    const formattedDate = format(day.date, "EEEE, MMMM d, yyyy h:mm a");

    return <td> {formattedDate} </td>;
}