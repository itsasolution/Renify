import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterest,
  FaInstagram,
} from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/context";
import DateTimeSchedular from "../../Date and time picker/DateTimeSchedular";
import CardSlider from "../../CardSlider";

export const VehicleDetails = () => {
  const { user } = useContext(UserContext);

  const [vehicle, setVehicle] = useState();
  const [image, setImage] = useState("");
  const [booked, setBooked] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    axios
      .post("http://localhost:4000/vehicles/findvehicle", { id })
      .then((res) => {
        if (res) {
          // console.log(res.data);
          setVehicle(res.data);
          setImage(res.data.images[0]);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data);
      });
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
        id: id,
        userId: user._id,
        ...dateData, // spreading datedata
      };

      axios
        .post("http://localhost:4000/vehicles/book", { ...data })
        .then((res) => {
          if (res.data) {
            console.log(res.data.message);
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

  const [backgroundPosition, setBackgroundPosition] = useState("center");
  const [backSize, setbackSize] = useState("cover");

  const changeImage = (index) => {
    setImage(vehicle?.images[index]);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
    setbackSize("200%");
  };

  const handleLeave = (e) => {
    setBackgroundPosition(`center`);
    setbackSize("cover");
  };
  const iconsClass =
    "shadow-md  w-7 h-7 p-1 mx-1 rounded-full hover:bg-green-500 duration-100 hover:fill-white dark:fill-white";

  return (
    // <div className="md:h-[calc(100vh-55px)]  ">
    <div className="">
      <Link to={"/vehicles"}>
        <div className="flex items-center  font-semibold m-2 w-14 justify-between">
          <IoIosArrowBack /> Back
        </div>
      </Link>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-5 ">
        {/* images section */}
        {/* <div className=" flex md:gap-1 md:flex-row flex-col-reverse"> */}
        <div className="md:mx-5 m-2 flex gap-1 md:gap-2 flex-col-reverse">
          {/* small boxs */}
          {/* <div className="flex md:flex-col items-center md:w-32 w-full scroll overflow-x-scroll"> */}
          <div className="flex items-center w-full scroll overflow-x-scroll  ">
            {vehicle?.images?.map((img, index) => {
              return (
                <button
                  onClick={() => changeImage(index)}
                  key={index}
                  className="shrink-0  md:m-1.5 bg-no-repeat m-1 h-20 w-20 overflow-hidden rounded-lg hover:outline-green-400 hover:outline-2 outline-1 dark:outline shadow-md "
                >
                  <img
                    className=" h-full w-full"
                    src={`${img}`}
                    alt="img"
                  />
                </button>
              );
            })}
          </div>
          <div className=" w-full md:h-[80%] h-72 ">
            <div
              className="image-container rounded-xl shadow-md   h-full p-1 w-full overflow-hidden bg-no-repeat"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleLeave}
              style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: backgroundPosition,
                backgroundSize: backSize,
              }}
            >
              {/* <img
                className="image h-full w-full opacity-0"
                src={`${image}`}
                alt="img"
              /> */}
            </div>
          </div>
        </div>

        <div className="">
          <div className="m-2">
            <h1 className="text-3xl my-2 font-semibold">{vehicle?.model}</h1>
            <h1 className="text-2xl text-slate-400 my-2 font-semibold">
              {vehicle?.brand}
            </h1>
            <span className="flex">
              <span className="flex">
                <IoMdStar className="fill-yellow-300" />
                <IoMdStar className="fill-yellow-300" />
                <IoMdStar className="fill-yellow-300" />
                <IoMdStar className="fill-yellow-300" />
                <IoMdStar className="fill-slate-200" />
              </span>
              4 reviews
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
          <span>{vehicle?.type}</span>
          <div className="my-2">
            <span className="font-semibold">Availability: </span>
            <div className="flex text-slate-600 my-3 text-xl">
              Connect With Us:
              <div className="flex ml-5 ">
                <FaFacebookF
                  className={`${iconsClass} bg-green-500 fill-white`}
                />
                <FaTwitter className={iconsClass} />
                <FaPinterest className={iconsClass} />
                <FaInstagram className={iconsClass} />
              </div>
            </div>
          </div>
        </div>
      </div>

<div className="my-28">
      <CardSlider />
</div>
    </div>
  );
};
