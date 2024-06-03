import React from "react";

const CarCard = ({ data }) => {
  const { brand, rentPerHour, location, model, images } = data;
  return (
    <div className="shadow-md rounded-3xl m-2 cardanime overflow-hidden hover:shadow-xl duration-200 hover:scale-[1.015] dark:outline-rose-400 dark:outline dark:outline-2  ">
      <div className=" bg-slate-500">j
        {images.map((image, index) => (
          <img key={index} src={image} alt={model} className="h-full w-full" />
        ))}
      </div>

      <div className="flex-col mt-2 p-4">
        <h3 className="font-semibold text-lg">{model}</h3>
        <div className="rating">4.2 🌟🌟🌟🌟 </div>
        <div className="price-details">
          <span className="">
            Price:{" "}
            <span className="text-green-600  font-semibold">
              {" "}
              {rentPerHour}
            </span>
          </span>
        </div>
        {/* <span className="discount">Discount: {discount}</span> */}
        <div className="font-semibold">{}</div>
        <p className="text-gray-700 dark:text-gray-200 mt-2 line-clamp-3">{}</p>
      </div>
    </div>
  );
};

export default CarCard;
