import React, { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { HiMinus, HiPlus } from "react-icons/hi";



function Options() {
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
    
    
    const handleOptions = (name, operation) => {
      setOptions((prev) => {
        return {
          ...prev,
          [name]: operation == "inc" ? options[name] + 1 : options[name] - 1,
        };
      });
    };
  return (
    <div>
      <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
        {options.adult} adult &bull; {options.children}children &bull;{" "}
        {options.room}room
      </div>
      {openOptions && (
        <GuestOptionList
          options={options}
          handleOptions={handleOptions}
          setOpenOptions={setOpenOptions}
        />
      )}
    </div>
  );
}

export default Options;

function GuestOptionList({ options, handleOptions, setOpenOptions }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));
  return (
    <div className="guestOptions" ref={optionsRef}>
      <OptionItem
        type={"adult"}
        handleOptions={handleOptions}
        options={options}
        minlimit={1}
      />
      <OptionItem
        type={"children"}
        handleOptions={handleOptions}
        options={options}
        minlimit={0}
      />
      <OptionItem
        type={"room"}
        handleOptions={handleOptions}
        options={options}
        minlimit={1}
      />
    </div>
  );
}

function OptionItem({ type, handleOptions, options, minlimit }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          onClick={() => handleOptions(type, "dec")}
          disabled={options[type] <= minlimit}
        >
          <HiMinus />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleOptions(type, "inc")}
        >
          <HiPlus />
        </button>
      </div>
    </div>
  );
}
