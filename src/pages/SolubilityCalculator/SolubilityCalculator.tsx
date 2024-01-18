import React from "react";

export default function SolubilityCalculator() {
  return (
    <div className="m-5 p-5">
      <h2 className="pageHeader">CO2 SOLUBILITY CALCULATOR</h2>
      <hr />
      <pre>
        CO <sub>2</sub> solubility in aqueous NaCl solution--------- <br />
        Duan Z, Sun R, Zhu C, Chou I (Marine Chemistry, 2006, v98, 131-139)
        <br />
        T-P-X range of this model: 273-533 K, 0-2000 bar, 0-4.5 mNaCl <br />
        Unit---T: K, P(total): bar, mNaCl and mCO2: mol/kgH2O <br />
      </pre>
    </div>
  );
}
