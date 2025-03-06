import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { Form, Button } from "react-bootstrap";
import Chart from "chart.js/auto";

// Constants
const labels = ["P, bar", "xH2S+xCO2", "ρ, kg/m3", "λH2S"];
const systems = ["CO₂-H₂O-NaCl", "H₂S-H₂O-NaCl", "CO₂-H₂S-H₂O-NaCl"];
const colors = [
  "rgba(200, 0, 0, 1)",
  "rgba(0, 200, 0, 1)",
  "rgba(0, 0, 200, 1)",
  "rgba(150, 0, 0, 1)",
  "rgba(0, 150, 0, 1)",
  "rgba(0, 0, 150, 1)",
  "rgba(250, 0, 0, 1)",
  "rgba(0, 250, 0, 1)",
  "rgba(0, 0, 250, 1)",
];
const p = Array.from({ length: 61 }, (_, i) => i * 10);

/**
 * ### H2SCalculatorOnline
 * This component provides a user interface for calculating H2S solubility in different systems.
 * It includes a form for input parameters, a chart for displaying results, and a history of previous calculations.
 *
 * ### Component Variables
 * - formData: Holds the form data inputted by the user.
 * - enableRun: Controls whether the run button is enabled. So when enableRun = false, that means the experiment is running, so we disable the run button.
 * - graphHistory: Stores the history of previous calculations, including the data points and parameters used.
 * - downloadData: Holds data to allow users to download the data as a csv file.
 * - canvasRef: References the canvas element used for rendering the chart.
 * - chartRef: References the Chart.js instance used to render the scatter plot.
 */
