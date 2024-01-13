import React from "react";
import "./NavBar.scss";

export default function NavBar() {
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
        ].map((element) => (
          <li>
            <a className="navBar__itemList__item" href={element.url}>
              {element.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
