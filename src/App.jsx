import Footer from "./components/Footer"
import Header from "./components/Header"
import { Outlet } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"

function App() {

  return (
    <>
      <Header />
      <Analytics />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
