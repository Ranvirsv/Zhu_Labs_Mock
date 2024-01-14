import React from "react";
import "../../App.scss";

export default function RateScripts() {
  return (
    <div className="m-5 p-5">
      <h2>
        A Library of BASIC Scripts of Rate Equations for Geochemical Modeling
        Using ᴘʜʀᴇᴇǫᴄ
      </h2>
      <br />

      <p>
        This is a library of RATES blocks in BASIC language for the USGS
        geochemical modeling program ᴘʜʀᴇᴇǫᴄ. About 100 minerals and phases are
        included in this library. For documentation and citation, users should
        consult and refer to the article:
      </p>

      <br />

      <p className="references">
        Zhang YL, Hu B, Teng YG, Zhu C (2019) A library of BASIC scripts of rate
        equations for geochemical modeling using ᴘʜʀᴇᴇǫᴄ. Computers &
        Geosciences, v133,{" "}
        <a
          className="App-links__item"
          href="https://www.sciencedirect.com/science/article/pii/S0098300418311853?via%3Dihub"
        >
          DOI
        </a>
      </p>

      <p>
        A companion PHASES block library that is needed to use the RATES scripts
        is also provided. Both RATES and PHASES blocks are included in datasets,
        phreeqc-kinetics.dat, diagenesis.dat, and geothermal.dat which are
        options for online ᴘʜʀᴇᴇǫᴄ. If you just need to know the value of
        reaction rates at a temperature and pH of your interest, you can use the{" "}
        <a className="App-links__item" href="/RateCalculator">
          rate calculator
        </a>
        . All phases in the library are included in the calculator.
      </p>

      <p>
        Kindly report errors to Professor Chen Zhu (supcrt@indiana.edu).
        Tutorials, corrections, and updates may be found at Professor Zhu’s
        research web site{" "}
        <a
          className="App-links__item"
          href="https://hydrogeochem.earth.indiana.edu"
        >
          https://hydrogeochem.earth.indiana.edu
        </a>
      </p>

      <br />

      <div>
        <h2>DOWNLOAD</h2>
        <ul>
          {[
            {
              name: "Download README",
              url: "http://149.165.154.118/basic_scripts/download_files/README.txt",
            },
            {
              name: "Download complete library",
              url: "http://149.165.154.118/basic_scripts/download_files/rate_scripts.zip",
            },
            {
              name: "Link to GitHub",
              url: "https://github.com/HydrogeoIU/PHREEQC-Kinetic-Library",
            },
          ].map((elem) => (
            <li>
              <a className="App-links__item" href={elem.url}>
                {elem.name}
              </a>
            </li>
          ))}
        </ul>

        <p>
          This material was partly supported by NSF grant EAR-1926734, the
          endowment for the Haydn Murray Chair, and the Office of the Vice
          Provost for Research of Indiana University.
        </p>
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
