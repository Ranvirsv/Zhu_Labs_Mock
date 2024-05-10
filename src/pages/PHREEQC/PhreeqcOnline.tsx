import React, { useState } from "react";
import "../../App.scss";
import Form from "react-bootstrap/Form";
import { FromDatabaseOptions } from "./IPhreeqcOnline";
import { Button } from "react-bootstrap";

export default function PhreeqcOnline() {
  const [databaseOptions, setDatabaseOptions] = useState<number>(-1);
  const databaseOptionList: FromDatabaseOptions = {
    //TODO: Fill in the function to get all the databases
  };
  return (
    <div className="m-5 p-5">
      <h2 className="pageHeader">
        PHREEQC-HTP (High Temperature Pressure) for speciation, solubility,
        reaction path, and reactive transport modeling from 0.01-1000
        <sup>o</sup>C and 1-5000 bar.
      </h2>
      <hr />
      <p style={{ color: "purple" }}>
        Zhang GR, Lu P, Zhang YL, Tu K, *Zhu C (2020) SupPHREEQC: A program to
        generate customized ᴘʜʀᴇᴇǫᴄ thermodynamic database based on Supcrtbl.
        Computer and Geosciences v143.{" "}
        <a href="https://www.sciencedirect.com/science/article/abs/pii/S0098300420305501?via%3Dihub">
          DOI
        </a>
      </p>
      <p className="text-bold">
        {"("}Please note: User-generated files with names containing spaces or
        special characters will not be accepted{")"}
      </p>

      <Form
        name="supcrtForm"
        action="localhost:3000"
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
            <Form.Select className="my-2">
              <option>Select a database</option>
              {Object.keys(databaseOptionList).map((elem, path) => {
                return <option value={path}>elem</option>;
              })}
            </Form.Select>
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
