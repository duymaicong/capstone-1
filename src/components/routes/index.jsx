import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// CUSTOMER
import HomePage from "../HomePage";
import Favorite from "../Favorite";
import Profile from "../Profile";
import Register from "../Register";
import Login from "../Login";
import ForgotPassword from "../ForgotPassword";
import Service from "../Service";
import About from "../About";
import History from "../History";
import Navigation from "../Navigation";
import Header from "../Header";
import Footer from "../Footer";
import Staff from "../Staff";
import { AccountRoles } from "../../constants";
import FinishBooking from "../FinishBooking";

// SALON
import RegisterSalon from "../salonOwners/RegisterSalon";
import ManageService from "../salonOwners/ManageService";
import ManageBooking from "../salonOwners/ManageBooking";
import SalonStaff from "../salonOwners/SalonStaff";
import SalonBusinessInfo from "../salonOwners/SalonBusinessInfo";
import SideMenu from "../salonOwners/SideMenu";
import Schedule from "../salonOwners/Schedule";

// import SalonProfile from "../salonOwners/SalonProfile";
// import HeaderSalon from "../salonOwners/Header";

// ADMIN
import NavigationAdmin from "../admin/Navigation";
import ManageSalon from "../admin/ManageSalon";
import DetailSalon from "../admin/DetailSalon";
import RequestForm from "../admin/RequestForm";

// MOCK UP
import SalonDashboardMockup from "../mockUp/SalonDashboardMockup";
import HomepageMockup from "../mockUp/Homepage";
import ServiceMockup from "../mockUp/Service";
import FinishBookingMockup from "../mockUp/FinishBooking";
import ProfileMockup from "../mockUp/Profile";
import StaffMockup from "../mockUp/StaffMockup";

const SwitchRoutes = () => {
  const { account } = useSelector((state) => state.loginAccount);

  if (account) {
    if (account.role === AccountRoles.Customer) {
      return (
        <>
          <Navigation />
          <Header />
          <div className="component">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/favorite" element={<Favorite />} />
              <Route path="/about" element={<About />} />
              <Route path="/history" element={<History />} />
              <Route path="/services/:salonId" element={<Service />} />
              <Route path="/staff/:serviceId" element={<Staff />} />
              <Route path="/finish_booking" element={<FinishBooking />}></Route>
              <Route path="*" element={<Navigate to="/" />} />

              <Route path="/StaffMockup/:serviceId" element={<StaffMockup />} />
            </Routes>
          </div>
          <Footer />
        </>
      );
    }
    if (account.role === AccountRoles.Salon) {
      return (
        <>
          <SideMenu />
          <div className="salon-page">
            <Routes>
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/manage_service" element={<ManageService />} />
              <Route path="/" element={<Schedule />} />{" "}
              <Route path="/Schedule" element={<Schedule />} />
              <Route path="/SalonStaff" element={<SalonStaff />} />
              <Route
                path="/SalonBusinessInfo"
                element={<SalonBusinessInfo />}
              />
              <Route path="/ManageBooking" element={<ManageBooking />} />
              {/* <Route path="/SalonBusinessInfo" element={<SalonProfile/>} /> */}
              {/* <Route path="/manage_staff" element={<ManageStaff />} /> */}
              {/* <Route path="/SalonHstory" element={<SalonHstory />} /> */}
              {/* <Route path="/addService" element={<AddService />} /> */}
            </Routes>
          </div>
          {/* </div> */}
          <Footer />
        </>
      );
    }

    if (account.role === AccountRoles.Admin) {
      return (
        <>
          <NavigationAdmin />
          <Header />
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<ManageSalon />} />{" "}
            <Route path="/DetailSalon" element={<DetailSalon />} />{" "}
            <Route path="/RequestForm" element={<RequestForm />} />{" "}
          </Routes>
          <Footer />
        </>
      );
    }
  } else {
    return (
      <>
        <Navigation />
        <Header />
        <div className="component">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Mockup */}
            <Route path="/HomepageMockup" element={<HomepageMockup />} />
            <Route
              path="/servicesMockup/:salonId"
              element={<ServiceMockup />}
            />
            <Route
              path="/FinishBookingMockup"
              element={<FinishBookingMockup />}
            />
            <Route path="/ProfileMockUp" element={<ProfileMockup />} />{" "}
            <Route
              path="SalonDashboardMockup"
              element={<SalonDashboardMockup />}
            />
            {/* User */}
            <Route path="/about" element={<About />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="forgot_password" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/login" />} />
            {/* Salon */}
            <Route path="/register_salon" element={<RegisterSalon />} />
            {/*  */}
          </Routes>
        </div>
        <Footer />
      </>
    );
  }
};

export default SwitchRoutes;
