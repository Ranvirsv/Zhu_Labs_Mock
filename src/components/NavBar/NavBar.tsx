import React from "react";
import "./NavBar.scss";
import { useNavigate } from "react-router";

export default function NavBar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("email");
  const adminRigths = localStorage.getItem("isAdmin");
  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("isAdmin");
    navigate("/Login");
  };
  return (
    <nav className="navBar navbar-expand-lg">
      <ul className="navBar__itemList">
        {[
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
            name: "Serivces",
            url: "https://hydrogeochem.earth.indiana.edu/service/index.html",
          },
          {
            name: "Teaching Resources",
            url: "https://hydrogeochem.earth.indiana.edu/teaching-resources/index.html",
          },
          {
            name: "Login",
            url: "/Login",
          },
          {
            name: "Admin",
            url: "/AdminPage",
          },
        ].map((element) =>
          isAuthenticated && element.name === "Login" ? (
            <li>
              <p className="navBar__itemList__item" onClick={logout}>
                LogOut
              </p>
            </li>
          ) : !adminRigths && element.name === "Admin" ? (
            <></>
          ) : (
            <li>
              <a className="navBar__itemList__item" href={element.url}>
                {element.name}
              </a>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}
