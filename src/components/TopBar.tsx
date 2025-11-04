// src/components/TopBar.tsx
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/auth";
import Box from "@mui/material/Box";
import { router, useAuthQuery } from "../router";

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
          onClick={() => router.navigate({ to: "/tables", replace: true })}
        >
          Restaurant Orders
        </Typography>

        {data?.user && <Typography sx={{ mr: 2 }}>{data.user.name}</Typography>}

        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            sx={{
              fontWeight: "bold",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                backgroundColor: "#c62828",
              },
              "&:active": {
                transform: "scale(0.95)",
              },
            }}
          >
            {mutation.isPending ? "Logging out..." : "Logout"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
