import "./App.scss";
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";

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
import PrivacyPage from "./pages/Privacy/Privacy";
import AuthLayout from "./layouts/AuthLayout";
import LoginForm from "./pages/Login/LoginForm";
import RegistrationForm from "./pages/Login/RegistrationForm";
import ForgotPasswordForm from "./pages/Login/ForgotPasswordForm";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import { ROUTES } from "./constants/routes";

export default function App() {
  const isAuth = !!localStorage.getItem("email");
  const isAdmin = localStorage.getItem("isAdmin") !== undefined;

  const appRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path={ROUTES.HOME} element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path={ROUTES.SUPCRTB}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Supcrtbl />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.PHREEQC}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <PHREEQC />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.PHREEQC_ONLINE}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <PhreeqcOnline />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.COTWO_CALCULATOR}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <CotwoCalculator />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.RATE_CALCULATOR}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <RateCalculator />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.RATE_CALCULATOR_ONLINE}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <RateCalculatorOnline />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.RATE_SCRIPTS}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <RateScripts />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.H2S_CALCULATOR}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <H2SCalculator />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.SOLUBILITY_CALCULATOR}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <SolubilityCalculator />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.H2S_CALCULATOR_ONLINE}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <H2SCalculatorOnline />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.SUPCRTB_ONLINE_INPUT_FILE}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <SupcrtbOnlineInputFile />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.AUTH}
          // If already authenticated, then redirect to home page. Else go to auth pages.
          element={isAuth ? <Navigate to={ROUTES.HOME} /> : <AuthLayout />}>
          {/* NOTE: When users go to /Auth, then redirect to /Auth/Login */}
          <Route index element={<Navigate to={ROUTES.LOGIN} />} />

          {/* Login, Register, and other pages  */}
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
            <ProtectedRoute
              isAuth={isAuth}
              isAdmin={isAdmin}
              // On the admin page, we're going to require admin privileges to access it
              requireAdmin={true}>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route path={ROUTES.PRIVACY} element={<PrivacyPage />} />
      </Route>
    )
  );

  return <RouterProvider router={appRouter} />;
}
