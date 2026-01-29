import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import type { Order } from "./TableCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "../api/orders";

const statusStyles = {
  pending: {
    bgcolor: "#fdecea",
    color: "#c62828",
  },
  ready: {
    bgcolor: "#FFF3CD",
    color: "#B8860B",
  },
  served: {
    bgcolor: "#E3F2FD",
    color: "#1565C0",
  },
};
export function OrderCard({ order }: { order: Order }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      await updateOrderStatus(order.id, "ready");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
  const disabled = order.status !== "pending";
  return (
    <Card
      sx={{
        ...statusStyles[order.status as keyof typeof statusStyles],
        borderRadius: 2,
        transition: "all 0.3s ease",
        "&:hover": disabled
          ? {}
          : {
              transform: "scale(1.05)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            },
      }}
    >
      <CardActionArea onClick={() => mutation.mutate()} disabled={disabled}>
        {/* {mutation.isPending ? "Sending..." : "Send Order"} */}
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            Table {order.table} - ${order.total}
          </Typography>
          <Typography variant="body1"></Typography>
          {order.products.map((product, index) => (
            <Typography key={index}>
              {product.name} - ${product.price} x{product.quantity}
            </Typography>
          ))}
          <Typography variant="body2">Status: {order.status}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
