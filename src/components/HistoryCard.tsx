import { Card, CardContent, Typography } from "@mui/material";
import type { Order } from "../api/orders";

export function HistoryCard({ order }: { order: Order }) {
  return (
    <Card
      sx={{
        bgcolor: "#E3F2FD",
        color: "#1565C0",
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography variant="h5" fontWeight="bold">
          Total {order.table} - ${order.total}
        </Typography>
        <Typography variant="body1"></Typography>
        {order.products.map((product, index) => (
          <Typography key={index}>
            {product.name} - ${product.price} x{product.quantity}
          </Typography>
        ))}
        <Typography variant="body2">
          Date:{" "}
          {order.paid_at
            ? new Date(order.paid_at).toLocaleString()
            : "Not paid yet"}
        </Typography>
      </CardContent>
    </Card>
  );
}
