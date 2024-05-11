import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { IFormData } from "./IRateCalculator";

export default function RateCalculatorOnline() {
  const [speciesArray, setSpeciesArray] = useState<string[]>([]);

  interface ICalculatorInput {
    label: string;
    name: keyof IFormData; // This ensures that name corresponds to a key in IFormData
  }

  const calculatorInputs: ICalculatorInput[] = [
    {
      label: "Please choose the desired mineral for calculation:",
      name: "mineral",
    },
    {
      label: "Please enter a constant temperature (°C):",
      name: "temp",
    },
    {
      label: "Please enter a constant pH:",
      name: "pH",
    },
    {
      label: "Please enter the activity of pFe3+:",
      name: "feINPUT",
    },
    {
      label: "Please enter the activity of pO2:",
      name: "oINPUT",
    },
    {
      label:
        "Please enter the activity of pHCO3- for Calcite or pCO2 for other carbonate minerals:",
      name: "co2INPUT",
    },
  ];

  const [formData, setFormData] = useState<IFormData>({
    mineral: "",
    temp: "",
    pH: "",
    feINPUT: "",
    oINPUT: "",
    co2INPUT: "",
  });

  const handleChange = (name: keyof IFormData, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetch(`http://149.165.154.118/DB.php?query=Species`)
      .then((response) => response.json())
      .then((response) => setSpeciesArray(response.Species))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="m-5 p-5">
      <h2 className="pageHeader">GEOCHEMICAL REACTION RATE CALCULATOR</h2>
      <hr />
      <Form
        action="http://149.165.154.118/rateconstants/rateconstants3.php"
        method="post"
      >
        {calculatorInputs.map((input, index) => (
          <Form.Group
            as={Row}
            className="mb-3"
            controlId={`formPlaintext${input.name}`}
            key={index}
          >
            <Form.Label column sm="10">
              <b>{input.label}</b>
            </Form.Label>
            <div className="col-3">
              {index === 0 ? (
                <Form.Select name="species">
                  {speciesArray.map((elem) => (
                    <option key={elem} value={elem}>
                      {elem}
                    </option>
                  ))}
                </Form.Select>
              ) : (
                <Form.Control
                  type={input.name}
                  name={input.name}
                  value={formData[input.name]}
                  onChange={(e) => handleChange(input.name, e.target.value)}
                />
              )}
            </div>
          </Form.Group>
        ))}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
