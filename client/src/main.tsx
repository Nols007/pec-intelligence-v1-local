import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { PecViewProvider } from "./state/pecView";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PecViewProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PecViewProvider>
  </React.StrictMode>
);