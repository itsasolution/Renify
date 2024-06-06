import React, { useEffect, useState } from "react";
import CarCard from "../CarCard";
import axios from "axios";

const VehiclesPage = () => {
  let [list, setList] = useState([]);
  let [filterList, setFilter] = useState([]);
  let [category, setType] = useState("all");
  

  // filter function
  const filterdata = () => {
    if (category === "all") setFilter(list);
    else {
      setFilter(list.filter((item) => item.type === category));
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
        setFilter("all");
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
      <div className="flex justify-center text-xl gap-x-5 m-5  ">
        <div
          role="button"
          className="btn bg-[#fbe4ac] shadow-md  w-28 text-lg hover:bg-[#fce38c] hover:shadow-lg border-none  "
          onClick={() => {
            setType("all");
          }}
        >
          All
        </div>
        <div
          role="button"
          className="btn bg-[#ffff97] shadow-md  w-28 text-lg hover:bg-[#fefe7a] hover:shadow-lg border-none  "
          onClick={() => {
            setType("Bike");
          }}
        >
          Bikes
        </div>
        <div
          role="button"
          className="btn w-28 bg-[#fece80] shadow-md text-lg hover:bg-[#ffbb4d] hover:shadow-lg border-none   "
          onClick={() => {
            setType("Car");
          }}
        >
          Cars
        </div>
      </div>
      {/* cards */}
      <div className="mt-15 grid grid-cols-2 mb-5 md:grid-cols-4 p-5 ">
        {filterList.map((item) => {
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

export default VehiclesPage;
