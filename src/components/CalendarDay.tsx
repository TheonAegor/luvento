interface CalendarDayProps {
    date: Date;
    isSelected: boolean;
    isToday: boolean;
    onClick: (date: Date) => void;
  }
  
export default function CalendarDay({
    date,
    isSelected,
    isToday,
    onClick
  }: CalendarDayProps) {
    return (
      <button 
        className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
        onClick={() => onClick(date)}
      >
        {date.getDate()}
      </button>
    );
  }