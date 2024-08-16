import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/context";
import CarCard from "../Cards/CarCard";
import axios from "axios";
import { Link } from "react-router-dom";

export const MyVehicles = () => {
  const { MyVehicles, setMyVehicles, user, url, setLoader } =
    useContext(UserContext);

  // fetch and set myvehicles only
  useEffect(() => {
    axios
      .post(`${url}/provider/my-vehicles`, { uid: user._id })
      .then((res) => {
        setMyVehicles(res.data.vehicles);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <div className="text-2xl font-semibold mt-2 text-center">My Vehicles</div>
      {MyVehicles?.length > 0 ? (
        <div className="my-5 py-1 grid grid-cols-1 place-items-center md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 mb-5 px-3">
          {MyVehicles?.map((item, i) => (
            <Link to={`/vehicleEdit/${item?._id}`} key={i}>
              <CarCard
                data={item}
                status={item.availability ? "Available" : "Not Available"}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex text-2xl flex-col h-[60vh] w-full items-center justify-center">
          You haven't added any vehicles yet.
          <Link
            to={"/addvehicle"}
            className={`text-white my-5 btn ring-white dark:hover:ring-2 text-lg  btn-ghost bg-blue-700 hover:bg-blue-600 border-none shadow-md px-5`}
          >
            <span className="mx-2 uppercase">ADD Vehicle</span>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#30c9e8"
            ></lord-icon>
          </Link>
        </div>
      )}
    </>
  );
};
