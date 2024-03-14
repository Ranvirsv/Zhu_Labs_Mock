import React, { useState } from "react";
import "../../App.scss";
import Form from "react-bootstrap/Form";

interface RadioOption {
  [header: string]: [string, Record<string, string>];
}

interface FormRadioOptions extends Array<RadioOption> {}

export default function SupcrtbOnlineInputFile() {
  const [firstState, setFirstState] = useState("Specify solvent phase region:");
  const [solventPhase, setSolventPhase] = useState("");
  const [liqVapSaturation, setLiqVapSaturation] = useState("");

  const [independentVariable, setInependentVariabl] = useState("");
  const [tabulationOptions, setTabulationOptions] = useState("");
  const [tableIncrement, setTableIncrement] = useState("");
  const [univariantCurve, setUnivariantCurve] = useState("");
  const [univariantCalculation, setUnivariantCalculation] = useState("");

  const [reactionRegion, setReactionRegion] = useState("");
  const [plotOption, setPlotOption] = useState("");

  const resetMap: Record<string, string[]> = {
    "Specify solvent phase region:": [
      "independentVariable",
      "liqVapSaturation",
      "tabulationOptions",
      "tableIncrement",
      "univariantCurve",
      "univariantCalculation",
    ],
    "Specify indipendent state variable:": [
      "liqVapSaturation",
      "tabulationOptions",
      "tableIncrement",
      "univariantCurve",
      "univariantCalculation",
    ],
    "Specify indipendent liq-vap saturation variable:": ["tableIncrement"],
    "Specify tabulation option:": ["tableIncrement", "univariantCalculation"],
    "Would you like to use the univariant curve option? (i.e., calculate T(logK,P) or P(logK,T):":
      ["univariantCalculation", "tableIncrement", "tabulationOptions"],
    "Specify univeriant calculation option:": [
      "Specify table-increment option:",
    ],
    "Specify table-increment option:": [],
  };

  const resetDependentStates = (currentHeader: string) => {
    const dependencies = resetMap[currentHeader];
    if (!dependencies) return;

    dependencies.forEach((dependency) => {
      switch (dependency) {
        case "independentVariable":
          setInependentVariabl("");
          break;
        case "liqVapSaturation":
          setLiqVapSaturation("");
          break;
        case "tabulationOptions":
          setTabulationOptions("");
          break;
        case "tableIncrement":
          setTableIncrement("");
          break;
        case "univariantCurve":
          setUnivariantCurve("");
          break;
        case "univariantCalculation":
          setUnivariantCalculation("");
          break;
      }
    });
  };

  const handleCheckBoxChange = (header: string, keyChange: string): void => {
    if (header === "Specify solvent phase region:") {
      setSolventPhase(keyChange);
    } else if (header === "Specify indipendent state variable:") {
      setInependentVariabl(keyChange);
    } else if (header === "Specify indipendent liq-vap saturation variable:") {
      setLiqVapSaturation(keyChange);
    } else if (header === "Specify tabulation option:") {
      setTabulationOptions(keyChange);
    } else if (header === "Specify Reaction region:") {
      setReactionRegion(keyChange);
    } else if (header === "Specify option for x-y plot file:") {
      setPlotOption(keyChange);
    } else if (header === "Specify independent liq-vap saturation variable:") {
      setLiqVapSaturation(keyChange);
    } else if (header === "Specify table-increment option:") {
      setTableIncrement(keyChange);
    } else if (
      header ===
      "Would you like to use the univariant curve option? (i.e., calculate T(logK,P) or P(logK,T):"
    ) {
      setUnivariantCurve(keyChange);
    } else if (header === "Specify univeriant calculation option:") {
      setUnivariantCalculation(keyChange);
    }
    resetDependentStates(header);
  };

  const formRadioOptions: FormRadioOptions = [
    {
      "Specify solvent phase region:": [
        firstState,
        {
          "One-Phase Region": "Specify indipendent state variable:",
          "Liquid Vapor Saturation Curve":
            "Specify indipendent liq-vap saturation variable:",
        },
      ],
    },
    {
      "Specify indipendent state variable:": [
        solventPhase,
        {
          "Temprature (degCel),  density(H2O) (g/cc)":
            "Specify tabulation option:",
          "Temprature (degCel), pressure (bars)":
            "Would you like to use the univariant curve option? (i.e., calculate T(logK,P) or P(logK,T):",
        },
      ],
    },

    {
      "Specify indipendent liq-vap saturation variable:": [
        solventPhase,
        {
          "Temprature (degCel)": "Specify table-increment option:",
          "Pressure (bars)": "Specify table-increment option:",
        },
      ],
    },
    {
      "Specify tabulation option:": [
        independentVariable,
        {
          "Calculate ISOCHORIC (T) tables": "Specify table-increment option:",
          "Calculate ISOTHERMAL (D) tables": "Specify table-increment option:",
        },
      ],
    },
    {
      "Would you like to use the univariant curve option? (i.e., calculate T(logK,P) or P(logK,T):":
        [
          independentVariable,
          {
            Yes: "Specify univeriant calculation option:",
            No: "Specify tabulation option:",
          },
        ],
    },
    {
      "Specify tabulation option:": [
        univariantCurve,
        {
          "Calculate tables having uniform increments":
            "Specify table-increment option:",
          "Calculate tables having unequal increments":
            "Specify table-increment option:",
        },
      ],
    },
    {
      "Specify univeriant calculation option:": [
        univariantCurve,
        {
          "Calculate T (logK, isobars)": "T",
          "Calculate P (logK, isotherms)": "P",
        },
      ],
    },
    {
      "Specify table-increment option:": [
        tabulationOptions,
        {
          "Calculate tables having uniform increments": "Uniform",
          "Calculate tables having unequal increments": "Unequal",
        },
      ],
    },
    {
      "Specify table-increment option:": [
        liqVapSaturation,
        {
          "Calculate tables having uniform increments": "Uniform",
          "Calculate tables having unequal increments": "Unequal",
        },
      ],
    },
  ];

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
      {formRadioOptions.map((element, index) => {
        const header = Object.keys(element)[0];
        const [currentStateValue, optionsMap] = Object.values(element)[0];

        let shouldDisplay = false;
        if (header === currentStateValue) {
          shouldDisplay = true;
        }

        return shouldDisplay ? (
          <Form key={index} className="my-3">
            <b>{header}</b>
            {Object.entries(optionsMap).map(
              ([optionLabel, nextState], optionIndex) => (
                <Form.Check
                  key={optionIndex}
                  name={header}
                  label={optionLabel}
                  value={optionLabel}
                  id={`${header}-${optionIndex}`}
                  onClick={() => handleCheckBoxChange(header, nextState)}
                  type="radio"
                />
              )
            )}
          </Form>
        ) : null;
      })}

      {reactionRegion === "Use existing reaction file" ? (
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
      ) : reactionRegion === "Build a new file" ? (
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
            handleCheckBoxChange("Specify option for x-y plot file:", "1")
          }
          type="radio"
        />
        <Form.Check
          name="Specify option for x-y plot file:"
          id="Generate plot files in generic format"
          label="Generate plot files in generic format"
          value="Generate plot files in generic format"
          onClick={() =>
            handleCheckBoxChange("Specify option for x-y plot file:", "2")
          }
          type="radio"
        />
      </Form>
    </div>
  );
}
