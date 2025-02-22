import { TZDate } from "@date-fns/tz";
import type {
    EndOfWeekOptions,
    StartOfWeekOptions,
    FormatOptions as DateFnsFormatOptions,
  } from "date-fns";

  import type { Locale } from "date-fns/locale";
  import { ru } from "date-fns/locale";

import { Numerals } from "../types/shared";

export interface DateLibOptions
  extends DateFnsFormatOptions,
    StartOfWeekOptions,
    EndOfWeekOptions {
  /** A constructor for the `Date` object. */
  Date?: typeof Date;
  /** A locale to use for formatting dates. */
  locale?: Locale;
  /**
   * A time zone to use for dates.
   *
   * @since 9.5.0
   */
  timeZone?: string;
  /**
   * The numbering system to use for formatting numbers.
   *
   * @since 9.5.0
   */
  numerals?: Numerals;
}

export class DateLib {

  readonly options: DateLibOptions;

  readonly overrides?: Partial<typeof DateLib.prototype>;

  constructor(
    options?: DateLibOptions,
    overrides?: Partial<typeof DateLib.prototype>
  ) {
    this.options = { locale: ru, ...options };
    this.overrides = overrides;
  }

  Date: typeof Date = Date;


today = (): Date => {
    if (this.overrides?.today) {
      return this.overrides.today();
    }
    if (this.options.timeZone) {
      return TZDate.tz(this.options.timeZone);
    }
    return new this.Date();
  };

  getWeekDays(): string[] {
    return ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
  getDaysInMonth(date: Date): Date[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    return Array.from({ length: daysInMonth }, (_, i) => 
      new Date(year, month, i + 1)
    );
  }
}

export const defaultDateLib = new DateLib();