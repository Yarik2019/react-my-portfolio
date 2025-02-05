import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ThemeProvider from "./contexts/ThemeProvider.jsx";
import App from "./App.jsx";
import "modern-normalize";
import "./index.css";
import "./i18n.js";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
