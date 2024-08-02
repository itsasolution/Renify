// import './App.css';
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';
import AppRoutes from './AppRoutes';
import { Navbar } from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

  return (
    <div className="duration-300  bg-white/95 text-blue-950 dark:bg-slate-950 dark:text-white">
      {/* {
        loading ?
          <Loader /> : ""
      } */}
      <ScrollToTop />
      <Navbar />
      <AppRoutes />
      <Footer />
      <Toaster />
      <ToastContainer />

    </div>
  );
}

export default App;
