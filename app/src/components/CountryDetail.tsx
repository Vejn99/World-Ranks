import ReactLoading from "react-loading";
import { useApiData } from "../hooks/useApiData";
import { Link, Navigate, useParams } from "react-router-dom";
import "../style/CountryDetail.css";

export const CountryDetail = () => {
  const { countries } = useApiData();
  const { countryName } = useParams();

  if (!countryName) {
    return <Navigate to="/" />;
  }

  const country = countries.find(
    (c) => c.name.common.toLowerCase() === countryName.toLowerCase()
  );

  return (
    <>
      <div className="bg-img m-0">
        <div className="logo logo-detail">
          <Link to="/" aria-label="Go to homepage">
            <img src="/images/Logo.svg" alt="Logo" />
          </Link>
        </div>
      </div>
      {country && (
        <div className="country-detail txt-light">
          <div className="flag-img">
            <img src={country.flags.svg} alt={`${country.name.common} flag`} />
          </div>
          <div className="details">
            <div className="name">
              <h1 className="m-0">{country.name.common}</h1>
              <p>{country.name.official}</p>
            </div>
            <div className="population-area mt-5">
              <div className="population me-5">
                Population
                <div className="vertical-line"></div>
                {country.population.toLocaleString()}
              </div>
              <div className="area">
                Area (km²)
                <div className="vertical-line"></div>
                {country.area.toLocaleString()}
              </div>
            </div>
            <div className="border-rows">
              <p className="txt-dark ">Capital</p>
              <div>{country.capital}</div>
            </div>
            <div className="border-rows">
              <p className="txt-dark ">Subregion</p>
              <div>{country.subregion}</div>
            </div>
            <div className="border-rows">
              <p className="txt-dark ">Languages</p>
              <div className="d-flex">
                {Object.values(country.languages).join(", ")}
              </div>
            </div>
            <div className="border-rows">
              <p className="txt-dark ">Currencies</p>
              <div>
                {Object.values(country.currencies).map((currency) => (
                  <div key={currency.name}>{currency.name}</div>
                ))}
              </div>
            </div>
            <div className="border-rows">
              <p className="txt-dark ">Continents</p>
              <div>{country.continents}</div>
            </div>
            <div className="border-last-row">
              <p className="txt-dark mb-3">Neighbouring Countries</p>
              <div className="neighboring-countries ">
                {country.borders &&
                  country.borders.map((borderCode) => {
                    const neighborCountry = countries.find(
                      (c) => c.cca3 === borderCode
                    );

                    return (
                      <div key={borderCode} className="neighbor-country">
                        {neighborCountry && (
                          <>
                            <div className="img">
                              <img
                                src={neighborCountry.flags.svg}
                                alt={`${neighborCountry.name.common} flag`}
                              />
                            </div>
                            <p>{neighborCountry.name.common}</p>
                          </>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
