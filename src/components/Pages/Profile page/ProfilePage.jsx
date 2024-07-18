import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../../context/context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ModelRed from "../../Helper model/ModelRed";
import UpdateForm from "./UpdateForm";

const ProfilePage = () => {
  const [loader, setloader] = useState(false);

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const deleteUser = () => {
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
  };

  const updateDetails = async (updateInfo) => {
    console.log(updateInfo);
    
    setloader(true);
     axios
      .patch(`http://localhost:4000/user/id/${user?._id}`, updateInfo, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res?.data?.user){
          setUser(res.data.user);
          localStorage.setItem("userdata", JSON.stringify(res.data.user));
          toast.success("Updated");
        }
        setloader(false);
      })
      .catch((err) => {
        let data = err?.response?.data;
        if (data) {
          toast.error(data);
        } else console.log(err);
      });

  };

  return (
    <>
      <div className=" text-center text-xl font-semibold mt-5 mx-1 border-blue-500">
        User Profile
      </div>
      <div className="relative group opacityanime mt-8 flex flex-col break-words overflow-hidden mx-5 mb-6 shadow-xl rounded-xl ">
        {/* bg-expand */}
        <span className="absolute dark:bg-transparent bg-gradient-to-br from-cyan-500/80 to-cyan-300/60 shadow-md pointer-events-none left-[48.5%] top-[35%] z-0 md:h-12 md:w-12 h-5 w-5 rounded-full duration-500 group-hover:scale-[22] "></span>
        <span className="absolute dark:bg-transparent bg-gradient-to-b  from-cyan-500/80 to-cyan-300/60 shadow-md pointer-events-none left-[48.5%] top-[35%] z-0 md:h-12 md:w-12 h-5 w-5 rounded-full duration-300 group-hover:scale-[25]  "></span>

        <div className=" z-10">
          <section className="h-42 w-auto flex pt-3 border-b bg-slate-800/50 group-hover:bg-transparent duration-500 dark:bg-transparent dark:bg-gradient-to-b from-cyan-800/50  items-center justify-center ">
            <img
              className="h-full"
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="Cover"
            />
          </section>

          <div className="my-2 flex justify-center">
            <div className=" w-full lg:w-3/12 lg:order-2 flex justify-center ">
              {/* profile img */}
              <img
                alt="profile"
                className=" shadow-xl rounded-full h-36 w-36"
                src={
                  user?.avatar
                    ? user.avatar
                    : `${process.env.PUBLIC_URL}/profile.webp`
                }
              />
            </div>
          </div>
          {/* <hr className="w-full my-6 bg-slate-500" /> */}
          <div className="text-center mt-14 group-hover:text-white">
            <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
              {user.name}
            </h3>
            <div className=" text-xl mb-2 text-blueGray-400 font-semibold ">
              Username : {user.username}
            </div>
            <div className=" text-lg leading-normal mt-0 mb-2 text-blueGray-400 font-semibold ">
              Email : {user.email}
            </div>
            <div className=" text-lg leading-normal mt-0 mb-2 text-blueGray-400 font-semibold ">
              Contact Number : {user.mobileNumber}
            </div>
            <div className=" text-lg leading-normal mt-0 mb-2 text-blueGray-400 font-semibold ">
              Address : {user.address}
            </div>
          </div>
          <div className="flex flex-wrap justify-center mt-10 py-10  text-center">
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
      <div className="">
        <UpdateForm user={user} loader={loader} updateDetails={updateDetails} />
      </div>
    </>
  );
};

export default ProfilePage;
