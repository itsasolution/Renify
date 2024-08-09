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
        <div className="my-5 py-1 grid grid-cols-1 place-items-center lg:grid-cols-4 gap-4 mb-5 px-3">
          {MyVehicles?.map((item, i) => (
            <a
              href={`/vehicleEdit/${item?._id}`}
              target="_blank"
              rel="noreferrer"
              key={i}
            >
              <CarCard
                key={i}
                data={item}
                status={item.availability ? "" : "booked"}
              />
            </a>
          ))}
        </div>
      ) : (
        <div className="flex text-2xl flex-col w-full items-center h-[calc(100vh-60px)] justify-center">
          You haven't added any vehicles yet.
          <Link
          to={'/addvehicle'}
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
