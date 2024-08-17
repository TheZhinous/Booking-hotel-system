import { createContext, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { toast } from "react-hot-toast";
import axios from "axios";

const BookmarksContext = createContext();
const BASE_URL = "http://localhost:5000/bookmarks";

export default function BookmarksProvider({ children }) {
  const { data: bookmarks, isLoading } = useFetch(`${BASE_URL}`);
  const [currentBookmark, setCurrenBookmark] = useState({});
  const [isLoadingCurrBookmark, setIsLoadingCurrBookmark] = useState(false);

  async function getBookmarks(id) {
    setIsLoadingCurrBookmark(true);
    // setCurrenBookmark(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrenBookmark(data);
      setIsLoadingCurrBookmark(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrBookmark(false);
    }
  }

  return (
    <BookmarksContext.Provider
      value={{
        isLoading,
        bookmarks,
        currentBookmark,
        getBookmarks,
        isLoadingCurrBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarksContext);
}
