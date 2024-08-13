import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { toast } from "react-hot-toast";

const HotelsContext = createContext();
const BASE_URL = "http://localhost:5000/hotels";

export default function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { data: hotels, isLoading } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  const [currentHotel, setCurrenHotel] = useState({});
  const [isLoadingCurrHotel, setIsLoadingCurrHotel] = useState(false);

  async function getHotel(id) {
    setIsLoadingCurrHotel(true);
      try {
        const { data } = await axios.get(`${BASE_URL}/${id}`);
        setCurrenHotel(data);
        setIsLoadingCurrHotel(false)
      } catch (error) {
        toast.error(error.message);
        setIsLoadingCurrHotel(false);
      }
    }



  return (
    <HotelsContext.Provider value={{ isLoading, hotels , currentHotel , getHotel , isLoadingCurrHotel }}>
      {children}
    </HotelsContext.Provider>
  );
}

export function useHotels() {
  return useContext(HotelsContext);
}
