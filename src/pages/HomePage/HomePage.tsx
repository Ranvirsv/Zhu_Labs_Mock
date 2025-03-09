import React, { useState } from "react";
import "./HomePage.scss";
import Modal from "react-bootstrap/Modal";
import worldMap from "../../assets/worldMap.jpg";
import { ROUTES } from "../../constants/routes";
/**
 * ### HomePage
 *
 * Component to show the home page of the website.
 *
 * ### State and Behavior
 * - `show`: Boolean indicating whether the modal is rendered.
 */
export default function HomePage() {
  const [show, setShow] = useState(true);

  // Closes the modal
  const handleClose = () => setShow(false);

  return (
    <div className="p-5 mx-5">
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>DISCLAIMER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The preparation of this material was, in part, sponsored by an agency
          of the United States Government or Indiana University. Neither the
          United States Government, nor Indiana University, makes any warranty,
          express or implied, or assumes any legal liability or responsibility
          for the accuracy, completeness, or usefulness of any information,
          apparatus, product, or process disclosed, or represents that its use
          would not infringe privately owned rights. {<br />} {<br />}For
          additional information, contact
          <a className="App-links__item m-2" href="mailto:supcrt@iu.edu">
            supcrt@iu.edu.
          </a>
        </Modal.Body>
      </Modal>
      <h3 className="homeHeader">ONLINE APPLICATIONS</h3>
      <h5 className="subHeading">
        This material is partially based upon work supported by the National
        Science Foundation under Grant EAR-1225733, 1926734, 2242907; part of
        broader impact activities.
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
            Google Analytics recorded more than ~7000 visitors with unique IP
            addresses from 89 countries in the past two years.
          </p>
        </div>
      </div>
      <hr />
      <div className="mb-3">
        <a className="linkText" href={ROUTES.SUPCRTBL}>
          SUPCRTBL
        </a>
      </div>
      <p>
        A software package used to calculate thermodynamic properties for
        minerals, gases, aqueous species, and reactions at high temperatures and
        pressures. For this version of sᴜᴘᴄʀᴛ (sᴜᴘᴄʀᴛʙʟ), we used the mineral
        database of Holland and Powell (2011) and modified the computer code to
        accommodate the different heat capacity function, volume as a function
        of temperature and pressure, and mineral phase transition using the
        Landau model (Holland and Powell, 1998). We also added more species to
        the database. For example, we included rare earth element solids from
        Pan, Zhu, and others (2024), arsenic minerals and aqueous species,
        aluminum species from Tagirov and Schott (2001), aqueous silica from
        Rimstidt (1997), and dawsonite from Benezeth et al. (2007). Please cite
        Zimmer et al. (2016) in your publications if you have used sᴜᴘᴄʀᴛʙʟ in
        your research. The stated temperature and pressure ranges for aqueous
        species are from 1 to 5000 bars and 0° to 1000°C, but the ranges exceed
        the original limits stated for minerals in Johnson et al. (1992) and
        vary for individual species.
      </p>

      <hr />
      <div className="mb-3">
        <a className="linkText" href={ROUTES.PHREEQC}>
          PHREEQC High P-T
        </a>
      </div>
      <p>
        ᴘʜʀᴇᴇǫᴄ is a geochemical modeling software distributed by the U.S.
        Geological Survey and developed by David Parkhurst and Tony Appelo. It
        is designed to perform a wide variety of aqueous geochemical modeling
        calculations.
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
        . Furthermore, databases for high temperature and pressure are available
        for calculations up to 1000<sup>o</sup>C and 5000 bars (
        <a
          className="linkBetweenPara"
          href="https://www.sciencedirect.com/science/article/pii/S0098300420305501?via%3Dihub"
        >
          Zhang et al., 2020{" "}
        </a>{" "}
        SupPhreeqc: A program to generate customized Phreeqc thermodynamic
        database based on Supcrtbl. Computers & Geosciences. v143. ).
      </p>
      <hr />
      <div className="mb-3">
        <a className="linkText" href={ROUTES.COTWO_CALCULATOR}>
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
        <a className="linkText" href={ROUTES.RATE_CALCULATOR}>
          Rates Calculator
        </a>
      </div>
      <p>
        Calculates far-from-equilibrium dissolution rates at a temperature and
        pH of your interest.
      </p>
      <hr />
      <div className="mb-3">
        <a className="linkText" href={ROUTES.RATE_SCRIPTS}>
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
        geothermal.dat options for online ᴘʜʀᴇᴇǫᴄ. If you just need to know the
        value of reaction rates at a temperature and pH of interest, you can use
        the rate calculator below. All phases in the library are included in the
        calculator.
      </p>

      <hr />
      <div className="mb-3">
        <a className="linkText" href={ROUTES.H2S_CALCULATOR}>
          H<sub>2</sub>S Calculator
        </a>
      </div>
      <p>An online program to calculate H2S solubility.</p>

      {/* For the future */}
      {/* <hr />
      <div className="mb-3">
        <a className="linkText" href="/">
          CH<sub>4</sub> Calculator
        </a>
      </div> */}
    </div>
  );
}
