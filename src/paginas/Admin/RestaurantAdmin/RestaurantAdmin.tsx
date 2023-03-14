import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useCallback, useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Button, Link } from "@mui/material";
import useFetch from "../../../hooks/useFetch";
const RestaurantAdmin = () => {
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([]);
  const deleteItem = useFetch();
  const { fetchData: getRestaurants, response: restaurantsResp } =
    useFetch<IRestaurante[]>();

  const fetchRestaurantaAdmin = useCallback(async () => {
    await getRestaurants("v2/restaurantes/", { method: "get" });
  }, []);

  const excludeRestaurant = useCallback(async (excludeId: number) => {
    await deleteItem.fetchData(`${`v2/restaurantes/${excludeId}/`}`, {
      method: "delete",
    });
    setRestaurants((rest) => rest.filter((item) => item.id !== excludeId));
  }, []);

  useEffect(() => {
    fetchRestaurantaAdmin();
  }, [fetchRestaurantaAdmin]);

  useEffect(() => {
    restaurantsResp &&
      restaurantsResp.length > 0 &&
      setRestaurants(restaurantsResp);
  }, [restaurantsResp]);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurants &&
            restaurants?.length > 0 &&
            restaurants?.map((restaurant) => (
              <TableRow key={restaurant.id}>
                <TableCell>{restaurant.nome}</TableCell>
                <TableCell>
                  [
                  <Link href={`/admin/restaurants/${restaurant.id}`}>
                    Editar
                  </Link>
                  ]
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={(e) => {
                      e.preventDefault();
                      excludeRestaurant(restaurant.id);
                    }}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RestaurantAdmin;
