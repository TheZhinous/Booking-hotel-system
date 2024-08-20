import React from "react";
import { useBookmarks } from "../../context/BookmarksProvider";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { HiTrash } from "react-icons/hi";

function Bookmarks() {
  const { bookmarks, isLoading, currentBookmark, deleteBookmark } =
    useBookmarks();
  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) return <Loader />;
  return (
    <div>
      <h2>Bookmarks List</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${
                  item.id == currentBookmark.id ? "current-bookmark" : ""
                }`}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp;<strong>{item.cityName}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="trash" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmarks;
