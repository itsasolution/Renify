import { CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UpdateForm = ({ user, updateDetails, loader }) => {
  const { register, handleSubmit } = useForm();

  const submit = async (data) => {
    const { name, number, address, avatar, email } = data;
    let updateInfo = {};

    let has = false;
    if (name !== "" && name !== user.name) {
      updateInfo["name"] = name;
      has = true;
    }
    if (number && parseInt(number) !== user.mobileNumber) {
      has = true;
      updateInfo["mobileNumber"] = number;
    }
    if (address !== "" && address !== user.address) {
      has = true;
      updateInfo["address"] = address;
    }
    if (email !== "" && email !== user.email) {
      updateInfo["email"] = email;
      has = true;
    }
    if (avatar[0]) {
      updateInfo["avatar"] = avatar[0];
      has = true;
    }
    // console.log(updateInfo);
    if (!has) toast.error("Update at least on detail !");
    else {
      updateDetails(updateInfo);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-md dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-semibold text-gray-900 md:text-2xl dark:text-white">
              Update Your Details
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(submit)}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={user.name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={user.email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="number"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contact Number
                </label>
                <input
                  {...register("number")}
                  type="text"
                  name="number"
                  id="number"
                  defaultValue={user.mobileNumber}
                  pattern="[0-9]{10}"
                  maxLength={10}
                  minLength={10}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <input
                  {...register("address")}
                  type="text"
                  name="address"
                  id="address"
                  defaultValue={user.address || ""}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="avatar" className="block text-white my-1">
                  Profile Picture
                </label>
                <input
                  {...register("avatar")}
                  type="file"
                  name="avatar"
                  className="file-input file-input-bordered h-10 w-[270px] dark:bg-slate-800 bg-white file-input-info max-w-xs"
                />
              </div>
              <button
                disabled={loader ? true : false}
                type="submit"
                className="w-full bg-sky-400 text-lg ring-white hover:ring-2 text-white duration-300 hover:bg-sky-500 font-medium rounded-lg p-2 text-center"
              >
                {loader ? (
                  <CircularProgress color="inherit" thickness={5} size={25} />
                ) : (
                  " Update Details"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateForm;
