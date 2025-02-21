import React, { type HTMLAttributes } from "react";
import CalendarDay from '../classes/CalendarDay.ts';
import { Modifiers } from "../types/shared";
import { format } from 'date-fns';

export default function Day(
    props: {
        day: CalendarDay;
        modifiers: Modifiers;
    }  & HTMLAttributes<HTMLDivElement>
) {
    const { day, modifiers: _modifiers, ...tdProps } = props;
    const formattedDate = format(day.date, "EEEE, MMMM d, yyyy h:mm a");

    return <td> {formattedDate} </td>;
}