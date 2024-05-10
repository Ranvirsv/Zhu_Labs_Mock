import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

export default function SolubilityCalculator() {
  const calculatorInputs: string[] = [
    "Please enter a temperature (K) between 273-533:",
    "Please enter a pressure (bar) between 0-2000:",
    "Please enter NaCl (mol/kgH20) between 0-4.5:",
  ];
  return (
    <div className="m-5 p-5">
      <h2 className="pageHeader">CO2 SOLUBILITY CALCULATOR</h2>
      <hr />
      <Card>
        <Card.Body>
          <Card.Text>
            <pre>
              CO <sub>2</sub> solubility in aqueous NaCl solution---------{" "}
              <br />
              Duan Z, Sun R, Zhu C, Chou I (Marine Chemistry, 2006, v98,
              131-139)
              <br />
              T-P-X range of this model: 273-533 K, 0-2000 bar, 0-4.5 mNaCl{" "}
              <br />
              Unit---T: K, P(total): bar, mNaCl and mCO2: mol/kgH2O <br />
            </pre>
          </Card.Text>
        </Card.Body>
      </Card>

      <Form>
        {calculatorInputs.map((elem) => {
          return (
            <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
              <Form.Label column sm="10">
                <b>{elem}</b>
              </Form.Label>
              <Col sm="3">
                <Form.Control type="text" required placeholder="" />
              </Col>
            </Form.Group>
          );
        })}
        <Button className="mt-3" type="submit">
          SUBMIT
        </Button>
      </Form>

      <Card className="mt-3">
        <Card.Body>
          <Card.Text>
            <pre>
              The Fortran code for the calculator was written by Sun Rui, now a
              professor at Northwest University in Xian{" "}
              <a href="http://geology.nwu.edu.cn/Article/teacher/en/1/id/114.html">
                {"("}http://geology.nwu.edu.cn/Article/teacher/en/1/id/114.html
                {")"}.{" "}
              </a>
              Online adoption was completed by Rob Hageboeck and Kevin Tu.
            </pre>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
