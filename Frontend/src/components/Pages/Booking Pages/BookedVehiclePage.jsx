import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import ImageSection from "../VehiclePages/ImageSection";
import BookingDetails from "./BookingDetails";
import { CircularProgress } from "@mui/material";
import { UserContext } from "../../../context/context";
import ModelRed from "../../Helper model/ModelRed";
import PassCodeModel from "./PassCodeModel";
import Loader from "../../loader/Loader";

export const BookedVehiclePage = () => {
  const { url } = useContext(UserContext);
  const [booking, setBooking] = useState({});
  const [image, setImage] = useState("");
  const [vehicle, setVehicle] = useState(null);
  const [loader, setLoader] = useState(false);
  const { bookingId } = useParams(); // vehicle ID from URL params

  const findBooking = async () => {
    try {
      const res = await axios.get(
        `${url}/provider/currentBooking/${bookingId}`
      );
      if (res) {
        console.log(res.data);
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
    findBooking();
  }, [bookingId]);

  const complete = () => {
    axios
      .get(`${url}/provider/complete/${booking._id}`)
      .then((res) => {
        toast.success("Ride Completed!");
        setBooking(res?.data);
        navigate(`/recentBookingsDetails/${booking._id}`)
      })
      .catch((err) => {
        toast.error("Error Complete !");
        console.error(err.message);
      });
  };

  const startRide = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        `${url}/provider/currentBooking/start/${booking?._id}`
      );
      if (res) {
        console.log(res.data);
        setBooking(res.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error Starting Ride!");
    } finally {
      setLoader(false);
    }
  };

  
  const navigate = useNavigate();
  // Handle Booking Cancellation
  const cancel = async () => {
    setLoader(true);
    try {
      const res = await axios.post(`${url}/vehicles/cancelBooking`, {
        Bookingid: booking._id,
      });
      if (res) {
        setBooking({});
        toast.success("Booking Cancelled");
        navigate(-1);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel booking");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader && <Loader />}
      <div className="grid z-10 md:grid-cols-2 items-start grid-cols-1 gap-2 mt-3  px-1 md:px-4">
        <span className=" dark:bg-slate-900 pb-5 bg-white md:mb-10 rounded-lg shadow-md ">
          {/* Image Section */}
          <ImageSection
            vehicle={vehicle}
            setImage={setImage}
            image={image}
            providerPage={true}
          />
          <div className="m-2 md:p-2 grid grid-cols-2  ">
            <div>
              <h1 className="text-3xl font-semibold">{vehicle?.model}</h1>
              <h1 className="text-2xl text-slate-500 dark:text-slate-400 my-2 font-semibold">
                {vehicle?.brand}
              </h1>
              <div className="flex items-center mb-1 space-x-1">
                <span className="mr-1">{vehicle?.overallRating}</span>
                {Array.from({ length: vehicle?.overallRating }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
                {Array.from({ length: 5 - vehicle?.overallRating }).map(
                  (_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-gray-300 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  )
                )}
              </div>
              <div className="my-1">
                {vehicle?.reviews?.length ? vehicle?.reviews?.length : 0}{" "}
                reviews
              </div>
            </div>
            {/* Price */}
            <div className="text-lg pt-1">
              <div className="font-semibold">
                Rent/hour : ₹ {vehicle?.rentPerHour}
              </div>
              <div className="my-1 font-semibold">
                Rent/Day : ₹ {vehicle?.rentPerDay}
              </div>
              <p className="font-semibold leading-snug">
                Location: {vehicle?.location}
              </p>
            </div>
          </div>
        </span>

        <div className="md:p-4  p-2 dark:bg-slate-900 bg-white/75 shadow hover:shadow-md duration-200 rounded-xl">
          {/* renter */}
          <div className="max-w-lg mx-auto outline outline-1 outline-gray-300 dark:outline-0  mb-6 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
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

          {/* Booking and Cancel Function */}
          <div className="flex flex-col w-full flex-wrap justify-center gap-3 items-center">
            {booking.status === "Ongoing" ? (
              <ModelRed
                btnName="Complete"
                message="Have You Got Your Vehicle Back?"
                heading="Complete Ride"
                actionName="Confirm"
                fn={complete}
                bgclr="bg-sky-400"
                cls="w-full btn hover:bg-sky-500 max-w-80 hover:ring-2 ring-white border-none h-12 text-white text-base align-middle shadow-md rounded-full flex items-center justify-center p-3 bg-blue-600"
              />
            ) : (
              <>
                <ModelRed
                  btnName="Cancel Booking"
                  message="Are You Sure You Want to Cancel Your Ride?"
                  heading="Cancel Booking"
                  actionName="Cancel Ride"
                  fn={cancel}
                  bgclr="bg-rose-600"
                  cls="w-full btn hover:bg-rose-500 max-w-80 hover:ring-2 ring-white border-none h-12 text-white text-base align-middle shadow-md rounded-full flex items-center justify-center p-3 bg-rose-600"
                />

                <PassCodeModel
                  startRide={startRide}
                  orgPassCode={booking.passCode}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookedVehiclePage;
