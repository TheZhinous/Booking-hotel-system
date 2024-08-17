import React from "react";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useNavigate } from "react-router-dom";

function AddNewBookmark() {
    const [lat, lng] = useUrlLocation();
    console.log(lat ,lng)
  const navigate = useNavigate();
  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form className="form">
        <div className="formControl">
          <label htmlFor="cityName">cityName</label>
          <input name="cityName" id="cityName" type="text" />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input name="country" id="country" type="text" />
        </div>
        <div className="buttons">
          <button
            className="btn btn--back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </button>
          <button className="btn btn--primary">Add &rarr;</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
