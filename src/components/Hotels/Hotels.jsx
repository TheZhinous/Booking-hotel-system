import React from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../../context/HotelsProvider";

function Hotels() {
  const { hotels, isLoading } = useHotels();
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="searchList">
      <h2>Search Results ({hotels.length})</h2>
      {hotels.map((item) => {
        return (
          <Link
          key={item.id}
          to={`/hotels/${item.id}?&lat=${item.latitude}&lng=${item.longitude}`}
          >
          {/*for finding the center of map we pass latitude and longitude as queryStrings */}
            <div className="searchItem">
              <img src={item.picture_url.url} alt={item.name} />
              <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">&euro;{item.price} &nbsp; night</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Hotels;
