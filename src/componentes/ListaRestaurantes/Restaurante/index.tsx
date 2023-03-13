import { useEffect } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import Prato from "../Prato";
import estilos from "./Restaurante.module.scss";
import IPrato from "../../../interfaces/IPrato";
import useFetch from "../../../hooks/useFetch";

interface RestauranteProps {
  restaurante: IRestaurante;
}

const Restaurante = ({ restaurante }: RestauranteProps) => {
  const { data, fetchData } = useFetch<IPrato[]>(
    "get",
    `v1/restaurantes/${restaurante.id}/pratos/`
  );
  useEffect(() => {
    fetchData({});
  }, [restaurante.id, fetchData]);
  return (
    <section className={estilos.Restaurante}>
      <div className={estilos.Titulo}>
        <h2>{restaurante.nome}</h2>
      </div>
      <div>
        {data &&
          data.length > 0 &&
          data?.map((item) => <Prato prato={item} key={item.id} />)}
      </div>
    </section>
  );
};

export default Restaurante;
