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
import H2SCalculatorOnline from "./pages/H2SCalculator/H2SCalculatorOnline";
import RateCalculatorOnline from "./pages/RateCalculator/RateCalculatorOnline";
import Login from "./pages/Login/Login";
import AdminPage from "./pages/Admin/AdminPage";
import Footer from "./Footer";
import PrivacyPage from "./pages/Privacy/Privacy";

function App() {
  const isAuthenticated = localStorage.getItem("email");
  const adminRights = localStorage.getItem("isAdmin");
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
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/Supcrtbl"
              element={isAuthenticated ? <Supcrtbl /> : <Login />}
            />
            <Route
              path="/PHREEQC"
              element={isAuthenticated ? <PHREEQC /> : <Login />}
            />
            <Route
              path="/CotwoCalculator"
              element={isAuthenticated ? <CotwoCalculator /> : <Login />}
            />
            <Route
              path="/RateCalculator"
              element={isAuthenticated ? <RateCalculator /> : <Login />}
            />
            <Route
              path="/RateScripts"
              element={isAuthenticated ? <RateScripts /> : <Login />}
            />
            <Route
              path="/H2SCalculator"
              element={isAuthenticated ? <H2SCalculator /> : <Login />}
            />
            <Route
              path="/SupcrtblOnlineInputFile"
              element={isAuthenticated ? <SupcrtbOnlineInputFile /> : <Login />}
            />
            <Route
              path="/PhreeqcOnline"
              element={isAuthenticated ? <PhreeqcOnline /> : <Login />}
            />
            <Route
              path="/SolubilityCalculator"
              element={isAuthenticated ? <SolubilityCalculator /> : <Login />}
            />
            <Route
              path="/H2SCalculatorOnline"
              element={isAuthenticated ? <H2SCalculatorOnline /> : <Login />}
            />
            <Route
              path="/RateCalculatorOnline"
              element={isAuthenticated ? <RateCalculatorOnline /> : <Login />}
            />
            <Route
              path="/Login"
              element={isAuthenticated ? <HomePage /> : <Login />}
            />
            <Route
              path="/AdminPage"
              element={isAuthenticated && adminRights ? <AdminPage /> : <></>}
            />
            <Route path="/Privacy" element={<PrivacyPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
