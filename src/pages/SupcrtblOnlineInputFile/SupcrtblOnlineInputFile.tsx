import React, { FormEvent, useState } from "react";
import "../../App.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { headerNameMap, headerValueMap, resetMap } from "./Constants";

interface RadioOption {
  [header: string]: [boolean, Record<string, boolean>];
}

interface StateOption {
  [key: string]: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormRadioOptions extends Array<RadioOption> {}

export default function SupcrtbOnlineInputFile() {
  // Sub-options for "Specify solvent phase region:"
  const [isOnePhaseRegionSelected, setIsOnePhaseRegionSelected] =
    useState(false);
  const [
    isLiquidVaporSaturationCurveSelected,
    setIsLiquidVaporSaturationCurveSelected,
  ] = useState(false);

  // Sub-options for "Specify independent state variable:"
  const [isTemperatureDensitySelected, setIsTemperatureDensitySelected] =
    useState(false);
  const [isTemperaturePressureSelected, setIsTemperaturePressureSelected] =
    useState(false);

  // Sub-options for "Specify independent liq-vap saturation variable:"
  const [isTemperatureSelected, setIsTemperatureSelected] = useState(false);
  const [isPressureSelected, setIsPressureSelected] = useState(false);

  // Sub-options for "Specify tabulation option:"
  const [isCalculateIsochoricSelected, setIsCalculateIsochoricSelected] =
    useState(false);
  const [isCalculateIsothermalSelected, setIsCalculateIsothermalSelected] =
    useState(false);
  const [isCalculateIsoBaricSelected, setIsCalculateIsoBaricSelected] =
    useState(false);

  // Sub-options for "Would you like to use the univariant curve option?"
  const [isUnivariantCurveYesSelected, setIsUnivariantCurveYesSelected] =
    useState(false);
  const [isUnivariantCurveNoSelected, setIsUnivariantCurveNoSelected] =
    useState(false);

  // Sub-options for "Specify univariant calculation option:"
  const [isCalculateTSelected, setIsCalculateTSelected] = useState(false);
  const [isCalculatePSelected, setIsCalculatePSelected] = useState(false);

  // Sub-options for "Specify table-increment option:"
  const [isUniformIncrementSelected, setIsUniformIncrementSelected] =
    useState(false);
  const [isUnequalIncrementSelected, setIsUnequalIncrementSelected] =
    useState(false);

  // Plot Option
  const [plotOption, setPlotOption] = useState(false);
  const [reactionFileOption, setReactionFileOption] = useState<number>(-1);

  const resetDependentStates = (currentHeader: string) => {
    const dependencies = resetMap[currentHeader];
    if (!dependencies) return;

    dependencies.forEach((dependency) => {
      switch (dependency) {
        case "isLiquidVaporSaturationCurveSelected":
          setIsLiquidVaporSaturationCurveSelected(false);
          break;
        case "isOnePhaseRegionSelected":
          setIsOnePhaseRegionSelected(false);
          break;
        case "isTemperatureDensitySelected":
          setIsTemperatureDensitySelected(false);
          break;
        case "isTemperaturePressureSelected":
          setIsTemperaturePressureSelected(false);
          break;
        case "isTemperatureSelected":
          setIsTemperatureSelected(false);
          break;
        case "isPressureSelected":
          setIsPressureSelected(false);
          break;
        case "isCalculateIsochoricSelected":
          setIsCalculateIsochoricSelected(false);
          break;
        case "isCalculateIsothermalSelected":
          setIsCalculateIsothermalSelected(false);
          break;
        case "isCalculateIsoBaricSelected":
          setIsCalculateIsoBaricSelected(false);
          break;
        case "isUnivariantCurveYesSelected":
          setIsUnivariantCurveYesSelected(false);
          break;
        case "isUnivariantCurveNoSelected":
          setIsUnivariantCurveNoSelected(false);
          break;
        case "isCalculateTSelected":
          setIsCalculateTSelected(false);
          break;
        case "isCalculatePSelected":
          setIsCalculatePSelected(false);
          break;
        case "isUniformIncrementSelected":
          setIsUniformIncrementSelected(false);
          break;
        case "isUnequalIncrementSelected":
          setIsUnequalIncrementSelected(false);
          break;
      }
    });
  };

  const handleCheckBoxChange = (option: string, isSelected: boolean): void => {
    // Map option strings to state setters
    const optionStateSetters: StateOption = {
      "One-Phase Region": setIsOnePhaseRegionSelected,
      "Liquid Vapor Saturation Curve": setIsLiquidVaporSaturationCurveSelected,
      "Temprature (degCel), density(H2O) (g/cc)":
        setIsTemperatureDensitySelected,
      "Temprature (degCel)": setIsTemperatureSelected,
      "Pressure (bars)": setIsPressureSelected,
      "Temprature (degCel), pressure (bars)": setIsTemperaturePressureSelected,
      "Calculate ISOCHORIC (T) tables": setIsCalculateIsochoricSelected,
      "Calculate ISOTHERMAL (D) tables": setIsCalculateIsothermalSelected,
      "Calculate ISOBARIC (P) tables": setIsCalculateIsoBaricSelected,
      Yes: setIsUnivariantCurveYesSelected,
      No: setIsUnivariantCurveNoSelected,
      "Calculate T (logK, isobars)": setIsCalculateTSelected,
      "Calculate P (logK, isotherms)": setIsCalculatePSelected,
      "Calculate tables having uniform increments":
        setIsUniformIncrementSelected,
      "Calculate tables having unequal increments":
        setIsUnequalIncrementSelected,
    };

    if (optionStateSetters[option]) {
      optionStateSetters[option](isSelected);
      if (isSelected) {
        resetDependentStates(option);
      }
    } else {
      console.warn("Unhandled option in handleCheckBoxChange:", option);
    }
  };

  const formRadioOptions: FormRadioOptions = [
    {
      "Specify solvent phase region:": [
        true,
        {
          "One-Phase Region": true,
          "Liquid Vapor Saturation Curve": true,
        },
      ],
    },
    {
      "Specify independent State Variables:": [
        isOnePhaseRegionSelected,
        {
          "Temprature (degCel), density(H2O) (g/cc)": true,
          "Temprature (degCel), pressure (bars)": true,
        },
      ],
    },
    {
      "Specify tabulation option(Chronic, Thermal):": [
        isTemperatureDensitySelected,
        {
          "Calculate ISOCHORIC (T) tables": true,
          "Calculate ISOTHERMAL (D) tables": true,
        },
      ],
    },
    {
      "Would you like to use the univariant curve option? (i.e., calculate T(logK,P) or P(logK,T):":
        [
          isTemperaturePressureSelected,
          {
            Yes: true,
            No: true,
          },
        ],
    },
    {
      "Specify univariant calculation option:": [
        isUnivariantCurveYesSelected,
        {
          "Calculate T (logK, isobars)": true,
          "Calculate P (logK, isotherms)": true,
        },
      ],
    },
    {
      "Specify tabulation option(Baric, Thermal):": [
        isUnivariantCurveNoSelected,
        {
          "Calculate ISOBARIC (P) tables": true,
          "Calculate ISOTHERMAL (D) tables": true,
        },
      ],
    },
    {
      "Specify independent liq-vap saturation variable:": [
        isLiquidVaporSaturationCurveSelected,
        {
          "Temprature (degCel)": true,
          "Pressure (bars)": true,
        },
      ],
    },
    {
      "Specify table-increment option:": [
        isCalculateIsothermalSelected ||
          isCalculateIsochoricSelected ||
          isCalculateIsoBaricSelected ||
          isTemperatureSelected ||
          isPressureSelected,
        {
          "Calculate tables having uniform increments": true,
          "Calculate tables having unequal increments": true,
        },
      ],
    },
  ];

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {};

  return (
    <div className="m-5 p-5">
      <h2 className="pageHeader">SUPCRTBL ONLINE VERSION 3.0.0</h2>
      <hr />

      <Form
        action="http://149.165.154.118/supcrtbl/supcrtbl3.php"
        method="post"
        encType="multipart/form-data"
      >
        <Form.Group className="mb-3" controlId="outputFileName">
          <Form.Label>Output File Name:</Form.Label>
          <Form.Control required type="text" name="outputFile" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="databaseFile">
          <Form.Label>Database File:</Form.Label>
          <Form.Select name="slopFile" defaultValue="dpronsbl">
            <option value="dpronsbl">supcrtbl.dat</option>
            <option value="dpronsbl_ree">supcrtbl_REE.dat</option>
          </Form.Select>
        </Form.Group>

        {formRadioOptions?.map((element, index) => {
          const header = Object.keys(element)[0];
          const [currentStateValue, optionsMap] = Object.values(element)[0];

          let shouldDisplay = false;
          if (currentStateValue) {
            shouldDisplay = true;
          }

          return shouldDisplay ? (
            <Form.Group key={index} className="my-3">
              <Form.Label className="text-bold">{header}</Form.Label>
              {Object.entries(optionsMap)?.map(
                ([optionLabel, _], optionIndex) => (
                  <Form.Check
                    key={optionIndex}
                    name={headerNameMap[header]}
                    label={optionLabel}
                    id={`${header}-${optionIndex}`}
                    value={headerValueMap[optionLabel]}
                    onClick={() => {
                      handleCheckBoxChange(optionLabel, true);
                    }}
                    required
                    type="radio"
                  />
                )
              )}
            </Form.Group>
          ) : (
            <></>
          );
        })}

        {isLiquidVaporSaturationCurveSelected && (
          <>
            {isPressureSelected && (
              <>
                {isUnequalIncrementSelected && (
                  <Form.Group>
                    <Form.Label>
                      Specify liq-vap saturation PRES (bars) values: <br /> One
                      per line, concluding with 0
                    </Form.Label>
                    <Form.Control
                      name="lipVapSatPresVal"
                      as="textarea"
                    ></Form.Control>
                  </Form.Group>
                )}
                {isUniformIncrementSelected && (
                  <Form.Group>
                    <Form.Label>
                      Specify PRES (bars) range:
                      <br />
                      min, max, increment
                    </Form.Label>
                    <Form.Control type="text" name="presRange"></Form.Control>
                  </Form.Group>
                )}
              </>
            )}
            {isTemperatureSelected && (
              <>
                {isUniformIncrementSelected && (
                  <Form.Group>
                    <Form.Label>
                      Specify TEMP (degCel) range: <br />
                      min, max, increment
                    </Form.Label>
                    <Form.Control type="text" name="tempRange"></Form.Control>
                  </Form.Group>
                )}
                {isUnequalIncrementSelected && (
                  <Form.Group>
                    <Form.Label>
                      Specify liq-vap saturation TEMP (degCel) values: <br />
                      One per line, concluding with 0
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="lipVapSatTempVal"
                    ></Form.Control>
                  </Form.Group>
                )}
              </>
            )}
          </>
        )}

        {isTemperatureDensitySelected && (
          <>
            {isCalculateIsochoricSelected && isUniformIncrementSelected && (
              <div className="col my-3">
                <Form.Group className="mb-3" controlId="isochoresRange">
                  <Form.Label>
                    ISOCHORES Range (g/cc): min, max, increment
                  </Form.Label>
                  <Form.Control required type="text" name="isochoresRange" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="tempRange">
                  <Form.Label>
                    TEMP Range (degCel): min, max, increment
                  </Form.Label>
                  <Form.Control required type="text" name="tempRange" />
                </Form.Group>
              </div>
            )}

            {isCalculateIsochoricSelected && isUnequalIncrementSelected && (
              <div className="row my-3">
                <Form.Group className="mb-3" controlId="dH2OTempPairs">
                  <Form.Label>
                    Specify DH2O(g/cc), TEMP (degCel) value pairs: <br />
                    One pair per line, ending with 0,0
                  </Form.Label>
                  <Form.Control required as="textarea" name="dH2OTempPairs" />
                </Form.Group>
              </div>
            )}

            {isCalculateIsothermalSelected && isUniformIncrementSelected && (
              <div className="col my-3">
                <Form.Group className="mb-3" controlId="isothermsRange">
                  <Form.Label>
                    Specify ISOTHERMS (degCel) range: <br />
                    min, max, increment
                  </Form.Label>
                  <Form.Control required type="text" name="isothermsRange" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="dH2ORange">
                  <Form.Label>
                    Specify DH2O (g/cc) range: <br />
                    min, max, increment
                  </Form.Label>
                  <Form.Control required type="text" name="dH2ORange" />
                </Form.Group>
              </div>
            )}

            {isCalculateIsothermalSelected && isUnequalIncrementSelected && (
              <Form.Group className="mb-3" controlId="tempDH2OPairs">
                <Form.Label>
                  Specify TEMP (degCel), DH2O(g/cc) value pairs: <br />
                  One pair per line, ending with 0,0
                </Form.Label>
                <Form.Control required as="textarea" name="tempDH2OPairs" />
              </Form.Group>
            )}
          </>
        )}

        {isTemperaturePressureSelected && (
          <>
            {isUnivariantCurveYesSelected && (
              <>
                {isCalculateTSelected && (
                  <div>
                    <Form.Group>
                      <Form.Label>
                        Specify ISOBARS(bars) range: <br />
                        min, max, increment
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="isobarsRange"
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        Specify logK range: <br />
                        Kmin, Kmax, Kincrement
                      </Form.Label>
                      <Form.Control type="text" name="logKRange" />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        Specify bounding TEMP (degCel) range: <br />T min, T max
                      </Form.Label>
                      <Form.Control type="text" name="logKBoundingTempRange" />
                    </Form.Group>
                  </div>
                )}
                {isCalculatePSelected && (
                  <div className="my-3">
                    <Form.Group>
                      <Form.Label>
                        Specify ISOTHERMS (degCel) range: <br />
                        min, max, increment
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="isothermsRange"
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        Specify logK range: <br />
                        Kmin, Kmax, Kincrement
                      </Form.Label>
                      <Form.Control type="text" name="logKRange" />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        Specify bounding PRES (bars) range: <br />P min, P max
                      </Form.Label>
                      <Form.Control type="text" name="logKBoundingPresRange" />
                    </Form.Group>
                  </div>
                )}
              </>
            )}
            {isUnivariantCurveNoSelected && (
              <>
                {isCalculateIsoBaricSelected && (
                  <>
                    {isUniformIncrementSelected && (
                      <div>
                        <Form.Group>
                          <Form.Label>
                            Specify TEMP (degCel) range:
                            <br />
                            min, max, increment
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="tempRange"
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>
                            Specify ISOBARS(bars) range:
                            <br />
                            min, max, increment
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="isobarsRange"
                          ></Form.Control>
                        </Form.Group>
                      </div>
                    )}{" "}
                    {isUnequalIncrementSelected && (
                      <Form.Group>
                        <Form.Label>
                          Specify PRES (bars), TEMP (degCel) value pairs:
                          <br />
                          One pair per line, ending with 0,0
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          name="presTempPairs"
                        ></Form.Control>
                      </Form.Group>
                    )}
                  </>
                )}
                {isCalculateIsothermalSelected && (
                  <>
                    {isUniformIncrementSelected && (
                      <div>
                        <Form.Group>
                          <Form.Label>
                            Specify ISOTHERMS (degCel) range:
                            <br />
                            min, max, increment
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="isothermsRange"
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>
                            Specify PRES (bars) range:
                            <br />
                            min, max, increment
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="presRange"
                          ></Form.Control>
                        </Form.Group>
                      </div>
                    )}
                    {isUnequalIncrementSelected && (
                      <Form.Group>
                        <Form.Label>
                          Specify TEMP (degCel), Pres(g/cc) value pairs:
                          <br />
                          One pair per line, ending with 0,0
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          name="tempPresPairs"
                        ></Form.Control>
                      </Form.Group>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}

        <Form.Group className="mt-3">
          <Form.Label>Specify reaction file:</Form.Label>
          <Form.Check
            name="reactionOption"
            id="reactionOption"
            label="Use an existing reaction file"
            value="0"
            onChange={(e) => setReactionFileOption(0)}
            type="radio"
          ></Form.Check>
          <Form.Check
            name="reactionOption"
            id="reactionOption"
            label="Build a new reaction file"
            value="1"
            onChange={(e) => setReactionFileOption(1)}
            type="radio"
          ></Form.Check>
        </Form.Group>

        {reactionFileOption === 0 ? (
          <Form.Group>
            <Form.Label className="text-bold">Reaction File:</Form.Label>
            <Form.Control
              name="reactFile"
              type="file"
              accept=".dat"
            ></Form.Control>
          </Form.Group>
        ) : reactionFileOption === 1 ? (
          <Form.Group>
            <Form.Label>
              Insert reactions here, 1 species per line, empty line between
              reactions <br /> Numbers are the stoichiometric coefficient of the
              species. <br /> Positive numbers are products and negative numbers
              are reactants,
              <br />
              e.g. QUARTZ {"=>"} SiO2,aq: <br />
              <code>
                -1 QUARTZ <br />1 SiO2,aq
              </code>
            </Form.Label>
            <Form.Control name="reaction" as="textarea"></Form.Control>
          </Form.Group>
        ) : (
          <></>
        )}
        <Form.Group className="mt-3">
          <Form.Label> Specify option for x-y plot files:</Form.Label>
          <Form.Check
            name="kalFormatOption"
            id="Do not generate plot files"
            label="Do not generate plot files"
            value="0"
            required
            onChange={(e) => setPlotOption(false)}
            type="radio"
          />
          <Form.Check
            name="kalFormatOption"
            id="Generate plot files in generic format"
            label="Generate plot files in generic format"
            value="1"
            required
            onChange={(e) => setPlotOption(true)}
            type="radio"
          />
        </Form.Group>
        <Button className="mt-3" type="submit">
          SUBMIT
        </Button>
      </Form>
    </div>
  );
}
