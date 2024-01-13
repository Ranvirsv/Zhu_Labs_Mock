import React from "react";
import "./NavBar.scss";

export default function NavBar() {
  return (
    <nav className="navBar navbar-expand-lg">
      <ul className="navBar__itemList">
        {[
          "Modeling Home",
          "Zhu Laboratory",
          "Publications",
          "Serivces",
          "Teaching Resources",
        ].map((element) => (
          <li className="navBar__itemList__item">{element}</li>
        ))}
      </ul>
    </nav>
  );
}
