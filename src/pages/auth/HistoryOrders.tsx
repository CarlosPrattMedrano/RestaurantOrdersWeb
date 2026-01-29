import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchHistoryOrders } from "../../api/historyOrders";
import { HistoryCard } from "../../components/HistoryCard";
import type { Order } from "../../api/orders";

export function HistoryOrders() {
  const {
    data: orders,
    isLoading: loadingOrders,
    error: errorOrders,
  } = useQuery({
    queryKey: ["historyOrders"],
    queryFn: fetchHistoryOrders,
  });

  if (loadingOrders)
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
        <Typography>Loading orders...</Typography>
      </Container>
    );

  if (errorOrders)
    return <Typography color="error">Error loading orders :c</Typography>;
  console.log("HistoryOrders orders", orders);
  return (
    <Container sx={{ mt: 4 }}>
      hola
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      <Grid container spacing={2}>
        {orders.map((order: Order) => (
          <Grid size={6} key={order.id}>
            <HistoryCard order={order} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
