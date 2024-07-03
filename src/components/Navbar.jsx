import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import { UserContext } from "../context/context";
import axios from "axios";
import toast from "react-hot-toast";

export const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const logout = async () => {
    try {
      let res = await axios.get("http://localhost:4000/user/logout");
      // let res = await axios.get("http://localhost:4000/provider/logout");
      if (res.data) {
        console.log(res.data);
        localStorage.removeItem("userdata");
        setUser(null);
        toast.success(res.data.message);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // theme
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;
  // console.log(element);
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  // navbar
  const navcls =
    "dark:focus:text-cyan-400 duration-300 dark:focus:bg-blue-800 focus:bg-slate-200 focus:border-b-2 border-blue-600  p-1 px-2 rounded-md";

  // nav items
  const nav = (
    <>
      <Link to={"/"} className={navcls}>
        Home
      </Link>
      {user?.vehicles ? ( // provider.vehicle
        <>
          <Link to={"/myvehicles"} className={navcls}>
            My Vehilcles
          </Link>
          <Link to={"/addvehicle"} className={navcls}>
            Add Vehicle
          </Link>
        </>
      ) : (
        <>
          <Link to={"/vehicles"} className={navcls}>
            Vehilcles
          </Link>
          <Link to={"/myrides"} className={navcls}>
            My Rides
          </Link>
        </>
      )}
      <Link to={"/contact"} className={navcls}>
        Contact
      </Link>
      {/* Theme controller */}
      <label
        title="Change Theme"
        className="relative grid justify-between text-[16px] md:ml-0 md:p-0 md:items-center swap swap-rotate mr-4"
      >
        <span className=" md:hidden text-[15px] font-semibold">Theme</span>
        {/* this hidden checkbox controls the state */}
        <input
          type="checkbox"
          className="theme-controller  "
          value="synthwave"
        />
        <span
          className="w-36 swap-off md:w-auto "
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {/* sun icon */}
          <svg
            className="fill-current w-7 h-7 float-right"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
        </span>

        {/* moon icon */}
        <span
          className="w-36 md:w-auto swap-on "
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
    <>
      <div
        className={`navbar nav z-10 w-full min-h-[50px] h-[55px] bg-transparent backdrop-blur-sm sticky top-0 shadow-md  dark:text-white`}
      >
        <div className="navbar">
          {/* hamburger menu */}
          <Menu nav={nav} />

          {/* LOGO */}
          <Link
            to={"/"}
            className="btn btn-ghost hover:bg-transparent no-animation text-xl"
          >
            <span className="h-7 flex items-center logoanime">
              {/* <img src="./logo.png" className="h-full w-full" alt="" /> */}
              <img
                src={`${process.env.PUBLIC_URL}/logo.png`}
                className="h-full w-full"
                alt="logo"
              />
            </span>
            Renify
          </Link>
        </div>
        <div className="hidden font-semibold md:flex justify-between max-w-[500px] md:min-w-[450px] lg:gap-3 w-[60%] ">
          {nav}
        </div>

        <div className="flex-none">
          <div className="relative md:block hidden">
            <input
              type="text"
              placeholder="Search"
              className=" text-center h-9 shadow-sm rounded-full w-40 mx-2 hidden md:block input-bordered bg-slate-100 dark:text-blue-950 focus:outline-none focus:shadow "
            />
            <span className="absolute top-1 left-3">
              <lord-icon
                src="https://cdn.lordicon.com/unukghxb.json"
                trigger="hover"
                style={{ width: "25px", height: "30px" }}
              ></lord-icon>
            </span>
          </div>

          {/* user info */}
          <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost no-animation btn-circle avatar"
            >
              <div className="w-10 p-1 rounded-full shadow-md bg-slate-200">
                {/* <img alt="Profile" src="./profile.jpg" /> */}
                <lord-icon
                  src="https://cdn.lordicon.com/bgebyztw.json"
                  trigger="hover"
                  delay="1000"
                  state="hover-jumping"
                  style={{ width: "90%", height: "90%" }}
                ></lord-icon>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-56 bg-white dark:bg-blue-950 dark:bg-opacity-50"
            >
              {/* {logIn && } */}

              <p className="text-center py-1 ">{user?.name}</p>
              <p className="text-center py-1 ">{user?.email}</p>
              {user && (
               <> <button
                  onClick={() => logout()}
                  className=" bg-amber-400 my-1 py-1.5 mx-5 duration-200 hover:rounded rounded-full hover:bg-slate-200 dark:hover:text-black "
                >
                  Logout
                </button>
              
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li></>
              )}
              {!user && (
                <>
                  <li>
                    <Link to={"/sign-in"}>Sign-in</Link>
                  </li>
                  <li className="w-full">
                    <Link to={"/user-login"}>Login</Link>
                  </li>
                </>
              )}
              <li>
                <Link to={"/provider-login"}>Provider Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
