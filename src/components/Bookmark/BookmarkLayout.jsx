import React from "react";
import Map from "../Map/Map";
import { Outlet } from "react-router-dom";
import { useBookmarks } from "../../context/BookmarksProvider";

function Bookmark() {
  const { bookmarks, isLoading } = useBookmarks();
  // console.log(bookmarks);
  return (
    <div className="appLayout">
      <div className="sidebar">{<Outlet />}</div>
      <Map markerLocations={bookmarks} />
    </div>
  );
}

export default Bookmark;
