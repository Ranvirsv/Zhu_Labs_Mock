import { useState } from "react";
import Form from "react-bootstrap/Form";
import { IFormData } from "./ISolubilityCalculator";
import { Button } from "react-bootstrap";
import { Container, Row, Col, Card } from "react-bootstrap";

interface ICalculatorInput {
  label: string;
  name: keyof IFormData; // This ensures that name corresponds to a key in IFormData
}

export default function SolubilityCalculator() {
  const calculatorInputs: ICalculatorInput[] = [
    {
      label: "Please enter a temperature (K) between 273-533:",
      name: "temp",
    },
    {
      label: "Please enter a pressure (bar) between 0-2000:",
      name: "bar",
    },
    {
      label: "Please enter NaCl (mol/kgH20) between 0-4.5:",
      name: "mNaCl",
    },
  ];

  const [formData, setFormData] = useState<IFormData>({
    temp: "",
    bar: "",
    mNaCl: "",
  });

  const handleChange = (name: keyof IFormData, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="m-5 p-5">
      <h2 className="pageHeader">CO2 SOLUBILITY CALCULATOR</h2>
      <hr />
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card
              style={{ borderColor: "#ced4da", backgroundColor: "#ffffff" }}
            >
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold", color: "#343a40" }}>
                  Acknowledgment and Citation
                </Card.Title>
                <Card.Text style={{ fontStyle: "italic", color: "#6c757d" }}>
                  Users please cite this
                </Card.Text>
                <Card.Text
                  style={{ fontFamily: "Times New Roman", color: "purple" }}
                >
                  Duan Z.H., Sun R., Zhu Chen, Chou I-M (2006) An improved model
                  for the calculation of CO2 solubility in aqueous solutions
                  containing Na<sup>+</sup>, K<sup>+</sup>, Ca<sup>2+</sup>, Mg
                  <sup>2+</sup>, Cl<sup>-</sup>, and SO<sub>4</sub>
                  <sup>2-</sup>–<i>Marine Chemistry</i>, Volume 98, Issues 2–4,
                  Pages 131-139.{" "}
                  <a
                    href="https://www.sciencedirect.com/science/article/pii/S0304420305001118?via%3Dihub"
                    style={{ color: "crimson" }}
                  >
                    DOI
                  </a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* <Card>
        <Card.Body>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card> */}

      <pre className="mt-3">
        CO <sub>2</sub> solubility in aqueous NaCl solution--------- <br />
        Duan Z, Sun R, Zhu C, Chou I (Marine Chemistry, 2006, v98, 131-139)
        <br />
        T-P-X range of this model: 273-533 K, 0-2000 bar, 0-4.5 mNaCl <br />
        Unit---T: K, P(total): bar, mNaCl and mCO2: mol/kgH2O <br />
      </pre>

      <Form
        action={`https://js2test.ear180013.projects.jetstream-cloud.org/co2/co2calc3.php?temp=${formData.temp}&bar=${formData.bar}&mNaCl=${formData.mNaCl}`}
        method="get"
      >
        {calculatorInputs.map((input) => (
          <Form.Group
            as={Row}
            className="mb-3"
            controlId={`formPlaintext${input.name}`}
          >
            <Form.Label>
              <b>{input.label}</b>
            </Form.Label>
            <div className="col-3">
              <Form.Control
                type="text"
                name={input.name}
                value={formData[input.name]}
                onChange={(e) => handleChange(input.name, e.target.value)}
              />
            </div>
          </Form.Group>
        ))}
        <Button className="mt-3" type="submit">
          SUBMIT
        </Button>
      </Form>

      <pre className="mt-5">
        The Fortran code for the calculator was written by Sun Rui, now a
        professor at Northwest University in Xian{" "}
        <a href="http://geology.nwu.edu.cn/Article/teacher/en/1/id/114.html">
          {"("}http://geology.nwu.edu.cn/Article/teacher/en/1/id/114.html
          {")"}.{" "}
        </a>
        Online adoption was completed by Rob Hageboeck and Kevin Tu.
      </pre>
    </div>
  );
}
