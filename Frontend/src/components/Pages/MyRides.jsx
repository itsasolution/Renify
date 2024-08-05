import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/context";
import CarCard from "../Cards/CarCard";
import axios from "axios";

export const MyRides = () => {
  const { user, url } = useContext(UserContext);
  const [myrides, setMyrides] = useState();

  useEffect(() => {
    axios
      .get(`${url}/user/myrides/${user?._id}`)
      .then((res) => {
        if (res) setMyrides(res?.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      {myrides?.length > 0 ? (
        <div className="my-15 grid grid-cols-2 mb-5 md:grid-cols-4 px-5 ">
          {myrides?.map((item) => {
            return (
              <div className="my-4">
                <CarCard key={item._id} data={item} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center h-[calc(100vh-60px)]  justify-center">
          <h2 className="text-2xl">You don't have any rides yet</h2>
        </div>
      )}
    </>
  );
};
