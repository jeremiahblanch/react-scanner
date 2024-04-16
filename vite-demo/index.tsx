import React from "react";
import ReactDOM from "react-dom";
import { Scanner } from '../src/';

ReactDOM.render(
  <React.StrictMode>
    <Scanner
      style={{ width: "100vw", height: "100vh" }}
      onScan={console.log}
      aspectRatio="unset"
    />
  </React.StrictMode>,
  document.querySelector("#root")
);
