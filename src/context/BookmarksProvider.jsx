import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { toast } from "react-hot-toast";
import axios from "axios";

const BookmarksContext = createContext();
const BASE_URL = "http://localhost:5000/bookmarks";

export default function BookmarksProvider({ children }) {
  const [currentBookmark, setCurrenBookmark] = useState({});
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    async function getBookmarkList() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${BASE_URL}`);
        setBookmarks(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getBookmarkList()
},[])

  async function getBookmark(id) {
    setIsLoading(true);
    setCurrenBookmark(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrenBookmark(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteBookmark(id) {
    setIsLoading(true);
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      setBookmarks((prev) => [...prev].filter((item) => item.id !== id));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function createBookmark(newBookmark) {
    setIsLoading(true);
    setCurrenBookmark(null);
    try {
      const { data } = await axios.post(`${BASE_URL}` , newBookmark);
      setCurrenBookmark(data);
      setBookmarks(prev => [...prev, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <BookmarksContext.Provider
      value={{
        isLoading,
        bookmarks,
        currentBookmark,
        getBookmark,
        createBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarksContext);
}
