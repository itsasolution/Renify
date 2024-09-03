import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/context";
import toast from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import CircularProgress from "@mui/material/CircularProgress";

export const LoginPage = ({ who }) => {
  //  user info
  const { setUser, url } = useContext(UserContext);
  const navigate = useNavigate();

  const [login, setLogin] = useState(who);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const submit = async (data) => {
    const userInfo = {
      credential: data.credential,
      password: data.password,
    };

    try {
      const res = await axios.post(
        login === "user" ? `${url}/user/login` : `${url}/provider/login`,

        userInfo
        // { withCredentials: true } // Include cookies in the request
      );

      // console.log(res.data);
      if (res.data?.userdata) {
        toast.success("login Successfull!");
        setUser({ ...res.data?.userdata });
        localStorage.setItem("userdata", JSON.stringify(res.data.userdata));
        navigate(-1);
      }
    } catch (err) {
      if (err.response?.data) {
        toast.error("Invalid Username or Password");
      } else {
        console.error("Unexpected error", err);
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      {/* <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div> */}
      <section className="h-screen opacityanime ">
        <div className="h-full">
          {/* Left column container with background*/}
          <div className="flex md:h-full flex-wrap items-center justify-center gap-x-[40px] ">
            <div className="shrink-1 basis-auto w-[70%] md:w-5/12  ">
              <img src="./login2.png" className=" h-full md:w-[90%] " alt="" />
            </div>
            {/* Right column container */}
            <div className="mb-12 md:mb-0 w-full m-5 md:w-[30%] max-w-[410px] h-[25em] bg-white/80 md:p-10 p-6 rounded-lg shadow-md dark:bg-gray-900 border dark:border-gray-800  ">
              <form onSubmit={handleSubmit(submit)}>
                {/*Sign in section*/}

                <span className="hidden">
                  {/* Facebook */}
                  <button className="mx-1 inline-block h-9 w-9 rounded-full fill-white p-2 bg-blue-600 hover:bg-transparent hover:border border-blue-600 hover:fill-blue-700 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                    <span className="[&>svg]:mx-auto [&>svg]:h-3.5 [&>svg]:w-3.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                      </svg>
                    </span>
                  </button>
                  {/* X */}
                  <button
                    type="button"
                    className=" mx-1 inline-block h-9 w-9 rounded-full bg-gray-900 fill-white p-2 uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-transparent hover:border border-slate-900 hover:fill-slate-900 hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  >
                    <span className="[&>svg]:mx-auto [&>svg]:h-3.5 [&>svg]:w-3.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                      </svg>
                    </span>
                  </button>
                  {/* Linkedin */}
                  <button
                    type="button"
                    data-twe-ripple-init=""
                    data-twe-ripple-color="light"
                    className=" mx-1 inline-block h-9 w-9 rounded-full bg-blue-700 fill-white p-2 uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:bg-transparent hover:border border-blue-600 hover:fill-blue-700 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  >
                    {/* Linkedin */}
                    <span className="[&>svg]:mx-auto [&>svg]:h-3.5 [&>svg]:w-3.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
                        <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                      </svg>
                    </span>
                  </button>
                  <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                    <p className="mx-4 text-center font-semibold ">Or</p>
                  </div>
                </span>

                {/* LOGIN OPTIONS */}
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="flex font-semibold justify-center gap-5 w-full ">
                    <span
                      onClick={() => setLogin("user")}
                      className={` dark:border-white border-b-slate-800 py-1 duration-100 ${
                        login === "user"
                          ? "-translate-y-[2px] text-sky-400 border-b-2"
                          : "cursor-pointer opacity-80"
                      }`}
                    >
                      User Login
                    </span>
                    <span
                      onClick={() => setLogin("provider")}
                      className={`  dark:border-white border-b-slate-800 py-1 duration-100 ${
                        login === "provider"
                          ? "-translate-y-[2px] text-green-400 border-b-2"
                          : "cursor-pointer opacity-80"
                      }`}
                    >
                      Provider Login
                    </span>
                  </p>
                </div>

                <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                  <p className="mx-3 text-center text-sm  ">Login</p>
                </div>

                {/* credential input */}
                <div className="relative z-0 w-full mb-5 group mt-8">
                  <input
                    {...register("credential", { required: true })}
                    type="text"
                    className="block py-1.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                  />{" "}
                  <label
                    htmlFor="float"
                    className="peer-focus:font-medium text-sm absolute text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Username or Email
                  </label>
                  {errors.credential && (
                    <p className="text-sm text-red-500">
                      Username or Email is required
                    </p>
                  )}
                </div>
                {/* Password input */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    {...register("password", { required: true })}
                    type={showPassword ? "text" : "password"}
                    placeholder=""
                    className="block py-1.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  />{" "}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-0 "
                  >
                    {showPassword ? (
                      <FaRegEye className="h-10 w-6" />
                    ) : (
                      <IoMdEyeOff className="h-10 w-6" />
                    )}
                  </button>
                  <label
                    htmlFor="float"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Password
                  </label>
                  {errors.password && (
                    <p className="text-sm text-red-500">Password is required</p>
                  )}
                </div>

                {/* Register button */}
                <div className="text-center lg:text-left">
                  <button
                    disabled={isSubmitting}
                    className={`inline-block mt-5 w-full rounded px-7 py-2 font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-300 ease-in-out hover:bg-primary-accent-300 hover:shadow focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 bg-slate-900 hover:bg-slate-800 dark:bg-cyan-400 dark:hover:text-black dark:hover:bg-cyan-300 
                   ${isSubmitting ? "cursor-not-allowed" : ""}`}
                  >
                    {isSubmitting ? (
                      <CircularProgress
                        color="inherit"
                        thickness={5}
                        size={25}
                      />
                    ) : (
                      "Login"
                    )}
                  </button>

                  {/* Register link */}
                  <p className="mb-0 mt-3 pt-1 text-sm font-semibold">
                    Create Account?
                    <Link
                      to={login === "user" ? "/sign-in" : "/provider-sign-in"}
                      className="text-danger transition duration-150 ease-in-out text-cyan-500 hover:text-cyan-300 focus:text-danger-600 active:text-danger-700"
                    >
                      &nbsp;Sign-up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
