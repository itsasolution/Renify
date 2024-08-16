import React from "react";

const BookingDetails = ({ booking }) => {

  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formatDate = (date) =>
    new Date(date).toLocaleString(undefined, dateOptions);

  const cellClass = "px-3 py-1.5";
  const labelClass = "font-semibold bg-gray-100 dark:bg-gray-700/60";
  const rowClass = "border  border-gray-400 dark:border-gray-500";
  const dividerClass = "border-r border-gray-400 dark:border-gray-500";

  return (
    <>
      <div className="max-w-lg mx-auto my-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg outline outline-1 dark:outline-0 outline-gray-300">
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
                Booking Date
              </td>
              <td className={cellClass}>{formatDate(booking.bookingDate)}</td>
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
            <tr className={rowClass}>
              <td className={`${labelClass} ${cellClass} ${dividerClass}`}>
                Status
              </td>
              <td className={`${cellClass}  text-blue-500 font-semibold`}>
                {booking.status}
              </td>
            </tr>
          </tbody>

          {booking?.provider?.name && (
            <>
              <h2 className="text-xl font-semibold m-2">owner details</h2>
              <tbody>
                <tr className={rowClass}>
                  <td className={`${labelClass} ${cellClass} ${dividerClass}`}>
                    Owner Name
                  </td>
                  <td className={cellClass}>{booking?.provider?.name}</td>
                </tr>
                <tr className={rowClass}>
                  <td className={`${labelClass} ${cellClass} ${dividerClass}`}>
                    Email
                  </td>
                  <td className={cellClass}>{booking?.provider?.email}</td>
                </tr>
                <tr className={rowClass}>
                  <td className={`${labelClass} ${cellClass} ${dividerClass}`}>
                    Contact No
                  </td>
                  <td className={cellClass}>
                    {booking?.provider?.mobileNumber}
                  </td>
                </tr>
              </tbody>
            </>
          )}
        </table>
      </div>
    </>
  );
};

export default BookingDetails;
