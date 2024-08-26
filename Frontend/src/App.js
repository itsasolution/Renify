// import './App.css';
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';
import AppRoutes from './AppRoutes';
import ScrollToTop from "./components/ScrollToTop";
import Loader2 from "./components/loader/Loader2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./components/Navbar components/Navbar";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./context/context";
import { useLocation } from "react-router-dom";
import MobileNavMenu from "./components/Navbar components/MobileNavMenu";

function App() {
  const { user, loader, setLoader } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    setLoader(true);
    window.onload = () => {
      setLoader(false);
    };
    const timeoutId = setTimeout(() => {
      setLoader(false);
    }, 800);
    return () => clearTimeout(timeoutId);
  }, [location.pathname]);


  return (
    <div className="duration-300 bg-[#f9f9f9] text-blue-950 dark:bg-slate-950 dark:text-white">
      <Navbar />
      <MobileNavMenu />
      {loader ? (
        <Loader2 />
      ) : (
        <>
          <ScrollToTop />
          <AppRoutes user={user} />
          <Footer />
          <Toaster />
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default App;
