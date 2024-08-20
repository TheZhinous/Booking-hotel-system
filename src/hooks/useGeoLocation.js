import { useState } from "react";

export default function useGeoLocation() {
  const [position, setPosition] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
          return setError("Sorry! your browser does not support the geoLocation");
      
      
      
    setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
      (pos) => {
            setPosition({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            });
        setIsLoading(false);
      },
        (err) => {
        
        setError(err.message);
        setIsLoading(false);
      }
    );
  }

  return { position, isLoading, getPosition, error };
}
