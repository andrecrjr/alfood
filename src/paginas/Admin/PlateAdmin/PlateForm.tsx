import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITag";
import IPrato from "../../../interfaces/IPrato";

const PlateForm = () => {
  const [plateName, setPlateName] = useState("");
  const [plateDescription, setDescription] = useState("");
  const [tags, setTag] = useState<string>("");
  const [restaurantId, setRestaurantId] = useState<number>(0);
  const params = useParams();

  const { response: plateData, fetchData: getPlate } = useFetch<IPrato>();
  const { response: responseTags, fetchData: getTag } = useFetch<{
    tags: ITag[];
  }>();
  const { response: restauranteData, fetchData: getRestaurant } =
    useFetch<IRestaurante[]>();

  useEffect(() => {
    if (params?.id) {
      getPlate(`v2/pratos/${params?.id}/`);
    }
  }, [params.id]);

  useEffect(() => {
    getTag(`v2/tags/`);
    getRestaurant(`v2/restaurantes/`);
  }, []);

  const sendForm = async () => {
    try {
      //
      await getPlate(`v2/pratos/${params?.id ? `${params.id}/` : ""}`, {
        method: `${params?.id ? "put" : "post"}`,
        data: {
          // state name or name from database
          nome: plateName || plateData?.nome,
          descricao: plateDescription || plateData?.descricao,
          restaurante: Number(restaurantId) || plateData?.restaurante,
          tag: tags || plateData?.tag || "",
        },
      });
      alert("Prato cadastrado com sucesso!");
    } catch (error) {
      alert("Error");
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendForm();
  };

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography component={"h1"} variant="h6">
          Formulário de Pratos
        </Typography>
        <Box component="form" onSubmit={submitForm}>
          <TextField
            id="outlined-basic"
            label="Plate's Name"
            onChange={(e) => setPlateName(e.target.value)}
            variant="standard"
            fullWidth
            value={plateName || plateData?.nome}
            margin={"dense"}
            required
          />
          <TextField
            id="outlined-basic"
            label="Plate's Description"
            onChange={(e) => setDescription(e.target.value)}
            variant="standard"
            fullWidth
            value={plateDescription || plateData?.descricao}
            margin={"dense"}
            required
          />
          <FormControl margin="dense" fullWidth>
            <InputLabel id="select-tag">Tag</InputLabel>
            <Select
              labelId="select-tag"
              value={
                tags ||
                (responseTags &&
                  responseTags?.tags.length > 0 &&
                  responseTags?.tags.filter(
                    (tag: ITag) => tag.value === plateData?.tag
                  )[0].value) ||
                ""
              }
              onChange={(e) => setTag(e.target.value)}
              margin={"dense"}
            >
              {responseTags?.tags &&
                responseTags?.tags.length > 0 &&
                responseTags?.tags.map((tag: ITag) => {
                  return (
                    <MenuItem value={tag.value} key={tag.id}>
                      {tag.value}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <FormControl margin="dense" fullWidth>
            <InputLabel id="select-tag">Restaurant</InputLabel>
            <Select
              labelId="select-tag"
              value={
                restaurantId ||
                (restauranteData &&
                  restauranteData.filter(
                    (restaurant) => restaurant.id === plateData?.restaurante
                  )[0].id) ||
                0
              }
              onChange={(e: SelectChangeEvent<number>) => {
                const id = parseInt(e.target.value as string);
                setRestaurantId(id);
              }}
              margin={"dense"}
            >
              {restauranteData &&
                restauranteData.length > 0 &&
                restauranteData.map((rest: IRestaurante) => {
                  return (
                    <MenuItem value={rest.id} key={rest.id}>
                      {rest.nome}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
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
    </>
  );
};

export default PlateForm;
