import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../src/style/App.css";
import { CountryList } from "./components/CountryList";
import { CountryDetail } from "./components/CountryDetail";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<CountryList />} />
            <Route path="/country/:name" element={<CountryDetail />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
