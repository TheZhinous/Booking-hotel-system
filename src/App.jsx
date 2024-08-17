import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./context/HotelsProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import BookmarksProvider from "./context/BookmarksProvider";
import Bookmarks from "./components/Bookmarks/Bookmarks";

function App() {
  return (
    <HotelsProvider>
      <BookmarksProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
          <Route path="/bookmark" element={<BookmarkLayout />}>
            <Route index element={<Bookmarks />} />
            <Route path=":id" element={<div>single bookmark</div>} />
            <Route path="add" element={<div>add new bookmark</div>} />
          </Route>
        </Routes>
      </BookmarksProvider>
    </HotelsProvider>
  );
}

export default App;
