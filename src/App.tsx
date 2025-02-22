import { useState } from "react"
import { defaultDateLib } from "./classes/DateLib.ts"
import BookingTable from "./components/BookingTable.tsx"
import { TopMenu } from "./components/TopMenu.tsx"
import { Selection } from "./classes/BookingTable.ts"
import { mockRooms } from "./mocks/rooms.ts"
import { RoomForm } from "./components/RoomForm"
import { CreateRoomDto, Room } from "./types/room"
import { Modal } from "./components/Modal"
import { mockBookings } from "./mocks/bookings"
import { Booking, BookingStatus } from "./types/booking"
import { BookingFormData } from "./types/booking"
import { BookingSelection } from "./types/booking"

function App() {
    const dateLib = defaultDateLib;
    const [showRoomForm, setShowRoomForm] = useState(false);
    const [rooms, setRooms] = useState<Room[]>(mockRooms);
    const [bookings, setBookings] = useState<Booking[]>(mockBookings);

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

    const handleBookingCreate = (bookingData: Omit<Booking, 'uuid' | 'create_date' | 'update_date'>) => {
        const newBooking: Booking = {
            ...bookingData,
            uuid: crypto.randomUUID(),
            create_date: new Date(),
            update_date: new Date()
        };
        setBookings(prev => [...prev, newBooking]);
    };

    return (
        <div style={{ paddingTop: '80px' }}>
            <TopMenu onAddRoom={handleAddRoom} />
            <BookingTable 
                apartments={rooms} 
                bookings={bookings}
                onBookingCreate={handleBookingCreate}
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
