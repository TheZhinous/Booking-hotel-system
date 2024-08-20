import React, { useEffect, useState } from "react";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import { useBookmarks } from "../../context/BookmarksProvider";
const BASE_URL_GEO_CODING ="https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [lat, lng] = useUrlLocation();
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState("");
  const [geoCodingError, setGeoCodingError] = useState(null);
  const { createBookmark , getBookmarkList } = useBookmarks();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lat || !lng) return;

    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };
    await createBookmark(newBookmark);
    navigate("/bookmark");
  };

  useEffect(() => {
    //if there is nothing , return it
    if (!lat || !lng) return;
    async function fetchLocationData() {
      setIsLoadingGeoCoding(true);
      setGeoCodingError(null);
      try {
        const { data } = await axios.get(
          `${BASE_URL_GEO_CODING}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error(
            "This location is not a city , please click somewhare else !"
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
        setCountryCode(data.countryCode);
      } catch (error) {
        setGeoCodingError(error.message);
        toast.error(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);

  if (isLoadingGeoCoding) return <Loader />;
  if (geoCodingError) return <ErrorComponent>{geoCodingError}</ErrorComponent>;

  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="cityName">cityName</label>
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            name="cityName"
            id="cityName"
            type="text"
          />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            name="country"
            id="country"
            type="text"
          />

          <ReactCountryFlag svg countryCode={countryCode} className="flag" />
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
