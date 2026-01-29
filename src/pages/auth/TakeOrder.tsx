import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { fetchProducts, type Product } from "../../api/products";
import {
  createOrder,
  fetchOrders,
  payOrder,
  updateOrderStatus,
  type OrderItem,
  type OrderStatus,
} from "../../api/orders";
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
import type { Order } from "../../components/TableCard";
import { TakeOrderButtons } from "../../components/TakeOrderButtons";
import { UpdateOrderStatusButtons } from "../../components/UpdateOrderButtons";

export default function TakeOrder() {
  const { tableId } = useParams({ from: "/takeOrder/$tableId" });
  const queryClient = useQueryClient();
  const [totalPrice, setTotalPrice] = useState(0);
  const [items, setItems] = useState<OrderItem[]>([]);
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: order } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    select: (orders) => orders.find((o: Order) => o.table === Number(tableId)),
  });
  const tableOrder = order as Order;
  console.log("tableOrder", tableOrder);
  useEffect(() => {
    if (tableOrder?.products && items.length === 0) {
      const initialItems = tableOrder.products.map((p: OrderItem) => ({
        productId: p.productId,
        quantity: p.quantity,
        name: p.name,
        price: p.price,
      }));
      setItems(initialItems);
    }
  }, [tableOrder, items.length]);
  const addItem = (id: number, name: string, price: number) => {
    setItems((prev) => {
      const exist = prev.find((i) => i.productId === id);
      if (exist) {
        return prev.map((i) =>
          i.productId === id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { productId: id, quantity: 1, name, price }];
    });
  };
  const removeItem = (id: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.productId === id ? { ...i, quantity: i.quantity - 1 } : i,
        )
        .filter((i) => i.quantity > 0),
    );
  };
  useEffect(() => {
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    setTotalPrice(total);
  }, [items]);

  const mutationCreateOrder = useMutation({
    mutationFn: async () => {
      await createOrder(Number(tableId), items);
      await updateTableStatus(Number(tableId), "occupied");
    },
    onSuccess: async () => {
      alert("Order sent!");
      setItems([]);
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      router.navigate({ to: `/tables` });
    },
  });

  // const mutationUpdateOrder = useMutation({
  //   mutationFn: async () => {
  //     await updateOrder(
  //       Number(tableId),
  //       items.map((i) => i.id),
  //     );
  //     await updateOrderStatus(tableOrder.id, "pending");
  //   },
  //   onSuccess: async () => {
  //     alert("Order updated!");
  //     setItems([]);
  //     await queryClient.invalidateQueries({ queryKey: ["orders"] });
  //     router.navigate({ to: `/tables` });
  //   },
  // });
  const mutationFinishOrder = useMutation({
    mutationFn: async () => {
      await payOrder(tableOrder.id);
      //await deleteOrder(tableOrder.id); // Temporary: delete order when finished
      await updateTableStatus(Number(tableId), "available");
    },
    onSuccess: async () => {
      alert("Order finished!");
      setItems([]);
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      router.navigate({ to: `/tables` });
    },
  });
  const mutationStatusOrder = useMutation({
    mutationFn: async (status: OrderStatus) => {
      await updateOrderStatus(tableOrder.id, status);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
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
            const product = products?.find(
              (p: Product) => p.id === i.productId,
            );
            return (
              <ListItem
                key={i.productId}
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
                  onClick={() => removeItem(i.productId)}
                >
                  <DeleteIcon fontSize="small" />
                </Button>
              </ListItem>
            );
          })}
        </List>
      </Paper>
      {/* Total price area */}
      <Grid container justifyContent="space-between" sx={{ mt: 2, mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          Total:
        </Typography>
        <Typography variant="h5" fontWeight={700} color="success.main">
          ${totalPrice.toFixed(2)}
        </Typography>
      </Grid>
      {tableOrder ? (
        <UpdateOrderStatusButtons
          mutation={mutationStatusOrder.mutate}
          mutationFinish={mutationFinishOrder.mutate}
          orderId={tableOrder.id}
          isPending={mutationStatusOrder.isPending}
          status={tableOrder.status as OrderStatus}
        />
      ) : (
        <TakeOrderButtons
          mutation={mutationCreateOrder.mutate}
          items={items}
          isPending={mutationCreateOrder.isPending}
        />
      )}
    </Container>
  );
}
