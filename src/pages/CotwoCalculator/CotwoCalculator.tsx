import "../../App.scss";

/**
 * ### CotwoCalculator (Co2 Calculator)
 *
 * This component renders the introduction or disclaimer page for the Co2 calculator.
 */
export default function CotwoCalculator() {
  return (
    <div className="m-5 p-5">
      <h2>CO2 SOLUBILITY CALCULATOR</h2>
      <ul>
        <li>
          <a className="App-links__item" href="/SolubilityCalculator">
            <h4>Online CO2 Solubility Calculator</h4>
          </a>
        </li>
      </ul>
      <br />

      <p>
        An online program to calculate CO2 solubility in pure water and aqueous
        NaCl solutions (0-4.5 m) from 273 to 533K and from 0 to 2000 bar. The
        FORTRAN code is written by Sun Rui, now a professor at Northwest
        University in China. Please refer to the article below for further
        details and to cite in your publications:
      </p>

      <br />

      <p className="references">
        Duan ZH, Sun R, Zhu Chen, Chou I-M (2006) An improved model for the
        calculation of CO2 solubility in aqueous solutions containing Na+, K+,
        Ca2+, Mg2+, Cl−, and SO42− Marine Chemistry 98 (2-4):131-139,{" "}
        <a
          className="App-links__item"
          href="https://www.sciencedirect.com/science/article/pii/S0304420305001118?via%3Dihub"
        >
          DOI
        </a>
      </p>

      <br />

      <p>
        Please send comments or corrections to Professor Chen Zhu
        <a className="App-links__item m-2" href="mailto:supcrt@iu.edu">
          supcrt@iu.edu.
        </a>
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
