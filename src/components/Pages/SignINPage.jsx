import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/context";
import toast from "react-hot-toast";
import CircularProgress from '@mui/material/CircularProgress';

export const SignINPage = () => {
  const { setUser } = useContext(UserContext);

  //  form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  // making request
  const submit = async (data) => {
    const userInfo = {
      username: data.username,
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/user/sign-up",
        userInfo
      );

      console.log(res.data);
      if (res.data) {
        setUser({ ...res.data.userdata });
        localStorage.setItem("userdata", JSON.stringify(res.data.userdata));
        // alert("Registration Successfull!");
        toast.success("Registration Successfull");
        navigate("/");
      }
    } catch (err) {
      if (err.response.data) {
        console.log("error:", err);
        toast.error(err.response.data?.message);
      } else {
        console.error("Unexpected error", err);
        // alert("An unexpected error occurred. Please try again later.");
        toast.error("An unexpected error occurred. Please try again later");
      }
    }
    // } // else
  };

  return (
    <>
      {/* <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div> */}
      <section className=" h-[calc[100vh-50px]] opacityanime">
        {/* Left column container with background*/}
        <div className="flex md:h-screen flex-wrap items-center justify-center gap-x-[40px] ">
          <div className="shrink-1 grow-0 basis-auto md:w-5/12 md:shrink-0 h-[300px] md:h-auto pl-2 md:pl-0">
            <img src="./login.webp" className="h-full" alt="" />
          </div>
          {/* Right column container */}
          <div className="mb-12 md:mb-0 md:w-[30%] w-72 lg:w-[30%] xl:w-[30%] ">
            {/*Sign in section*/}

            <form onSubmit={handleSubmit(submit)}>
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="mb-0 me-4 text-lg">Sign up with</p>
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
              </div>
              <div className="my-4 mb-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                <p className="mx-4 mb-0 text-center font-semibold ">Or</p>
              </div>
              {/* Username */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  {...register("username", {
                    required: { value: true, message: "UserName is required" },
                  })}
                  placeholder=""
                  className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <label
                  htmlFor="float"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Username
                </label>
                {errors.username && (
                  <span className="text-red-600">{errors.name.message}</span>
                )}
              </div>
              {/*  name*/}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  {...register("name", {
                    required: { value: true, message: "Name is required" },
                  })}
                  placeholder=""
                  className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <label
                  htmlFor="float"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Name
                </label>
                {errors.name && (
                  <span className="text-red-600">{errors.name.message}</span>
                )}
              </div>

              {/* Email input */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  {...register("email", {
                    required: { value: true, message: "email is required" },
                  })}
                  className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                />
                <label
                  htmlFor="float"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email
                </label>
                {errors.email && (
                  <span className="text-red-600">{errors.email.message}</span>
                )}
              </div>

              {/* Password input */}
              <div className="relative z-0 w-full mb-5 group0">
                <input
                  // type="password"
                  type="text"
                  {...register("password", {
                    required: { value: true, message: "Enter password" },
                  })}
                  placeholder=""
                  className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <label
                  htmlFor="float"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  password
                </label>
                {errors.password && (
                  <span className="text-red-600">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Register button */}
              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-block w-full rounded px-7 py-2 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-300 ease-in-out hover:bg-primary-accent-300 hover:shadow focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 bg-slate-900 hover:bg-slate-800 dark:bg-cyan-400 dark:hover:text-black dark:hover:bg-cyan-300 
                  ${
                    isSubmitting
                      ? "cursor-not-allowed dark:hover:bg-cyan-200"
                      : ""
                  }`}
                >
                  {isSubmitting ? <CircularProgress size={24} /> : "Register"}
                </button>
                {/* Register link */}
                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Have an account?
                  <Link
                    to={"/user-login"}
                    className=" transition duration-150 ease-in-out text-cyan-500 hover:text-cyan-300 focus:text-danger-600 active:text-danger-700"
                  >
                    &nbsp;Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
