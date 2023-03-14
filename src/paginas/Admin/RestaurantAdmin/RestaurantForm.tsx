import { Button, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

const RestaurantForm = () => {
  const [nameRestaurant, setRestaurantName] = useState("");
  const params = useParams();
  // const { fetchData } = useFetch(
  //   `${params?.id ? "put" : "post"}`,
  //   `v2/restaurantes/${params?.id ? `${params.id}/` : ""}`
  // );
  const { response: restauranteEdition, fetchData: getRestaurant } =
    useFetch<IRestaurante>();

  useEffect(() => {
    if (params?.id) {
      getRestaurant(`v2/restaurantes/${params?.id}/`);
      console.log(restauranteEdition);
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
    <form onSubmit={submitForm}>
      <TextField
        id="outlined-basic"
        label="Restaurant Name"
        onChange={(e) => setRestaurantName(e.target.value)}
        variant="outlined"
        value={nameRestaurant || restauranteEdition?.nome}
      />
      <Button type="submit">Enviar</Button>
    </form>
  );
};

export default RestaurantForm;
