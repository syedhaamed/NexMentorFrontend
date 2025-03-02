import Footer from "./components/Footer"
import Header from "./components/Header"
import { Outlet } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"
import WhatsAppButton from "./components/WhatsappIcon"

function App() {

  return (
    <>
      <Header />
      <WhatsAppButton />
      <Analytics />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
