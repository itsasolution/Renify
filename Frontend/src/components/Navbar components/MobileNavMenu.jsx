import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BiHomeSmile } from "react-icons/bi";
import { LuBike } from "react-icons/lu";
import { MdOutlineContactPage } from "react-icons/md";
import { BsCartCheck } from "react-icons/bs";
import { UserContext } from "../../context/context";
import { RiFunctionAddFill } from "react-icons/ri";
import { RiContactsBookUploadLine } from "react-icons/ri";

const MobileNavMenu = () => {
  const { user } = useContext(UserContext);
  const Menus = [
    { name: "Home", to: "/", icon: <BiHomeSmile /> },
    ...(user?.vehicles
      ? [
          { name: "My Vehicles", to: "/myvehicles", icon: <LuBike /> },
          {
            name: "Add Vehicle",
            to: "/addvehicle",
            icon: <RiFunctionAddFill />,
          },
          {
            name: "Bookings",
            to: "/ProviderBookingsPage",
            icon: <RiContactsBookUploadLine />,
          },
        ]
      : [
          { name: "Vehicles", to: "/vehicles/all", icon: <LuBike /> },
          { name: "My Rides", to: "/myrides", icon: <BsCartCheck /> },
        ]),
    { name: "Contact", to: "/contact", icon: <MdOutlineContactPage /> },
  ];

  const [active, setActive] = useState(0);
  const [show, setShow] = useState(true);
  let lastScrollY = window.pageYOffset;

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > lastScrollY) {
        // Scroll down
        setShow(false);
      } else {
        // Scroll up
        setShow(true);
      }
      lastScrollY = window.pageYOffset;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`md:hidden fixed bottom-0 w-full z-20  bg-sky-100/90 dark:bg-slate-800/90 h-[60px] backdrop-blur-sm flex items-center justify-center rounded-t-xl transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-[130%]"
      }`}
    >
      <ul className="flex relative">
        {Menus.map((menu, i) => (
          <li key={i} className="w-20">
            <NavLink
              to={menu.to}
              className="flex flex-col items-center gap-1 text-center pt-3"
              onClick={() => setActive(i)}
            >
              <span
                className={`text-2xl rounded-full z-10 cursor-pointer duration-500 flex items-center justify-center ${
                  i === active && "-mt-7 dark:bg-sky-400 bg-sky-200 p-3"
                }`}
              >
                {menu.icon}
              </span>
              <span
                className={`text-sm ${
                  active === i ? "font-semibold" : "translate-y-0"
                } transition-all duration-500`}
              >
                {menu.name}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileNavMenu;
