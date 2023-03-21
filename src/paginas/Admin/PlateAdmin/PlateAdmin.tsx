import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useCallback, useEffect, useState } from "react";
import { Button, Link } from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import IPrato from "../../../interfaces/IPrato";
const PlateAdmin = () => {
  const [plates, setPlates] = useState<IPrato[]>([]);
  const deleteItem = useFetch();
  const { fetchData: getPlates, response: platesResp } = useFetch<IPrato[]>();

  const fetchRestaurantaAdmin = useCallback(async () => {
    await getPlates("v2/pratos/", { method: "get" });
  }, []);

  const excludeRestaurant = useCallback(async (excludeId: number) => {
    await deleteItem.fetchData(`${`v2/pratos/${excludeId}/`}`, {
      method: "delete",
    });
    setPlates((rest) => rest.filter((item) => item.id !== excludeId));
  }, []);

  useEffect(() => {
    fetchRestaurantaAdmin();
  }, [fetchRestaurantaAdmin]);

  useEffect(() => {
    //sync with update or deletion
    platesResp && platesResp.length > 0 && setPlates(platesResp);
  }, [platesResp]);
  
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {plates &&
            plates?.length > 0 &&
            plates?.map((plate) => (
              <TableRow key={plate.id}>
                <TableCell>{plate.nome}</TableCell>
                <TableCell>{plate.tag}</TableCell>
                <TableCell>
                  <img src={`${plate.imagem}`} alt={plate.nome} width="100" />
                </TableCell>
                <TableCell>
                  [<Link href={`/admin/plates/${plate.id}`}>Editar</Link>]
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={(e) => {
                      e.preventDefault();
                      excludeRestaurant(plate.id);
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

export default PlateAdmin;
