import { RouterProvider } from "@tanstack/react-router";
import { router, useAuthQuery } from "./router";
import Box from "@mui/material/Box";
import TopBar from "./components/TopBar";

export default function App() {
  const { data } = useAuthQuery();
  const isAuthenticated = data?.isAuthenticated;
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {isAuthenticated && <TopBar />}
      <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
        <RouterProvider router={router} />
      </Box>
    </Box>
  );
}
