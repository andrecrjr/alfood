import axios from "axios";
import { useCallback, useState } from "react";

const axiosContent = axios.create({ baseURL: "http://localhost:8000/api/" });

type requestType = "get" | "post" | "put" | "delete";
const useFetch = <T,>(
  requestType: requestType,
  slug?: string
): {
  data: T | undefined;
  fetchData: ({
    bodyData,
    slugAlt,
  }: {
    bodyData?: object | undefined;
    slugAlt?: string | undefined;
  }) => Promise<void>;
} => {
  const [data, setNewdata] = useState<T>();
  const fetchData = useCallback(
    async ({ bodyData, slugAlt }: { bodyData?: object; slugAlt?: string }) => {
      const { data } = await axiosContent[requestType]<T>(
        slugAlt || slug || "",
        {
          ...bodyData,
        }
      );
      setNewdata(data);
    },
    [slug, requestType]
  );

  return { data, fetchData };
};

export default useFetch;
