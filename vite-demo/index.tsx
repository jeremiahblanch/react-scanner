import React from "react";
import { createRoot } from "react-dom/client";
import { Scanner } from '../src/';

const container = document.querySelector("#root");
const root = createRoot(container!);
root.render(
  <Scanner
    style={{ width: "100vw", height: "100vh" }}
    onScan={console.log}
    aspectRatio="unset"
  />
);
