// Probably pass in some parameters on whether they're logged in or an admin.

import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

interface ProtectedRouteProps {
  isAuth: boolean;
  isAdmin?: boolean;
  requireAdmin?: boolean;
  children: ReactNode;
}

/**
 * ### ProtectedRoute
 * Component that wraps around a route to protect it from unauthorized access.
 * This allows us to create routes where only authenticated users can access or
 * only admin users can access.
 *
 * ### Parameters
 * - isAuth: Boolean indicating whether the user accessing the route is authenticated or not.
 * - isAdmin: Boolean indicating whether the user is an administrator or not.
 * - requireAdmin: Whether accessing this route requires admin privileges
 * - children: React Node representing the route that's being protected.
 */
export default function ProtectedRoute({
  isAuth,
  isAdmin = false,
  requireAdmin = false,
  children,
}: ProtectedRouteProps) {
  const location = useLocation();

  // If they aren't authenticated, then redirect to the login page
  if (!isAuth) {
    return (
      <Navigate
        to="/Auth/Login"
        replace={true}
        state={{ from: location.pathname }}
      />
    );
  }

  // If you need to be an admin to access the route, and you aren't an admin, then redirect!
  if (requireAdmin && !isAdmin) {
    return (
      <Navigate
        to="/Unauthorized"
        replace={true}
        state={{ from: location.pathname }}
      />
    );
  }

  return <>{children}</>;
}
