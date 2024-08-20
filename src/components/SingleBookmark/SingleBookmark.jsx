import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBookmarks } from "../../context/BookmarksProvider";
import ReactCountryFlag from "react-country-flag";
import Loader from "../Loader/Loader";

function SingleBookmark() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBookmark, currentBookmark, isLoading } =
    useBookmarks();
  useEffect(() => {
    getBookmark(id);
  }, [id]);
  if (isLoading || !currentBookmark) return <Loader />;
  return (
    <div>
      <div className="bookmarkItem">
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp;<strong>{currentBookmark.cityName}</strong> &nbsp;
        <span>{currentBookmark.country}</span>
      </div>
      <button onClick={() => navigate(-1)} className="btn btn--back">&larr;Back</button>
    </div>
  );
}

export default SingleBookmark;
