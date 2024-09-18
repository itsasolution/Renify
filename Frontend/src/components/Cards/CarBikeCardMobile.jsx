import React from "react";
import { Link } from "react-router-dom";

const CarBikeCardMobile = ({ type }) => {
  return (
    <div className="flex justify-between h-32 w-full md:hidden  text-white bg-gradient-to-r from-fuchsia-600/90 to-rose-500/90  px-3 py-5 rounded-lg">
      {/* Images */}
      <div className="h-20 px-8">
        {type === "Cars" ? (
          <>
            <img
              className="h-full opacity-100 scale-150 duration-700 group-hover:opacity-0"
              src={`${process.env.PUBLIC_URL}/Mustung.png`}
              alt="car img1"
            />
          </>
        ) : (
          <>
            <img
              className="h-full opacity-100 scale-[1.3] duration-700 group-hover:opacity-0"
              src={`${process.env.PUBLIC_URL}/bike1.png`}
              alt="bike1"
            />
          </>
        )}
      </div>

      <div className="text-base px-3 font-semibold leading-7">
        <h2 className="font-semibold mb-1 text-2xl border-white ">{type}</h2>
        <Link
          to={`${type === "Cars" ? "/vehicles/car" : "/vehicles/bike"}`}
          className="flex gap-2 items-center transition-all w-32 duration-300 ring-1 hover:ring-2 rounded-md p-2 ring-white"
        >
          <span>Check Out</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4 group-hover:scale-[1.1] duration-150 group-hover:translate-x-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CarBikeCardMobile;
