import React from "react";
import { useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";

const FormTemplate = ({ fields, btnType, submit }) => {
  // console.log(btnType);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const labelClass =
    "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";
  const inputClass =
    "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";
  const errorClass = "text-sm text-red-500 absolute right-0 top-3";

  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        className="max-w-[410px] m-5 md:mx-2 "
      >
        <div className="flex flex-row items-center justify-center lg:justify-start">
          <p className="mb-0 me-4 text-lg">Sign up with</p>
          {/* Facebook */}
          <button className="mx-1 inline-block h-9 w-9 rounded-full fill-white p-2 bg-blue-600 hover:bg-transparent hover:border border-blue-600 hover:fill-blue-700 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
            <span className="[&>svg]:mx-auto [&>svg]:h-3.5 [&>svg]:w-3.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
                <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
              </svg>
            </span>
          </button>
        </div>
        <div className="my-4 mb-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
          <p className="mx-4 mb-0 text-center font-semibold ">Or</p>
        </div>

        {fields.map((field, i) => {
          return (
            <div key={i} className="relative z-0 w-full mb-5 ">
              <input
                type={field === "Contact" ? "number" : "text"}
                {...register(field, { required: `${field} is required` })}
                className={inputClass}
                placeholder=" "
              />
              <label htmlFor={field} className={labelClass}>
                {field}
              </label>
              {errors[field] && (
                <p className={errorClass}>{errors[field].message}</p>
              )}
            </div>
          );
        })}

        <div className="text-center lg:text-left">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-block w-full rounded px-7 py-2 my-2 font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-300 ease-in-out hover:bg-primary-accent-300 hover:shadow focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 bg-slate-900 hover:bg-slate-800 dark:bg-cyan-400 dark:hover:text-black dark:hover:bg-cyan-300 
            ${isSubmitting ? "cursor-not-allowed dark:hover:bg-cyan-200" : ""}`}
          >
            {isSubmitting ? (
              <CircularProgress color="inherit" thickness={5} size={25} />
            ) : (
              btnType
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default FormTemplate;
