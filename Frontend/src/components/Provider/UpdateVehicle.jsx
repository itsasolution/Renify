import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
const UpdateVehicle = () => {
  const [updatedInfo, setInfo] = useState({
    name: "",
  });
  const [profile, setprofile] = useState();

  const [loader, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.profile);
    console.log(e.target.name.value);

    toast.success(updatedInfo?.name);

    // console.log(updatedInfo);
  };

  function handleChange(e) {
    const name = e.target.name; // field name - email name etc
    let value = e.target.value; // field value

    if (name === "profile") {
      return;
      value = value[0];
    }

    setInfo((prev) => {
      return { ...prev, [name]: value };
    }); // key:value

    console.log(updatedInfo);
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      {/* <UpdateForm/> */}
      <BiEdit />
      <TbEdit />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-md dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-semibold text-gray-900 md:text-2xl dark:text-white">
              Update Your Details
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              {updatedInfo?.name}

              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  defaultValue={updatedInfo?.name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="avatar" className="block text-white my-1">
                  Profile Picture
                </label>
                <input
                  type="file"
                  name="profile"
                  className="file-input file-input-bordered h-10 w-[270px] dark:bg-slate-800 bg-white file-input-info max-w-xs"
                />
              </div>

              <button
                disabled={loader ? true : false}
                type="submit"
                className="w-full bg-sky-400 text-lg ring-white hover:ring-2 text-white duration-300 hover:bg-sky-500 font-medium rounded-lg p-2 text-center"
              >
                {loader ? (
                  <CircularProgress color="inherit" thickness={5} size={25} />
                ) : (
                  " Update Details"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateVehicle;
