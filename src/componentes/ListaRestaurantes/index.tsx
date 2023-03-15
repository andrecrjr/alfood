import IRestaurante from "../../interfaces/IRestaurante";
import { IPaginacao } from "../../interfaces/IPaginacao";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import { useCallback, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

const ListaRestaurantes = () => {
  const { fetchData, response: data } = useFetch<IPaginacao<IRestaurante>>();

  const fetchinData = useCallback(async () => {
    await fetchData(`v1/restaurantes/`);
  }, []);

  const readMore = async () => {
    data?.next && (await fetchData(data?.next));
  };

  useEffect(() => {
    fetchinData();
  }, [fetchinData]);

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {data?.results?.map((item: IRestaurante) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {data?.next && <button onClick={readMore}>Ver mais</button>}
    </section>
  );
};

export default ListaRestaurantes;
