// import './App.css';
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';
import AppRoutes from './AppRoutes';
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./components/Navbar components/Navbar";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "./context/context";



function App() {
  const { user, loader, setLoader } = useContext(UserContext);

  useEffect(() => {
    setLoader(true);
    // This will be called when the window has completely loaded
    window.onload = () => {
      setLoader(false);
    };
  }, []);

  return (
    <div className="duration-300 bg-[#f9f9f9] text-blue-950 dark:bg-slate-950 dark:text-white">
      <Navbar />
      {loader ? (
        <Loader />
      ) :
        <>
          <ScrollToTop />
          <AppRoutes user={user} />
          <Footer />
          <Toaster />
          <ToastContainer />
        </>
      }

    </div>
  );
}

export default App;
