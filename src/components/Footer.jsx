import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterest,
  FaInstagram,
} from "react-icons/fa";

function Footer() {
  const iconsClass = "shadow-md w-7 p-1 h-7 bg-slate-800 hover:scale-[1.1] mx-2 rounded-xl duration-100 ";

  return (
    <div>
      <hr />
      {/* <footer className="footer footer-center p-10 gap-3  bg-blue-950 dark:bg-gradient-[linear-gradient(0deg, rgba(34,193,195,1), rgba(253,187,45,1))] text-white"> */}
      <footer className="footer  footer-center p-10 gap-3  bg-gradient-to-b from-slate-900 to-slate-950 text-white">
        <nav className="grid grid-flow-col text-lg gap-4">
          <a href="/#" className=" p-1 duration-200 hover:-translate-y-1">
            About us
          </a>
          <a href="/#" className="p-1 duration-200 hover:-translate-y-1">
            Contact
          </a>
          <a href="/#" className="p-1 duration-200 hover:-translate-y-1">
            Become Provider
          </a>
          <a href="/#" className="p-1 duration-200 hover:-translate-y-1">
            help
          </a>
        </nav>

        <nav>
          <div className="grid grid-flow-col place-items-center gap-4">
            <div className="">
              {/* <lord-icon
                src="https://cdn.lordicon.com/mirdbprd.json"
                trigger="loop"
                style={{ width: "60px", height: "60px" }}
              ></lord-icon> */}
            </div>
            <div className="flex text-slate-300 my-3 text-xl">
              Connect With Us : 
              <FaFacebookF className={`${iconsClass} hover:text-sky-500`} />
              <FaTwitter className={`${iconsClass}   hover:text-cyan-500`} />
              <FaPinterest className={`${iconsClass} hover:text-red-500`} />
              <FaInstagram
                className={`${iconsClass} hover:text-pink-500 `}
              />
            </div>
          </div>
        </nav>
        <aside>
          <p>2024 - All right reserved by Astro-Tech Ltd</p>
        </aside>
      </footer>
    </div>
  );
}

export default Footer;
