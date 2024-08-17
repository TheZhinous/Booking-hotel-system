import React from "react";
import { useBookmarks } from "../../context/BookmarksProvider";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";

function Bookmarks() {
  const { bookmarks, isLoading } = useBookmarks();
  if (isLoading) return <Loader />;
  return (
    <div>
      <h2>Bookmarks List</h2>
      <div className="bookmarksList">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}&lat=${item.latitude}&lng=${item.lng}`}
            >
              <div className="bookmarkItem">
                <ReactCountryFlag svg countryCode={item.countryCode}/>
                &nbsp;<strong>{item.cityName}</strong> &nbsp;
                <span>{item.country}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmarks;
