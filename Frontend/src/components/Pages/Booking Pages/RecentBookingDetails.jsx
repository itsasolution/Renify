import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import ImageSection from "../VehiclePages/ImageSection";
import BookingDetails from "./BookingDetails";
import { UserContext } from "../../../context/context";
import VehicleDetailText from "../VehiclePages/VehicleDetailText";

const RecentBookingDetails = () => {
  const { url, user } = useContext(UserContext);
  const [booking, setBooking] = useState({});
  const [image, setImage] = useState("");
  const [vehicle, setVehicle] = useState(null);
  const { bookingId } = useParams(); // vehicle ID from URL params

  const findRecentBooking = async () => {
    try {
      const res = await axios.get(`${url}/vehicles/recentBooking/${bookingId}`);
      if (res) {
        setBooking(res.data);
        setVehicle(res.data?.vehicle);
        setImage(res.data?.vehicle.images[0]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching booking details");
    }
  };

  useEffect(() => {
    findRecentBooking();
  }, [bookingId]);

  return (
    <>
      <div className="grid z-10 md:grid-cols-2 items-start grid-cols-1 gap-2 mt-3  px-1 md:px-4">
        <span className=" dark:bg-slate-900 pb-3 bg-white md:mb-10 rounded-lg shadow-md ">
          {/* Image Section */}
          <ImageSection
            vehicle={vehicle}
            setImage={setImage}
            image={image}
            providerPage={true}
          />
        </span>

        <div className="md:p-4  p-2 dark:bg-slate-900 bg-white/75 shadow hover:shadow-md duration-200 rounded-xl">
          <VehicleDetailText vehicle={vehicle} />
          {/* renter */}
          <div className="max-w-lg mx-auto outline outline-1 outline-gray-300 dark:outline-0  mb-6 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">
              Renter Details
            </h2>
            <table className="min-w-full text-left border-collapse border border-gray-400 dark:border-gray-600">
              <tbody>
                <tr className="border-b border-gray-400 dark:border-gray-600">
                  <td className="px-4 py-2 font-semibold bg-gray-100 dark:bg-slate-700/60 text-gray-700 dark:text-gray-300">
                    Name
                  </td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                    {booking?.user?.name}
                  </td>
                </tr>
                <tr className="border-b border-gray-400 dark:border-gray-600">
                  <td className="px-4 py-2 font-semibold bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300">
                    Email
                  </td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                    {booking?.user?.email}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300">
                    Contact No
                  </td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                    {booking?.user?.mobileNumber}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Display Booking Details */}
          <BookingDetails booking={booking} />
        </div>
      </div>
    </>
  );
};

export default RecentBookingDetails;
