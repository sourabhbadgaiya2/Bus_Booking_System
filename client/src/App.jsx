import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import Loader from "./components/Loader";
import AdminUser from "./pages/admin/AdminUser";
import AdminHome from "./pages/admin/AdminHome";
import AdminBuses from "./pages/admin/AdminBuses";
import AdminBookings from "./pages/admin/AdminBookings";

import { useSelector } from "react-redux";
import Booknow from "./pages/Booknow";
import Bookings from "./pages/Bookings";

const App = () => {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <div>
      {loading && <Loader />}

      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/login'
            element={
              <PublicRoutes>
                <LoginPage />
              </PublicRoutes>
            }
          />
          <Route
            path='/register'
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />

          {/* Admin */}
          {/* <Route
            path='/admin'
            element={
              <ProtectedRoutes>
                <AdminHome />
              </ProtectedRoutes>
            }
          /> */}
          <Route
            path='/admin/buses'
            element={
              <ProtectedRoutes>
                <AdminBuses />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/admin/users'
            element={
              <ProtectedRoutes>
                <AdminUser />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/admin/bookings'
            element={
              <ProtectedRoutes>
                <AdminBookings />
              </ProtectedRoutes>
            }
          />
          {/* show bus card */}
          <Route
            path='/book-now/:id'
            element={
              <ProtectedRoutes>
                <Booknow />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/bookings'
            element={
              <ProtectedRoutes>
                <Bookings />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
