import React from "react";
import "../../App.scss";

export default function PhreeqcOnline() {
  return (
    <div className="m-5 p-5">
      <h2 className="pageHeader">PHREEQC ONLINE VERSION 4.0.0</h2>
      <hr />
      <p>
        (Please note: User-generated files with names containing spaces or
        special characters will not be accepted)
      </p>

      <form>
        <div className="">
          <label htmlFor="inputFile">
            <b>Input File:</b>
          </label>
          <br />
          <input type="file" className="form-controller-file" id="inputFile" />
        </div>

        <br />

        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Name the Output File:
            </span>
          </div>
          <input
            type="text"
            className="form-controller"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>

        <br />

        <div className="form-group">
          <label htmlFor="databaseFile">
            <b>Database File:</b>
          </label>
          <br />
          <input
            type="radio"
            name="radioInputs"
            className="form-check-input"
            id="customDatabaseFile"
            value="Custom-Database-File"
          />{" "}
          <label className="form-check-label" htmlFor="customDatabaseFile">
            Upload custom database file
          </label>
          <br />
          <input
            type="radio"
            name="radioInputs"
            className="form-check-input"
            id="existingDatabaseFile"
            value="Existing-Database-File"
          />{" "}
          <label className="form-check-label" htmlFor="liquidVapor">
            Use existing database file
          </label>
        </div>
      </form>
    </div>
  );
}
