import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
      <div className="text-center text-xl font-semibold mt-5">User Profile</div>

      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden">
        <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
          {/* main bg expand */}
          <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-sky-500 transition-all duration-300 group-hover:scale-[10]"></span>
          <div className="relative z-10 mx-auto max-w-md ">
            <span className="grid h-20 w-20 place-items-center shadow-md rounded-full bg-sky-500 transition-all duration-300 group-hover:bg-sky-400">
              Hii..
            </span>
            <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
              <p>
                Perfect for learning how the framework works, prototyping a new
                idea, or creating a demo to share online.
              </p>
            </div>
            <span
              className="m-10 bg-rose-500 rounded-md p-1 text-xl"
              onClick={() => deleteUser()}
            >
              Delete user
            </span>

            <div className="pt-5 text-base font-semibold leading-7">
              <p>
                <a
                  href="/"
                  className="text-sky-500 transition-all duration-300 group-hover:text-white"
                >
                  Read the docs &rarr;
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
