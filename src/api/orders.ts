
import api from "./client";

// interface OrderItem {
//   id: number;
//   quantity: number;
//   name: string;
//   price: number;
// }

export async function createOrder(table: number, product_ids: number[]) {
  console.log("creating order", table, product_ids);
  await api.post("/orders/", { table, product_ids, status: "pending" });
  await new Promise((r) => setTimeout(r, 1000));
  return 'ok';
}

export async function fetchOrders() {
  const response = await api.get("/orders/");
  return response.data;
}

export async function fetchOrderByTable(tableId: number) {
  const response = await api.get(`/orders/table/${tableId}`);
  return response.data;
}

export async function updateOrder(orderId: number, product_ids: number[]) {
  const response = await api.patch(`/orders/${orderId}/`, { product_ids });
  return response.data;
}
export async function updateOrderStatus(orderId: number, status: "pending" | "ready" | "served"| "paid"| "cancelled") {
  const response = await api.patch(`/orders/${orderId}/`, { status });
  return response.data;
}

export async function deleteOrder(orderId: number) {
  const response = await api.delete(`/orders/${orderId}/`);
  return response.data;
}