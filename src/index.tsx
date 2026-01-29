import React, { StrictMode } from "react";
import "./index.css";
import App from "./hoc/App";
import { createRoot } from "react-dom/client";
import { Root } from "./hoc/Root.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root>
      <App />
    </Root>
  </StrictMode>
);
