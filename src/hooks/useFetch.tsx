import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useState } from "react";

const axiosContent = axios.create({ baseURL: "http://localhost:8000/api/" });

interface IUseFetch<T> {
  response: T | null;
  fetchData: (url: string, options?: object) => Promise<void>;
  isLoading: boolean;
}
const useFetch = <T,>(): IUseFetch<T> => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (
    url: string,
    options: AxiosRequestConfig = { method: "get" }
  ) => {
    setIsLoading(true);

    try {
      const { data } = await axiosContent.request({ ...options, url });
      setResponse(data);
      return data;
    } catch (error) {
      setIsLoading(false);
    }
  };

  return { response, isLoading, fetchData };
};

export default useFetch;
