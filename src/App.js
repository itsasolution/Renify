// import './App.css';
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';
import AppRoutes from './AppRoutes';
import { Navbar } from "./components/Navbar";
import ScrollToTop from "./ScrollToTop";

function App() {

  return (
    <div className="duration-300 bg-white/95 text-blue-950 dark:bg-slate-950 dark:text-white">
      <ScrollToTop />
      <Navbar />
      <AppRoutes />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
