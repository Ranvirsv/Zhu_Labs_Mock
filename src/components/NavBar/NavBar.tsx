import "./NavBar.scss";
import { useNavigate } from "react-router";
import { ROUTES } from "../../constants/routes";

/**
 * Links for the navbar. Some links are to other websites, but others are to
 * other pages in our React application.
 */
const navLinks = [
  { name: "Modeling Home", url: "/" },
  {
    name: "Zhu Laboratory",
    url: "https://hydrogeochem.earth.indiana.edu/index.html",
  },
  {
    name: "Publications",
    url: "https://hydrogeochem.earth.indiana.edu/publications/index.html",
  },
  {
    name: "Services",
    url: "https://hydrogeochem.earth.indiana.edu/service/index.html",
  },
  {
    name: "Teaching Resources",
    url: "https://hydrogeochem.earth.indiana.edu/teaching-resources/index.html",
  },
  {
    name: "Login",
    url: ROUTES.LOGIN,
  },
  {
    name: "Admin",
    url: "/AdminPage",
  },
];

/**
 * ### NavBar
 * This component renders the navigation bar for our application.
 * It conditionally displays certain items based on user's authentication status and admin rights, which
 * are stored in 'localStorage'.
 *
 * ### State and Behavior
 * - `isAuthenticated`: Determines whether a user is logged in, based on the presence of an "email" in localStorage.
 * - `adminRights`: Obtained in the Login page. If this value is the user's email (to make it simple, if it's defined) then
 *    they're an admin. Else, this is undefined, meaning the user is not defined.
 */
export default function NavBar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("email");
  const adminRights = localStorage.getItem("isAdmin");

  /**
   * Clears authentication data from localStorage and redirects the user to the login page.
   */
  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("isAdmin");
    navigate(ROUTES.LOGIN);
  };

  return (
    <nav className="navBar navbar-expand-lg">
      <ul className="navBar__itemList">
        {navLinks.map((link) =>
          /**
           * + Conditional rendering:
           * - If the user is logged in and we're rendering the login link:
           *   Then render a logout link.
           * - Else if, they aren't an admin and we're rendering the admin link:
           *   Render nothing.
           * - Else, for all other links, render them like normal
           */
          isAuthenticated && link.name === "Login" ? (
            <li>
              <p className="navBar__itemList__item" onClick={logout}>
                Log out
              </p>
            </li>
          ) : !adminRights && link.name === "Admin" ? (
            <></>
          ) : (
            <li>
              <a className="navBar__itemList__item" href={link.url}>
                {link.name}
              </a>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}
