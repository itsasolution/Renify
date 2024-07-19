import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/context";
import DateTimeSchedular from "../../Date and time picker/DateTimeSchedular";
import CardSlider from "../../CardSlider";
import ImageSection from "./ImageSection";
import { Rating } from "@mui/material";
import Reveiws from "./Reveiws";
import ReviewForm from "./ReviewForm";

export const VehicleDetails = () => {
  const { user } = useContext(UserContext);

  const [image, setImage] = useState("");
  const [vehicle, setVehicle] = useState();
  const [bookingData, setBookingData] = useState();

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/vehicles/findvehicle/${id}`)
      .then((res) => {
        if (res) {
          console.log(res.data);
          setVehicle(res.data);
          setImage(res.data.images[0]);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data);
      });

    // booking status
    if (user?._id) {
      // user.populate("Booking").myRides[0].populate("vehicle")
      // myvehicle[arr].populate(user/vehicle).vehicleID.bookingDetails
    }
  }, []);

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

      axios
        .post("http://localhost:4000/vehicles/book", { ...data })
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            // console.log(res);
            toast.success("Vehicle Booked");
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response?.data);
        });
    } else {
      toast.error("Select Date First");
    }
  };

  return (
    // <div className="md:h-[calc(100vh-55px)]  ">
    <>
      <Link to={"/vehicles"}>
        <div className="hidden md:flex items-center group font-semibold m-2 w-14 justify-between">
          <IoIosArrowBack className="group-hover:translate-x-1 duration-300" />{" "}
          Back
        </div>
      </Link>

      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 mt-5">
        {/* images section */}
        <ImageSection vehicle={vehicle} setImage={setImage} image={image} />

        <div className="">
          <div className="m-2 grid grid-cols-2  ">
            <div className="">
              <h1 className="text-3xl my-2 font-semibold">{vehicle?.model}</h1>
              <h1 className="text-2xl text-slate-500 my-2 font-semibold">
                {vehicle?.brand}
              </h1>
              <span className="">
                <span className="mx-1 flex items-center">
                  {/* <Rating
                    value={vehicle?.overallRating}
                    sx={{ fontSize: "20px" }}
                    readOnly
                    /> */}

                  <div className="flex items-center mb-1 space-x-1 ">
                    <span className="mr-1">{vehicle?.overallRating}</span>
                    {Array.from({ length: vehicle?.overallRating }).map(
                      (_, i) => (
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
                      )
                    )}
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
                  {/* <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-gray-300 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </div> */}
                </span>
                <div>{vehicle?.reviews?.length} reviews</div>
              </span>
              {/* price */}
              <span className="text-lg pt-1">
                <span className="font-semibold">
                  Rent/hour:
                  <span className=""> ₹ {vehicle?.rentPerHour}</span>
                </span>
                <div className="my-1">
                  <span className="font-semibold">
                    Rent/Day:
                    <span> ₹ {vehicle?.rentPerDay}</span>
                  </span>
                </div>
              </span>
            </div>
            <div className="flex flex-col font-semibold mt-[90px] md:mt-24 mx-1 text-lg ">
              <span>Owner : {vehicle?.providerId?.name}</span>
              <span>Location : {vehicle?.location}</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <DateTimeSchedular getDate={getDate} />

            {user?._id ? (
              <button
                className="w-[50%] btn hover:bg-green-600 border-none h-12 text-white text-base align-middle shadow-md rounded-full flex items-center justify-center p-3 bg-green-500"
                onClick={() => Bookeride()}
              >
                Book Ride
              </button>
            ) : (
              <Link to={"/user-login"}>
                <button className="w-full btn hover:bg-green-600 border-none h-12 text-white text-base align-middle shadow-md rounded-full flex items-center justify-center p-3 bg-green-500">
                  Login to book Ride
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <Reveiws reviews={vehicle?.reviews} />
      <ReviewForm user={user} vid={id} />

      <div className="my-28">
        <CardSlider />
      </div>
    </>
  );
};
