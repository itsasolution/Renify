import React, { useContext } from "react";
import { UserContext } from "../../context/context";
import CarCard from "../CarCard";

export const MyVehicles = () => {
  const { MyVehicles } = useContext(UserContext);
  return (
    <>
      <div className="my-15 grid grid-cols-2 mb-5  md:grid-cols-4 px-5 ">
        {MyVehicles?.map((item) => {
          return (
            <div className="my-4">
               <CarCard key={item._id} data={item} />
            </div>
          );
        })}
      </div>
    </>
  );
};
