import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { Form, Button } from "react-bootstrap";
import Chart from "chart.js/auto";

// Variables and functions from H2SCalc.js
let graphHistory: Array<any> = [];
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
let file = new Blob([""], { type: "text/plain" });

function drawGraphs(
  ctxRef: React.MutableRefObject<Chart | null>,
  xCoord: number,
  yCoord: number
) {
  if (!ctxRef.current) return;

  const myChart = ctxRef.current;
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
  myChart.options.plugins!.title!.text = systems[graphHistory[0]?.system || 0];
  myChart.update();
}

function drawTable(
  system: number,
  temp: number,
  mNaCl: number,
  computedData: number[][]
) {
  const resultsHeading = document.getElementById("results-heading")!;
  const resultsBody = document.getElementById("results-body")!;
  resultsHeading.innerHTML = "";
  resultsBody.innerHTML = "";

  resultsHeading.innerHTML = `<th>Temperature (K)</th><th>Pressure (Bar)</th><th>NaCl (mol)</th><th>${labels[1]}</th>`;
  if (system < 2) {
    resultsHeading.innerHTML += `<th>${labels[2]}</th><th>${labels[3]}</th>`;
  }

  computedData[0].forEach((_, i) => {
    let row = `<tr id="result${i}"><td>${temp}</td><td>${p[i]}</td><td>${mNaCl}</td><td>${computedData[0][i]}</td>`;
    if (system < 2) {
      row += `<td>${computedData[1][i]}</td><td>${computedData[2][i]}</td>`;
    }
    row += `</tr>`;
    resultsBody.innerHTML += row;
  });
}

