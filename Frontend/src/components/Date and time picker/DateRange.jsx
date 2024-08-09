import React, { useState } from "react";
// import { DateTimeRangePicker } from "@mui/x-date-pickers/DateTimeRangePicker";
// import { renderDigitalClockTimeView } from "@mui/x-date-pickers/timeViewRenderers";

function DateRange() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date > endDate) {
      setEndDate(date); // Ensure end date is not before start date
    }
  };

  const handleEndDateChange = (date) => {
    if (date >= startDate) {
      setEndDate(date);
    } else {
      alert("End date cannot be before start date");
    }
  };

  return (
    <div>
      <h3>Select Start Date and Time:</h3>
      {/* <DateTimeRangePicker
        views={["day", "hours"]}
        timeSteps={{ minutes: 20 }}
        viewRenderers={{ hours: renderDigitalClockTimeView }}
      /> */}

    </div>
  );
}

export default DateRange;
