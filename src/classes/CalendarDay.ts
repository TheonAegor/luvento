import { DateLib, defaultDateLib } from "react-day-picker";

class CalendarDay {
    constructor(date: Date, dateLib: DateLib = defaultDateLib) {
        this.date = date
        this.dateLib = dateLib
    }

    readonly dateLib: DateLib

    readonly date: Date;
}
export default CalendarDay;
