import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./components/Pages/LoginPage";
import { SignINPage } from "./components/Pages/SignINPage";
import { HomePage } from "./components/Pages/Homepage/HomePage";
import { ProviderRegister } from "./components/Provider/PoviderRegister";
import AddVehicle from "./components/Provider/AddVehicle";
import { MyVehicles } from "./components/Provider/MyVehicles";
import { Contact } from "./components/Pages/Contact";
import VehiclesPage from "./components/Pages/VehiclePages/VehiclesPage";
import { VehicleDetails } from "./components/Pages/VehiclePages/VehicleDetails";
import ProfilePage from "./components/Pages/Profile page/ProfilePage";
import Examples from "./components/Helper model/Examples";
import { VehicleEdit } from "./components/Provider/VehicleEdit";
import BookedVehiclePage from "./components/Pages/Booking Pages/BookedVehiclePage";
import MyRides from "./components/Pages/MyRides";
import RecentBookingDetails from "./components/Pages/Booking Pages/RecentBookingDetails";
import ProviderBookingsPage from "./components/Pages/Booking Pages/ProviderBookingsPage";

const AppRoutes = ({ user }) => {
  return (
    <>
      {/* effects */}
      <div className="hidden z-0 pointer-events-none dark:block relative h-full w-full bg-slate-950">
        <div className=" hidden md:block fixed left-[-25%] opacity-85 top-[0%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div className=" hidden md:block fixed right-[-20%] top-[20%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      </div>
      <div className="z-20">
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="examples" element={<Examples />} />
          <Route path="/user-login" element={<LoginPage who={"user"} />} />
          <Route path="/sign-in" element={<SignINPage />} />
          <Route
            path="/provider-login"
            element={<LoginPage who={"provider"} />}
          />
          <Route path="/provider-sign-in" element={<ProviderRegister />} />
          <Route path="/ProviderBookingsPage" element={<ProviderBookingsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/vehicles/:vtype" element={<VehiclesPage />} />
          <Route path="/vehicledetails/:id" element={<VehicleDetails />} />
          <Route path="/BookedVehiclePage/:bookingId" element={<BookedVehiclePage />} />
          <Route
            path="/recentBookingsDetails/:bookingId"
            element={<RecentBookingDetails />}
          />
          <Route path="/vehicleEdit/:id" element={<VehicleEdit />} />
          <Route
            path="/profile"
            element={user ? <ProfilePage /> : <Navigate to={"/user-login"} />}
          />
          <Route
            path="/myrides"
            element={user ? <MyRides /> : <Navigate to={"/user-login"} />}
          />
          <Route
            path="/addvehicle"
            element={
              user ? <AddVehicle /> : <Navigate to={"/provider-login"} />
            }
          />
          <Route
            path="/myvehicles"
            element={
              user ? <MyVehicles /> : <Navigate to={"/provider-login"} />
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default AppRoutes;
