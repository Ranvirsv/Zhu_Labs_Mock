import React, { useState } from "react";
import "../../App.scss";
import Form from "react-bootstrap/Form";
import { FromDatabaseOptions } from "./IPhreeqcOnline";

export default function PhreeqcOnline() {
  const [databaseOptions, setDatabaseOptions] = useState<number>(0);
  const databaseOptionList: FromDatabaseOptions = {
    //TODO: Fill in the function to get all the databases
  };
  return (
    <div className="m-5 p-5">
      <h2 className="pageHeader">PHREEQC ONLINE VERSION 4.0.0</h2>
      <hr />
      <p>
        (Please note: User-generated files with names containing spaces or
        special characters will not be accepted)
      </p>

      <div className="col-3">
        <Form.Label>
          <b>Input File:</b>
        </Form.Label>
        <Form.Control type="file" />
      </div>

      <div className=" my-3 col-3">
        <Form.Label>
          <b>Name for output file</b>
        </Form.Label>
        <Form.Control type="text" placeholder="" />
      </div>

      <div className="row my-3 col-3">
        <Form>
          <b>Database File:</b>
          <Form.Check
            name="Database Files"
            id="Upload custom database file"
            label="Upload custom database file"
            value="Upload custom database file"
            type="radio"
            onClick={() => setDatabaseOptions(1)}
          ></Form.Check>
          <Form.Check
            name="Database Files"
            id="Use existing database file"
            label="Use existing database file"
            value="Use existing database file"
            type="radio"
            onClick={() => setDatabaseOptions(2)}
          ></Form.Check>
          {databaseOptions === 1 ? (
            <Form.Group controlId="formFile" className="my-2">
              <Form.Control type="file" />
            </Form.Group>
          ) : databaseOptions === 2 ? (
            <Form.Select className="my-2">
              <option>Select a database</option>
              {Object.keys(databaseOptionList).map((elem, path) => {
                return <option value={path}>elem</option>;
              })}
            </Form.Select>
          ) : (
            <div></div>
          )}
        </Form>
      </div>
    </div>
  );
}
