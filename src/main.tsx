import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppContextProvider } from "./contexts/AppContext";
import { AtendeeContextProvider } from "./contexts/AtendeeContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <AtendeeContextProvider>
        <App />
      </AtendeeContextProvider>
    </AppContextProvider>
  </React.StrictMode>
);
