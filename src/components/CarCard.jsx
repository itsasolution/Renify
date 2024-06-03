import React from "react";

const CarCard = ({ data }) => {
  const { brand, rentPerHour, rentPerDay, location, model, images } = data;
  return (
    <div className="shadow-md rounded-3xl m-2 h-full cardanime overflow-hidden hover:shadow-xl duration-200 hover:scale-[1.015] dark:outline-rose-400 dark:outline dark:outline-2  ">
      {/* {images.map((image, index) => (
        <div className=" bg-slate-500">
          <img key={index} src={image} alt={model} className="h-full w-full" />
          </div>
        ))} */}
      <div className="h-[50%]">
        <img src={images[0]} alt={model} className="h-full w-full" />
      </div>

      <div className="flex-col mt-2 p-4">
        <h4 className="font-semibold text-slate-300">{brand}</h4>
        <h3 className="font-semibold text-lg">{model}</h3>
        <div className="rating">4.2 🌟🌟🌟🌟 </div>
        <div className="price-details">
          <div className="">
            Rent/hour :
            <span className="text-green-600 mx-1 font-semibold">{rentPerHour}</span>
          </div>
          <div className="">
            Rent/Day :
            <span className="text-green-600 mx-1 font-semibold">{rentPerDay}</span>
          </div>
        </div>
        {/* <span className="discount">Discount: {discount}</span> */}
        <div className="font-semibold">{}</div>
        <p className="text-gray-700 dark:text-gray-200 mt-2 line-clamp-3">{}</p>
      </div>
    </div>
  );
};

export default CarCard;
