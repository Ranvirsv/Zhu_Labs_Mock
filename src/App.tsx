import React from "react";
import "./App.scss";
import iublogo from "./assets/iublogo.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import NavBar from "./components/NavBar/NavBar";
import Supcrtbl from "./pages/Supcrtbl/Supcrtbl";
import PHREEQC from "./pages/PHREEQC/PHREEQC";
import CotwoCalculator from "./pages/CotwoCalculator/CotwoCalculator";
import RateCalculator from "./pages/RateCalculator/RateCalculator";
import RateScripts from "./pages/RateScripts/RateScripts";
import H2SCalculator from "./pages/H2SCalculator/H2SCalculator";
import SupcrtbOnlineInputFile from "./pages/SupcrtblOnlineInputFile/SupcrtblOnlineInputFile";
import PhreeqcOnline from "./pages/PHREEQC/PhreeqcOnline";
import SolubilityCalculator from "./pages/SolubilityCalculator/SolubilityCalculator";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="header d-flex flex-row">
          <img className="header__logo" src={iublogo} alt="IUB LOGO" />
          <div className="header__text text-white p-2">
            <p className="header__text__iub mt-2 h5">
              INDIANA UNIVERSITY BLOOMINGTON
            </p>
          </div>
        </div>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Supcrtbl" element={<Supcrtbl />} />
          <Route path="/PHREEQC" element={<PHREEQC />} />
          <Route path="/CotwoCalculator" element={<CotwoCalculator />} />
          <Route path="/RateCalculator" element={<RateCalculator />} />
          <Route path="/RateScripts" element={<RateScripts />} />
          <Route path="/H2SCalculator" element={<H2SCalculator />} />
          <Route
            path="/SupcrtblOnlineInputFile"
            element={<SupcrtbOnlineInputFile />}
          />
          <Route path="/PhreeqcOnline" element={<PhreeqcOnline />} />
          <Route
            path="/SolubilityCalculator"
            element={<SolubilityCalculator />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
