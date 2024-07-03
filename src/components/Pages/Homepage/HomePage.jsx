import React from "react";
import CardSlider from "../../CardSlider";
import { ProviderRegister } from "../../Provider/PoviderRegister";
// import banner from "../../public/hero.png"

import "./Home.css";
import "@mui/material/styles";
// import DatePickerOne from "../Date and time picker/DatePickerOne";
import DateTimeSchedular from "../../Date and time picker/DateTimeSchedular";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <>
      {/* <div className="absolute top-0 z-[-2] h-screen w-4/5 bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div> */}
      {/* <DatePickerOne/> */}
      <div className=" opacityanime md:h- duration-300 dark:bg-blue-950 dark:text-white">
        <div className="  flex flex-col-reverse md:flex-row items-center pt-7 md:pt-8 duration-300 ">
          <div className=" md:w-1/2 flex flex-col px-3 h-[40%] pt-5 md:pt-0 md:h-full justify-center items-center">
            <h1 className="text-3xl text-shado md:text-5xl font-bold text-center text-blue-900 dark:text-white mb-8">
              Explore The Open Road: Rent Your Dream
              <div className="text-cyan-500 dark:text-cyan-300">
                Ride with Us!
              </div>
            </h1>
            {/* SubHeadings */}
            <div className="flex md:gap-4 flex-col md:flex-row md:text-lg ">
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
          <div className="img-shadow mb-5 md:mb-0 md:pt-0 md:w-[60%] ">
            <img src="./hero.png" className="h-full w-full " alt="" />
          </div>
        </div>

        {/* <DateTimeSchedular /> */}
      </div>

      <CardSlider />
      <div className="  text-center ">
        <Link to={"/vehicles"} className="text-xl btn text-white btn-ghost bg-cyan-400 hover:bg-green-500">
          See All Vehicles
        </Link>
      </div>

      {/* Info */}
      <div className="flex flex-col-reverse p-5 md:flex-row md:h-[70vh] bg-slate-100 md:mt-2 duration-300 dark:bg-blue-950 dark:text-white">
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
      <div className="flex flex-col p-5 md:flex-row md:h-[70vh] md:mt-0  duration-300 dark:bg-blue-950 dark:text-white">
        <div className=" md:w-1/2 h-full text-lg flex flex-col px-3 pt-5 md:pt-0 md:h-full justify-center items-center">
          <h1 className="w-full flex items-center font-bold text-2xl text-cyan-600  dark:text-teal-300">
            {/* coins */}
            <lord-icon
              src="https://cdn.lordicon.com/qnwzeeae.json"
              trigger="loop"
              delay="1500"
              state="in-reveal"
              style={{ width: "50px", height: "50px" }}
            ></lord-icon>
            {/* Location */}
            <lord-icon
              src="https://cdn.lordicon.com/iikoxwld.json"
              trigger="loop"
              delay="1500"
              state="in-jump-dynamic"
              colors="primary:#e8308c"
              style={{ width: "50px", height: "50px" }}
            ></lord-icon>
            {/* mail */}
            <lord-icon
              src="https://cdn.lordicon.com/tmqaflqo.json"
              trigger="loop"
              delay="1500"
              state="in-assembly"
              colors="primary:#104891,secondary:#ebe6ef,tertiary:#66a1ee"
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
          <img src="./car.png" className="img-shadow" alt="" />
        </div>
      </div>
      <hr />
      <div className="my-10 ">
        <h2 className="text-center text-3xl font-semibold mb-10">
          Become Provider <span className="text-fuchsia-600">Join us</span>
          <p className="text-yellow-500 dark:text-yellow-300">Earn with us</p>
        </h2>
        <ProviderRegister />
      </div>
    </>
  );
};
