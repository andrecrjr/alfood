import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useCallback, useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import axios from "axios";
import { Link } from "@mui/material";
const RestaurantAdmin = () => {
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([]);

  const fetchRestaurantaAdmin = useCallback(async () => {
    const { data } = await axios.get<IRestaurante[]>(
      "http://localhost:8000/api/v2/restaurantes/"
    );
    setRestaurants(data);
  }, []);

  useEffect(() => {
    fetchRestaurantaAdmin();
  }, [fetchRestaurantaAdmin]);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurants.length > 0 &&
            restaurants.map((restaurant) => (
              <TableRow key={restaurant.id}>
                <TableCell>{restaurant.nome}</TableCell>
                <TableCell>
                  [
                  <Link href={`/admin/restaurants/${restaurant.id}`}>
                    Editar
                  </Link>
                  ]
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RestaurantAdmin;
