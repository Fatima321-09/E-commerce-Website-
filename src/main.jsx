import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";
import ErrorBoundary from "./app/components/ErrorBoundary";
import { UserProvider } from "./app/context/Usercontext";
import { CartProvider } from "./app/context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
