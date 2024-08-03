import React from "react";
import "../../App.scss";

export default function RateCalculator() {
  return (
    <div className="m-5 p-5">
      <h2>Geochemical Reaction Rate Calculator</h2>
      <ul>
        <li>
          <a className="App-links__item" href="/RateCalculatorOnline">
            <h4>Online Rate Calculator</h4>
          </a>
        </li>
      </ul>

      <br />
      <p>
        This Rate Calculator was kindly provided by Dr. Yilun Zhang and Kevin Tu
        to help fellow students in geochemistry. Please refer to this article
        for details and cite in your publications:
      </p>

      <p className="references">
        Zhang YL, Hu B, Teng YG, Zhu C. (2019) A library of BASIC scripts of
        rate equations for geochemical modeling using ᴘʜʀᴇᴇǫᴄ.{" "}
        <i>Computers & Geosciences</i>, v133,{" "}
        <a
          className="App-links__item"
          href="https://www.sciencedirect.com/science/article/pii/S0098300418311853?via%3Dihub"
        >
          DOI
        </a>
      </p>

      <p>
        Please send comments or corrections to Professor Chen Zhu
        <a className="App-links__item m-2" href="mailto:supcrt@iu.edu">
            supcrt@iu.edu.
          </a>
      </p>

      <br />

      <p>
        This material was partly supported by NSF grant EAR-1926734, the
        endowment for the Haydn Murray Chair, and the Office of the Vice Provost
        for Research of Indiana University.
      </p>

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
