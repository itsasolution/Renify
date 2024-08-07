import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { UserContext } from "../../context/context";
import ImageSection from "../Pages/VehiclePages/ImageSection";
import Reviews from "../Pages/VehiclePages/Reveiws";
import VehicleDetailText from "../Pages/VehiclePages/VehicleDetailText";
import { useNavigate } from "react-router-dom";
import ModelRed from "../Helper model/ModelRed";

export const VehicleEdit = () => {
  const { url } = useContext(UserContext);

  const [image, setImage] = useState("");
  const [vehicle, setVehicle] = useState();
  const [loader, setLoader] = useState(false);

  const { id } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [updatedVehicle, setUpdatedVehicle] = useState({
    model: "",
    brand: "",
    rentPerHour: "",
    rentPerDay: "",
    providerName: "",
    location: "",
    availability: "",
  });

  useEffect(() => {
    axios
      .get(`${url}/vehicles/findvehicle/${id}`)
      .then((res) => {
        if (res) {
          const vehicleData = res.data;
          setVehicle(vehicleData);
          setImage(vehicleData.images[0]);
          setUpdatedVehicle({
            ...vehicleData,
            availability: vehicleData.availability ? "true" : "false",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data);
      });
  }, [url, id]);

  const navigate = useNavigate();
  const deleteVehicle = () => {
    setLoader(true);
    axios
      .delete(`${url}/vehicles/${id}`)
      .then((res) => {
        if (res) {
          navigate("/myvehicles");
          toast.success("vehicle Deleted SuccessFully");
        }
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Deleting");
        setLoader(false);
      });
  };

  const handleUpdate = () => {
    console.log(updatedVehicle);
    setLoader(true);
    axios
      .post(`${url}/vehicles/update/${id}`, {
        ...updatedVehicle,
        availability: updatedVehicle.availability === "true",
      })
      .then((res) => {
        if (res.data) {
          //   console.log("Update response: ", res.data);
          setVehicle(res.data);
          toast.success("Vehicle Updated");
          setEditMode(false);
        }
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data);
        setLoader(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedVehicle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const btnCls =
    "mt-4 dark:hover:ring-2 ring-white btn hover:bg-blue-600 border-none h-12 text-white text-base align-middle shadow-md rounded-full flex items-center justify-center p-3 bg-blue-500";
  const inpCls = "block w-full p-2 my-1 mb-2 ring-2 rounded bg-inherit";

  return (
    <>
      <Link to={"/vehicles"}>
        <div className="hidden md:flex items-center group font-semibold m-2 w-14 justify-between">
          <IoIosArrowBack className="group-hover:translate-x-1 duration-300" />
          Back
        </div>
      </Link>

      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 mt-5">
        {/* Image Section */}
        <ImageSection vehicle={vehicle} setImage={setImage} image={image} />

        <div className="p-4">
          {editMode ? (
            <>
              <div className="m-2 grid md:grid-cols-2 md:gap-5">
                <div>
                  <label className="font-semibold my-2">
                    Model
                    <input
                      type="text"
                      name="model"
                      value={updatedVehicle.model}
                      onChange={handleInputChange}
                      className={inpCls}
                    />
                  </label>
                  <label className="block font-semibold my-2">
                    Brand
                    <input
                      type="text"
                      name="brand"
                      value={updatedVehicle.brand}
                      onChange={handleInputChange}
                      className={inpCls}
                    />
                  </label>
                  <label className=" font-semibold my-2">
                    Rent/hour
                    <input
                      type="text"
                      name="rentPerHour"
                      value={updatedVehicle.rentPerHour}
                      onChange={handleInputChange}
                      className={inpCls}
                    />
                  </label>
                  <label className="block font-semibold my-2">
                    Rent/Day
                    <input
                      type="text"
                      name="rentPerDay"
                      value={updatedVehicle.rentPerDay}
                      onChange={handleInputChange}
                      className={inpCls}
                    />
                  </label>
                </div>
                <div className="flex flex-col gap-1 font-semibold">
                  <label>
                    Location
                    <input
                      type="text"
                      name="location"
                      value={updatedVehicle.location}
                      onChange={handleInputChange}
                      className={inpCls}
                    />
                  </label>
                  <span className="mt-1">Availability</span>
                  <div className="ml-4 flex items-center gap-2">
                    <input
                      type="radio"
                      id="true"
                      name="availability"
                      value="true"
                      checked={updatedVehicle.availability === "true"}
                      onChange={handleInputChange}
                      className="radio radio-primary h-5 w-5"
                    />
                    <label
                      htmlFor="true"
                      className="cursor-pointer hover:text-sky-400"
                    >
                      Available
                    </label>
                  </div>
                  <div className=" ml-4 flex items-center gap-2">
                    <input
                      type="radio"
                      name="availability"
                      id="false"
                      value="false"
                      checked={updatedVehicle.availability === "false"}
                      onChange={handleInputChange}
                      className="radio radio-error h-5 w-5"
                    />
                    <label
                      htmlFor="false"
                      className="hover:text-rose-400 cursor-pointer"
                    >
                      Not Available
                    </label>
                  </div>

                  <button onClick={handleUpdate} className={btnCls}>
                    {loader ? (
                      <CircularProgress
                        color="inherit"
                        thickness={5}
                        size={25}
                      />
                    ) : (
                      "Save Changes"
                    )}
                  </button>

                  <button onClick={() => setEditMode(false)} className={btnCls}>
                    Cancel
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <VehicleDetailText vehicle={vehicle} />

              <div className="flex md:gap-5 flex-wrap">
                <button
                  onClick={() => setEditMode(true)}
                  className={` ${btnCls} md:w-48 w-full `}
                >
                  Edit Details
                </button>

                <ModelRed
                  btnName="Delete Vehicle"
                  heading="DELETE VEHICLE!"
                  message="Are You Sure want Delete This Vehicle "
                  actionName="Delete"
                  fn={deleteVehicle}
                  bgclr="bg-rose-500"
                  cls={` ${btnCls} md:w-48 w-full bg-rose-500 hover:bg-rose-600 `}
                />
                {/* <button
                  onClick={() => deleteVehicle()}
                  className={` ${btnCls} md:w-48 w-full bg-rose-500 hover:bg-rose-600 `}
                >
                </button> */}
              </div>
            </>
          )}

          <div className="flex flex-col items-center"></div>
        </div>
      </div>

      <Reviews reviews={vehicle?.reviews} />
      {/* <ReviewForm user={user} vid={id} /> */}

      <div className="my-28"></div>
    </>
  );
};
