import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useState } from "react";

const axiosContent = axios.create({ baseURL: "http://localhost:8000/api/" });

interface IUseFetch<T> {
  response: T | null;
  fetchData: (url: string, options?: object) => Promise<void>;
  options?: AxiosRequestConfig;
  isLoading: boolean;
  error: { status: boolean; message: string };
}
const useFetch = <T,>(): IUseFetch<T> => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });

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
      console.log(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        setIsLoading(false);
        setError({ status: true, message: `${axiosError.response?.data}` });
        throw new Error(`Error ${axiosError.response?.data}`);
      }
    }
  };

  return { response, isLoading, fetchData, error };
};

export default useFetch;