async function runExperiment(
  system: number,
  temp: number,
  mNaCl: number,
  ctxRef: React.MutableRefObject<Chart | null>,
  setDownloadData: (
    system: number,
    temp: number,
    mNaCl: number,
    computedData: number[][]
  ) => void,
  setEnableRun: React.Dispatch<React.SetStateAction<boolean>>
) {
  const computedData: number[][] = [];
  const url = `http://149.165.154.118/h2s/calculator/h2s_request.php?val=${String(
    Math.random()
  )}&system=${system}&temp=${temp}&nacl=${mNaCl}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        alert("404 Error");
      } else if (response.status === 500) {
        alert("500 Error");
      } else {
        throw new Error("Network response was not ok");
      }
    }

    const data = await response.json();
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      computedData.push(data[i].map((elem: string) => parseFloat(elem)));
    }

    graphHistory.push({
      data: computedData,
      system,
      temp,
      mNaCl,
    });

    drawGraphs(ctxRef, system, mNaCl);
    drawTable(system, temp, mNaCl, computedData);
    setDownloadData(system, temp, mNaCl, computedData);
    setEnableRun(true);
    console.log(graphHistory);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error:", error.message);
      alert("Error: " + error.message);
    }
  }
}

function setDownloadData(
  system: number,
  temp: number,
  mNaCl: number,
  computedData: number[][]
) {
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
  file = new Blob(csvData, { type: "text/plain" });

  // Add Button To History
  const a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.textContent = `${systems[system]} ${temp} ${mNaCl}`;

  const date = new Date();
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  const [hour, minutes, seconds] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];

  a.download = `h2sOutput-${month}-${day}-${year}_${hour}:${minutes}:${seconds}.csv`;
  const cDiv = document.createElement("div");
  cDiv.appendChild(a);
  document.getElementById("history")!.appendChild(cDiv);
}

export default function H2SCalculatorOnline() {
  const [formData, setFormData] = useState({
    system: 0,
    temp: 0,
    mNaCl: 0,
    xcoord: 0,
    ycoord: 0,
  });
  const [enableRun, setEnableRun] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctxRef.current = new Chart(ctx, {
          type: "scatter",
          data: {
            datasets: [],
          },
          options: {
            scales: {
              x: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "X Axis",
                },
              },
              y: {
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
      if (ctxRef.current) {
        ctxRef.current.destroy();
      }
    };
  }, []);

  const checkBounds = () => {
    let newTemp: number = formData.temp;
    let newMNaCl: number = formData.mNaCl;

    if (formData.temp < 298.15) {
      newTemp = 298.15;
    } else if (formData.system < 2 && formData.temp > 373.15) {
      newTemp = 373.15;
    } else if (formData.system === 2 && formData.temp > 348.15) {
      newTemp = 348.15;
    }
    if (formData.mNaCl < 0) {
      newMNaCl = 0.0;
    } else if (formData.system < 2 && formData.mNaCl > 6) {
      newMNaCl = 6.0;
    } else if (formData.system === 2 && formData.mNaCl > 4) {
      newMNaCl = 4.0;
    }

    if (newTemp !== formData.temp || newMNaCl !== formData.mNaCl) {
      setFormData({ ...formData, temp: newTemp, mNaCl: newMNaCl });
    }

    setEnableRun(true);
  };

  const onChangeNumber = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputLabel: "temp" | "mNaCl"
  ) => {
    let eventInput = parseInt(event.target.value);
    if (!isNaN(eventInput) && eventInput >= 0) {
      setFormData({ ...formData, [inputLabel]: eventInput });
    }
  };

  return (
    <>
      <div className="m-5 p-5">
        <h2 className="pageHeader">
          H<sub>2</sub>S SOLUBILITY CALCULATOR
        </h2>
        <hr />
        <Form className="col-3">
          <Form.Group>
            <Form.Label className="fw-bold h4">Select a system</Form.Label>
            <Form.Select
              onChange={(e) =>
                setFormData({ ...formData, system: parseInt(e.target.value) })
              }
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
              onChange={(e) => onChangeNumber(e, "temp")}
              value={formData.temp}
              type="number"
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label className="fw-bold h4">
              mNaCl (mol/kgH&#8322;0):
            </Form.Label>
            <Form.Control
              onKeyDown={(evt) =>
                ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                  evt.key
                ) && evt.preventDefault()
              }
              onChange={(e) => onChangeNumber(e, "mNaCl")}
              value={formData.mNaCl}
              type="number"
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label className="fw-bold h4">X Coordinator</Form.Label>
            <Form.Select
              onChange={(e) =>
                setFormData({ ...formData, xcoord: parseInt(e.target.value) })
              }
            >
              <option value="0">P, Bar</option>
              <option value="1">xH&#8322;S + xCO&#8322;</option>
              <option value="2">&#961;, kg/m&#8323;</option>
              <option value="3">&#955;, H&#8322;S</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label className="fw-bold h4">Y Coordinator</Form.Label>
            <Form.Select
              onChange={(e) =>
                setFormData({ ...formData, ycoord: parseInt(e.target.value) })
              }
            >
              <option value="0">P, Bar</option>
              <option value="1">xH&#8322;S + xCO&#8322;</option>
              <option value="2">&#961;, kg/m&#8323;</option>
              <option value="3">&#955;, H&#8322;S</option>
            </Form.Select>
          </Form.Group>
          <Button className="mt-3" onClick={checkBounds}>
            Check Bounds
          </Button>
          <Button
            disabled={!enableRun}
            className="ms-3 mt-3"
            onClick={() =>
              runExperiment(
                formData.system,
                formData.temp,
                formData.mNaCl,
                ctxRef,
                setDownloadData,
                setEnableRun
              )
            }
          >
            Run
          </Button>
        </Form>
        <div className="w-100 height-500">
          <canvas ref={canvasRef} id="chart"></canvas>
        </div>
        <table>
          <thead id="results-heading"></thead>
          <tbody id="results-body"></tbody>
        </table>
        <div id="historyContainer" style={{ display: "none" }}></div>
        <div id="history"></div>
        <Button>Download</Button>
      </div>
    </>
  );
}
