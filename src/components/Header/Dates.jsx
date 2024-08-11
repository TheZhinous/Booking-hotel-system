import React, { useRef, useState } from "react";
import { DateRange, DateRangePicker } from "react-date-range";
import { HiCalendar } from "react-icons/hi";
import { format } from "date-fns";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function Dates() {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const dateRef = useRef();
  useOutsideClick(dateRef, "dateDropDown", () => setOpenDate(false));
  return (
    <div onClick={() => setOpenDate(!openDate)} ref={dateRef} id="dateDropDown">
      <HiCalendar className="headerIcon dateIcon" />
      <div className="dateDropDown">
        {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
          date[0].endDate,
          "MM/dd/yyyy"
        )}`}
      </div>
      {openDate && (
        <DateRangePicker
          className="date"
          ranges={date}
          onChange={(item) => setDate([item.selection])}
          minDate={new Date()}
          moveRangeOnFirstSelection={true}
        />
      )}
    </div>
  );
}

export default Dates;
