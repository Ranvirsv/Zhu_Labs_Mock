import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import { Chart, ChartConfiguration, ChartType } from "chart.js";
// import { enUS } from "date-fns/locale";
// import { add, parseISO } from "date-fns";
// import { parse } from "mathjs";

// interface HistoryEntry {
//   system: string;
//   temp: number;
//   mNaCl: number;
// }

export default function H2SCalculatorOnline() {
  return <div></div>;
  // const [system, setSystem] = useState(0); // 0: CO₂-H₂O-NaCl, 1: H₂S-H₂O-NaCl, 2: CO₂-H₂S-H₂O-NaCl
  // const [temp, setTemp] = useState(300);
  // const [mNaCl, setMNaCl] = useState(1);
  // const [xCoord, setXCoord] = useState(0); // 0: P, Bar, 1: xH₂S + xCO₂, 2: ρ, kg/m₃, 3: λ, H₂S
  // const [yCoord, setYCoord] = useState(1); // Same options as xCoord
  // const [history, setHistory] = useState<HistoryEntry[]>([]);
  // const [chartData, setChartData] = useState<ChartConfiguration["data"] | null>(
  //   null
  // );
  // // ... (Chart setup and update logic)
  // const runExperiment = () => {
  //   // ... (Perform calculations based on user inputs)
  //   // Update history
  //   setHistory([...history, { system: getSystemName(system), temp, mNaCl }]);
  //   // Update chart data
  //   setChartData({
  //     // ... (Set chart data based on calculations)
  //   });
  // };
  // const clearGraph = () => {
  //   setChartData(null);
  //   setHistory([]);
  // };
  // const downloadData = () => {
  //   // ... (Generate and download data file)
  // };
  // return (
  //   <div className="m-5 p-5">
  //     <h2 className="pageHeader">
  //       H<sub>2</sub>S SOLUBILITY CALCULATOR
  //     </h2>
  //     <hr />
  //     <div style={{ display: "flex" }}>
  //       <div style={{ flex: 1 }}>
  //         <Form onSubmit={(event) => event.preventDefault()}>
  //           <Form.Group className="mb-3">
  //             <Form.Label htmlFor="system">Select a System</Form.Label>
  //             <Form.Select
  //               id="system"
  //               value={system}
  //               onChange={(e) => setSystem(Number(e.target.value))}
  //             >
  //               <option value={0}>CO₂-H₂O-NaCl</option>
  //               <option value={1}>H₂S-H₂O-NaCl</option>
  //               <option value={2}>CO₂-H₂S-H₂O-NaCl</option>
  //             </Form.Select>
  //           </Form.Group>
  //           <Form.Group className="mb-3">
  //             <Form.Label htmlFor="temp">Temperature, K</Form.Label>
  //             <Form.Control
  //               type="number"
  //               id="temp"
  //               value={temp}
  //               onChange={(e) => setTemp(Number(e.target.value))}
  //             />
  //             <p style={{ color: "gray" }} id="tempRange">
  //               Accepted Range: 298.15-373.15
  //             </p>
  //           </Form.Group>
  //           {/* ... (Other form input fields) */}
  //           <Button variant="primary" onClick={runExperiment}>
  //             Run
  //           </Button>
  //         </Form>
  //       </div>
  //       {/* ... (History container) */}
  //     </div>
  //     <br />
  //     <Button variant="secondary" onClick={clearGraph}>
  //       Clear Graph
  //     </Button>
  //     {/* ... (Chart and download button) */}
  //     {/* ... (Results table) */}
  //   </div>
  // );
}
// function getSystemName(system: number): string {
//   throw new Error("Function not implemented.");
// }
