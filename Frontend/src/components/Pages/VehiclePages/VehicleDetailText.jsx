import React from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import { FaRegCircleCheck } from "react-icons/fa6";

const VehicleDetailText = ({ vehicle }) => {
  return (
    <>
      <div className="m-2 grid md:grid-cols-2 md:gap-4">
        <div>
          <h1 className="text-3xl my-2 font-semibold">{vehicle?.model}</h1>
          <h1 className="text-2xl text-slate-500 my-2 font-semibold">
            {vehicle?.brand}
          </h1>
          <div className="flex items-center mb-1 space-x-1">
            <span className="mr-1">{vehicle?.overallRating}</span>
            {Array.from({ length: vehicle?.overallRating }).map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            {Array.from({ length: 5 - vehicle?.overallRating }).map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-gray-300 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
          <div className="my-1">
            {vehicle?.reviews?.length ? vehicle?.reviews?.length : 0} reviews
          </div>
          {/* Price */}
          <div className="text-lg pt-1">
            <div className="font-semibold">
              Rent/hour : ₹ {vehicle?.rentPerHour}
            </div>
            <div className="my-1 font-semibold">
              Rent/Day : ₹ {vehicle?.rentPerDay}
            </div>
          </div>
        </div>
        <div className="flex flex-col scroll font-semibold md:mt-4 text-lg">
          <span></span>
          <span>
            <div className="flex gap-1 items-center ">
              <BiUserCircle className="text-2xl text-gray-600 dark:text-slate-300" />
              <p className="text-gray-700  font-semibold dark:text-gray-200 ">
                Owner : {vehicle?.providerId?.name}
              </p>
            </div>
            <div className="flex items-start gap-2 my-1">
  <MdOutlineLocationOn className="text-2xl text-gray-600 dark:text-slate-300" />
  <p className="text-gray-700 font-semibold dark:text-gray-200 leading-snug">
    Location: {vehicle?.location}
  </p>
</div>

          </span>
          <div className="flex gap-1.5 items-center my-1">
            <FaRegCircleCheck className="text-xl mx-1 text-gray-600 dark:text-slate-300" />
            <p className="text-gray-700 font-semibold dark:text-gray-200 ">
              Availability :
              {vehicle?.availability ? " Available" : " Not Available"}
            </p>
          </div>
          <span className=""></span>
        </div>
      </div>
    </>
  );
};

export default VehicleDetailText;
