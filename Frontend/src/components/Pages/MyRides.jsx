import React, { useContext, useEffect, useState, useMemo } from "react";
import { UserContext } from "../../context/context";
import axios from "axios";
import Loader2 from "../loader/Loader2";
import { Link } from "react-router-dom";
import CarCard from "../Cards/CarCard";

const MyRides = () => {
  const { user, url } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("active");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/user/myrides/${user?._id}`);
      if (res.data) {
        setBookings(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const activeBookings = useMemo(() =>
    bookings.filter((item) => item.status === "Ongoing" || item.status === "Booked"), 
    [bookings]
  );

  const recentBookings = useMemo(() =>
    bookings.filter((item) => item.status === "Completed"), 
    [bookings]
  );

  return (
    <div className="bookings-container">
      <div className="flex justify-center my-5 space-x-4">
        <button
          onClick={() => setActiveView("active")}
          className={`px-6 py-2 rounded-md text-white shadow-md transition-colors duration-300 ${
            activeView === "active" ? "bg-blue-500" : "bg-slate-500"
          }`}
        >
          Active Bookings
        </button>
        <button
          onClick={() => setActiveView("recent")}
          className={`px-6 py-2 rounded-md text-white shadow-md transition-colors duration-300 ${
            activeView === "recent" ? "bg-sky-500" : "bg-slate-500"
          }`}
        >
          Recent Bookings
        </button>
      </div>

      {loading ? (
        <Loader2 />
      ) : activeView === "active" ? (
        <div className="my-10">
          {activeBookings.length > 0 ? (
            <div className="mt-15 grid grid-cols-1 place-items-center mb-5 gap-3 md:grid-cols-4 p-5 ">
              {activeBookings.map((item) => (
                <Link
                  to={`/vehicledetails/${item.vehicle._id}`}
                  key={item._id}
                >
                  <CarCard data={item.vehicle} status={item.status} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid place-items-center text-2xl  md:h-[50vh] h-[70vh] ">
              No Active Bookings Found
            </div>
          )}
        </div>
      ) : (
        <div className="my-10">
          {recentBookings.length > 0 ? (
            <div className="mt-15 grid grid-cols-1 place-items-center mb-5 gap-3 md:grid-cols-4 p-5 ">
              {recentBookings.map((booking) => (
                <Link
                  to={`/recentBookingsDetails/${booking._id}`}
                  key={booking._id}
                >
                  <CarCard data={booking.vehicle} status={booking.status} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid place-items-center text-2xl  md:h-[50vh] h-[70vh] ">
              No Recent Bookings Found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyRides;