export default function H2SCalculatorOnline() {
  // State variables
  const [formData, setFormData] = useState({
    system: 0,
    temp: 298.15,
    mNaCl: 0.0,
    xcoord: 0,
    ycoord: 0,
  });
  const [enableRun, setEnableRun] = useState<boolean>(true);
  const [graphHistory, setGraphHistory] = useState<Array<any>>([]);
  const [downloadData, setDownloadData] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<"scatter"> | null>(null);

  // Initialize Chart on first render
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        chartRef.current = new Chart<"scatter">(ctx, {
          type: "scatter",
          data: {
            datasets: [],
          },
          options: {
            scales: {
              x: {
                type: "linear",
                beginAtZero: true,
                title: {
                  display: true,
                  text: "X Axis",
                },
              },
              y: {
                type: "linear",
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Y Axis",
                },
              },
            },
            plugins: {
              title: {
                display: true,
                text: "",
              },
            },
            responsive: true,
          },
        });
      }
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  // Update Chart when graphHistory or formData changes
  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = chartRef.current;
    const xCoord = formData.xcoord;
    const yCoord = formData.ycoord;

    myChart.data.datasets = [];

    for (let i = 0; i < graphHistory.length; i++) {
      let x: number[] = [];
      let y: number[] = [];
      switch (xCoord) {
        case 0:
          x = p;
          break;
        case 1:
          x = graphHistory[i].data[0];
          break;
        case 2:
          x = graphHistory[i].data[1];
          break;
        case 3:
          x = graphHistory[i].data[2];
          break;
        default:
          console.log("Error");
      }
      switch (yCoord) {
        case 0:
          y = p;
          break;
        case 1:
          y = graphHistory[i].data[0];
          break;
        case 2:
          y = graphHistory[i].data[1];
          break;
        case 3:
          y = graphHistory[i].data[2];
          break;
        default:
          console.log("Error");
      }

      const coords = x.map((val, index) => ({ x: val, y: y[index] }));

      myChart.data.datasets.push({
        label: `Temp: ${graphHistory[i].temp}, mNaCl: ${graphHistory[i].mNaCl}`,
        data: coords,
        showLine: true,
        fill: false,
        borderColor: colors[i % colors.length],
      });
    }

    // Update axis titles
    if (myChart.options.scales?.x?.title) {
      myChart.options.scales.x.title.text = labels[xCoord];
    }

    if (myChart.options.scales?.y?.title) {
      myChart.options.scales.y.title.text = labels[yCoord];
    }

    // Update chart title
    if (myChart.options.plugins?.title) {
      myChart.options.plugins.title.text = systems[formData.system];
    }

    myChart.update();
  }, [graphHistory, formData.xcoord, formData.ycoord, formData.system]);

  /**
   * Run the experiment by sending a request to the server and updating the chart with the response data.
   */
  const runExperiment = async () => {
    setEnableRun(false);

    // Ensure bounds are checked before running
    const adjustedFormData = checkBounds(formData);
    setFormData(adjustedFormData);

    const { system, temp, mNaCl } = adjustedFormData;
    const url = `https://js2test.ear180013.projects.jetstream-cloud.org/h2s/calculator/h2s_request.php?val=${String(
      Math.random()
    )}&system=${system}&temp=${temp}&nacl=${mNaCl}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          alert("404 Error");
        } else if (response.status === 500) {
          alert("500 Error");
        } else {
          throw new Error("Network response was not ok");
        }
        return;
      }

      const data = await response.json();

      const newComputedData: number[][] = [];
      for (let i = 0; i < data.length; i++) {
        newComputedData.push(data[i].map((elem: string) => parseFloat(elem)));
      }

      // Update graphHistory
      setGraphHistory((prevHistory) => [
        ...prevHistory,
        {
          data: newComputedData,
          system,
          temp,
          mNaCl,
        },
      ]);

      // Prepare download data
      prepareDownloadData(system, temp, mNaCl, newComputedData);

      setEnableRun(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        alert("Error: " + error.message);
      }
      setEnableRun(true);
    }
  };

  /**
   * Prepare the data for download in CSV format.
   *
   * @param {number} system - The system type.
   * @param {number} temp - The temperature.
   * @param {number} mNaCl - The concentration of NaCl.
   * @param {number[][]} computedData - The computed data from the server.
   */
  const prepareDownloadData = (
    system: number,
    temp: number,
    mNaCl: number,
    computedData: number[][]
  ) => {
    const csvLabels = ["P, bar", "xH2S+xCO2", "ρ kg/m3", "λH2S"];
    const csvData: string[] = [];
    csvData.push(`Temperature,Pressure,NaCl,${csvLabels[1]}`);
    if (system < 2) {
      csvData[0] += `,${csvLabels[2]},${csvLabels[3]}`;
    }
    csvData[0] += "\n";

    for (let i = 0; i < computedData[0].length; i++) {
      let line = `${temp},${p[i]},${mNaCl},${computedData[0][i]}`;
      if (system < 2) {
        line += `,${computedData[1][i]},${computedData[2][i]}`;
      }
      csvData.push(line + "\n");
    }

    setDownloadData(csvData.join(""));
  };

  /**
   * Check and adjust the bounds of the input data.
   *
   * Currently it's just checking the temp and mNacl to make sure that
   * those values are in a proper range.
   *
   * @param {typeof formData} newFormData - The new form data.
   * @returns {typeof formData} - The adjusted form data.
   */
  const checkBounds = (newFormData: typeof formData) => {
    const { system } = newFormData;
    let { temp, mNaCl } = newFormData;

    let tempChanged = false;
    let mNaClChanged = false;

    if (temp < 298.15) {
      temp = 298.15;
      tempChanged = true;
    } else if (system < 2 && temp > 373.15) {
      temp = 373.15;
      tempChanged = true;
    } else if (system === 2 && temp > 348.15) {
      temp = 348.15;
      tempChanged = true;
    }
    if (mNaCl < 0) {
      mNaCl = 0.0;
      mNaClChanged = true;
    } else if (system < 2 && mNaCl > 6) {
      mNaCl = 6.0;
      mNaClChanged = true;
    } else if (system === 2 && mNaCl > 4) {
      mNaCl = 4.0;
      mNaClChanged = true;
    }

    if (tempChanged || mNaClChanged) {
      alert("Values adjusted to within acceptable bounds.");
    }

    return { ...newFormData, temp, mNaCl };
  };

  // Input Change Handlers
  const onChangeNumber = (
    event: ChangeEvent<HTMLInputElement>,
    inputLabel: "temp" | "mNaCl"
  ) => {
    let eventInput = parseFloat(event.target.value);
    if (!isNaN(eventInput)) {
      let newFormData = { ...formData, [inputLabel]: eventInput };
      setFormData(newFormData);
    }
  };

  /**
   * Handle changes in select inputs.
   *
   * @param {ChangeEvent<HTMLSelectElement>} event - The change event.
   * @param {string} inputLabel - The label of the input being changed.
   */
  const onChangeSelect = (
    event: ChangeEvent<HTMLSelectElement>,
    inputLabel: "system" | "xcoord" | "ycoord"
  ) => {
    let newFormData = {
      ...formData,
      [inputLabel]: parseInt(event.target.value),
    };
    setFormData(newFormData);
  };

  const handleCheckBounds = () => {
    const adjustedFormData = checkBounds(formData);
    setFormData(adjustedFormData);
  };

  /**
   * Render the history of previous calculations.
   *
   * @returns {JSX.Element | null} - The history elements or null if no history.
   */
  const renderHistory = () => {
    if (!graphHistory.length) return null;

    return (
      <div id="history">
        {graphHistory.map((item, idx) => {
          const date = new Date();
          const dateStr = `${
            date.getMonth() + 1
          }-${date.getDate()}-${date.getFullYear()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
          const fileName = `h2sOutput-${dateStr}.csv`;

          const blob = new Blob([downloadData], { type: "text/csv" });
          const url = URL.createObjectURL(blob);

          return (
            <div key={`history-${idx}`}>
              <a href={url} download={fileName}>
                {systems[item.system]} Temp: {item.temp} K, mNaCl: {item.mNaCl}
              </a>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="m-5 p-5">
        <h2 className="pageHeader">
          H<sub>2</sub>S SOLUBILITY CALCULATOR
        </h2>
        <hr />
        {/* Form input section for the calculator */}
        <Form className="col-3">
          <Form.Group>
            <Form.Label className="fw-bold h4">Select a system</Form.Label>
            <Form.Select
              value={formData.system}
              onChange={(e) => onChangeSelect(e, "system")}
            >
              <option value="0">CO&#8322;-H&#8322;O-NaCl</option>
              <option value="1">H&#8322;S-H&#8322;O-NaCl</option>
              <option value="2">CO&#8322;-H&#8322;S-H&#8322;O-NaCl</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label className="fw-bold h4">Temperature, K:</Form.Label>
            <Form.Control
              onKeyDown={(evt) =>
                ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                  evt.key
                ) && evt.preventDefault()
              }
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onChangeNumber(e, "temp")
              }
              value={formData.temp}
              type="number"
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label className="fw-bold h4">
              mNaCl (mol/kgH&#8322;O):
            </Form.Label>
            <Form.Control
              onKeyDown={(evt) =>
                ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                  evt.key
                ) && evt.preventDefault()
              }
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onChangeNumber(e, "mNaCl")
              }
              value={formData.mNaCl}
              type="number"
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label className="fw-bold h4">X Coordinate</Form.Label>
            <Form.Select
              value={formData.xcoord}
              onChange={(e) => onChangeSelect(e, "xcoord")}
            >
              <option value="0">P, Bar</option>
              <option value="1">xH&#8322;S + xCO&#8322;</option>
              <option value="2">&#961;, kg/m&#8323;</option>
              <option value="3">&#955;, H&#8322;S</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label className="fw-bold h4">Y Coordinate</Form.Label>
            <Form.Select
              value={formData.ycoord}
              onChange={(e) => onChangeSelect(e, "ycoord")}
            >
              <option value="0">P, Bar</option>
              <option value="1">xH&#8322;S + xCO&#8322;</option>
              <option value="2">&#961;, kg/m&#8323;</option>
              <option value="3">&#955;, H&#8322;S</option>
            </Form.Select>
          </Form.Group>
          <Button className="mt-3" onClick={handleCheckBounds}>
            Check Bounds
          </Button>
          <Button
            disabled={!enableRun}
            className="ms-3 mt-3"
            onClick={runExperiment}
          >
            Run
          </Button>
        </Form>

        {/* Rendering chart and history */}
        <div className="w-100 height-500 mt-5">
          <canvas ref={canvasRef} id="chart"></canvas>
        </div>
        <div className="mt-5">{renderHistory()}</div>
      </div>
    </>
  );
}
