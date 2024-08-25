import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../../context/context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ModelRed from "../../Helper model/ModelRed";
import UpdateForm from "./UpdateForm";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const [loader, setloader] = useState(false);
  const { user, setUser, url } = useContext(UserContext);
  const navigate = useNavigate();
  let ROUTE = user?.role;

  const deleteUser = () => {
    axios
      .delete(`${url}/${ROUTE}/id/${user?._id}`)
      .then((res) => {
        setUser(null);
        toast.success(res?.data);
        navigate("/");
      })
      .catch((err) => {
        let data = err?.response?.data;
        if (data) {
          toast.error(data);
        } else console.error(err);
      });
  };

  const updateDetails = async (updateInfo) => {
    setloader(true);
    try {
      let res = await axios.patch(
        `${url}/${ROUTE}/id/${user?._id}`,
        updateInfo,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res?.data?.user) {
        setUser(res.data.user);
        localStorage.setItem("userdata", JSON.stringify(res.data.user));
        toast.success("Updated");
      }
    } catch (err) {
      let data = err?.response?.data;
      console.error(err);
      if (data) {
        toast.error(data);
      }
    }
    setloader(false);
  };

  const logout = async () => {
    try {
      let res = await axios.get(`${url}/user/logout`);
      if (res.data) {
        localStorage.removeItem("userdata");
        setUser("");
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className=" relative h-screen bg-gradient-to-br from-sky-200/90 via-white to-violet-200/90 dark:from-violet-950/60 dark:via-black dark:to-purple-950/60 flex items-center justify-center overflow-hidden">
        <div className="z-10 hover:shadow-md bg-white/50 max-w-[700px] opacityanime dark:ring-0 dark:bg-gradient-to-bl  dark:from-[#00293f] dark:via-blue-950 dark:to-slate-950 duration-300 md:p-6 py-2 rounded-xl shadow-lg w-[90%] md:w-1/2 mx-auto">
          {/* Add a background image if you have one */}
          {/* <section className="h-36 w-full flex border-b duration-500  items-center justify-center">
        </section> */}

          <div className="my-4 flex justify-center">
            <div className="w-full opacityanime flex justify-center">
              <img
                alt="profile"
                style={{
                  backgroundImage: `url(${user?.avatar})`,
                  backgroundPosition: "cover",
                }}
                className="shadow-lg ring-2 ring-white hover:ring-4 duration-300 hover:ring-sky-400 rounded-full h-36 w-36"
                src={
                  user?.avatar
                    ? user.avatar
                    : `${process.env.PUBLIC_URL}/profile.webp`
                }
              />
            </div>
          </div>

          <h3 className="text-2xl text-center font-semibold leading-normal text-blueGray-700 mb-2 group-hover:text-white">
            {user.name}
          </h3>

          <div className="mt-9 md:px-5 px-3 ">
            <table className="w-full text-blueGray-400 font-semibold border">
              <tbody>
                <tr className="border-y border-gray-300">
                  <td className="md:w-32 w-28 py-3 px-2 text-left border-r border-gray-300">
                    Username
                  </td>
                  <td className="py-3 px-2 text-left">{user.username}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="md:w-32 w-28 py-3 px-2 text-left border-r border-gray-300">
                    Email
                  </td>
                  <td className="py-3 px-2 text-left">{user.email}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="md:w-32 w-28 py-3 px-2 text-left border-r border-gray-300">
                    Contact
                  </td>
                  <td className="py-3 px-2 text-left">{user.mobileNumber}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="md:w-32 w-28 py-3 px-2 text-left border-r border-gray-300">
                    Address
                  </td>
                  <td className="py-3 px-2 text-left">{user.address}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-center flex-wrap items-center gap-3 my-10">
            <ModelRed
              btnName="Delete Account"
              heading="DELETE ACCOUNT!"
              message="Are you sure you want to delete your account?"
              actionName="Delete"
              fn={deleteUser}
              bgclr="bg-rose-500"
              cls="ring-white hover:ring-2 p-3 rounded-md w-40 text-white font-semibold bg-rose-500"
            />
            <ModelRed
              btnName="Logout"
              heading="LOGOUT FROM YOUR ACCOUNT!"
              message=""
              actionName="Logout"
              fn={logout}
              bgclr="bg-yellow-400"
              cls="ring-white hover:ring-2 p-3 rounded-md w-40 text-white font-semibold bg-yellow-400"
            />
          </div>
        </div>
      </div>
      <UpdateForm user={user} loader={loader} updateDetails={updateDetails} />
    </>
  );
};

export default ProfilePage;
