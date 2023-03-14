import { Button, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

const RestaurantForm = () => {
  const [nameRestaurant, setRestaurantName] = useState("");
  const params = useParams();
  const { fetchData } = useFetch(
    `${params?.id ? "put" : "post"}`,
    `v2/restaurantes/${params?.id ? `${params.id}/` : ""}`
  );
  const { data: restauranteEdition, fetchData: getRestaurant } =
    useFetch<IRestaurante>("get", `v2/restaurantes/${params?.id}/`);

  useEffect(() => {
    if (params?.id) {
      getRestaurant({});
      console.log(restauranteEdition);
    }
  }, [params.id]);

  useEffect(() => {
    restauranteEdition?.nome && setRestaurantName(restauranteEdition.nome);
  }, [restauranteEdition]);

  const sendForm = async (name: string) => {
    try {
      await fetchData({ bodyData: { nome: name } });
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
        value={nameRestaurant}
      />
      <Button type="submit">Enviar</Button>
    </form>
  );
};

export default RestaurantForm;
