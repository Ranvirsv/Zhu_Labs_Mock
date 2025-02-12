import React from "react";
import "../../App.scss";

/**
 * Disclaimer page for the H2S solubility calculator.
 */
export default function H2SCalculator() {
  return (
    <div className="m-5 p-5">
      <h2>H2S SOLUBILITY CALCULATOR</h2>
      <ul>
        <li>
          <a className="App-links__item" href="/H2SCalculatorOnline">
            <h4>
              Online <i>H</i>
              <sub>2</sub>
              <i>S</i> Calculator
            </h4>
          </a>
        </li>
      </ul>

      <p>An online program to calculate H2S solubility.</p>

      <br />

      <p className="references">
        A model for the calculation of H2S solubility in aqueous solutions.
      </p>

      <br />

      <p>Please refer the following article when you use this tool:</p>

      <p className="references">
        i X, Zhu C (2013) Predicting possible effects of H2S impurity on CO2
        transportation and geological storage. Environmental Science &
        Technology 47: 55-62, doi: 10.1021/es301292n{" "}
        <a
          className="App-links__item"
          href="https://pubs.acs.org/doi/10.1021/es301292n"
        >
          DOI
        </a>
      </p>

      <p className="references">
        Ji X, Zhu C (2012) A SAFT Equation of State for the Quaternary
        H2S-CO2-H2O-NaCl system. Geochimica et Cosmochimica Acta 91: 40–59, doi:
        10.1016/j.gca.2012.05.023P{" "}
        <a
          className="App-links__item"
          href="https://www.sciencedirect.com/science/article/pii/S0016703712003109?via%3Dihub"
        >
          DOI
        </a>
      </p>

      <p>
        Please send comments or corrections to Professor Xiaoyan Ji
        (https://www.ltu.se/staff/x/xiajix-1.33890?l=en).
      </p>

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
