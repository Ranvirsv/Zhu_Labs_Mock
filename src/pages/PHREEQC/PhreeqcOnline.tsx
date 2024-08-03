import React, { useState } from "react";
import "../../App.scss";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function PhreeqcOnline() {
  const [databaseOptions, setDatabaseOptions] = useState<number>(-1);

  const databaseOptionList: string[] = [
    "geothermal.dat",
    "geothermal-REE.dat",
    "diagenesis.dat",
    "bl-0.5kb.dat",
    "bl-1kb.dat",
    "bl-2kb.dat",
    "bl-2kb-REE.dat",
    "bl-5kb.dat",
    "llnl-kinetics.dat",
  ];

  return (
    <div className="m-5 p-5">
      <h2 className="pageHeader">PHREEQC High Temperature Pressure.</h2>
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
                  Zhang G.R., Lu P., Zhang Y.L., Tu K., Zhu C. (2020)
                  SupPHREEQC: A program to generate customized PHREEQC
                  thermodynamic database based on Supcrtbl.{" "}
                  <i>Computer and Geosciences</i>
                  v143.{" "}
                  <a
                    href="https://www.sciencedirect.com/science/article/abs/pii/S0098300420305501?via%3Dihub"
                    style={{ color: "crimson" }}
                  >
                    <b>DOI</b>
                  </a>
                  <br />
                  <br />
                  Lu P, Zhang GR, Apps J, *Zhu C. (2022) Comparison of
                  thermodynamic data files for PHREEQC. Earth-Science Reviews,
                  <a
                    href="https://doi.org/10.1016/j.earscirev.2021.103888"
                    style={{ color: "crimson" }}
                  >
                    <b>DOI</b>
                  </a>
                  .
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <p className="text-bold">
        {"("}Please note: User-generated files with names containing spaces or
        special characters will not be accepted{")"}
      </p>

      <Form
        name="supcrtForm"
        action="https://js2test.ear180013.projects.jetstream-cloud.org/phreeqc/phreeqc3.php"
        method="post"
        encType="multipart/form-data"
      >
        <Form.Group className="col-3">
          <Form.Label className="text-bold">Input File:</Form.Label>
          <Form.Control name="userFile" type="file" required accept=".pqi" />
        </Form.Group>

        <Form.Group className=" my-3 col-3">
          <Form.Label className="text-bold">Name for output file</Form.Label>
          <Form.Control
            name="outputFile"
            required
            maxLength={16}
            type="text"
            placeholder=""
            pattern="++"
            minLength={3}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="text-bold">Database File:</Form.Label>
          <Form.Check
            name="datFile"
            label="Upload custom database file"
            value="0"
            type="radio"
            required
            onClick={() => setDatabaseOptions(0)}
          ></Form.Check>

          <Form.Check
            name="datFile"
            label="Use existing database file"
            value="1"
            type="radio"
            required
            onClick={() => setDatabaseOptions(1)}
          ></Form.Check>

          {databaseOptions === 0 ? (
            <Form.Group controlId="formFile" className="my-2">
              <Form.Control type="file" />
            </Form.Group>
          ) : databaseOptions === 1 ? (
            <Form.Group controlId="selFile" className="my-2">
              <Form.Label>Select a database</Form.Label>
              <Form.Select
                name="selFile"
                className="my-2"
                defaultValue="geothermal.dat"
              >
                {databaseOptionList.map((elem) => (
                  <option key={elem} value={elem}>
                    {elem}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          ) : (
            <></>
          )}
        </Form.Group>
        <Button className="mt-3" type="submit">
          SUBMIT
        </Button>
      </Form>
    </div>
  );
}
