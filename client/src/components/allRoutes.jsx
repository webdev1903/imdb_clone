import { Routes, Route } from "react-router-dom";
import AddMovies from "../pages/addMovies";
import AllMovies from "../pages/allMovies";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AllMovies />}></Route>
      <Route path="/editor" element={<AddMovies />}></Route>
    </Routes>
  );
}
