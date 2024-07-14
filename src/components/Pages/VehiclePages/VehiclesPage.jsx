import React, { useEffect, useState } from "react";
import CarCard from "../../social media/CarCard";
import axios from "axios";

const VehiclesPage = () => {
  let [list, setList] = useState([]);
  let [filterList, setFilter] = useState([]);
  let [category, setType] = useState("all");

  // filter function
  const filterdata = () => {
    if (category === "all") {
      setFilter(list.filter((vehicle) => vehicle.availability === true));
    } else if (category === "booked") {
      setFilter(list.filter((vehicle) => vehicle.availability === false));
    } else {
      setFilter(
        list.filter(
          (item) => item.type === category && item.availability === true
        )
      );
    }
    // console.log(filterList);
  };

  // fetching data
  useEffect(() => {
    const getitems = async () => {
      try {
        const res = await axios.get("http://localhost:4000/vehicles");
        setList(res.data);
        // call it here to get data in filterList
        console.log(res.data);
        filterdata();
      } catch {
        console.log("error");
      }
    };
    getitems();
  }, []);

  useEffect(() => {
    filterdata();
    console.log("filter useeffect called");
  }, [category, list]);

  return (
    <>
      <div className="flex text-white justify-center text-xl gap-x-5 m-5  ">
        <div
          role="button"
          className="btn bg-[#ffdb80] text-black shadow-md  w-28 text-lg hover:bg-[#ffd641] hover:shadow-lg border-none  "
          onClick={() => {
            setType("all");
          }}
        >
          All
        </div>
        <div
          role="button"
          className="btn bg-[#fafa5e] shadow-md text-black w-28 text-lg hover:bg-[#ffff42] hover:shadow-lg border-none  "
          onClick={() => {
            setType("Bike");
          }}
        >
          Bikes
        </div>
        <div
          role="button"
          className="btn w-28 bg-[#fbba4f] shadow-md text-black text-lg hover:bg-[#fca820] hover:shadow-lg border-none   "
          onClick={() => {
            setType("Car");
          }}
        >
          Cars
        </div>
        <div
          role="button"
          className="btn bg-[#fcfc27] shadow-md text-black w-28 text-lg hover:bg-[#ffff42] hover:shadow-lg border-none  "
          onClick={() => {
            setType("booked");
          }}
        >
          Booked
        </div>
      </div>
      {/* cards */}
      {filterList.length > 0 ? (
        <div className="mt-15 grid grid-cols-1 mb-5 md:grid-cols-4 p-5 ">
          {filterList.map((item) => {
            return (
              <div className="my-4 cardanime">
                <CarCard key={item._id} data={item} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex h-[50vh] font-semibold text-xl items-center justify-center">No vehicle Found !</div>
      )}
    </>
  );
};

export default VehiclesPage;
