import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/context";
import CarCard from "../social media/CarCard";
import axios from "axios";

export const MyVehicles = () => {
  const { MyVehicles, setMyVehicles, user,url } = useContext(UserContext);
  // fetch and set myvehicles only
  useEffect(() => {
    axios
      .post(`${url}/provider/my-vehicles`, { uid: user._id })
      .then((res) => {
        console.log(res.data);
        setMyVehicles(res.data.vehicles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {MyVehicles?.length > 0 ? (
        <div className="my-15 grid grid-cols-2 mb-5  md:grid-cols-4 px-5 ">
          {MyVehicles?.map((item, i) => {
            return (
              <div className="my-4">
                <CarCard key={i} data={item} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col w-full items-center h-[calc(100vh-60px)] justify-center">
          <div className="hover:scale-125 duration-300 ">
            <lord-icon
              src="https://cdn.lordicon.com/mirdbprd.json"
              trigger="loop"
              style={{ width: "100px", height: "100px" }}
            ></lord-icon>
          </div>
          <h2 className="text-2xl text-center">
            You don't have added any Vehicle yet yet
          </h2>
        </div>
      )}
    </>
  );
};
