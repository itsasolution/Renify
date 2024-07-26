import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./components/Pages/LoginPage";
import { SignINPage } from "./components/Pages/SignINPage";
import { HomePage } from "./components/Pages/Homepage/HomePage";
import { useContext } from "react";
import { UserContext } from "./context/context";
import { MyRides } from "./components/Pages/MyRides";
import { ProviderRegister } from "./components/Provider/PoviderRegister";
import AddVehicle from "./components/Provider/AddVehicle";
import { MyVehicles } from "./components/Provider/MyVehicles";
import { Contact } from "./components/Pages/Contact";
import VehiclesPage from "./components/Pages/VehiclePages/VehiclesPage";
import { VehicleDetails } from "./components/Pages/VehiclePages/VehicleDetails";
import ProfilePage from "./components/Pages/Profile page/ProfilePage";

const AppRoutes = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      {/* effects */}
      <div className="hidden z-0 pointer-events-none dark:block relative h-full w-full bg-slate-950">
        <div className=" hidden md:block fixed left-[-25%] opacity-85 top-[0%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div className=" hidden md:block fixed right-[-20%] top-[20%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      </div>
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div> */}
      <div className="z-20">
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/user-login" element={<LoginPage who={"user"} />} />
          <Route path="/sign-in" element={<SignINPage />} />
          <Route
            path="/provider-login"
            element={<LoginPage who={"provider"} />}
          />
          <Route path="/provider-sign-in" element={<ProviderRegister />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/vehicledetails/:id" element={<VehicleDetails />} />
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
