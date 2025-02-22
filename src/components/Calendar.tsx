// src/components/Calendar/Calendar.tsx
import { useState } from 'react';
import { DateLib, defaultDateLib } from '../classes/DateLib';
import CalendarHeader from './CalendarHeader';
import CalendarDay from './CalendarDay';

interface CalendarProps {
    dateLib: DateLib;
    mode?: 'single' | 'multiple' | 'range';
    selected?: Date | Date[] | { from?: Date; to?: Date };
    onSelect?: (date: Date | Date[] | { from?: Date; to?: Date } | undefined) => void;
}

export default function Calendar({ dateLib=defaultDateLib, mode = 'single', selected, onSelect }: CalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    
    const days = dateLib.getDaysInMonth(currentMonth);
    const weekDays = dateLib.getWeekDays();
    
    const handleDayClick = (date: Date) => {
      if (mode === 'single') {
        onSelect?.(date);
      }
      // Добавить логику для других режимов
    };
  
    const isSelected = (date: Date) => {
      if (!selected) return false;
      if (selected instanceof Date) {
        return dateLib.isSameDay(date, selected);
      }
      // Добавить проверки для других типов выбора
      return false;
    };
  
    return (
      <div className="calendar">
        <CalendarHeader 
          currentMonth={currentMonth}
          onPrevMonth={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
          onNextMonth={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
        />
        
        <div className="calendar-grid">
          {weekDays.map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
          
          {days.map(date => (
            <CalendarDay
              key={date.toString()}
              date={date}
              isSelected={isSelected(date)}
              isToday={dateLib.isSameDay(date, new Date())}
              onClick={handleDayClick}
            />
          ))}
        </div>
      </div>
    );
  }