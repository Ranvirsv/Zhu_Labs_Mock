import React from "react";
import "../../App.scss";

export default function PHREEQC() {
  return (
    <div className="m-5 p-5">
      <h2 className="PHREEQC-header">Introduction to ᴘʜʀᴇᴇǫᴄ</h2>
      <div>
        <ul className="App-links">
          {[
            {
              name: "Click here to use the online version of ᴘʜʀᴇᴇǫᴄ",
              url: "/",
            },
            {
              name: "Version 3 Documentation by Parkhurst and Appelo (2013)",
              url: "https://pubs.usgs.gov/publication/tm6A43",
            },
            {
              name: "Example Input Files",
              url: "https://www.resolutionmineeis.us/documents/parkhurst-appelo-2013",
            },
            {
              name: "USGS Software User Rights Notice",
              url: "https://water.usgs.gov/software/help/notice/",
            },
          ].map((elemnt) => (
            <li>
              <a className="App-links__item" href={elemnt.url}>
                {elemnt.name}
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
            In the pulldown menu, you can find the thermodynamic datasets
            distributed with ᴘʜʀᴇᴇǫᴄ by the USGS. We have added the library of
            BASIC language RATES blocks for about 100 minerals from Zhang et al.
            (2019) into these two datasets:
          </p>
          <ul>
            {["phreeqc-kinetics.dat", "llnl-kinetics.dat"].map((elem) => (
              <li>
                <em>{elem}</em>
              </li>
            ))}
          </ul>
        </div>
        <p>
          We added log K values for related phases in the PHASES block. All else
          in phreeqc.dat and <em>llnl.dat</em> were not changed.
        </p>
        <br />
        <p>
          The following datasets in the pulldown menu are consistent with
          thermodynamic properties in{" "}
          <a className="App-links__item" href="">
            SUPCRTBL
          </a>
        </p>
        <br />
        <div>
          <p>
            diagenesis.dat follows the framework of phreeqc.dat and covers the
            T-P range of 0.01-100 °C at 1 bar and 100-200 °C at <i>P</i>
            <sub>SAT</sub>. More specifically:
          </p>
          <ul>
            <li>
              All mineral, gas, and aqueous species have the analytical formula
              for the log <i>K</i> covering the T-P range of 0.01-100 °C at 1
              bar and 100-200 °C at <i>P</i>
              <sub>SAT</sub>. Note that not all species in <i>phreeqc.dat</i>
              have parameters for calculations above 25 °C.
            </li>
            <li>
              It has molar volume parameters for solids and aqueous species for
              estimating the effect of pressure change on log <i>K</i>
              (suitable up to ~ 1000 bar and 200 °C, cf. Appelo et al., 2014)
            </li>
            <li>
              It contains Peng-Robinson equation parameters, critical
              temperature, pressure, and acentric factor for calculating gas
              fugacity (cf. Appelo et al., 2014);
            </li>
            <li>
              It contains “-gamma” parameters for use of the WATEQ activity
              coefficient equation for concentrated solutions. See the logfile
              for the coverage of ions and gamma values.
            </li>
            <li>
              It uses thermodynamic properties of Si0
              <sub>2</sub>° (aq) from Apps and Spicer (2004) and HSi0
              <sub>3</sub>- from Sverjensky et al. (1997) because they are more
              consistent with the 0-300 °C experimental data.
            </li>
            <li>
              It has a library of BASIC language RATES blocks for about 100
              minerals and Log <i>K</i> for related PHASES.
            </li>
          </ul>
        </div>
        <br />
        <div>
          <p>
            <i>geothermal.dat</i> takes the framework of llnl.dat and covers the
            T-P range of 0.01-100 °C at 1 bar and 100-300 °C at <i>P</i>
            <sub>SAT</sub>. It uses the B-dot equation parameters for activity
            coefficients of aqueous species:
          </p>
          <ul>
            <li>
              It uses thermodynamic properties of SiO2°(aq) from Apps and
              Spycher (2004) and HSiO3- from Sverjensky et al. (1997) because
              they are more consistent with 0-300 °C experimental data.
            </li>
            <li>
              It also has a library of BASIC language RATES blocks for about 100
              minerals and log <i>K</i> for related PHASES.
            </li>
          </ul>
        </div>
        <br />
        <div>
          <p>
            bl*.dat up to 1000 oC and 5 kb with B-dot parameters for NaCl
            dominated solutions
          </p>
          <ul>
            {[
              "bl-0.5kb.dat: 65 – 350 °C, 0.5kb",
              "bl-1kb.dat: 110 – 600 °C, 1kb",
              "bl-2kb.dat: 180 – 940 °C, 2kb",
              "bl-5kb.dat: 300 – 1000 °C, 5kb",
            ].map((elem) => (
              <li>
                {elem}
                <i>{elem}</i>
              </li>
            ))}
          </ul>
        </div>
        <br />
        <p>
          Users can generate databases at P-T ranges of your interest using the
          program{" "}
          <a className="App-links__item" href="">
            SupPʜʀᴇᴇǫᴄ
          </a>
        </p>
        <p>
          Note that we do not advocate any dataset over others. Here we provide
          a utility to facilitate teaching and research.
        </p>
      </div>

      <br />

      <div>
        <h2>REFERENCES</h2>
        <div className="references">
          <p>
            Appelo, C.A.J., Parkhurst, D.L., Post, V.E.A., 2014. Equations for
            calculating hydrogeochemical reactions of minerals and gases such as
            CO2 at high pressures and temperatures. Geochimica et Cosmochimica
            Acta 125, 49-67.
          </p>
          <p>
            Parkhurst, D.L., Appelo, C., 2013. Description of input and examples
            for ᴘʜʀᴇᴇǫᴄ version 3--A computer program for speciation,
            batch-reaction, one-dimensional transport, and inverse geochemical
            calculations. Techniques and Methods 6-A43, U.S. Geological Survey,
            Reston, VA., 497.
          </p>
          <p>
            Miron, G.D., Wagner, T., Kulik, D.A. and Heinrich, C.A. (2016)
            Internally consistent thermodynamic data for aqueous species in the
            system Na–K–Al–Si–O–H–Cl. Geochim. Cosmochim. Acta 187, 41-78.
          </p>
          <p>
            Zimmer, K., Zhang, Y.L., Lu, P., Chen, Y.Y., Zhang, G.R., Dalkilic,
            M. and Zhu, C. (2016) SUPCRTBL: A revised and extended thermodynamic
            dataset and software package of SUPCRT92. Computer and Geosciences
            90:97-111.{" "}
            <a
              className="App-links__item"
              href="https://www.sciencedirect.com/science/article/pii/S0098300416300371?via%3Dihub"
            >
              DOI
            </a>
          </p>
          <p>
            Zhang YL, Hu B, Teng YG, Zhu C (2019) A library of BASIC scripts of
            rate equations for geochemical modeling using ᴘʜʀᴇᴇǫᴄ. Computers &
            Geosciences, v133{" "}
            <a
              className="App-links__item"
              href="https://www.sciencedirect.com/science/article/pii/S0098300418311853?via%3Dihub"
            >
              DOI
            </a>
          </p>
          <p>
            Zhang GR, Lu P, Zhang YL, Tu K, *Zhu C (2020) SupPHREEQC: A program
            to generate customized ᴘʜʀᴇᴇǫᴄ thermodynamic database based on
            Supcrtbl. Computer and Geosciences v143.{" "}
            <a
              className="App-links__item"
              href="https://www.sciencedirect.com/science/article/pii/S0098300420305501?via%3Dihub"
            >
              DOI
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
