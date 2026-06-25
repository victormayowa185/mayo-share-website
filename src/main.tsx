import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initI18n } from "./i18n";
import "./styles/theme.css"; // Ensure this matches your filename
import { initTheme } from './themeInit';

const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

initTheme();
const root = ReactDOM.createRoot(container);

// Initialize i18n before rendering the app
initI18n().then(() => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <I18nextProvider i18n={i18next}>
          <App />
        </I18nextProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
});