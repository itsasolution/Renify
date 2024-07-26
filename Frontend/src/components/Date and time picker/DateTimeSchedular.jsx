import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateTimePicker = ({ getDate }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date >= endDate) {
      setEndDate(null); 
    }
  };

  const EndDate = (date) => {
    setEndDate(date);

    if (startDate && endDate) {
      // console.log(startDate);

      const days = endDate.getDate() - startDate.getDate();
      const hours = endDate.getHours() - startDate.getHours();
      const min = endDate.getMinutes() - startDate.getMinutes();

      const showDate = {
        days,
        hours,
        min,
      };
      console.log(showDate);
      const dates = {
        startDate: startDate,
        endDate: endDate,
        bookingDate: new Date(),
      };
      getDate(dates, showDate);

      console.log(`Journey time: ${days},day ${hours}hours, ${min}mins`);
    } else {
      // alert("Please select both start and end dates.");
    }
  };

  const cls =
    "h-10 bg-slate-500/80 placeholder:text-white text-white rounded-md p-3 my-1 shadow-md ";

  return (
    <div className="flex flex-col mb-5 md:mt-0 mt-1 gap-3 justify-center p-3 items-center ">
      <h2 className="text-center font-semibold text-xl border-cyan-400 border-b-4 ">
        Select Rental Dates
      </h2>
      <div className="flex md:flex-row flex-col font-semibold gap-4 mt-4 justify-center items-center ">
        <span className="flex gap-3 md:gap-0 md:flex-col items-center">
          Select Start Date
          <DatePicker
            className={cls}
            selected={startDate} //to show in input
            onChange={handleStartDateChange}
            showTimeSelect
            dateFormat="Pp"
            minDate={new Date()}
            //   maxDate={new Date()}
            placeholderText="Select Start Date"
          />
        </span>
        <span className="flex gap-5 md:gap-0 md:flex-col items-center">
          Select End Date 
          <DatePicker
            className={cls}
            selected={endDate}
            onChange={(date) => EndDate(date)}
            showTimeSelect
            dateFormat="Pp"
            minDate={startDate || new Date()}
            placeholderText="Select End Date"
            disabled={!startDate}
          />
        </span>
      </div>
    </div>
  );
};

export default DateTimePicker;
