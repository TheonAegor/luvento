import { useState } from "react"
import { defaultDateLib } from "./classes/DateLib.ts"
import BookingTable from "./components/BookingTable.tsx"
import { TopMenu } from "./components/TopMenu.tsx"
import { Selection } from "./classes/BookingTable.ts"
import { mockRooms } from "./mocks/rooms.ts"
import { RoomForm } from "./components/RoomForm"
import { CreateRoomDto, Room } from "./types/room"
import { Modal } from "./components/Modal"

function App() {
    const dateLib = defaultDateLib;
    const [showRoomForm, setShowRoomForm] = useState(false);
    const [rooms, setRooms] = useState<Room[]>(mockRooms);

    const handleSelectionChange = (selection: Selection) => {
        console.log('Selected:', selection);
    };

    const handleAddRoom = () => {
        setShowRoomForm(true);
    };

    const handleRoomSubmit = (roomData: CreateRoomDto) => {
        // Создаем новую комнату с временным UUID
        const newRoom: Room = {
            ...roomData,
            uuid: crypto.randomUUID(), // Генерируем временный UUID
            create_date: new Date(),
            update_date: new Date()
        };

        // Добавляем комнату в список
        setRooms(prevRooms => [...prevRooms, newRoom]);
        
        // Закрываем форму
        setShowRoomForm(false);
    };

    return (
        <div style={{ paddingTop: '80px' }}>
            <TopMenu onAddRoom={handleAddRoom} />
            <BookingTable 
                apartments={rooms} 
                currentMonth={dateLib.today()} 
                onSelectionChange={handleSelectionChange} 
            />
            <Modal
                isOpen={showRoomForm}
                onClose={() => setShowRoomForm(false)}
            >
                <RoomForm
                    onSubmit={handleRoomSubmit}
                    onCancel={() => setShowRoomForm(false)}
                />
            </Modal>
        </div>
    );
}

export default App;
