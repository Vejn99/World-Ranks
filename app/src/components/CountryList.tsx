import { useApiData } from "../hooks/useApiData";

export const CountryList = () => {
  const { countries, loading, error } = useApiData();
  return (
    <>
      <div className="country-list">
        {countries.map((country, index) => (
          <li key={index}>
            <h1>{country.name.common}</h1>
          </li>
        ))}
      </div>
    </>
  );
};
