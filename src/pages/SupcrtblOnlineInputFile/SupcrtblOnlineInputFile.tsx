import React, { useState } from "react";
import "../../App.scss";
import { FormRadioVals } from "./ISubcrtbl";
import Form from "react-bootstrap/Form";

export default function SupcrtbOnlineInputFile() {
  const [solventPhase, setSolventPhase] = useState<number>(-1);
  const [reactionRegion, setReactionRegion] = useState<number>(-1);
  const [plotOption, setPlotOption] = useState<number>(-1);

  const handleCheckBoxChange = (header: string, keyChange: number): void => {
    if (header === "Specify solvent phase region:") {
      setSolventPhase(keyChange);
    } else if (header === "Specify Reaction region:") {
      setReactionRegion(keyChange);
    } else if (header === "Specify option for x-y plot file:") {
      setPlotOption(keyChange);
    }
  };

  const formRadioOptions: FormRadioVals = {
    "Specify solvent phase region:": [
      "One-Phase Region",
      "Liquid Vapor Saturation Curve",
    ],
    "Specify indipendent state variable:": [
      "Temprature (degCel),  density(H2O) (g/cc)",
      "Temprature (degCel), pressure (bars)",
    ],
    "Specify indipendent liq-vap saturation variable:": [
      "Temprature (degCel)",
      "Pressure (bars)",
    ],
    "Specify Reaction region:": [
      "Use existing reaction file",
      "Build a new file",
    ],
  };

  return (
    <div className="m-5 p-5">
      <h2 className="pageHeader">SUPCRTBL ONLINE VERSION 3.0.0</h2>
      <hr />
      <div className="row my-3">
        <div className="col-2 d-flex flex-column justify-content-center">
          <b>Output File Name:</b>
        </div>
        <div className="col-3">
          <Form.Control type="text" />
        </div>
      </div>

      <div className="row">
        <div className="col-2 d-flex flex-column justify-content-center">
          <b>Database File:</b>
        </div>
        <div className="col-3">
          <Form.Select>
            <option value="dpronsbl">supcrtbl.dat</option>
            <option value="dpronsbl_ree">supcrtbl_REE.dat</option>
          </Form.Select>
        </div>
      </div>
      {Object.keys(formRadioOptions).map((elem, index) =>
        index === 0 ||
        index === solventPhase ||
        index === Object.keys(formRadioOptions).length - 1 ? (
          <Form className="my-3">
            <b>{elem}</b>
            <Form.Check
              name={elem}
              label={formRadioOptions[elem][0]}
              value={formRadioOptions[elem][0]}
              id={formRadioOptions[elem][0]}
              onClick={() => handleCheckBoxChange(elem, 1)}
              type="radio"
            />
            <Form.Check
              name={elem}
              label={formRadioOptions[elem][1]}
              value={formRadioOptions[elem][1]}
              id={formRadioOptions[elem][1]}
              onClick={() => handleCheckBoxChange(elem, 2)}
              type="radio"
            />
          </Form>
        ) : (
          <></>
        )
      )}
      {reactionRegion === 1 ? (
        <div className="form-group">
          <label htmlFor="reactionFile">
            <b>Reaction File:</b>
          </label>
          <input
            type="file"
            className="from-controller-file"
            id="reactionFile"
          />
        </div>
      ) : reactionRegion === 2 ? (
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
      ) : (
        <></>
      )}

      <Form className="my-3">
        <b>Specify option for x-y plot file:</b>
        <Form.Check
          name="Specify option for x-y plot file:"
          id="Do not generate plot files"
          label="Do not generate plot files"
          value="Do not generate plot files"
          onClick={() =>
            handleCheckBoxChange("Specify option for x-y plot file:", 1)
          }
          type="radio"
        />
        <Form.Check
          name="Specify option for x-y plot file:"
          id="Generate plot files in generic format"
          label="Generate plot files in generic format"
          value="Generate plot files in generic format"
          onClick={() =>
            handleCheckBoxChange("Specify option for x-y plot file:", 2)
          }
          type="radio"
        />
      </Form>
    </div>
  );
}
