import { createContext, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { toast } from "react-hot-toast";
import axios from "axios";

const BookmarksContext = createContext();
const BASE_URL = "http://localhost:5000";

export default function BookmarksProvider({ children }) {
  const { data: bookmarks, isLoading } = useFetch(`${BASE_URL}/bookmarks`);
  const [currentBookmark, setCurrenBookmark] = useState({});
  const [isLoadingCurrBookmark, setIsLoadingCurrBookmark] = useState(false);

  async function getBookmarks() {
    setIsLoadingCurrBookmark(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks`);
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
