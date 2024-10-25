//tuto greatStack how to create full stack delivery reactjs
//pour lancer le frontend  terminal => cd frontend puis npm run dev

// OBLIGATOIRE DE LANCER admin puis backend AFIN QU'ILS COMMUNIQUENT ENSEMBLE!!! SINON PAS IMAGES AFFICHEES, orders

import Navbar from "./components/navbar/Navbar"
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/home/Home"
import Cart from "./pages/cart/Cart"
import PlaceOrder from "./pages/placeOrder/PlaceOrder"
import Footer from "./components/footer/Footer"
import { useState } from "react"
import LoginPopup from "./components/LoginPopup/LoginPopup"
import Verify from "./verify/Verify"
import MyOrders from "./pages/myOrders/MyOrders"

function App() {
  const [showLogin, setShowLogin]=useState(false)//2:16:29
  
  return (
    <>
    {showLogin? <LoginPopup setShowLogin={setShowLogin}/> : <></>}  {/* ternair oparator */}
    {/** si showLogin est true alors montre composant LoginPopup sinon rien */}
  
  
  
    <div className="app">
      <Navbar setShowLogin ={setShowLogin}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/order" element={<PlaceOrder/>}/>
        <Route path="/verify" element={<Verify/>}/>   {/**ajout 8:34:19 */}
        <Route path="/myorders" element={<MyOrders/>}/> {/**ajout 8:52:51  le récap des commandes d'un user*/}
      </Routes>
      <Footer/>
    </div>
    
      
        
    </>
  )
}

export default App
