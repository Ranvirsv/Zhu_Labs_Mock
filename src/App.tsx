import "./App.scss";
import iublogo from "./assets/iublogo.png";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import AdminPage from "./pages/Admin/AdminPage";
import Footer from "./Footer";
import PrivacyPage from "./pages/Privacy/Privacy";
import AuthLayout from "./pages/Login/AuthLayout";
import LoginForm from "./pages/Login/LoginForm";
import RegistrationForm from "./pages/Login/RegisterForm";
import ForgotPasswordForm from "./pages/Login/ForgotPasswordForm";

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
              element={
                isAuthenticated ? <Supcrtbl /> : <Navigate to="/Auth/Login" />
              }
            />
            <Route
              path="/PHREEQC"
              element={
                isAuthenticated ? <PHREEQC /> : <Navigate to="/Auth/Login" />
              }
            />
            <Route
              path="/CotwoCalculator"
              element={
                isAuthenticated ? (
                  <CotwoCalculator />
                ) : (
                  <Navigate to="/Auth/Login" />
                )
              }
            />
            <Route
              path="/RateCalculator"
              element={
                isAuthenticated ? (
                  <RateCalculator />
                ) : (
                  <Navigate to="/Auth/Login" />
                )
              }
            />
            <Route
              path="/RateScripts"
              element={
                isAuthenticated ? (
                  <RateScripts />
                ) : (
                  <Navigate to="/Auth/Login" />
                )
              }
            />
            <Route
              path="/H2SCalculator"
              element={
                isAuthenticated ? (
                  <H2SCalculator />
                ) : (
                  <Navigate to="/Auth/Login" />
                )
              }
            />
            <Route
              path="/SupcrtblOnlineInputFile"
              element={
                isAuthenticated ? (
                  <SupcrtbOnlineInputFile />
                ) : (
                  <Navigate to="/Auth/Login" />
                )
              }
            />
            <Route
              path="/PhreeqcOnline"
              element={
                isAuthenticated ? (
                  <PhreeqcOnline />
                ) : (
                  <Navigate to="/Auth/Login" />
                )
              }
            />
            <Route
              path="/SolubilityCalculator"
              element={
                isAuthenticated ? (
                  <SolubilityCalculator />
                ) : (
                  <Navigate to="/Auth/Login" />
                )
              }
            />
            <Route
              path="/H2SCalculatorOnline"
              element={
                isAuthenticated ? (
                  <H2SCalculatorOnline />
                ) : (
                  <Navigate to="/Auth/Login" />
                )
              }
            />
            <Route
              path="/RateCalculatorOnline"
              element={
                isAuthenticated ? (
                  <RateCalculatorOnline />
                ) : (
                  <Navigate to="/Auth/Login" />
                )
              }
            />

            <Route
              path="/Auth"
              // If user is already logged in, just redirect them back to the home page.
              element={isAuthenticated ? <Navigate to="/" /> : <AuthLayout />}
            >
              <Route index element={<Navigate to="/Auth/Login" />} />
              <Route path="/Auth/Login" element={<LoginForm />} />
              <Route path="/Auth/Register" element={<RegistrationForm />} />
              <Route
                path="/Auth/ForgotPassword"
                element={<ForgotPasswordForm />}
              />
            </Route>
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
