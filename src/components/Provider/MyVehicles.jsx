import React, { useContext } from "react";
import { UserContext } from "../../context/context";
import CarCard from "../CarCard";

export const MyVehicles = () => {
  const { user } = useContext(UserContext);

  console.log(user);
  return (
    <>
      <div className="mt-15 grid grid-cols-2 mb-5 md:grid-cols-4 p-5 ">
        {user?.vehicles?.map((item) => {
          return <CarCard key={item._id} data={item} />;
        })}
      </div>
    </>
  );
};
