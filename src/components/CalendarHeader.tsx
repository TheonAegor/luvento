interface CalendarHeaderProps {
    currentMonth: Date;
    onPrevMonth: () => void;
    onNextMonth: () => void;
  }
  
  export default function CalendarHeader({ 
    currentMonth,
    onPrevMonth,
    onNextMonth 
  }: CalendarHeaderProps) {
    return (
      <div className="calendar-header">
        <button onClick={onPrevMonth}>&lt;</button>
        <span>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <button onClick={onNextMonth}>&gt;</button>
      </div>
    );
  }