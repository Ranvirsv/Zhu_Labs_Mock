import React from "react";
import "../../App.scss";
import { ROUTES } from "../../constants/routes";

const links = [
  {
    name: "Click here to use the online version of ᴘʜʀᴇᴇǫᴄ High T P",
    url: ROUTES.PHREEQC_ONLINE,
  },
  // {
  //   name: "Version 3 Documentation by Parkhurst and Appelo (2013)",
  //   url: "https://pubs.usgs.gov/publication/tm6A43",
  // },
  // {
  //   name: "Example Input Files",
  //   url: "https://www.resolutionmineeis.us/documents/parkhurst-appelo-2013",
  // },
  {
    name: "USGS Software User Rights Notice",
    url: "https://water.usgs.gov/software/help/notice/",
  },
];

/**
 * ### PHREEQC
 *
 * Disclaimer page for the section where users can use PHREEQC software.
 */
export default function PHREEQC() {
  return (
    <div className="m-5 p-5">
      <h2 className="PHREEQC-header">Introduction to ᴘʜʀᴇᴇǫᴄ</h2>
      <div>
        <ul className="App-links">
          {links.map((link) => (
            <li>
              <a className="App-links__item" href={link.url}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5">
        <p className="font-weight-light">
          ᴘʜʀᴇᴇǫᴄ is a geochemical modeling software distributed by the U.S.
          Geological Survey and developed by David Parkhurst and Tony Appelo.
          The version here, modified by David Parkhurst, is capable of
          calculations at elevated temperatures and pressures (up to the T-P
          limits in the accompanying thermodynamic datasets, e.g., 1000 °C and
          5000 bars).
        </p>
        <br />
        <div>
          <p>
            In the pulldown menu, you can find a number of thermodynamic
            datasets, which are documented in:
          </p>
          <p style={{ fontFamily: "Times New Roman", color: "purple" }}>
            Zhang GR, Lu P, Zhang YL, Tu K, *Zhu C (2020) SupPHREEQC: A program
            to generate customized ᴘʜʀᴇᴇǫᴄ thermodynamic database based on
            Supcrtbl. Computer and Geosciences v143.{" "}
            <a
              href="https://www.sciencedirect.com/science/article/abs/pii/S0098300420305501?via%3Dihub"
              style={{ color: "crimson" }}
            >
              <b>DOI</b>
            </a>
          </p>
          <p style={{ fontFamily: "Times New Roman", color: "purple" }}>
            Lu P, Zhang GR, Apps J, *Zhu C. (2022) Comparison of thermodynamic
            data files for PHREEQC. Earth-Science Reviews,{" "}
            <a
              href="https://doi.org/10.1016/j.earscirev.2021.103888"
              style={{ color: "crimson" }}
            >
              <b>DOI</b>
            </a>
          </p>
          <p style={{ fontFamily: "Times New Roman", color: "purple" }}>
            Pan, RG, Gysi A, Migdisov A, Gong L, Lu P, Zhu* C (2024) Linear
            correlations of Gibbs free energy of REE phosphates (monazite,
            xenotime, and rhabdophane) and internally consistent binary mixing
            properties. Minerals 14, 305.{" "}
            <a
              href="https://doi.org/10.3390/min14030305"
              style={{ color: "crimson" }}
            >
              <b>DOI</b>
            </a>
            . <br /> <br /> Pan RG and Zhu C. Linear correlations of Gibbs free
            energy for rare earth element oxide, hydroxide, chloride, fluoride,
            carbonate, and ferrite minerals and crystalline solids. Geochimica
            et Cosmochimica Acta. Submitted May 3, 2024.{" "}
            <a
              href="https://doi.org/10.48550/arXiv.2405.03515"
              style={{ color: "crimson" }}
            >
              <b>DOI</b>
            </a>
          </p>
        </div>
      </div>

      <br />

      <div>
        <h2>DISCLAIMER</h2>
        <p>
          This material was prepared, in part, sponsored by an agency of the
          United States Government or Indiana University. Neither the United
          States Government, nor Indiana University, makes any warranty, express
          or implied, or assumes any legal liability or responsibility for the
          accuracy, completeness, or usefulness of any information, apparatus,
          product, or process disclosed, or represents that its use would not
          infringe privately owned rights.
        </p>
      </div>
    </div>
  );
}
