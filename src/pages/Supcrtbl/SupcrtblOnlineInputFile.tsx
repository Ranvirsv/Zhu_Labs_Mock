import React from "react";
import "../../App.scss";

export default function SupcrtbOnlineInputFile() {
  return (
    <div className="m-5 p-5">
      <h2 className="pageHeader">SUPCRTBL ONLINE VERSION 3.0.0</h2>
      <hr />
      <form>
        <div className="form-group">
          <label htmlFor="exampleFileName">
            <b>Output File Name:</b>
          </label>{" "}
          <br />
          <input type="text" className="form-controller" id="exampleFileName" />
        </div>

        <br />

        <div className="form-group">
          <label htmlFor="databaseFile">
            <b>Database File:</b>
          </label>{" "}
          <br />
          <select className="form-controller" id="databaseFile">
            <option value="dpronsbl">supcrtbl.dat</option>
            <option value="dpronsbl_ree">supcrtbl_REE.dat</option>
          </select>
        </div>

        <br />

        <div className="form-group">
          <label htmlFor="solventPhaseRegion">
            <b>Specify solvent phase region:</b>
          </label>
          <br />
          <input
            type="radio"
            name="radioInputs"
            className="form-check-input"
            id="onePhaseRegion"
            value="One-Phase"
          />{" "}
          <label className="form-check-label" htmlFor="onePhaseRegion">
            One-Phase Region
          </label>
          <br />
          <input
            type="radio"
            name="radioInputs"
            className="form-check-input"
            id="liquidVapor"
            value="Liquid-Vapor-Curve"
          />{" "}
          <label className="form-check-label" htmlFor="liquidVapor">
            Liquid Vapor Saturation Curve
          </label>
        </div>

        <br />

        <div className="form-group">
          <label htmlFor="stateVariable">
            <b>Specify indipendent state variable:</b>
          </label>
          <br />
          <input
            type="radio"
            name="radioInputs"
            className="form-check-input"
            id="tempDensity"
          />{" "}
          <label className="form-check-label" htmlFor="tempDensity">
            Temperature (degCel), density(H2O) (g/cc)
          </label>
          <br />
          <input
            type="radio"
            name="radioInputs"
            className="form-check-input"
            id="tempPress"
          />{" "}
          <label className="form-check-label" htmlFor="tempPress">
            Temperature (degCel), pressure (bars)
          </label>
        </div>

        <br />

        <div className="form-group">
          <label htmlFor="liq-vapVariable">
            <b>Specify indipendent liq-vap saturation variable:</b>
          </label>
          <br />
          <input
            type="radio"
            name="radioInputs"
            className="form-check-input"
            id="temp"
            value="Temp"
          />{" "}
          <label className="form-check-label" htmlFor="temp">
            Temperature (degCel)
          </label>
          <br />
          <input
            type="radio"
            name="radioInputs"
            className="form-check-input"
            id="press"
            value="Press"
          />{" "}
          <label className="form-check-label" htmlFor="press">
            Pressure (bars)
          </label>
        </div>

        <br />

        <div className="form-group">
          <label htmlFor="specificReaction">
            <b>Specify Reaction region:</b>
          </label>
          <br />
          <input
            type="radio"
            name="radioInputs"
            className="form-check-input"
            id="existingFile"
          />{" "}
          <label className="form-check-label" htmlFor="existingFile">
            Use existing reaction file
          </label>
          <br />
          <input
            type="radio"
            name="radioInputs"
            className="form-check-input"
            id="newFile"
          />{" "}
          <label className="form-check-label" htmlFor="newFile">
            Build a new reaction file
          </label>
        </div>

        <br />

        <div className="form-group">
          <label htmlFor="reactionFile">
            <b>Reaction File:</b>
          </label>
          <br />
          <input
            type="file"
            className="from-controller-file"
            id="reactionFile"
          />
        </div>

        <br />

        <div className="form-group">
          <label htmlFor="newReactionFile">
            <b>
              Insert reactions here, 1 species per line, empty line between
              reactions Numbers are the stoichiometric coefficient of the
              species. Positive numbers are products and negative numbers are
              reactants, e.g. QUARTZ {"=>"} SiO2,aq:
            </b>
            <p className="text-danger">
              <b>
                -1 QUARTZ <br /> 1 SiO2, aq
              </b>
            </p>
            <textarea className="form-control"></textarea>
          </label>
        </div>

        <br />

        <div className="form-group">
          <label htmlFor="plotOptions">
            <b>Specify option for x-y plot file:</b>
          </label>
          <br />
          <input
            type="radio"
            name="radioInputs"
            className="form-check-input"
            id="noPlotFiles"
            value="No-Plot"
          />{" "}
          <label className="form-check-label" htmlFor="noPlotFiles">
            Do not generate plot files
          </label>
          <br />
          <input
            type="radio"
            name="radioInputs"
            className="form-check-input"
            id="plotFiles"
            value="Get-Plot"
          />{" "}
          <label className="form-check-label" htmlFor="plotFiles">
            Generate plot files in generic format
          </label>
        </div>
      </form>
    </div>
  );
}
