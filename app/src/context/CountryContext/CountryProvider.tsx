import { useEffect, useState } from "react";
import { ContextChild } from "./ChildInterface";
import { CountryCtxValue, CountryInterface } from "./CountryInterface";
import { CountryContext } from "./CountryContext";

export const countriesUrl = "https://restcountries.com/v3.1/all";

export const CountryProvider = ({ children }: ContextChild) => {
  const [countries, setCountries] = useState<CountryInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCountries = async () => {
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
    fetchCountries();
  }, []);

  if (error) {
    return (
      <div className="">
        <h2 className="">Error: {error}</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="">
        <h2 className="">Loading...</h2>
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="">
        <h2 className="">No data available</h2>
      </div>
    );
  }

  const countriesValue: CountryCtxValue = {
    countries,
    loading,
    error,
    fetchCountries,
  };

  return (
    <CountryContext.Provider value={countriesValue}>
      {children}
    </CountryContext.Provider>
  );
};
