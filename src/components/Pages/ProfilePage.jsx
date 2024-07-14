import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CarBikeCard from "../CarBikeCard";
import ModelRed from "../Helper model/ModelRed";

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const deleteUser = () => {
    setLoader(true);
    axios
      .delete(`http://localhost:4000/user/id/${user?._id}`)
      .then((res) => {
        console.log(res);
        setUser(null);
        toast.success(res?.data);
        navigate("/");
        // window.location.reload();
      })
      .catch((err) => {
        let data = err?.response?.data;
        if (data) {
          toast.error(data);
        } else console.log(err);
      });
    setLoader(false);
  };

  return (
    <>
      <div className="text-center text-xl font-semibold mt-5 mx-32 border-blue-500">
        User Profile
      </div>
      <div className="group container mx-auto mt-8 px-5">
        <div className=" relative flex flex-col  min-w-0 break-words overflow-hidden w-full mb-6 shadow-xl rounded-lg ">
          {/* bg-expand */}
          <span className="absolute dark:bg-transparent bg-gradient-to-br from-cyan-500/80 to-cyan-300/60 shadow-md m  pointer-events-none left-[48.5%] top-[40%] z-0 h-12 w-12 rounded-full duration-500 group-hover:scale-[22] "></span>
          <span className="absolute dark:bg-transparent bg-gradient-to-b from-cyan-500/80 to-cyan-300/60 shadow-md md:block hidden pointer-events-none left-[48.5%] top-[40%] z-0 h-12 w-12 rounded-full  duration-300 group-hover:scale-[25]  "></span>

          <div className="z-10 ">
            <section className="h-42 flex pt-3 border-b bg-slate-800/50 group-hover:bg-transparent duration-500 dark:bg-transparent dark:bg-gradient-to-b from-cyan-800/50  items-center justify-center ">
              <img
                className="h-full"
                src={`${process.env.PUBLIC_URL}/logo.png`}
                // src={`${process.env.PUBLIC_URL}/bmw.jpg`}
                alt="sdf"
              />
            </section>

            <div className=" h-20 flex flex-wrap justify-center">
              <div className=" w-full lg:w-3/12 lg:order-2 flex justify-center ">
                {/* profile img */}
                <img
                  alt="profile"
                  className=" shadow-xl rounded-full h-36 w-36  "
                  src={`${process.env.PUBLIC_URL}/profile.webp`}
                />
              </div>
            </div>
            {/* <hr className="w-full my-6 bg-slate-500" /> */}
            <div className="text-center mt-14 group-hover:text-white">
              <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                Piyush
              </h3>
              <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400">
                  Indore INDIA
                </i>
              </div>
            </div>
            <div className="flex flex-wrap justify-center mt-10 py-10  text-center">
              <div className="w-full lg:w-9/12 px-4">
                {/* <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                  An artist of considerable range, Piyush the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy writes, performs
                  and records all of his own music, giving it a warm, intimate
                  feel with a solid groove structure. An artist of considerable
                  range.
                </p> */}

                {/* Model for delete */}
                <ModelRed
                  btnName="Delete Account"
                  heading="DELETE ACCOUNT !"
                  message="Are You Sure want Delete Your Account"
                  actionName="Delete"
                  fn={deleteUser}
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
