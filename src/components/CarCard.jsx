import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ data }) => {
  const { brand, rentPerHour, rentPerDay, location, model, images, _id } = data;
  return (
    <div className="shadow-md shado rounded-xl m-2 h-full overflow-hidden bg-[#e4f9fd] dark:bg-[#003d5f] hover:shadow-xl duration-200 hover:scale-[1.015] dark:hover:outline-green-400 dark:outline dark:outline-2  ">
      <a href={`/vehicledetails/${_id}`} target="_blank" rel="noreferrer">
        <div className="h-60 w-full">
          <img src={images[0]} alt={model} className="h-full w-full" />
        </div>

        <div className="flex-col mt-2 p-4">
          <h4 className="font-semibold text-slate-300">{brand}</h4>
          <h3 className="font-semibold text-lg">{model}</h3>
          <div className="rating">4.2 🌟🌟🌟🌟 </div>
          <div className="price-details">
            <div className="">
              Rent/hour :
              <span className="text-green-600 mx-1 font-semibold">
                {rentPerHour}
              </span>
            </div>
            <div className="">
              Rent/Day :
              <span className="text-green-600 mx-1 font-semibold">
                {rentPerDay}
              </span>
            </div>
          </div>
          {/* <span className="discount">Discount: {discount}</span> */}
          <div className="font-semibold">{}</div>
          <p className="text-gray-700 dark:text-gray-200 mt-2 line-clamp-3">
            {}
          </p>
        </div>
      </a>
    </div>
  );
};

export default CarCard;
