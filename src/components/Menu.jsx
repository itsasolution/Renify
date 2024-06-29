import React, { useState, useEffect, useRef } from "react";
import "./menu.css";

function Menu({ nav }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = (event) => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
      document.getElementById("checkbox").checked = ""; // if have any value checked like "d"
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative md:hidden duration-300" ref={menuRef}>
      {/* Menu bars */}
      <label className="btn btn-circle border-none no-animation swap swap-rotate bg-transparent dark:text-white text-black">
        {/* this hidden checkbox controls the state */}
        <input onClick={toggleMenu} type="checkbox" id="checkbox" />

        {/* hamburger icon */}
        <svg
          className="swap-off fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>

        {/* close icon */}
        <svg
          className="swap-on fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
      </label>

      {/* Menu items */}

      <div
        className={`nav absolute top-[55px] flex flex-col gap-3 h-screen font-semibold z-[1] p-3 pl-5 shadow-md rounded-box w-52 bg-white bg-opacity-65 dark:bg-blue-950 dark:bg-opacity-90 duration-300 transform  ${
          isOpen ? "translate-x-[-10%] " : "translate-x-[-130%]"
        }`}
      >
        {nav}
      </div>
    </div>
  );
}

export default Menu;
