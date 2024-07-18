import { Rating } from "@mui/material";

const CarCard = ({ data }) => {
  const { brand, rentPerHour, rentPerDay, location, model, images, _id } = data;
  return (
    <div className="shadow-[0_1px_10px_0px_rgba(0,0,0,0.3)] rounded-xl m-2 h-full overflow-hidden bg-[#f8feff]/60 dark:bg-[#00293f]/80 duration-200 hover:-translate-y-1 dark:hover:outline-green-400 dark:outline dark:outline-2  ">
      <a href={`/vehicledetails/${_id}`} target="_blank" rel="noreferrer">
        <div className="h-60 w-full">
          <img src={images[0]} alt={model} className="h-full w-full" />
        </div>

        <div className="flex-col mt-2 p-4">
          <h3 className="font-semibold text-lg">{model}</h3>
          <h4 className="font-semibold text-slate-500">{brand}</h4>
          <div className="rating  ">
            4.2
            <span className="mx-1 flex  items-center">
              <Rating  name="read-only" value={4} sx={{ fontSize: "18px" }} readOnly />
            </span>{" "}
          </div>
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
