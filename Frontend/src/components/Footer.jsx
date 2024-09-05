import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterest,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  const iconsClass =
    "shadow-md w-7 p-1 h-7 bg-slate-900 hover:scale-[1.1] mx-2 rounded-xl duration-100 ";

  return (
    <div>
      <hr />
      <footer className="footer footer-center md:p-10 gap-2.5 py-2.5 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
        <nav className="mt-10 md:mt-5 grid grid-flow-col md:text-lg md:gap-4 ">
          <a href="/#" className=" p-1  duration-200 hover:-translate-y-1">
            About us
          </a>
          <Link to={"/contact"} className="duration-200 hover:-translate-y-1">
            Contact
          </Link>
          <a
            href="/provider-sign-in"
            className="duration-200 hover:-translate-y-1"
          >
            Become Provider
          </a>
          <a href="/#" className="duration-200 hover:-translate-y-1">
            help
          </a>
        </nav>

        <nav>
          <div className="grid grid-flow-col place-items-center gap-4">
            <div className="">
              <lord-icon
                src="https://cdn.lordicon.com/mirdbprd.json"
                trigger="loop"
                style={{ width: "60px", height: "60px" }}
              ></lord-icon>
            </div>
            <div className="flex md:flex-row gap-2 flex-col text-slate-300 my-3 text-lg">
              Connect with us
              <span className="flex mt-3 md:mt-0">
                <FaFacebookF className={`${iconsClass} text-sky-400 shadow-inner shadow-sky-500`} />
                <FaTwitter className={`${iconsClass}   text-cyan-400 shadow-inner shadow-cyan-400`} />
                <FaPinterest className={`${iconsClass} text-red-600  shadow-inner shadow-red-600`} />
                <FaInstagram className={`${iconsClass} text-pink-500 shadow-inner shadow-pink-500 `} />
              </span>
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
