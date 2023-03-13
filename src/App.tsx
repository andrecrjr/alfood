import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import RestaurantAdmin from "./paginas/Admin/RestaurantAdmin/RestaurantAdmin";
import RestaurantForm from "./paginas/Admin/RestaurantAdmin/RestaurantForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurants" element={<RestaurantAdmin />} />
      <Route path="/admin/restaurants/new" element={<RestaurantForm />} />
    </Routes>
  );
}

export default App;
