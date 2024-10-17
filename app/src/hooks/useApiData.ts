import { useEffect, useState } from "react";
import { CountryInterface } from "./CountryInterface";

export const countriesUrl = "https://restcountries.com/v3.1/all";

export const useApiData = () => {
  const [countries, setCountries] = useState<CountryInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(countriesUrl);
      const data = await response.json();

      if (response.ok) {
        setCountries(data);
      } else {
        setError(`Request failed with status ${response.status}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { countries, loading, error };
};
