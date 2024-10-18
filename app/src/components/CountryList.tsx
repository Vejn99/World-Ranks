import "../style/CountryList.css";
import { useApiData } from "../hooks/useApiData";

export const CountryList = () => {
  const { countries, loading, error } = useApiData();

  return (
    <>
      <div className="bg-img m-0">
        <div className="logo">
          <img src="/images/Logo.svg" alt="Logo" />
        </div>
      </div>
      <div className="container-fluid">
        <div className="inner">
          <div className="search-bar d-flex align-items-center justify-content-between txt-dark">
            <p>Found {countries.length} countries</p>
            <div>SEARCH BAR</div>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div className="left-filter w-25 d-flex">
              <p>Sort by</p>
              <p>region</p>
              <p>status</p>
            </div>
            <div className="right-list w-75">
              <div className="info-bar">
                <h4>Flag</h4>
                <h4>Name</h4>
                <h4>Population</h4>
                <h4>Area (km²)</h4>
                <h4>Region</h4>
              </div>
              <hr />
              {countries.map((country, index) => (
                <div className="country-info-row" key={index}>
                  <div className="flag-img">
                    <img src={country.flags.svg} alt="country flag" />
                  </div>
                  <h3>{country.name.common}</h3>
                  <p>{country.population.toLocaleString()}</p>
                  <p>{country.area.toLocaleString()}</p>
                  <p>{country.region}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
