import axios from "axios";
import IRestaurante from "../../interfaces/IRestaurante";
import { IPaginacao } from "../../interfaces/IPaginacao";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import { useCallback, useEffect, useState } from "react";

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurants] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");
  const fetchData = useCallback(async (apiUrl = "") => {
    const { data } = await axios.get<IPaginacao<IRestaurante>>(
      `${apiUrl || "http://localhost:8000/api/v1/restaurantes/"}`
    );
    setRestaurants(data.results);
    setProximaPagina(data.next);
  }, []);

  const readMore = async () => {
    fetchData(proximaPagina);
  };
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurantes?.map((item: IRestaurante) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {proximaPagina && <button onClick={readMore}>Ver mais</button>}
    </section>
  );
};

export default ListaRestaurantes;
