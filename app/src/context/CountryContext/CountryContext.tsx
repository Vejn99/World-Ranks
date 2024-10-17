import { createContext, useContext } from "react";
import { CountryCtxValue } from "./CountryInterface";

export const CountryContext = createContext({} as CountryCtxValue);

export const useCountryContext = () => useContext(CountryContext);
