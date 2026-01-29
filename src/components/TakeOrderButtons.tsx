import { Grid, Button } from "@mui/material";
import { router } from "../router";
import type { OrderItem } from "../api/orders";

interface TakeOrderButtonsProps {
  mutation: () => void;
  items: OrderItem[];
  isPending: boolean;
}
export function TakeOrderButtons({
  mutation,
  items,
  isPending,
}: TakeOrderButtonsProps) {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Button
        variant="contained"
        color="success"
        fullWidth
        onClick={() => mutation()}
        disabled={isPending || items.length === 0}
        sx={{
          fontSize: "1.3rem",
          fontWeight: "bold",
          py: 1.5,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          },
        }}
      >
        {isPending ? "Sending..." : "Send Order"}
      </Button>
      <Button
        variant="contained"
        color="error"
        fullWidth
        onClick={() => router.navigate({ to: `/tables` })}
        sx={{
          fontSize: "1rem",
          fontWeight: "bold",
          py: 1.5,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          },
        }}
      >
        Cancel Order
      </Button>
    </Grid>
  );
}
