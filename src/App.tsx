import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/header'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Footer from './components/footer/footer'
import Layout from './components/layout/layout'
import Properties from './pages/Properties'
import { BookingTable } from './components/bookingTable/bookingTable'
import { useState } from 'react'
import { Booking } from '@/types/booking'
import { mockRooms } from "@/mocks/rooms.ts"
import { mockBookings } from "@/mocks/bookings.ts"
import { Property, PropertyModel } from "@/types/property"
import { PropertyForm } from "@/components/property/propertyForm"

function App() {
  const [properties, setProperties] = useState<Property[]>(mockRooms);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

  const handlePropertySubmit = (propertyData: Partial<Property>) => {
    const newProperty = new PropertyModel({
      ...propertyData,
      uuid: crypto.randomUUID(),
      create_date: new Date(),
      update_date: new Date(),
    });
    
    setProperties(prevProperties => [...prevProperties, newProperty]);
    console.log("Новый объект:", newProperty.toJSON());
  };

  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Layout>
            <Routes>
              <Route 
                path="/properties" 
                element={<Properties properties={properties} />} 
              />
              <Route 
                path="/calendar" 
                element={
                  <BookingTable
                    apartments={properties}
                    bookings={bookings}
                    onBookingCreate={(booking: Booking) => {
                      setBookings([...bookings, booking]);
                    }}
                  />
                } 
              />
              <Route 
                path="/properties/new" 
                element={<PropertyForm onSubmit={handlePropertySubmit} />} 
              />
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
