import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/context";
import axios from "axios";
import Loader2 from "../loader/Loader2";
import { Link } from "react-router-dom";
import CarCard from "../Cards/CarCard";

const Bookings = () => {
  const { user, url } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/provider/find-bookings/${user._id}`);
      console.log("Response: ", res);
      setBookings(res?.data);//array[{veh},{veh}]
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="bookings-container">
      {loading ? (
        <Loader2 />
      ) : bookings.length > 0 ? (
        <div className="my-10 grid grid-cols-1 h-auto mb-5 md:grid-cols-4 px-5 ">
          {bookings.map((item) => {
            return (
              <Link to={`/vehicledetails/${item.vehicle._id}`} className="my-4">
                <CarCard
                  key={item.vehicle._id}
                  data={item.vehicle}
                  status="Booked"
                />
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex text-2xl flex-col w-full items-center h-[calc(100vh-60px)] justify-center">
          No bookings found
        </div>
      )}
    </div>
  );
};

export default Bookings;
