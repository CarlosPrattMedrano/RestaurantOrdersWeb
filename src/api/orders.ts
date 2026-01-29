
import api from "./client";

export interface Order {
  id: number;
  table: number;
  status: string;
  products: OrderItem[];
  total: number;
  paid_at?: string;
}

export interface OrderItem {
  productId: number;
  quantity: number;
  name: string;
  price: number;
}
export type OrderStatus = "pending" | "ready" | "served" | "paid" | "cancelled";
export async function createOrder(table: number, items: OrderItem[]) {
  console.log("creating order", table, items);
  const itemsWithProductIds = items.map(item => ({
    productId: item.productId,
    quantity: item.quantity,
  }))
  await api.post("/orders/", { table, products: itemsWithProductIds, status: "pending" });
  await new Promise((r) => setTimeout(r, 1000));
  return 'ok';
}

export async function fetchOrders() {
  const response = await api.get("/orders/");
  return response.data;
}

export async function fetchOrderByTable(tableId: string | number) {
  const response = await api.get(`/orders/table/${tableId}`);
  return response.data;
}

export async function updateOrder(orderId: number, product_ids: number[]) {
  const response = await api.patch(`/orders/${orderId}/`, { product_ids });
  return response.data;
}
export async function updateOrderStatus(orderId: number, status: OrderStatus) {
  const response = await api.patch(`/orders/${orderId}/`, { status });
  return response.data;
}

export async function deleteOrder(orderId: number) {
  const response = await api.delete(`/orders/${orderId}/`);
  return response.data;
}

export async function payOrder(orderId: number) {
  const response = await api.post(`/orders/${orderId}/pay/`);
  return response.data;
}