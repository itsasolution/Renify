import React, { useState, useEffect } from "react";
import { differenceInHours, differenceInDays, format } from "date-fns";

const DateTimeComp = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });

  const [cost, setCost] = useState(null);
  const [error, setError] = useState("");

  const rentPerHour = 120;
  const rentPerDay = 1200;

  useEffect(() => {
    const calculateCost = () => {
      // Combine date and time to create full datetime strings
      const startDateTime = new Date(
        `${formData.startDate}T${formData.startTime}`
      );
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

      // Check if both start and end dates are valid
      if (isNaN(startDateTime) || isNaN(endDateTime)) {
        setError("Invalid date or time format.");
        setCost(null);
        return;
      }

      // Calculate durations
      const durationInHours = differenceInHours(endDateTime, startDateTime);
      const durationInDays = differenceInDays(endDateTime, startDateTime);

      // Check duration constraints
      if (durationInHours < 3) {
        setError("Booking duration must be at least 3 hours.");
        setCost(null);
        return;
      }

      if (durationInDays > 7) {
        setError("Booking duration must be less than 7 days.");
        setCost(null);
        return;
      }

      // Calculate cost
      const totalCost =
        Math.ceil(durationInDays) * rentPerDay +
        (durationInHours % 24) * rentPerHour;

      setError("");
      setCost(totalCost);
    };

    // Only calculate if both start and end are set
    if (
      formData.startDate &&
      formData.startTime &&
      formData.endDate &&
      formData.endTime
    ) {
      calculateCost();
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const inpclass =
    "bg-slate-600 text-white border-none font-semibold rounded-md mx-2 p-1 ring-1 ring-white";
  const divcls = "mx-2 p-1 flex justify-between";

  return (
    <div className="my-5 font-semibold">
      <button
        className="bg-green-500 font-semibold hover:ring-2 duration-200 ring-white text-white rounded-md p-2 text-lg px-3"
        onClick={() => document.getElementById("model").showModal()}
      >
        Select Date
      </button>

      <dialog id="model" className="modal">
        <div className="modal-box bg-white dark:bg-slate-900">
          <h2 className="text-center font-semibold text-xl border-cyan-400 mx-24 border-b-4">
            Select Rental Date
          </h2>


          <form className="booking-form my-5">
            <div className={divcls}>
              <label>
                Start Date:
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className={inpclass}
                />
              </label>
            </div>
            <div className={divcls}>
              <label>
                Start Time:
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                  className={inpclass}
                />
              </label>
            </div>
            <div className={divcls}>
              <label>
                End Date:
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className={inpclass}
                />
              </label>
            </div>
            <div className={divcls}>
              <label>
                End Time:
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                  className={inpclass}
                />
              </label>
            </div>
          </form>

          {error && <p className="error text-red-500">{error}</p>}
          {cost !== null && (
            <div className="ring-1 dark:ring-white ring-slate-700 p-2">
              <h2>Booking Summary</h2>
              <p>
                Start:{" "}
                {format(
                  new Date(`${formData.startDate}T${formData.startTime}`),
                  "PPPpp"
                )}
              </p>
              <p>
                End:{" "}
                {format(
                  new Date(`${formData.endDate}T${formData.endTime}`),
                  "PPPpp"
                )}
              </p>
              <p>Total Cost: ${cost.toFixed(2)}</p>
            </div>
          )}

          <div className="modal-action">
            <button
              className="font-semibold mx-2 bg-blue-600 hover:ring-2 ring-white duration-200 text-white p-1 px-5 rounded-lg"
              onClick={() => ""}
            >
              Set date
            </button>
            <button
              onClick={() => document.getElementById("model").close()}
              className="btn bg-slate-800 hover:ring-2 ring-white text-white"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DateTimeComp;
