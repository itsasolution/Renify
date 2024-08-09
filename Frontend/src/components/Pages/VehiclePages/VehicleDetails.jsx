import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/context";
import DateTimeSchedular from "../../Date and time picker/DateTimeSchedular";
import CardSlider from "../../Cards/CardSlider";
import ImageSection from "./ImageSection";
import ReviewForm from "./ReviewForm";
import ModelRed from "../../Helper model/ModelRed";
import { CircularProgress } from "@mui/material";
import DateTimeComp from "../../Date and time picker/DateTimeComp";
import Reviews from "./Reveiws";
import VehicleDetailText from "./VehicleDetailText";
import DateRange from "../../Date and time picker/DateRange";

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
    findBooking();
  }, []);

  // booking status
  const findBooking = () => {
    axios
      .post(`${url}/vehicles/checkBooking`, { uid: user?._id, vid: id })
      .then((res) => {
        if (res) {
          setBooking(res.data.booking);
          // console.log(booking);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [dateData, setDateData] = useState(undefined);

  // getdates
  const getDate = (date, showDate) => {
    setDateData(date);
    console.log(dateData);
  };

  // booking ride
  const Bookeride = () => {
    if (dateData) {
      const data = {
        id: id, //vehicle
        userId: user._id,
        ...dateData, // spreading datedata
      };
      setLoader(true);
      axios
        .post("http://localhost:4000/vehicles/book", { ...data })
        .then((res) => {
          if (res.data) {
            console.log("Book response: ", res.data);
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
      .post(`${url}/vehicles/cancelBooking`, { uid: user._id, vid: id })
      .then((res) => {
        if (res) {
          setBooking({});
          toast.success("Cancelled");
        }
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        // toast.error(err?.response?.data)
      });
  };

  return (
    <>
      <Link to={"/vehicles"}>
        <div className="hidden md:flex items-center group font-semibold m-2 w-14 justify-between">
          <IoIosArrowBack className="group-hover:translate-x-1 duration-300" />
          Back
        </div>
      </Link>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-2 mt-3 px-1 md:px-4">
        {/* Image Section */}
        <ImageSection vehicle={vehicle} setImage={setImage} image={image} />
        <div className="md:p-4 p-2  dark:bg-slate-900 bg-white  rounded-xl ">
          <VehicleDetailText vehicle={vehicle} />

          {/* DateTime Scheduler */}
          {!booking?.startDate && <DateTimeSchedular getDate={getDate} />}
          {/* <DateTimeComp getDate={getDate} /> */}
          {/* <DateRange /> */}

          {booking?.startDate && (
            <table className="min-w-full my-4 border-collapse border border-gray-300">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    Amount:
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {booking.amount}
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    Booking Date:
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(booking?.bookingDate).toLocaleString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    Start Date:
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(booking?.startDate).toLocaleString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    End Date:
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(booking?.endDate).toLocaleString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    Status:
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {booking.status}
                  </td>
                </tr>
              </tbody>
            </table>
          )}

          <div className="flex flex-col items-center">
            {/* Booking and Cancel Function */}
            {user?._id ? (
              booking?.user ? (
                <ModelRed
                  btnName="Cancel Booking"
                  message="Are You Sure You Want to cancel Your Ride"
                  heading="Cancel Booking"
                  actionName="Cancel Ride"
                  fn={cancel}
                  bgclr="bg-rose-600"
                  cls="w-[50%] btn hover:bg-rose-500 hover:ring-2 ring-white border-none h-12 text-white text-base align-middle shadow-md rounded-full flex items-center justify-center p-3 bg-rose-600"
                />
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
                <button className="w-full btn hover:ring-2 border-none h-12 ring-white text-white text-base align-middle shadow-md rounded-full flex items-center justify-center p-3 bg-green-500">
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
