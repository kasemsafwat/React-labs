import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import CounterContextProvider from "./components/Context/CounterContext.jsx";
import TokenContextProvider from "./components/Context/TokenContext.jsx";
import { CartProvider } from "./components/Context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CounterContextProvider>
      <TokenContextProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </TokenContextProvider>
    </CounterContextProvider>
  </StrictMode>
);
