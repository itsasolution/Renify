import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateTimePicker = ({ getDate, vehicle }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date >= endDate) {
      setEndDate(null);
      setBooking(null);
    }
    setError("");
  };

  const handleEndDateChange = (date) => {
    if (startDate && date) {
      const hoursDifference = (date - startDate) / (1000 * 60 * 60);

      if (hoursDifference >= 2) {
        setEndDate(date);
        setError("");

        const days = Math.floor(hoursDifference / 24);
        const hours = Math.floor(hoursDifference % 24);
        const min = Math.floor((hoursDifference % 1) * 60);

        // Calculate cost
        const totalDays = Math.floor(hoursDifference / 24);
        const remainingHours = hoursDifference % 24;

        let cost = totalDays * vehicle.rentPerDay;
        if (remainingHours > 0) {
          cost += Math.ceil(remainingHours) * vehicle.rentPerHour;
        }

        let journeyTime = "";

        if (days > 0) {
          journeyTime += `${days} days `;
        }

        if (hours > 0) {
          journeyTime += `${hours} hours `;
        }

        if (min > 0) {
          journeyTime += `${min} minutes`;
        }

        // Remove any trailing whitespace
        journeyTime = journeyTime.trim();
        const bookingDetails = {
          cost: cost,
          startDate: startDate,
          bookingDate: new Date(),
          endDate: date,
          journeyTime: journeyTime,
        };

        setBooking(bookingDetails);
        getDate(bookingDetails);
      } else {
        setError("The duration must be greater than 2 hours.");
        setBooking(null);
      }
    } else {
      setError("Please select both start and end dates.");
      setBooking(null);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const cellClass = "px-3 py-1.5 text-gray-900 dark:text-gray-100";
  const labelClass =
    "font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
  const rowClass = "border-y  border-gray-400 dark:border-gray-500";
  const dividerClass = "border-r border-gray-400 dark:border-gray-500";

  const cls = "h-10 bg-gray-700 text-white rounded-md p-3 my-1 shadow-md";

  return (
    <div className="flex flex-col mb-5 md:mt-0 mt-1 gap-4 justify-center items-center bg-slate-100/80 py-5 px-1 dark:bg-gray-800/80 rounded-lg shadow-lg">
      <h2 className="text-center font-semibold text-xl border-b-4 border-cyan-400 pb-2">
        Select Rental Dates
      </h2>
      <div className="flex flex-col md:flex-row gap-6 text-lg  justify-center items-center mt-4">
        <span className="flex md:flex-col gap-2 justify-between w-full items-center">
          <label>Select Start Date</label>
          <DatePicker
            className={cls}
            selected={startDate}
            onChange={handleStartDateChange}
            showTimeSelect
            dateFormat="Pp"
            minDate={new Date()}
            maxDate={new Date(new Date().setDate(new Date().getDate() + 2))}
            placeholderText="Select Start Date"
          />
        </span>
        <span className="flex md:flex-col gap-2 justify-between w-full items-center">
          <label>Select End Date</label>
          <DatePicker
            className={cls}
            selected={endDate}
            onChange={handleEndDateChange}
            showTimeSelect
            dateFormat="Pp"
            minDate={startDate || new Date()}
            maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
            placeholderText="Select End Date"
            disabled={!startDate}
          />
        </span>
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}

      {booking && (
        <div className=" mx-auto w-full max-w-[500px] my-6 p-2 py-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg outline outline-1 dark:outline-0 outline-gray-300 dark:outline-gray-600">
          <h2 className="text-xl font-semibold mb-3 text-center text-gray-800 dark:text-gray-200">
            Booking Details
          </h2>
          <table className="min-w-full text-left table-fixed border-collapse">
            <tbody>
              <tr className={rowClass}>
                <td className={`${labelClass} ${cellClass} ${dividerClass}`}>
                  Total Cost
                </td>
                <td className={cellClass}>₹ {booking.cost}</td>
              </tr>
              <tr className={rowClass}>
                <td className={`${labelClass} ${cellClass} ${dividerClass}`}>
                  Start Date
                </td>
                <td className={cellClass}>{formatDate(booking.startDate)}</td>
              </tr>
              <tr className={rowClass}>
                <td className={`${labelClass} ${cellClass} ${dividerClass}`}>
                  End Date
                </td>
                <td className={cellClass}>{formatDate(booking.endDate)}</td>
              </tr>
              <tr className={rowClass}>
                <td className={`${labelClass} ${cellClass} ${dividerClass}`}>
                  Journey Time
                </td>
                <td className={cellClass}>{booking.journeyTime}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
