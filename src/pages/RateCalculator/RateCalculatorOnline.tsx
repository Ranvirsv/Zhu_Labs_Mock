import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { IFormData } from "./IRateCalculator";

export default function RateCalculatorOnline() {
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
      name: "temperature",
    },
    {
      label: "Please enter a constant pH:",
      name: "pH",
    },
    {
      label: "Please enter the activity of pFe3+:",
      name: "pFe3Plus",
    },
    {
      label: "Please enter the activity of pO2:",
      name: "pO2",
    },
    {
      label:
        "Please enter the activity of pHCO3- for Calcite or pCO2 for other carbonate minerals:",
      name: "pCO3",
    },
  ];

  const [formData, setFormData] = useState<IFormData>({
    mineral: "",
    temperature: "",
    pH: "",
    pFe3Plus: "",
    pO2: "",
    pCO3: "",
  });

  const handleChange = (name: keyof IFormData, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle the form submission
    console.log(formData);
  };

  return (
    <div className="m-5 p-5">
      <h2 className="pageHeader">GEOCHEMICAL REACTION RATE CALCULATOR</h2>
      <hr />
      <Form onSubmit={handleSubmit}>
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
            <Col sm="3">
              {index === 0 ? (
                <Form.Select>
                  <option></option>
                </Form.Select>
              ) : (
                <Form.Control
                  type="text"
                  name={input.name}
                  value={formData[input.name]}
                  onChange={(e) => handleChange(input.name, e.target.value)}
                />
              )}
            </Col>
          </Form.Group>
        ))}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
