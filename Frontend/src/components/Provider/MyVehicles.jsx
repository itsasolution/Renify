import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/context";
import CarCard from "../Cards/CarCard";
import axios from "axios";

export const MyVehicles = () => {
  const { MyVehicles, setMyVehicles, user, url } = useContext(UserContext);
  // fetch and set myvehicles only
  useEffect(() => {
    axios
      .post(`${url}/provider/my-vehicles`, { uid: user._id })
      .then((res) => {
        // console.log(res.data);
        setMyVehicles(res.data.vehicles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {MyVehicles?.length > 0 ? (
        <div className="my-15 py-1 grid md:grid-cols-4 grid-cols-1 mb-5 px-5 ">
          {MyVehicles?.map((item, i) => {
            return (
              <a
                href={`/vehicleEdit/${item?._id}`}
                target="_blank"
                rel="noreferrer"
                key={i}
              >
                <CarCard key={i} data={item} />
              </a>
            );
          })}
        </div>
      ) : (
        <div className="flex text-2xl flex-col w-full items-center h-[calc(100vh-60px)] justify-center">
          You don't have added any Vehicle yet yet
        </div>
      )}
    </>
  );
};
