import { useQuery } from "@tanstack/react-query";
import { fetchTables } from "../../api/tables";
import { TableCard, type Table } from "../../components/TableCard";
import { Typography, Container, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import { router } from "../../router";

export default function Tables() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tables"],
    queryFn: fetchTables,
  });

  if (isLoading)
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
        <Typography>Loading tables...</Typography>
      </Container>
    );

  if (error)
    return <Typography color="error">Error loading tables :c</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tables
      </Typography>
      <Grid container spacing={2}>
        {data?.map((table: Table) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={table.id}>
            <TableCard
              table={table}
              onClick={() => {
                router.navigate({ to: `/order/${table.id}` });
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
