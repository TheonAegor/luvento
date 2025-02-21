import { defaultDateLib } from "./classes/DateLib.ts"
import BookingTable from "./components/BookingTable.tsx"
import { Selection } from "./classes/BookingTable.ts"

function App() {

  const dateLib = defaultDateLib

  const apartments = [
    { id: 1, name: 'Апартаменты 1' },
    { id: 2, name: 'Апартаменты 2' },
    { id: 3, name: 'Апартаменты 3' },
  ]

  const handleSelectionChange = (selection: Selection) => {
    console.log('Selected:', selection);
  };

  return ( 
  <BookingTable apartments={apartments} currentMonth={dateLib.today()} onSelectionChange={handleSelectionChange} />
)
}

export default App
