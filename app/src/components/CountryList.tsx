import "../style/CountryList.css";
import ReactLoading from "react-loading";
import { useApiData } from "../hooks/useApiData";
import { useState } from "react";
import { CountryInterface } from "../hooks/CountryInterface";

export const CountryList = () => {
  const { countries, loading, error } = useApiData();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("Population");
  const [dropdownActive, setDropdownActive] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [isUNMember, setIsUNMember] = useState(false);
  const [isIndependent, setIsIndependent] = useState(false);

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectOption = (option: string) => {
    setSortType(option);
    setDropdownActive(false);
  };

  const handleRegionChange = (event: any) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedRegions((prev) => [...prev, value]);
    } else {
      setSelectedRegions((prev) => prev.filter((region) => region !== value));
    }
  };

  const filteredCountries = countries.filter((country: CountryInterface) => {
    const nameMatch = country.name.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const regionMatch =
      selectedRegions.length === 0 || selectedRegions.includes(country.region);
    const subregionMatch = country.subregion
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const unMemberMatch = !isUNMember || country.unMember;
    const independentMatch = !isIndependent || country.independent;

    return (
      (nameMatch || subregionMatch) &&
      regionMatch &&
      unMemberMatch &&
      independentMatch
    );
  });

  const sortedFilteredCountries = [...filteredCountries].sort(
    (countryA, countryB) => {
      if (sortType === "Population") {
        return countryB.population - countryA.population;
      } else if (sortType === "Name") {
        return countryA.name.common.localeCompare(countryB.name.common);
      } else if (sortType === "Area (km²)") {
        return countryB.area - countryA.area;
      }
      return 0;
    }
  );

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
            <div className="left-filter w-25 d-flex flex-column txt-dark">
              <div className="sort-by mb-5">
                <div className="selectbox">
                  <h6>Sort by</h6>

                  <div
                    className={`dropdown ${dropdownActive ? "active" : ""}`}
                    onClick={() => setDropdownActive(!dropdownActive)}
                  >
                    <div className="input-control">
                      <input
                        type="text"
                        className="textBox"
                        value={sortType}
                        readOnly
                        placeholder="Sort by"
                      />
                    </div>
                    <div className={`option ${dropdownActive ? "show" : ""}`}>
                      {["Population", "Name", "Area (km²)"].map((option) => (
                        <div
                          key={option}
                          onClick={() => handleSelectOption(option)}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="region-filters my-5">
                <p>Region</p>
                <label>
                  <input
                    type="checkbox"
                    value="Americas"
                    onChange={handleRegionChange}
                    checked={selectedRegions.includes("Americas")}
                  />
                  Americas
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Antarctic"
                    onChange={handleRegionChange}
                    checked={selectedRegions.includes("Antarctic")}
                  />
                  Antarctic
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Africa"
                    onChange={handleRegionChange}
                    checked={selectedRegions.includes("Africa")}
                  />
                  Africa
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Asia"
                    onChange={handleRegionChange}
                    checked={selectedRegions.includes("Asia")}
                  />
                  Asia
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Europe"
                    onChange={handleRegionChange}
                    checked={selectedRegions.includes("Europe")}
                  />
                  Europe
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Oceania"
                    onChange={handleRegionChange}
                    checked={selectedRegions.includes("Oceania")}
                  />
                  Oceania
                </label>
              </div>
              <div className="status-filters">
                <label>
                  <input
                    type="checkbox"
                    checked={isUNMember}
                    onChange={() => setIsUNMember(!isUNMember)}
                  />
                  Show only UN member countries
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={isIndependent}
                    onChange={() => setIsIndependent(!isIndependent)}
                  />
                  Show only independent countries
                </label>
              </div>
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
                    {sortedFilteredCountries.length > 0 ? (
                      sortedFilteredCountries.map((country, index) => (
                        <div className="country-info-row txt-light" key={index}>
                          <div className="flag-img">
                            <img
                              src={country.flags.svg}
                              alt={`${country.name.common} flag`}
                            />
                          </div>
                          <h4>{country.name.common}</h4>
                          <p>{country.population.toLocaleString()}</p>
                          <p>{country.area.toLocaleString()}</p>
                          <p>{country.region}</p>
                        </div>
                      ))
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
