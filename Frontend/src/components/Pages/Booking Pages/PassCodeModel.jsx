import React, { useState } from "react";
import toast from "react-hot-toast";

const PassCodeModel = ({ startRide, orgPassCode }) => {
  const [passCode, setPassCode] = useState("");
  const [error, setError] = useState(""); // State to track error message

  // Handle Pass Code Submission
  const handlePassCode = () => {
    if (parseInt(passCode) === orgPassCode) {
      setError(""); 
      startRide(); 
      toast.success("Correct Pass Code!")
      document.getElementById("open").close(); 
    } else {
      setError("Incorrect Passcode");
    }
  };

  return (
    <>
      <button
        className="w-full max-w-80 btn hover:bg-green-500 hover:ring-2 ring-white border-none h-12 text-white text-base align-middle shadow-md rounded-full flex items-center justify-center p-3 bg-green-500"
        onClick={() => document.getElementById("open").showModal()}
      >
        Start Ride
      </button>

      <dialog id="open" className="modal">
        <div className="model-box">
          <div className="relative  bg-slate-800 h-[300px] w-[400px] flex flex-col items-center justify-center rounded-xl">
            {error && (
              <p className=" absolute top-6 font-semibold text-red-500 mb-3 text-lg text-center">{error}</p>
            )}
            <input
              type="number"
              placeholder="Enter pass code"
              name="passCode"
              value={passCode}
              maxLength={4}
              onChange={(e) => setPassCode(e.target.value)}
              className="p-2 w-56 rounded-full border-2 border-cyan-500 text-white dark:bg-gray-700 bg-inherit text-lg font-sans focus:outline-none focus:ring-1 focus:ring-cyan-500 text-center mb-4"
            />
            <button
              onClick={handlePassCode}
              className="px-5 py-3 w-56 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-full shadow-md transition-all duration-300"
            >
              Submit Passcode
            </button>
            <button
              className="btn absolute w-52  bottom-3 my-3 hover:bg-slate-800  bg-slate-700 hover:ring-1 ring-white text-white"
              onClick={() => {
                setError("");
                document.getElementById("open").close();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default PassCodeModel;
