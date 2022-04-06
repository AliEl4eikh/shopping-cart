import React, { StrictMode } from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

const container = document.getElementById("root");
if (!container) throw new Error("failed to find the root element");

const root = createRoot(container);

const client = new QueryClient();

root.render(
  <QueryClientProvider client={client}>
    <StrictMode>
      <App />
    </StrictMode>
  </QueryClientProvider>
);
