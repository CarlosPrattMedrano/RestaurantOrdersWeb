import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#f8c049ff" },
    info: { main: "#4a9ef1ff" },
    secondary: { main: "#000000ff" },
    background: { default: "#f5f5f5" },
    success: { main: "#58bb5bff" },
    error: { main: "#e14141ff" },
  },
  shape: {
    borderRadius: 10,
  },
});
