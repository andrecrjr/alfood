import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";

const RestaurantForm = () => {
  const [nameRestaurant, setRestaurantName] = useState("");
  const { fetchData } = useFetch("post", "v2/restaurantes/");

  const sendForm = async (name: string) => {
    fetchData({ bodyData: { nome: name } });
    alert("Restaurante cadastrado com sucesso!");
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendForm(nameRestaurant);
  };
  return (
    <form onSubmit={submitForm}>
      <TextField
        id="outlined-basic"
        label="Restaurant name"
        onChange={(e) => setRestaurantName(e.target.value)}
        variant="outlined"
      />
      <Button type="submit">Enviar</Button>
    </form>
  );
};

export default RestaurantForm;
