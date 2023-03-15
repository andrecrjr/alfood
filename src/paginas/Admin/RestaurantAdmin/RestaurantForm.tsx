import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

const RestaurantForm = () => {
  const [nameRestaurant, setRestaurantName] = useState("");
  const params = useParams();

  const { response: restauranteEdition, fetchData: getRestaurant } =
    useFetch<IRestaurante>();

  useEffect(() => {
    if (params?.id) {
      getRestaurant(`v2/restaurantes/${params?.id}/`);
    }
  }, [params.id]);

  const sendForm = async (name: string) => {
    try {
      await getRestaurant(
        `v2/restaurantes/${params?.id ? `${params.id}/` : ""}`,
        {
          method: `${params?.id ? "put" : "post"}`,
          data: { nome: name },
        }
      );
      alert("Restaurante cadastrado com sucesso!");
    } catch (error) {
      alert("Error");
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendForm(nameRestaurant);
  };
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography component={"h1"} variant="h6">
        Formulário de Restaurantes
      </Typography>
      <Box component="form" onSubmit={submitForm}>
        <TextField
          id="outlined-basic"
          label="Restaurant Name"
          onChange={(e) => setRestaurantName(e.target.value)}
          variant="standard"
          fullWidth
          value={nameRestaurant || restauranteEdition?.nome}
          required
        />
        <Button
          sx={{ marginTop: 1 }}
          fullWidth
          variant="outlined"
          type="submit"
        >
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default RestaurantForm;
