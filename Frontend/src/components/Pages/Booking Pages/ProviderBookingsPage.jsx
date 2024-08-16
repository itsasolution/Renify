import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/context";
import axios from "axios";
import Loader2 from "../../loader/Loader2";
import { Link } from "react-router-dom";
import CarCard from "../../Cards/CarCard";
import BookingCard from "./BookingCard";

const ProviderBookingsPage = () => {
  const { user, url } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("active"); // State to manage the active view

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/provider/find-bookings/${user._id}`);
      setBookings(res?.data);
      console.log(res?.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const activeBookings = bookings.filter(
    (item) => item.status === "Ongoing" || item.status === "Booked"
  );

  const recentBookings = bookings.filter((item) => item.status === "Completed");

  return (
    <div>
      {/* Button Toggle for Active and Recent Bookings */}
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
            <div className="grid grid-cols-1 gap-4 h-auto mb-5 md:grid-cols-3 xl:grid-cols-4 px-5">
              {activeBookings.map((item) => (
                <Link
                  to={`/BookedVehiclePage/${item._id}`}
                  key={item.vehicle._id}
                >
                  <BookingCard
                    data={item.vehicle}
                    status={item.status}
                    user={item.user}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid place-items-center text-2xl  md:h-[50vh] h-[70vh] ">
              No active bookings found
            </div>
          )}
        </div>
      ) : (
        <div className="my-10">
          {recentBookings.length > 0 ? (
            <div className="grid grid-cols-1 h-auto mb-5 md:grid-cols-4 px-5">
              {recentBookings.map((item) => (
                <Link to={`/recentBookingsDetails/${item._id}`} key={item.vehicle._id}>
                  <CarCard data={item.vehicle} status={item.status} />
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

export default ProviderBookingsPage;
