import "../style/CountryList.css";
import ReactLoading from "react-loading";
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
                  countries.map((country, index) => (
                    <div className="country-info-row txt-light" key={index}>
                      <div className="flag-img">
                        <img src={country.flags.svg} alt="country flag" />
                      </div>
                      <h4>{country.name.common}</h4>
                      <p>{country.population.toLocaleString()}</p>
                      <p>{country.area.toLocaleString()}</p>
                      <p>{country.region}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
