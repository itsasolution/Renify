import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/context";
import DateTimePicker from "./DateTimePicker";
import CardSlider from "../../Cards/CardSlider";
import ImageSection from "./ImageSection";
import ReviewForm from "./ReviewForm";
import ModelRed from "../../Helper model/ModelRed";
import { CircularProgress } from "@mui/material";
import Reviews from "./Reveiws";
import VehicleDetailText from "./VehicleDetailText";
import BookingDetails from "../Booking Pages/BookingDetails";

export const VehicleDetails = () => {
  const { user, url } = useContext(UserContext);

  const [booking, setBooking] = useState({});
  const [image, setImage] = useState("");
  const [vehicle, setVehicle] = useState();
  const [loader, setLoader] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${url}/vehicles/findvehicle/${id}`)
      .then((res) => {
        if (res) {
          setVehicle(res.data);
          setImage(res.data.images[0]);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data);
      });

    // booking status
    CheckBookingOfUser();
  }, [id]);

  // booking status
  const CheckBookingOfUser = () => {
    axios
      .post(`${url}/user/checkBooking`, { uid: user?._id, vid: id })
      .then((res) => {
        setBooking(res.data.booking);
        // console.log(booking);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [dateAndCost, setDateAndCost] = useState(undefined);

  // getdates
  const getDate = (dateAndCost) => {
    setDateAndCost(dateAndCost);
  };

  // booking ride
  const Bookeride = () => {
    if (dateAndCost) {
      const data = {
        id: id, //vehicle
        userId: user._id,
        ...dateAndCost, // spreading dateAndCost
        passCode: Math.floor(1000 + Math.random() * 9000),
      };
      setLoader(true);
      axios
        .post(`${url}/user/bookVehicle`, { ...data })
        .then((res) => {
          if (res.data) {
            setBooking(res.data.booking);
            toast.success("Vehicle Booked");
          }
          setLoader(false);
        })
        .catch((err) => {
          console.error(err);
          // toast.error(err.response?.data);
          setLoader(false);
        });
    } else {
      toast.error("Select Date First");
    }
  };

  const cancel = () => {
    setLoader(true);
    axios
      .get(`${url}/user/cancelBooking/${booking?._id}`)
      .then((res) => {
        if (res) {
          setBooking({});
          toast.success("Cancelled");
        }
        setLoader(false);
      })
      .catch((err) => {
        console.error(err);
        setLoader(false);
        // toast.error(err?.response?.data)
      });
    setDateAndCost(undefined);
  };

  return (
    <>
      <div className="grid  md:grid-cols-2 items-start grid-cols-1 gap-2 mt-3 px-1 md:px-4">
        {/* Image Section */}
        <ImageSection vehicle={vehicle} setImage={setImage} image={image} />

        <div className="md:p-4 p-2  dark:bg-slate-900 bg-white/75 shadow hover:shadow-md duration-200  rounded-xl ">
          <VehicleDetailText vehicle={vehicle} />

          {/* DateTime Scheduler */}
          {!booking?.startDate ? (
            <DateTimePicker getDate={getDate} vehicle={vehicle} />
          ) : (
            <>
              <div className="p-4 bg-gray-100 dark:bg-gray-800/90 rounded-lg shadow-lg text-center max-w-[500px] mx-auto">
                <span className="inline-block px-4 py-2 bg-cyan-500 text-white font-semibold rounded-full shadow-md text-xl mb-2">
                  Pass Code: {booking.passCode}
                </span>
                <p className="mt-2 text-gray-700 dark:text-gray-200 text-sm">
                  Share this passcode with the vehicle owner to start your ride.
                </p>
              </div>

              <BookingDetails booking={booking} />
            </>
          )}

          {/* Booking and Cancel Function */}
          <div className="flex flex-col items-center ">
            {user?._id ? (
              booking?.user ? (
                // ongoing can't cancel only by owner
                booking.status !== "Ongoing" && (
                  <ModelRed
                    btnName="Cancel Booking"
                    message="Are You Sure You Want to cancel Your Ride"
                    heading="Cancel Booking"
                    actionName="Cancel Ride"
                    fn={cancel}
                    bgclr="bg-rose-600"
                    cls="w-[40%] btn hover:bg-rose-500 hover:ring-2 ring-white border-none h-12 text-white text-base align-middle shadow-md rounded-full flex items-center justify-center p-3 bg-rose-600"
                  />
                )
              ) : (
                <button
                  className="w-[50%] btn hover:bg-green-500 hover:ring-2 ring-white border-none h-12 text-white text-base align-middle shadow-md rounded-full flex items-center justify-center p-3 bg-green-500"
                  onClick={() => Bookeride()}
                >
                  {loader ? (
                    <CircularProgress color="inherit" thickness={5} size={25} />
                  ) : (
                    "Book Ride"
                  )}
                </button>
              )
            ) : (
              <Link to={"/user-login"}>
                <button className="w-full btn hover:ring-2 border-none h-12 ring-white text-white text-base align-middle shadow-md rounded-full flex items-center justify-center p-3 px-5 bg-green-500">
                  Login to Book Ride
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <Reviews reviews={vehicle?.reviews} />
      <ReviewForm user={user} vid={id} />

      <div className="my-28">
        <CardSlider />
      </div>
    </>
  );
};
