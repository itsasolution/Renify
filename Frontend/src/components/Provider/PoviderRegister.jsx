import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/context";
import toast from "react-hot-toast";
import FormTemplate from "../FormTemplate/FormTemplate";

export const ProviderRegister = () => {
  const { setUser } = useContext(UserContext);
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
      const res = await axios.post(
        "http://localhost:4000/provider/sign-up",
        providerInfo
      );

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
        <div className="flex gap-10 flex-wrap items-center justify-center w-full ">
          <div className="md:mt-0 mt-5 shrink-1 grow-0 basis-auto md:w-5/12 md:shrink-0 h-[300px] md:h-auto pl-3 md:pl-0">
            <h1 className="text-center text-xl font-semibold ">
              Give Your Car/Bike On Rent
            </h1>
            <img
              src="./join.png"
              className="h-full w-full img-shadow"
              alt="join us"
            />
          </div>
          {/* Right column container */}
          <div className="mb-12 md:mb-0 md:w-[30%] w-full lg:w-[30%] xl:w-[30%] bg-white rounded-lg shadow-md sm:max-w-md dark:bg-gray-800/80 border dark:border-gray-700 px-8 pb-6">
            {/*Sign in section*/}

            <FormTemplate fields={fields} btnType="Register" submit={submit} />
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
        </div>
      </section>
    </>
  );
};
