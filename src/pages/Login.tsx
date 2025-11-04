import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "../router";
import { login } from "../api/auth";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
  };
}
export default function Login() {
  const queryClient = useQueryClient();
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");

  const mutation = useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: (credentials) =>
      login(credentials.username, credentials.password),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["authStatus"] });
      router.navigate({ to: "/" });
    },
    onError: (error) => alert(error.message),
  });

  return (
    <Container maxWidth="xs">
      <Paper sx={{ mt: 10, p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUser(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={() => mutation.mutate({ username, password })}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
