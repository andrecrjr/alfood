import {
  Avatar,
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
import React, { ChangeEvent, useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITag";
import IPrato from "../../../interfaces/IPrato";

const PlateForm = () => {
  const params = useParams();
  const isEditionPage = params?.id !== "new";

  const { response: plateData, fetchData: getPlate } = useFetch<IPrato>();
  const { response: responseTags, fetchData: getTag } = useFetch<{
    tags: ITag[];
  }>();
  const { response: restauranteData, fetchData: getRestaurant } =
    useFetch<IRestaurante[]>();
  const [plateName, setPlateName] = useState(plateData?.nome || "");
  const [plateDescription, setDescription] = useState("");
  const [tags, setTag] = useState<string>("");
  const [restaurantId, setRestaurantId] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (isEditionPage) {
      getPlate(`v2/pratos/${params?.id}/`);
    } else {
      setPlateName("");
      setDescription("");
      setTag("");
      setRestaurantId("");
      setImage(null);
    }
  }, [params?.id]);

  useEffect(() => {
    getTag(`v2/tags/`);
    getRestaurant(`v2/restaurantes/`);
  }, []);

  const sendForm = async (formData: FormData) => {
    try {
      await getPlate(`v2/pratos/${isEditionPage ? `${params.id}/` : ""}`, {
        method: `${isEditionPage ? "put" : "post"}`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      alert("Prato succesfull added!");
    } catch (error) {
      console.log(error);
      alert("Error in Plate Form");
    }
  };

  const selectFile = (e: ChangeEvent<HTMLInputElement> | null) => {
    if (e?.target.files) {
      setImage(e.target.files[0] || plateData?.imagem);
    } else {
      setImage(null);
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nome", plateName || plateData?.nome || "");
    formData.append("tag", tags || plateData?.tag || "");
    formData.append(
      "descricao",
      plateDescription || plateData?.descricao || ""
    );
    formData.append(
      "restaurante",
      restaurantId.toString() || String(plateData?.restaurante)
    );
    if (image) {
      formData.append("imagem", image || plateData?.imagem);
    }
    sendForm(formData);
  };

  const editionTagValue =
    isEditionPage &&
    responseTags &&
    responseTags.tags?.length > 0 &&
    responseTags.tags?.filter((tag: ITag) => tag?.value === plateData?.tag)[0]
      .value;

  const editionRestaurantsValue = ((isEditionPage &&
    restauranteData &&
    restauranteData
      ?.filter((restaurant) => restaurant?.id === plateData?.restaurante)[0]
      .id?.toString()) ||
    "") as string;

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
            value={plateName}
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
              value={tags || editionTagValue || ""}
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
              value={restaurantId || editionRestaurantsValue}
              onChange={(e: SelectChangeEvent<string>) => {
                setRestaurantId(e.target.value);
              }}
              margin={"dense"}
            >
              {restauranteData &&
                restauranteData?.length > 0 &&
                restauranteData?.map((rest: IRestaurante) => {
                  return (
                    <MenuItem value={rest.id} key={rest.id}>
                      {rest.nome}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <Box
            component={"div"}
            sx={{
              width: "auto",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {plateData?.imagem && (
              <Avatar
                alt={plateData?.nome}
                src={`${plateData?.imagem}`}
                variant="square"
                sx={{ width: "150", height: "150", align: "center" }}
              />
            )}
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload Image
              </Button>
            </label>
            <input
              type="file"
              id="contained-button-file"
              style={{ display: "none" }}
              onChange={selectFile}
            />
          </Box>
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
