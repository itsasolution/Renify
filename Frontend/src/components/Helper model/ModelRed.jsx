import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { TiWarningOutline } from "react-icons/ti";

const ModelRed = (prop) => {
  const { btnName, message, heading, actionName, fn, bgclr, cls } = prop;

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className={`${cls}`}
        onClick={() => document.getElementById(`${actionName}`).showModal()}
      >
        {btnName}
      </button>
      <dialog id={`${actionName}`} className="modal">
        <div className="modal-box bg-white dark:bg-slate-900 flex flex-col items-center ">
          {actionName === "Logout" && (
            <TiWarningOutline className={`text-4xl  text-yellow-300`} />
          )}
          {actionName === "Cancel Ride" && (
            <TiWarningOutline className={`text-4xl  text-yellow-300`} />
          )}
          <span className="flex gap-2 justify-center items-center mt-3 ">
            {actionName === "Delete" && (
              <MdDeleteForever className={`text-3xl  text-rose-600`} />
            )}
          </span>
            <h3 className="font-bold text-lg">{heading}</h3>
          <p className="py-4 text-lg font-semibold text-center">{message}</p>
          <div className="modal-action ">
            <button
              className={`${bgclr} font-semibold mx-2 hover:bg-rose-600 ring-2 ring-white duration-200 text-white p-1 px-5 rounded-lg `}
              onClick={() => fn()}
            >
              {actionName}
            </button>

            {/* if there is a button in form, it will close the modal */}
            <form method="dialog">
              <button className="btn bg-slate-800 hover:ring-2 ring-white text-white">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ModelRed;
