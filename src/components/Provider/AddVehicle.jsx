import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../../context/context";
import { useNavigate } from "react-router-dom";

const AddVehicle = () => {
  const { user, setMyVehicles, MyVehicles } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // formData["images"] = data.images[0]; single images upload

    const formData = new FormData(); // Create a new FormData object
    formData.append("PID", user._id);

    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]); // Add each image to formData
    }
    for (let key in data) {
      if (key !== "images") {
        formData.append(key, data[key]);
      }
    }

    try {
      const response = await axios.post(
        // "http://localhost:4000/addvehicle",
        "http://localhost:4000/ADDVEHICLES",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Vehicle added successfully:", response.data.newVehicle); // object
      if (response?.data?.newVehicle) {
        setMyVehicles((prevList) => [...prevList, response.data.newVehicle]);
        navigate("/myvehicles");
      }

      toast.success("Vehicle added successfully");
    } catch (error) {
      if (error.response.data.res) toast.error(error.response.data.res);
      else toast.error("Error adding vehicle");
      console.error("Error adding vehicle:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto my-5  ">
      {/* radio */}
      <div className="mb-4 relative">
        <label>Vehicle Type</label>
        <span className="flex gap-3 mt-2">
          <div className="cursor-pointe">
            <input
              className="radio-xs radio-primary cursor-pointer"
              type="radio"
              id="car"
              value="Car"
              {...register("type", { required: "Type is required" })}
            />
            <label className="mx-2 cursor-pointer" htmlFor="car">
              Car
            </label>
          </div>

          <div className="cursor-pointer">
            <input
              className="radio-xs radio-primary cursor-pointer"
              type="radio"
              id="bike"
              value="Bike"
              {...register("type", { required: "Type is required" })}
            />
            <label className="mx-2 cursor-pointer" htmlFor="bike">
              Bike
            </label>
          </div>
        </span>
        {errors.type && (
          <p className="text-sm text-red-500 absolute right-0 top-6 ">
            {errors.type.message}
          </p>
        )}
      </div>

      {/* brand */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          {...register("brand", { required: "Brand is required" })}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Brand (Automobile Company)
        </label>
        {errors.brand && (
          <p className="text-sm text-red-500 absolute right-0 top-3">
            {errors.brand.message}
          </p>
        )}
      </div>
      {/* Model */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          {...register("model", { required: "Model is required" })}
          type="text"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="floating_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Model
        </label>
        {errors.model && (
          <p className="text-sm text-red-500 absolute right-0 top-3">
            {errors.model.message}
          </p>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          {...register("registrationNumber", {
            required: "Registration Number is required",
          })}
          type="text"
          id="floating_repeat_password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="floating_repeat_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Registration No.
        </label>
        {errors.registrationNumber && (
          <p className="text-sm text-red-500 absolute right-0 top-3">
            {errors.registrationNumber.message}
          </p>
        )}
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("rentPerDay", {
              required: "required",
            })}
            type="number"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Rent Per Day
          </label>
          {errors.rentPerDay && (
            <p className="text-sm text-red-500 absolute right-0 top-3">
              {errors.rentPerDay.message}
            </p>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("rentPerHour", {
              required: "required",
            })}
            // inputmode="numeric"
            type="number"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_last_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Rent Per Hour
          </label>
          {errors.rentPerHour && (
            <p className="text-sm text-red-500 absolute right-0 top-3">
              {errors.rentPerHour.message}
            </p>
          )}
        </div>
      </div>
      <div className="relative flex items-center z-0 w-full mb-5 group">
        <lord-icon
          src="https://cdn.lordicon.com/zpxpdajl.json"
          trigger="hover"
          stroke="light"
          colors="primary:#121331,secondary:#08a88a,tertiary:#4bb3fd,quaternary:#ffc738,quinary:#eee966,senary:#ffffff,septenary:#f9c9c0"
          style={{ width: "50px", height: "50px" }}
        ></lord-icon>

        <input
          {...register("images", {
            required: "At least one Images is required",
          })}
          type="file"
          multiple
          name="images"
          className=" py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent dark:text-white "
          placeholder=" "
        />
        {errors.image && (
          <p className="text-sm text-red-500 absolute right-0 top-3">
            {errors.image.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`text-white btn btn-ghost bg-blue-700 hover:bg-blue-600 border-none focus:ring-4 px-5 
          ${isSubmitting} ? "cursor-not-allowed" : ""`}
      >
        Add
      </button>
    </form>
  );
};

export default AddVehicle;
