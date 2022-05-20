import ReactDOM from "react-dom/client";
import App from "./app/App";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <App />
      </Container>
    </React.Fragment>
  </React.StrictMode>
);
