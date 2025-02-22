import { defaultDateLib } from "./classes/DateLib.ts"
import BookingTable from "./components/BookingTable.tsx"
import { Selection } from "./classes/BookingTable.ts"
import { mockRooms } from "./mocks/rooms.ts"

function App() {

  const dateLib = defaultDateLib

  const handleSelectionChange = (selection: Selection) => {
    console.log('Selected:', selection);
  };

  return ( 
  <BookingTable apartments={mockRooms} currentMonth={dateLib.today()} onSelectionChange={handleSelectionChange} />
)
}

export default App
