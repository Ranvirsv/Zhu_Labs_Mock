import { useState, useEffect } from "react";
import { Form, Row, Button } from "react-bootstrap";

// Interface for the form data object
type IFormData = {
  mineral: string;
  temp: string;
  pH: string;
  feINPUT: string;
  oINPUT: string;
  co2INPUT: string;
};

interface ICalculatorInput {
  label: string;
  name: keyof IFormData; // This ensures that name corresponds to a key in IFormData
}

// Array of objects containing the input fields for the Rate Calculator
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

/**
 * ### RateCalculatorOnline
 *
 * Page for the online version of the Rate Calculator software.
 *
 * ### State and Hooks
 * - speciesArray: Array of strings representing the species that can be selected.
 * - formData: Object containing the form data.
 */
export default function RateCalculatorOnline() {
  const [speciesArray, setSpeciesArray] = useState<string[]>([]);
  const [formData, setFormData] = useState<IFormData>({
    mineral: "",
    temp: "",
    pH: "",
    feINPUT: "",
    oINPUT: "",
    co2INPUT: "",
  });

  /**
   * Function handles the state change of the input fields.
   * It updates the formData object with the new value.
   *
   * @param name Name of the input field being changed
   * @param value Value of the asssociated input field
   */
  const handleChange = (name: keyof IFormData, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Fetches the species data from the server
  useEffect(() => {
    fetch(
      `https://js2test.ear180013.projects.jetstream-cloud.org/DB.php?query=Species`
    )
      .then((response) => response.json())
      .then((response) => setSpeciesArray(response.Species))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="m-5 p-5">
      <h2 className="pageHeader">GEOCHEMICAL REACTION RATE CALCULATOR</h2>
      <hr />
      <Form
        action="https://js2test.ear180013.projects.jetstream-cloud.org/rateconstants/rateconstants3.php"
        method="post"
      >
        {/* Render form inputs */}
        {calculatorInputs.map((input, index) => (
          <Form.Group
            as={Row}
            className="mb-3"
            controlId={`formPlaintext${input.name}`}
            key={index}
          >
            <Form.Label className="text-bold" column sm="10">
              {input.label}
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
