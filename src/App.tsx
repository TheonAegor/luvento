import { defaultDateLib } from "./classes/DateLib.ts"
import BookingTable from "./components/BookingTable.tsx"
import { TopMenu } from "./components/TopMenu.tsx"
import { Selection } from "./classes/BookingTable.ts"
import { mockRooms } from "./mocks/rooms.ts"

function App() {
    const dateLib = defaultDateLib;

    const handleSelectionChange = (selection: Selection) => {
        console.log('Selected:', selection);
    };

    const handleAddRoom = () => {
        console.log('Добавление нового объекта');
        // Здесь будет открытие формы добавления объекта
    };

    return (
        <div style={{ paddingTop: '80px' }}>
            <TopMenu onAddRoom={handleAddRoom} />
            <BookingTable 
                apartments={mockRooms} 
                currentMonth={dateLib.today()} 
                onSelectionChange={handleSelectionChange} 
            />
        </div>
    );
}

export default App;
