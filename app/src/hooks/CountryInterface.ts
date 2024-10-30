interface CountryName {
  common: string;
  official: string;
}

interface CountryFlags {
  png: string;
  svg: string;
}

interface CountryLanguages {
  [code: string]: string; // Language code to name mapping
}

interface CountryCurrencies {
  [code: string]: { name: string; symbol: string }; // Currency code to name and symbol mapping
}

export interface CountryInterface {
  name: CountryName; // Name of the country
  flags: CountryFlags; // Flags of the country
  population: number; // Population of the country
  capital: string; // Capital city
  area: number; // Area in square kilometers
  region: string; // Main region (e.g., Asia, Europe)
  subregion: string; // More specific subregion
  independent: boolean; // Whether the country is independent
  unMember: boolean; // Whether the country is a UN member
  languages: CountryLanguages; // Languages spoken in the country
  currencies: CountryCurrencies; // Currencies used
  continents: string[]; // Continents the country belongs to
  borders: string[]; // neighboring country codes
  cca3: string; // three-letter country code
}
