import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { fetchProducts, type Product } from "../../api/products";
import { createOrder } from "../../api/orders";
import { router } from "../../router";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Container,
  Typography,
  Grid,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { updateTableStatus } from "../../api/tables";
import Products from "../../components/Products";

export default function TakeOrder() {
  const { tableId } = useParams({ from: "/takeOrder/$tableId" });
  const queryClient = useQueryClient();
  const [totalPrice, setTotalPrice] = useState(0);
  const [items, setItems] = useState<
    { id: number; quantity: number; name: string; price: number }[]
  >([]);

  const addItem = (id: number, name: string, price: number) => {
    setItems((prev) => {
      const exist = prev.find((i) => i.id === id);
      if (exist) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { id, quantity: 1, name, price }];
    });
  };
  const removeItem = (id: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };
  useEffect(() => {
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    setTotalPrice(total);
  }, [items]);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      await createOrder(
        Number(tableId),
        items.map((i) => i.id)
      );
      await updateTableStatus(Number(tableId), "occupied");
    },
    onSuccess: async () => {
      alert("Order sent!");
      setItems([]);
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      router.navigate({ to: `/tables` });
    },
  });

  if (isLoading)
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
        <Typography>Loading menu...</Typography>
      </Container>
    );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Table {tableId}
      </Typography>

      <Products products={products} addItem={addItem} />

      <Paper
        elevation={3}
        sx={{
          mt: 6,
          p: 2,
          borderRadius: 3,
          bgcolor: "background.paper",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          maxHeight: 450,
          overflowY: "auto",
        }}
      >
        <List>
          {items.map((i) => {
            const product = products?.find((p: Product) => p.id === i.id);
            return (
              <ListItem
                key={i.id}
                sx={{
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  py: 1,
                }}
              >
                <ListItemText
                  primary={`${product?.name} x${i.quantity}`}
                  secondary={`$${(product?.price || 0) * i.quantity}`}
                />
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                    },
                  }}
                  onClick={() => removeItem(i.id)}
                >
                  <DeleteIcon fontSize="small" />
                </Button>
              </ListItem>
            );
          })}
        </List>
      </Paper>
      <Grid container justifyContent="space-between" sx={{ mt: 2, mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          Total:
        </Typography>
        <Typography variant="h5" fontWeight={700} color="success.main">
          ${totalPrice.toFixed(2)}
        </Typography>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending || items.length === 0}
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
          {mutation.isPending ? "Sending..." : "Send Order"}
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
    </Container>
  );
}
