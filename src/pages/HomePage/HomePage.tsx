import React from "react";
import "./HomePage.scss";
import worldMap from "../../assets/worldMap.jpg";
export default function HomePage() {
  return (
    <div className="p-5 mx-5">
      <h3 className="homeHeader">ONLINE APPLICATIONS</h3>
      <h5 className="subHeading">
        This material is partially based upon work supported by the National
        Science Foundation under Grant EAR-1225733, 1926734; part of broader
        impact activities.
      </h5>
      <br />
      <div className=" d-flex flex-row align-items-center">
        <img className="img-fluid" src={worldMap} alt="" />
        <div className="mapOfUsers w-100">
          <hr />
          <p>
            <b>MAP OF USERS</b>
          </p>
          <p className="w-70">
            Google Analytics recorded more than 2300 users with unique IP
            addresses and ~4000 modeling sessions using these tools and
            databases in the 12 months prior to June 17, 2022.
          </p>
        </div>
      </div>
      <hr />
      <div className="mb-3">
        <a className="linkText" href="/Supcrtbl">
          SUPCRTBL
        </a>
      </div>
      <p>
        A software package used to calculate thermodynamic properties for
        minerals, gases, aqueous species, and reactions at high temperatures and
        pressures. For this version of sᴜᴘᴄʀᴛ (sᴜᴘᴄʀᴛʙʟ), we used a more recent
        mineral database of Holland and Powell (2011) and modified the computer
        code to accommodate the different heat capacity function, volume as a
        function of temperature and pressure, and mineral phase transition using
        the Landau model (Holland and Powell, 1998).
      </p>
      <p>
        We also added more species to the database. For example, we included
        arsenic minerals and aqueous species, aluminum species from Tagirov and
        Schott (2001), aqueous silica from Rimstidt (1997), and dawsonite from
        Benezeth et al. (2007). Please cite{" "}
        <a
          className="linkBetweenPara"
          href="https://dx.doi.org/10.1016/j.cageo.2016.02.013"
        >
          Zimmer et al. (2016)
        </a>{" "}
        sᴜᴘᴄʀᴛʙʟ in your publications if you have used sᴜᴘᴄʀᴛʙʟ in your
        research. The stated temperature and pressure ranges for aqueous species
        are from 1 to 5000 bars and 0° to 1000°C, but the ranges exceed the
        original limits stated for minerals in Johnson et al. (1992), and vary
        for individual species.
      </p>
      <hr />
      <div className="mb-3">
        <a className="linkText" href="/PHREEQC">
          PHREEQC Online
        </a>
      </div>
      <p>
        ᴘʜʀᴇᴇǫᴄ is a geochemical modeling software distributed by the U.S.
        Geological Survey and developed by David Parkhurst and Tony Appelo. It
        is written in the C and C++ programming languages and is designed to
        perform a wide variety of aqueous geochemical modeling calculations.
      </p>
      <p>
        Here, the online version frees users from downloading and installing on
        different computing platforms. Additionally, the code has been modified
        by David Parkhurst to be able to calculate at elevated temperatures and
        pressures. New thermodynamic and kinetics datasets have thermodynamic
        properties that are consistent with those in{" "}
        <a
          className="linkBetweenPara"
          href="https://dx.doi.org/10.1016/j.cageo.2016.02.013"
        >
          Zimmer et al. (2016)
        </a>{" "}
        and a library of BASIC language RATES blocks for about 100 minerals in{" "}
        <a
          className="linkBetweenPara"
          href="https://doi.org/10.1016/j.cageo.2019.104316"
        >
          Zhang et al. (2019)
        </a>
        .
      </p>
      <hr />
      <div className="mb-3">
        <a className="linkText" href="/CotwoCalculator">
          CO₂ Calculator
        </a>
      </div>
      <p>
        An online program to facilitate the calculation of CO₂ solubility in
        pure water and aqueous 0-4.5 mNaCl solutions from 273 to 533K and from 0
        to 2000 bar using the model by Duan, Sun, Zhu, Chou (2006).
      </p>
      <hr />
      <div className="mb-3">
        <b>SUPPHREEQC</b>
      </div>
      <p>
        An interactive program, developed to link sᴜᴘᴄʀᴛʙʟ and ᴘʜʀᴇᴇǫᴄ to
        facilitate modeling at temperatures and pressures suitable for clastic
        and carbonate diagenesis, geological carbon storage, and geothermal
        applications.
        <br />
        Supᴘʜʀᴇᴇǫᴄ converts the log K values of aqueous, mineral, and gas
        species reactions from the output of sᴜᴘᴄʀᴛʙʟ at user-specified
        temperatures and pressures and their associated molar volume parameters
        into the format of the ᴘʜʀᴇᴇǫᴄ database.
        <br />
        Users can generate a database bl-dat at temperature up to 1000 °C and
        pressure up to 5000 bars.
      </p>
      <hr />
      <div className="mb-3">
        <a className="linkText" href="/RateCalculator">
          Rates Calculator
        </a>
      </div>
      <p>
        Calculates far-from-equilibrium dissolution rates at a temperature and
        pH of your interest.
      </p>
      <hr />
      <div className="mb-3">
        <a className="linkText" href="/RateScripts">
          PHREEQC BASIC Rate Scripts
        </a>
      </div>
      <p>
        A library of RATES blocks for about 100 minerals in BASIC scripts. The
        scripts can also be used as templates for writing other rate equations
        users might wish to use.
        <br />
        Both RATES and PHASES blocks are included in data file
        phreeqc-kinetics.dat, llnl-kinetics.dat, diagenesis.dat, and
        geothermal.dat which are options for online ᴘʜʀᴇᴇǫᴄ. If you just need to
        know the value of reaction rates at a temperature and pH of interest,
        you can use the rate calculator below. All phases in the library are
        included in the calculator.
      </p>
      <hr />
      <div className="mb-3">
        <a className="linkText" href="/H2SCalculator">
          H2S Calculator
        </a>
      </div>
      <p>An online program to calculate H2S solubility.</p>
    </div>
  );
}
