import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/header'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Footer from './components/footer/footer'
import Layout from './components/layout/layout'
import Properties from './pages/Properties'
import { BookingTable } from './components/bookingTable/bookingTable'
import { Room } from '@/types/room'
import { useState } from 'react'
import { Booking } from '@/types/booking'
import { mockRooms } from "@/mocks/rooms.ts"
import { mockBookings } from "@/mocks/bookings.ts"
// import Home from './pages/Home'
// import Documentation from './pages/Documentation'
// import Installation from './pages/Installation'
// import Typography from './pages/Typography'
// import Components from './pages/Components'

function App() {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Layout>
            <Routes>
              <Route path="/properties" element={<Properties properties={rooms} />} />
              <Route path="/calendar" element={
                <BookingTable
                  apartments={rooms}
                  bookings={bookings}
                  onBookingCreate={(booking: Booking) => {
                    setBookings([...bookings, booking]);
                  }}
                />
              } />
              {/* <Route path="/" element={<Home />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/docs/installation" element={<Installation />} />
              <Route path="/docs/primitives/typography" element={<Typography />} />
              <Route path="/components" element={<Components />} /> */}
              {/* Добавьте другие маршруты по необходимости */}
            </Routes>
          </Layout>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
