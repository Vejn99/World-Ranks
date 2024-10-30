import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../src/style/App.css";
import { CountryList } from "./components/CountryList";
import { CountryDetail } from "./components/CountryDetail";

function App() {
  return (
    <>
      <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={<CountryList />} />
            <Route path="/country/:countryName" element={<CountryDetail />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
