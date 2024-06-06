import React, { useContext } from "react";
import { UserContext } from "../../context/context";
import CarCard from "../CarCard";

export const MyRides = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      {user.myRides.lenght > 0 ? (
        <div className="my-15 grid grid-cols-2 mb-5 md:grid-cols-4 px-5 ">
          {user.myRides?.map((item) => {
            return (
              <div className="my-4">
                <CarCard key={item._id} data={item} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center h-[calc(100vh-60px)]  justify-center">
          <div className="">
            <lord-icon
              src="https://cdn.lordicon.com/sxhxuxgx.json"
              trigger="loop"
              style={{ width: "100px", height: "100px" }}
            ></lord-icon>
          </div>
          <h2 className="text-2xl">You don't have any rides yet</h2>
        </div>
      )}
    </>
  );
};
