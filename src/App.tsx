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

import PrivateRoute from "./components/PrivateRoute";
import { ROUTES } from "./constants/routes";

function App() {
  /**
   * In general, if the key-value pairs exist then the given value will be true, else
   * false.
   */
  const isAuth = localStorage.getItem("email") ? true : false;
  const isAdmin = localStorage.getItem("isAdmin") ? true : false;

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
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route
              path={ROUTES.SUPCRTBL}
              element={
                <PrivateRoute element={<Supcrtbl />} isAuthorized={isAuth} />
              }
            />
            <Route
              path={ROUTES.PHREEQC}
              element={
                <PrivateRoute element={<PHREEQC />} isAuthorized={isAuth} />
              }
            />

            <Route
              path={ROUTES.COTWO_CALCULATOR}
              element={
                <PrivateRoute
                  element={<CotwoCalculator />}
                  isAuthorized={isAuth}
                />
              }
            />

            <Route
              path={ROUTES.RATE_CALCULATOR}
              element={
                <PrivateRoute
                  element={<RateCalculator />}
                  isAuthorized={isAuth}
                />
              }
            />

            <Route
              path={ROUTES.RATE_SCRIPTS}
              element={
                <PrivateRoute element={<RateScripts />} isAuthorized={isAuth} />
              }
            />

            <Route
              path={ROUTES.H2S_CALCULATOR}
              element={
                <PrivateRoute
                  element={<H2SCalculator />}
                  isAuthorized={isAuth}
                />
              }
            />

            <Route
              path={ROUTES.SUPCRTBL_ONLINE_INPUT_FILE}
              element={
                <PrivateRoute
                  element={<SupcrtbOnlineInputFile />}
                  isAuthorized={isAuth}
                />
              }
            />

            <Route
              path={ROUTES.PHREEQC_ONLINE}
              element={
                <PrivateRoute
                  element={<PhreeqcOnline />}
                  isAuthorized={isAuth}
                />
              }
            />

            <Route
              path={ROUTES.SOLUBILITY_CALCULATOR}
              element={
                <PrivateRoute
                  element={<SolubilityCalculator />}
                  isAuthorized={isAuth}
                />
              }
            />

            <Route
              path={ROUTES.H2S_CALCULATOR_ONLINE}
              element={
                <PrivateRoute
                  element={<H2SCalculatorOnline />}
                  isAuthorized={isAuth}
                />
              }
            />

            <Route
              path={ROUTES.RATE_CALCULATOR_ONLINE}
              element={
                <PrivateRoute
                  element={<RateCalculatorOnline />}
                  isAuthorized={isAuth}
                />
              }
            />

            <Route
              path={ROUTES.AUTH}
              // If user is already logged in, just redirect them back to the home page.
              element={isAuth ? <Navigate to={ROUTES.HOME} /> : <AuthLayout />}
            >
              <Route index element={<Navigate to={ROUTES.LOGIN} />} />
              <Route path={ROUTES.LOGIN} element={<LoginForm />} />
              <Route path={ROUTES.REGISTER} element={<RegistrationForm />} />
              <Route
                path={ROUTES.FORGOT_PASSWORD}
                element={<ForgotPasswordForm />}
              />
            </Route>
            <Route
              path={ROUTES.ADMIN_PAGE}
              element={
                <PrivateRoute
                  element={<AdminPage />}
                  isAuthorized={isAuth && isAdmin}
                />
              }
            />
            <Route path={ROUTES.PRIVACY} element={<PrivacyPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
