import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

import Favorites from "../pages/Favorites";
const BookDetails = React.lazy(() => import("../pages/BookDetails"));

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/:id" element={<BookDetails />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default MainRoutes;
