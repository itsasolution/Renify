import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const ProfileContainer = ({ url, setUser, user }) => {
  const logout = async () => {
    try {
      let res = await axios.get(`${url}/user/logout`);
      // let res = await axios.get("http://localhost:4000/provider/logout");
      if (res.data) {
        localStorage.removeItem("userdata");
        setUser(null);
        toast.success(res.data.message);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="dropdown dropdown-end ">
      {/* profile img */}
      <div
        tabIndex={0}
        role="button"
        className="w-10 h-10  grid place-items-center rounded-full shadow-md bg-slate-200"
      >
        {user?.avatar ? (
          <img
            alt="profile"
            style={{
              backgroundImage: `url(${user?.avatar})`,
              backgroundPosition: "cover",
            }}
            className="rounded-full h-full w-full overflow-hidden ring-1 hover:ring-2 ring-slate-100 duration-200 animate-pin"
            src={user.avatar}
          />
        ) : (
          <lord-icon
            src="https://cdn.lordicon.com/bgebyztw.json"
            trigger="hover"
            delay="1000"
            state="hover-jumping"
            style={{ width: "80%", height: "80%" }}
          ></lord-icon>
        )}
      </div>
      <ul
        tabIndex={0}
        className="mt-4 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-56 bg-white dark:bg-blue-950/95 backdrop-blur-sm "
      >
        <p className="text-center py-1 text-lg">{user?.name}</p>
        <p className="text-center py-1  ">{user?.email}</p>
        {user && (
          <>
            <button
              onClick={() => logout()}
              className=" bg-sky-500 my-1 py-1.5 text-white font-semibold mx-5 rounded-full duration-200 ring-white hover:ring-2 "
            >
              Logout
            </button>
            <li>
              <Link to={"/profile"} className="justify-between py-1.5">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
          </>
        )}
        {!user && (
          <>
            <li>
              <Link to={"/sign-in"}>Sign-in</Link>
            </li>
            <li className="w-full">
              <Link to={"/user-login"}>Login</Link>
            </li>
          </>
        )}
        <li>
          <Link to={"/provider-login"} className="py-1.5">
            Provider Login
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileContainer;
