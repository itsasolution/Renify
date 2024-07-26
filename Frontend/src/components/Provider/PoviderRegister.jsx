import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/context";
import toast from "react-hot-toast";
import FormTemplate from "../FormTemplate/FormTemplate";

export const ProviderRegister = () => {
  const { setUser, url } = useContext(UserContext);
  const fields = ["Username", "Name", "Email", "Password", "Address"];

  const navigate = useNavigate();

  // making request
  const submit = async (data) => {
    const { Username, Name, Email, Password, Address } = data;

    const providerInfo = {
      username: Username,
      name: Name,
      email: Email,
      password: Password,
      address: Address,
    };

    try {
      const res = await axios.post(`${url}/provider/sign-up`, providerInfo);

      console.log(res.data);
      if (res.data) {
        setUser({ ...res.data.userdata });
        toast.success("Registration Successfull");
        localStorage.setItem("userdata", JSON.stringify(res.data.userdata));
        navigate("/");
      }
    } catch (err) {
      if (err.response) {
        console.log("error:", err);
        toast.error(err.response?.data?.message);
      } else {
        console.error("Unexpected error", err);
        toast.error("An unexpected error occurred. Please try again later");
      }
    }
  };



  return (
    <>
      {/* <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div> */}
      <section className=" h-[calc[100vh-50px]] md:pt-3 opacityanime">
        {/* Left column container with background*/}
        <div className="flex md:gap-10 flex-wrap items-center justify-center w-full ">
          <div className="md:mt-0 mt-5 shrink-1 md:w-5/12 w-[60%] max-w-[600px] ">
            <h1 className="text-center md:text-xl font-semibold ">
              Give Your Car/Bike On Rent
            </h1>
            <img
              src="./join.png"
              className="h-full w-full img-shadow md:scale-75 "
              alt="join us"
            />
          </div>
          {/* Right column container */}
          <div className="mb-12 md:mb-0 md:w-[30%] w-[93%] lg:w-[30%] xl:w-[32%] bg-white/80 rounded-lg shadow-md  dark:bg-gray-900 border dark:border-gray-700 md:px-6 pb-6 ">
            {/*Sign in section*/}

            <FormTemplate fields={fields} btnType="Register" submit={submit} />
            <p className=" text-sm ml-6 md:ml-3 font-semibold">
              Have an account?
              <Link
                to={"/provider-login"}
                className=" transition duration-150 ease-in-out text-cyan-500 hover:text-cyan-300 focus:text-danger-600 active:text-danger-700"
              >
                &nbsp;Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
