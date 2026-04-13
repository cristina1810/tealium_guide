import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Chat from './pages/Chat'
import InterfaceIQ from './pages/InterfaceIQ'
import GA4IQ from './pages/GA4IQ'
import SnapchatIQ from './pages/SnapchatIQ'
import AddToCart from './components/AddToCart'
import ChatlingIQ from './pages/ChatlingIQ'
import GenConfigIQ from './pages/GenConfigIQ'

function App() {
const [sidebarOpen, setSidebarOpen] = useState(true)

return (
  <BrowserRouter>
    <div className="bg-surface text-on-surface antialiased">

      {/* Sidebar — recibe estado desde App */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Degradado superior decorativo — se desplaza con el sidebar */}
      <div
        className={`fixed top-0 right-0 h-32 bg-gradient-to-b from-surface
          to-transparent pointer-events-none z-40 opacity-50
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'left-72' : 'left-0'}`}
      />

      {/* Contenido — margen sincronizado con el sidebar */}
      <div
        className={`min-h-screen transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'ml-72' : 'ml-0'}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/iq/interfaz" element={<InterfaceIQ/>} />
          <Route path="/iq/ga4" element={<GA4IQ/>} />
          <Route path="/iq/snapchat" element={<SnapchatIQ/>} />
          <Route path="/iq/chatling" element={<ChatlingIQ/>} />
          <Route path="/iq/configuracion" element={<GenConfigIQ/>} />

         
          
          
        </Routes>
      </div>

    </div>
  </BrowserRouter>
)
}

export default App