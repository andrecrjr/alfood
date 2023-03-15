import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import RestaurantAdmin from "./paginas/Admin/RestaurantAdmin/RestaurantAdmin";
import RestaurantForm from "./paginas/Admin/RestaurantAdmin/RestaurantForm";
import BasePage from "./paginas/Admin/BasePage";
import PlateAdmin from "./paginas/Admin/PlateAdmin/PlateAdmin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element={<BasePage />}>
        <Route path="restaurants" element={<RestaurantAdmin />} />
        <Route path="restaurants/new" element={<RestaurantForm />} />
        <Route path="restaurants/:id" element={<RestaurantForm />} />
        <Route path="plates" element={<PlateAdmin />} />
      </Route>
    </Routes>
  );
}

export default App;
