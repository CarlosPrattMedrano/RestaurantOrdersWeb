import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { router } from "../router";
import { type OrderStatus } from "../api/orders";

interface UpdateOrderStatusButtonsProps {
  mutation: (status: OrderStatus) => void;
  mutationFinish: () => void;
  // items: OrderItem[];
  orderId: number;
  isPending: boolean;
  status: OrderStatus;
}

export function UpdateOrderStatusButtons({
  mutation,
  mutationFinish,
  // items,
  orderId,
  isPending,
  status,
}: UpdateOrderStatusButtonsProps) {
  console.log("UpdateOrderStatusButtons items", orderId);
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {/* <Button
        variant="contained"
        color="success"
        fullWidth
        // onClick={() => mutation()}
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
        {isPending ? "Sending..." : "Update Order"}
      </Button> */}
      {status === "served" ? null : (
        <Button
          variant="contained"
          color="info"
          fullWidth
          onClick={() => {
            mutation("served");
            router.navigate({ to: `/tables` });
          }}
          disabled={isPending}
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
          {isPending ? "Sending..." : "Set Order as Served"}
        </Button>
      )}

      <Button
        variant="contained"
        color="success"
        fullWidth
        onClick={() => mutationFinish()}
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
        Paid and finish order
      </Button>
    </Grid>
  );
}
