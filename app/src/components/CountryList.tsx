import "../style/CountryList.css";
import ReactLoading from "react-loading";
import { useApiData } from "../hooks/useApiData";
import { useState } from "react";
import { CountryInterface } from "../hooks/CountryInterface";

export const CountryList = () => {
  const { countries, loading, error } = useApiData();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((country: CountryInterface) => {
    const nameMatch = country.name.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const regionMatch = country.region
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const subregionMatch = country.subregion
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    return nameMatch || regionMatch || subregionMatch;
  });

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
            <div className="search-bar-inner">
              <img
                src="/images/Search.svg"
                alt="search icon"
                className="search-icon"
              />
              <input
                type="text"
                placeholder="Search by Name, Region, Subregion"
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-5">
            <div className="left-filter w-25 d-flex txt-dark">
              <p>Sort by</p>
              <p>region</p>
              <p>status</p>
            </div>
            <div className="right-list w-75">
              <div className="info-bar txt-dark">
                <h5>Flag</h5>
                <h5>Name</h5>
                <h5>Population</h5>
                <h5>Area (km²)</h5>
                <h5>Region</h5>
              </div>
              <hr />
              <div
                className={`country-info ${
                  loading || error ? "no-scroll" : ""
                }`}
              >
                {loading ? (
                  <div className="loading-container">
                    <ReactLoading
                      type="spinningBubbles"
                      color="#ffffff"
                      height={250}
                      width={250}
                    />
                    <p>Loading countries...</p>
                  </div>
                ) : error ? (
                  <div className="error-container">
                    <h2>Oops! Something went wrong.</h2>
                    <p>{error}</p>
                  </div>
                ) : (
                  <>
                    {filteredCountries.length > 0 ? (
                      (searchTerm ? filteredCountries : countries).map(
                        (country, index) => (
                          <div
                            className="country-info-row txt-light"
                            key={index}
                          >
                            <div className="flag-img">
                              <img src={country.flags.svg} alt="country flag" />
                            </div>
                            <h4>{country.name.common}</h4>
                            <p>{country.population.toLocaleString()}</p>
                            <p>{country.area.toLocaleString()}</p>
                            <p>{country.region}</p>
                          </div>
                        )
                      )
                    ) : (
                      <h3 className="d-flex justify-content-center mt-5">
                        No Countries found
                      </h3>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
