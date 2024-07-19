import React from "react";

const ModelRed = (prop) => {
  const { btnName, message, heading, actionName, fn } = prop;

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className=" m-auto bg-rose-500 font-semibold hover:ring-2 duration-200 ring-white text-white rounded-md p-2 text-lg px-3"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        {btnName}
      </button>

      <dialog id="my_modal_1" className="modal  ">
        <div className="modal-box bg-white dark:bg-slate-900">
          <h3 className="font-bold text-lg">{heading}</h3>
          <p className="py-4 text-lg font-semibold">{message}</p>
          <div className="modal-action">
            <button
              className="bg-rose-500 font-semibold hover:bg-rose-600 duration-200 text-white p-1 px-5 rounded-lg"
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
