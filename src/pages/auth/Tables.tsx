import { useQuery } from "@tanstack/react-query";
import { fetchTables } from "../../api/tables";
import { TableCard, type Order, type Table } from "../../components/TableCard";
import { Typography, Container, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import { router } from "../../router";
import { fetchOrders } from "../../api/orders";

export default function Tables() {
  const {
    data: tables,
    isLoading: loadingTables,
    error: errorTables,
    isSuccess,
  } = useQuery({
    queryKey: ["tables"],
    queryFn: fetchTables,
  });

  const {
    data: orders,
    isLoading: loadingOrders,
    error: errorOrders,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    enabled: isSuccess && !!tables,
  });

  if (loadingTables || loadingOrders)
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
        <Typography>Loading tables...</Typography>
      </Container>
    );

  if (errorTables || errorOrders)
    return <Typography color="error">Error loading tables :c</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tables
      </Typography>
      <Grid container spacing={2}>
        {tables?.map((table: Table) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={table.id}>
            <TableCard
              table={table}
              order={orders.find((o: Order) => o.table === table.id)}
              onClick={() =>
                table.status === "available"
                  ? router.navigate({ to: `/takeOrder/${table.id}` })
                  : router.navigate({ to: `/tableOrder/${table.id}` })
              }
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
