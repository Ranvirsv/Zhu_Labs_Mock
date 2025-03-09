import { ReactElement } from "react";
import { Navigate } from "react-router";
import { ROUTES } from "../constants/routes";
interface PrivateRouteProps {
  element: ReactElement;
  isAuthorized: boolean;
}

/**
 * ### ProtectedRoute
 * Component used to help ensure some react-router routes are only accessible
 * with the correct level of authorization e.g. authentication, admin status, etc.
 *
 * ### Parameters
 * - element: React element representing the route component the user wants to access.
 * - isAuthorized: A boolean indicating whether or not the user has permission to access this route
 */
export default function PrivateRoute({
  element,
  isAuthorized,
}: PrivateRouteProps) {
  return isAuthorized ? element : <Navigate to={ROUTES.LOGIN} replace={true} />;
}
