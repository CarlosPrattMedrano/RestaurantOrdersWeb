// import api from "./client";

interface OrderItem {
  id: number;
  quantity: number;
  name: string;
  price: number;
}

export async function createOrder(mesa: number, items: OrderItem[]) {
  // const { data } = await api.post("/orders/", { mesa, items });
  console.log("holi", mesa, items);
  await new Promise((r) => setTimeout(r, 1000));
  return 'ok';
}
