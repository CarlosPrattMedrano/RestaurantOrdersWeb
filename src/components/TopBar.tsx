// src/components/TopBar.tsx
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/auth";
import Box from "@mui/material/Box";
import { router, useAuthQuery } from "../router";

const bounceButtonStyle = {
  fontWeight: "bold",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    backgroundColor: "#edcf7bff",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
};

export default function TopBar() {
  const { data } = useAuthQuery();
  const queryClient = useQueryClient();
  console.log("User data in TopBar:", data);

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["authStatus"] });
      router.navigate({ to: "/login", replace: true });
    },
  });

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
        >
          Restaurant Orders
        </Typography>

        <Box sx={{ flexGrow: 1, display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.navigate({ to: "/tables", replace: true })}
            sx={bounceButtonStyle}
          >
            Tables
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.navigate({ to: "/orders", replace: true })}
            sx={bounceButtonStyle}
          >
            Active Orders
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled
            onClick={() => router.navigate({ to: "/orders", replace: true })}
            sx={bounceButtonStyle}
          >
            History Orders
          </Button>
        </Box>
        {data?.user && <Typography sx={{ mr: 2 }}>{data.user.name}</Typography>}

        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            sx={bounceButtonStyle}
          >
            {mutation.isPending ? "Logging out..." : "Logout"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
