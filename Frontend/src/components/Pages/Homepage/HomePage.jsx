import React from "react";
import CardSlider from "../../Cards/CardSlider";
import { ProviderRegister } from "../../Provider/PoviderRegister";
// import banner from "../../public/hero.png"

import "./Home.css";
import "@mui/material/styles";
import { Link } from "react-router-dom";
import CarBikeCard from "../../Cards/CarBikeCard";
export const HomePage = () => {
  return (
    <>
      <div className=" homeAnime translate-y-[-55px] bg-gradient-to-br from-sky-200 via-white to-violet-200 dark:from-violet-950 dark:via-black dark:to-purple-950 h-screen duration-300 overflow-hidden md:overflow-visible ">
        <div className="group relative flex flex-col-reverse justify-center  h-full md:flex-row items-center pt-7 md:pt-0 md:mx-5 duration-300 ">
          {/* effect */}

          <div className="dark:block hidden">
            <span className="absolute bg-gradient-to-tr from-sky-500/80 to-cyan-300/70 shadow-sm pointer-events-none left-[48.5%] top-[40%] z-0 h-4 w-4 md:h-12 md:w-12 rounded-full duration-1000 opacity-0 group-hover:opacity-100 group-hover:scale-[17]  "></span>
            <span className="absolute bg-gradient-to-br from-sky-500/80 to-cyan-300/70 shadow-sm pointer-events-none left-[48.5%] top-[40%] z-0 h-4 w-4 md:h-12 md:w-12 rounded-full duration-700 opacity-0 group-hover:opacity-100   group-hover:scale-[21] animate-pulse "></span>
            <span className="absolute bg-gradient-to-tl from-sky-500/80 to-cyan-300/70 shadow-sm pointer-events-none left-[48.5%] top-[40%] z-0 h-4 w-4 md:h-12 md:w-12 rounded-full duration-500 opacity-0 group-hover:opacity-100 group-hover:scale-[25]  "></span>
          </div>

          <div className=" md:w-1/2 z-10 flex flex-col px-3 h-[40%] pt-5 md:pt-0 md:h-full justify-center items-center">
            <h1 className="text-3xl  text-shado md:text-5xl font-bold text-center text-blue-900 dark:text-white mb-8">
              Explore The Open Road: Rent Your Dream
              <div className="text-cyan-600 dark:text-cyan-300 group-hover:text-sky-600  stroke-1">
                Ride with Us!
              </div>
            </h1>
            {/* SubHeadings */}
            <div className="flex md:gap-7 mt-3 flex-col md:flex-row md:text-xl ">
              <div className=" overflow-hidden">
                <ul className="bullet-points ">
                  <li>Ride in style</li>
                  <li>Experience luxury and comfort</li>
                </ul>
              </div>
              <div className="overflow-hidden">
                <ul className="bullet-points">
                  <li>Create Lasting Memories</li>
                  <li>Wide range of vehicles</li>
                </ul>
              </div>
            </div>
          </div>
          {/* <div className="img-shadow mb-5 md:mb-0 md:w-[60%] grid grid-cols-2 ">
            <img src="./bikelg.png" className="scale-[.7]  w-full " alt="" />
            <img src="./mustung.png" className="scale-[1.2] w-full " alt="" />
          </div> */}
        </div>
      </div>
      <div className="grid bg-white/90 z-20 dark:bg-slate-900/90 rounded-lg md:p-4 p-2 gap-2 md:gap-5 grid-cols-1  md:h-auto  md:m-5  md:grid-cols-2">
        <CarBikeCard type="Bikes" />
        <CarBikeCard type="Cars" />
      </div>

      <div className="dark:bg-slate-950/80 ">
        <CardSlider />
        <div className=" text-center ">
          <Link
            to={"/vehicles/all"}
            className="text-xl btn text-white hover:text-white  hover:bg-gradient-to-tr bg-gradient-to-t hover:scale-105 duration-300 from-sky-500 shadow-md hover:shadow to-sky-600"
          >
            See All Vehicles
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col-reverse p-5 md:flex-row md:h-[70vh] bg-slate-100 shadow dark:bg-slate-900/50 duration-300 dark:text-white">
        <div className=" md:w-1/2 flex h-full flex-col px-3 pt-5 md:pt-0 md:h-full justify-center items-center">
          <img src="./bike.png" className="h-full " alt="" />
        </div>
        <div className=" md:w-1/2 h-full text-lg flex flex-col px-3 pt-5 md:pt-0 md:h-full justify-center items-center">
          <h1 className="w-full flex items-center font-bold text-2xl text-cyan-600  dark:text-teal-300">
            <lord-icon
              src="https://cdn.lordicon.com/ujxzdfjx.json"
              trigger="loop"
              delay="1000"
              speed="2"
              stroke="bold"
              colors="primary:#110a5c,secondary:#ebe6ef"
              style={{ width: "50px", height: "50px" }}
            ></lord-icon>
            Safest Rides
          </h1>

          <div className="text-base md:text-lg mt-3 md:mt-10">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi vel
            saepe ab in tenetur, iste aliquid laboriosam eius doloremque
            architecto corrupti consequatur ipsum optio similique officia modi
            molestias aut. Unde. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Nisi vel saepe ab in tenetur, iste aliquid
            laboriosam eius doloremque architecto corrupti consequatur ipsum
            optio similique officia modi molestias aut. Unde.
          </div>
        </div>
      </div>

      <div className="flex flex-col p-5 md:flex-row md:h-[70vh] md:mt-0 shadow duration-300 bg-slate-200 dark:bg-slate-950/60 dark:text-white">
        <div className=" md:w-1/2 h-full text-lg flex flex-col px-3 pt-5 md:pt-0 md:h-full justify-center items-center">
          <h1 className="w-full flex items-center font-bold text-2xl text-cyan-600  dark:text-teal-300">
            {/* Location */}
            <lord-icon
              src="https://cdn.lordicon.com/iikoxwld.json"
              trigger="loop"
              delay="1500"
              state="in-jump-dynamic"
              colors="primary:#e8308c"
              style={{ width: "50px", height: "50px" }}
            ></lord-icon>
            Earn with us
          </h1>
          <div className="text-base md:text-lg mt-3 md:mt-10">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi vel
            saepe ab in tenetur, iste aliquid laboriosam eius doloremque
            architecto corrupti consequatur ipsum optio similique officia modi
            molestias aut. Unde. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Nisi vel saepe ab in tenetur, iste aliquid
            laboriosam eius doloremque architecto corrupti consequatur ipsum
            optio similique officia modi molestias aut. Unde.
          </div>
        </div>
        <div className=" md:w-1/2 flex h-full flex-col px-3 pt-5 md:pt-0 md:h-full justify-center items-center">
          <img src="./contract.png" className="img-shadow h-full " alt="" />
        </div>
      </div>
      <hr />
      <div className="my-10 ">
        <h2 className="text-center text-3xl font-semibold mb-10">
          Become Provider <span className="text-fuchsia-600">Join us</span>
          <p className="flex justify-center w-full items-center text-yellow-500 dark:text-yellow-300">
            Earn with us &nbsp;
            {/* coins */}
            <lord-icon
              src="https://cdn.lordicon.com/qnwzeeae.json"
              trigger="loop"
              delay="1500"
              state="in-reveal"
              style={{ width: "50px", height: "50px" }}
            ></lord-icon>
          </p>
        </h2>
        <ProviderRegister />
      </div>
    </>
  );
};
