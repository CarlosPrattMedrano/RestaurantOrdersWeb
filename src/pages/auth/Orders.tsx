import Container from "@mui/material/Container";
import { fetchOrders } from "../../api/orders";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "@tanstack/react-query";
import { OrderCard } from "../../components/OrderCard";
import type { Order } from "../../components/TableCard";
import Grid from "@mui/material/Grid";

///List of table orders
export default function Orders() {
  const {
    data: orders,
    isLoading: loadingOrders,
    error: errorOrders,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
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
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      <Grid container spacing={2}>
        {orders.map((order: Order) => (
          <Grid size={6} key={order.id}>
            <OrderCard order={order} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
