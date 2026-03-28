import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: false,
    },
  },
  queryCache: new QueryCache({}),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </MantineProvider>
      </QueryClientProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
);
