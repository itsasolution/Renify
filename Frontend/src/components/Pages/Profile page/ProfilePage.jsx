import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../../context/context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ModelRed from "../../Helper model/ModelRed";
import UpdateForm from "./UpdateForm";

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
        // window.location.reload();
      })
      .catch((err) => {
        let data = err?.response?.data;
        if (data) {
          toast.error(data);
        } else console.error(err);
      });
  };

  const updateDetails = async (updateInfo) => {
    console.log(updateInfo);

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
      // let res = await axios.get("http://localhost:4000/provider/logout");
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
  const continerCls = "flex w-full gap-2 ";
  const head = "md:w-32 w-28 ";
  const field = " text-wrap";

  return (
    <>
      <div className=" text-center text-xl font-semibold mt-5 mx-1 border-blue-500">
        User Profile
      </div>
      <div className="relative group md:n w-[90%] md:w-1/ mx-auto opacityanime mt-8 flex flex-col overflow-hidden mb-6 shadow-xl rounded-xl ">
        {/* bg-expand */}
        <span className="absolute dark:bg-transparent bg-gradient-to-br from-cyan-500/80 to-cyan-300/60 shadow pointer-events-none left-[48.5%] top-[35%] z-0 md:h-12 md:w-12 h-5 w-5 rounded-full duration-500 group-hover:scale-[22] "></span>
        <span className="absolute dark:bg-transparent bg-gradient-to-b  from-cyan-500/80 to-cyan-300/60 shadow pointer-events-none left-[48.5%] top-[35%] z-0 md:h-12 md:w-12 h-5 w-5 rounded-full duration-300 group-hover:scale-[25]  "></span>

        <div className=" z-10 bg-slate-100 hover:shadow-md dark:bg-slate-900/70 group-hover:bg-transparent duration-300">
          <section className="h-36 w-auto flex pt-3 border-b bg-slate-800/50 group-hover:bg-transparent duration-500 dark:bg-transparent dark:bg-gradient-to-b from-cyan-800/50  items-center justify-center ">
            {/* <img
              className="h-full w-full md:w-72 scale-90"
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="Cover"
            /> */}
          </section>

          <div className="my-2 flex justify-center ">
            <div className=" w-full lg:w-3/12 lg:order-2 flex justify-center ">
              {/* profile img */}
              <img
                alt="profile"
                style={{
                  backgroundImage: `url(${user?.avatar})`,
                  backgroundPosition: "cover",
                }}
                className="shadow-xl rounded-full h-36 w-36"
                src={
                  user?.avatar
                    ? user.avatar
                    : `${process.env.PUBLIC_URL}/profile.webp`
                }
              />
            </div>
          </div>
          <h3 className="text-2xl group-hover:text-white text-center font-semibold leading-normal text-blueGray-700 mb-2">
            {user.name}
          </h3>
          {/* <hr className="w-full my-6 bg-slate-500" /> */}
          <div className="mt-4 md:px-10 px-3  group-hover:text- ">
            <div className="flex flex-col text-blueGray-400 font-semibold space-y-1">
              <div className={continerCls}>
                <span className={head}>Username :</span>
                <span className={field}>{user.username}</span>
              </div>
              <div className={continerCls}>
                <span className={head}>Email :</span>
                <span className={field}>{user.email}</span>
              </div>
              <div className={continerCls}>
                <span className={head}>Contact :</span>
                <span className={field}>{user.mobileNumber}</span>
              </div>
              <div className={continerCls}>
                <span className={head}>Address :</span>
                <span className={field}>{user.address}</span>
              </div>
            </div>
          </div>
          {/* delete logout */}
          <div className="flex justify-center items-center gap-3 my-7">
            <ModelRed
              btnName="Delete Account"
              heading="DELETE ACCOUNT !"
              message="Are You Sure want Delete Your Account "
              actionName="Delete"
              fn={deleteUser}
              bgclr="bg-rose-500"
              cls="ring-white hover:ring-2 p-3 rounded-md w-40 text-white font-semibold bg-rose-500 "
              />

            <ModelRed
              btnName="Logout"
              heading="LOGOUT FROM YOUR ACCOUNT !"
              message=""
              actionName="Logout"
              fn={logout}
              bgclr="bg-yellow-400"
              cls="ring-white hover:ring-2 p-3 rounded-md w-40 text-white font-semibold bg-yellow-400 "
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
