import React from "react";
import "./App.scss";
import iublogo from "./assets/iublogo.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import NavBar from "./components/NavBar/NavBar";
import Supcrtbl from "./pages/Supcrtbl/Supcrtbl";

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
