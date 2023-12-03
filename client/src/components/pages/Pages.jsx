import React, { useContext } from "react";
import Header from "../common/header/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../home/Home";
import Footer from "../common/footer/Footer";
import About from "../about/About";
import Blog from "../blog/Blog";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import { Login } from "../LogReg/Login";
import { Register } from "../LogReg/Register";
import { Dashboard } from "../dashboard/Dashboard";
import { Rooms } from "../Rooms/Rooms";
import { BookRooms } from "../Rooms/BookRooms";
import { AllRooms } from "../Rooms/AllRooms";
import { GuestList } from "../Guests/GuestList";
import { SelectRoom } from "../Rooms/SelectRoom";

// import { PrivateRoute } from "../Routes/Private.js";
import { useAuth } from "../../contexts/auth";
import { MyBookings } from "../dashboard/MyBookings";
import { GuestDetails } from "../Rooms/GuestDetails";
import { ReportList } from "../Guests/userReport";

const Pages = () => {
  const { auth, isAdmin } = useAuth();

  const ProtectedRoute = ({ children }) => {
    // if (!auth.user) {
    //   return <Navigate to="/" />
    // }
    // if (!isAdmin)
    //   return <Navigate to="/" />

    return children;
  };

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/services" element={<Services />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/rooms" element={<Blog />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route
            exact
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/rooms"
            element={
              <ProtectedRoute>
                <Rooms />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/book/rooms"
            element={
              <ProtectedRoute>
                <BookRooms />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/allrooms"
            element={
              <ProtectedRoute>
                <AllRooms />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/guests"
            element={
              <ProtectedRoute>
                <GuestList />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/select-room"
            element={
              <ProtectedRoute>
                <SelectRoom />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/mybooking"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/guestDetails"
            element={
              <ProtectedRoute>
                <GuestDetails />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/reports"
            element={
              <ProtectedRoute>
                <ReportList />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default Pages;
