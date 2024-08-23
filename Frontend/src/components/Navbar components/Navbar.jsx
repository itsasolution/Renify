import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Menu from "./Menu";
import { UserContext } from "../../context/context";
import ProfileContainer from "./ProfileContainer";

export const Navbar = () => {
  const { user, setUser, url } = useContext(UserContext);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll handler
  const handleScroll = () => setIsScrolled(window.scrollY > 60);

  const location = useLocation();
  const { pathname } = location; //current path = /

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme management
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      document.body.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // navBar
  const navLinkClasses = (isActive) =>
    `duration-300 hover:shadow-md dark:hover:ring-1 ring-cyan-400  p-1.5 px-2 rounded-md ${
      isActive
        ? " font-semibold bg-slate-200/60 dark:bg-transparent dark:text-cyan-300 ring-cyan-400  shadow-md"
        : "text-gray-700 dark:text-gray-300"
    }`;

  const nav = (
    <>
      <NavLink to="/" className={({ isActive }) => navLinkClasses(isActive)}>
        Home
      </NavLink>
      {user?.vehicles ? (
        <>
          <NavLink
            to="/myvehicles"
            className={({ isActive }) => navLinkClasses(isActive)}
          >
            My Vehicles
          </NavLink>
          <NavLink
            to="/addvehicle"
            className={({ isActive }) => navLinkClasses(isActive)}
          >
            Add Vehicle
          </NavLink>
          <NavLink
            to="/ProviderBookingsPage"
            className={({ isActive }) => navLinkClasses(isActive)}
          >
            Bookings
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/vehicles/all"
            className={({ isActive }) => navLinkClasses(isActive)}
          >
            Vehicles
          </NavLink>
          <NavLink
            to="/myrides"
            className={({ isActive }) => navLinkClasses(isActive)}
          >
            My Rides
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => navLinkClasses(isActive)}
          >
            Contact
          </NavLink>
        </>
      )}
      <label
        title="Change Theme"
        className="relative grid justify-between text-[16px] md:ml-0 md:p-0 md:items-center swap swap-rotate mr-4"
      >
        <span className="md:hidden text-[15px] font-semibold">Theme</span>
        <input type="checkbox" className="hidden" />
        <span
          className="w-36 swap-off md:w-auto"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {/* Sun icon */}
          <svg
            className="fill-current w-7 h-7 float-right"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
        </span>
        {/* Moon icon */}
        <span
          className="w-36 md:w-auto swap-on"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <svg
            className="fill-current w-7 h-7 float-right"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </span>
      </label>
    </>
  );

  return (
    <div
      className={`sticky top-0 w-full flex bg-gradient-to-tr justify-between items-center px-3 md:px-7 min-h-[50px] h-[56px] z-30 duration-500 backdrop-blur-sm ${
        pathname !== "/"
          ? "bg-slate-100/90 dark:from-slate-950 dark:to-blue-950 shadow-md"
          : isScrolled
          ? "bg-slate-100/90 dark:from-slate-950 dark:to-blue-950 shadow-md"
          : "bg-transparent"
      }`}
    >
      {/* Hamburger menu */}
      <Menu nav={nav} />
      {/* LOGO */}
      <Link to="/" className="flex font-semibold gap-3 text-xl">
        <span className="h-8 flex items-center logoanime">
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            className="h-full w-full"
            alt="logo"
          />
        </span>
        Renify
      </Link>
      {/* Nav links */}
      <div className={`flex`}>
        <div className=" justify-evenly items-center gap-3 md:min-w-[650px] hidden md:flex">
          {nav}
        </div>
        {/* User profile */}
        <ProfileContainer url={url} setUser={setUser} user={user} />
      </div>
    </div>
  );
};
