import { Navigate, Route, Routes } from 'react-router-dom';
// import './App.css';
import { LoginPage } from './components/Pages/LoginPage';
import { SignINPage } from './components/Pages/SignINPage';
import { HomePage } from './components/Pages/Homepage/HomePage';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { UserContext } from './context/context';
import { MyRides } from './components/Pages/MyRides';
import { ProviderRegister } from './components/Provider/PoviderRegister';
import AddVehicle from './components/Provider/AddVehicle';
import { MyVehicles } from './components/Provider/MyVehicles';
import { Contact } from './components/Pages/Contact';
import VehiclesPage from './components/Pages/VehiclePages/VehiclesPage';
import { VehicleDetails } from './components/Pages/VehiclePages/VehicleDetails';
import ProfilePage from './components/Pages/ProfilePage';

function App() {
  const { user } = useContext(UserContext)
  return (
    < div className='duration-300 bg-white text-blue-950 dark:bg-blue-950 dark:text-white' >
      <Navbar />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/user-login" element={<LoginPage who={"user"} />} />
        <Route path="/sign-in" element={<SignINPage />} />
        <Route path="/provider-login" element={<LoginPage who={"provider"} />} />
        <Route path="/provider-sign-in" element={<ProviderRegister />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
        <Route path="/vehicledetails/:id" element={<VehicleDetails />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to={"/user-login"} />} />
        <Route path="/myrides" element={user ? <MyRides /> : <Navigate to={"/user-login"} />} />
        <Route path='/addvehicle' element={user ? <AddVehicle /> : <Navigate to={"/provider-login"} />} />
        <Route path='/myvehicles' element={user ? <MyVehicles /> : <Navigate to={"/provider-login"} />} />
      </Routes>
      <Footer />
      <Toaster />
    </div >

  );
}

export default App;
