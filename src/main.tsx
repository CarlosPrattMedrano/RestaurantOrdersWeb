import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme";

const queryClient = new QueryClient();

// function GlobalLoader() {
//   const isFetching = useIsFetching();
//   if (isFetching) {
//     return (
//       <Container sx={{ mt: 10, textAlign: "center" }}>
//         <CircularProgress />
//       </Container>
//     );
//   }
//   return null;
// }

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
        {/* <GlobalLoader /> */}
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
