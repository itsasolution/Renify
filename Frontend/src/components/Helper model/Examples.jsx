import React from "react";
import ToastExamples from "./ToastExamples";
import DateTimePicker from "../Pages/VehiclePages/DateTimePicker";


const Examples = () => {
  return (
    <div>

      <DateTimePicker />
      {/* <ToastExamples /> */}
      <div className="bg-[#f9f9f9] text-lg font-semibold my-10 grid place-items-center">
        <div className=" w-44 h-36 grid floatEffect  place-items-center">
          Hover Me!
        </div>
      </div>

      {/* <DatePickerArpit/> */}
    </div>
  );
};

export default Examples;
