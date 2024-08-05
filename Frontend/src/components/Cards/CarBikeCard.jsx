import React from "react";
import { Link } from "react-router-dom";

const CarBikeCard = ({ type }) => {
  return (
    <div className="group relative md:w-96 overflow-hidden text-white bg-white dark:bg-slate-800  px-6 py-10 md:shadow-xl  transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm rounded-lg sm:px-10">
      {/* main bg expand */}
      <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-gradient-to-br from-sky-400/90 to-cyan-300/90 transition-all duration-700  group-hover:scale-[10]"></span>
      <span className="absolute top-10 z-2 h-20 w-20  rounded-full bg-gradient-to-r from-fuchsia-600/90 to-rose-500/90 transition-all duration-700 scale-[10] group-hover:scale-[1]"></span>
      <div className="relative z-10 mx-auto max-w-md ">
        <div className="relative w-full ">
          <span className="grid h-20 w-20 place-items-center shadow-md rounded-full bg-sky-400 transition-all duration-300 group-hover:bg-sky-400">
            <img
              alt="profile"
              className=" shadow-xl  rounded-full  "
              src={`${process.env.PUBLIC_URL}/profile.webp`}
            />
          </span>
          <h2 className="font-semibold text-2xl absolute top-2 left-[45%] border-b-[2.5px]  border-white px-1 ">
            {type}
          </h2>
        </div>

        {/* Images */}
        <div className="h-28 mt-7 relative flex justify-center">
          {type === "Cars" ? (
            <>
              <img
                className="h-full absolute opacity-0 delay-100 duration-700 group-hover:opacity-100"
                src={`${process.env.PUBLIC_URL}/logo.png`}
                alt="sdf"
              />
              <img
                className="h-full opacity-100 scale-150 duration-700 group-hover:opacity-0"
                src={`${process.env.PUBLIC_URL}/Mustung.png`}
                alt="sdf"
              />
            </>
          ) : (
            <>
              <img
                className="h-full absolute scale-[1.5] opacity-0 delay-100 duration-700 group-hover:opacity-100"
                src={`${process.env.PUBLIC_URL}/bike2.png`}
                alt="sdf"
              />
              <img
                className="h-full opacity-100 scale-[1.3] duration-700 group-hover:opacity-0"
                src={`${process.env.PUBLIC_URL}/bikelg.png`}
                alt="sdf"
              />
            </>
          )}
        </div>

        <div className="space-y-6 pt-5 text-base leading-7 dark:text-white transition-all duration-300 group-hover:text-white/90">
          <p>Choose you Ride with various of varieties and Premium Brands.</p>
        </div>

        <div className="pt-5 text-base font-semibold leading-7">
          <p>
            <Link
              to={`${type === "cars" ? "/vehicles" : "vehicles"}`}
              className=" transition-all duration-300 hover:ring-2 sm:ring-  rounded-md p-2 ring-white group-hover:text-white"
            >
              Check Out &rarr;
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarBikeCard;
