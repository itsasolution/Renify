// import './App.css';
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';
import AppRoutes from './AppRoutes';
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./components/Navbar components/Navbar";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./context/context";
import { useLocation } from "react-router-dom";

function App() {
  const { user, loader, setLoader } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    setLoader(true);
    // This will be called when the window has completely loaded
    window.onload = () => {
      setLoader(false);
    };
  }, []);

  useEffect(() => {
    setLoader(true);

    // Fake delay to simulate loading process
    const timeoutId = setTimeout(() => {
      setLoader(false);
    }, 500); // Adjust the delay if needed

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  return (
    <div className="duration-300 bg-[#f9f9f9] text-blue-950 dark:bg-slate-950 dark:text-white">
      <Navbar />
      {loader ? (
        <Loader />
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
