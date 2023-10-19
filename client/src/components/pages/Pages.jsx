import React, { useContext } from "react"
import Header from "../common/header/Header"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "../home/Home"
import Footer from "../common/footer/Footer"
import About from "../about/About"
import Blog from "../blog/Blog"
import Services from "../services/Services"
import Contact from "../contact/Contact"
import { Login } from "../LogReg/Login"
import { Register } from "../LogReg/Register"
import { Dashboard } from "../dashboard/Dashboard"
import { UserContext } from "../../contexts/UserContext"



const Pages = () => {

  const { islogged } = useContext(UserContext)

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/services' element={<Services />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/rooms' element={<Blog />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/:id/dashboard' element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default Pages
