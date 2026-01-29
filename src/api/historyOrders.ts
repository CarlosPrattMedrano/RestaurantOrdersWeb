import api from "./client";



export async function fetchHistoryOrders() {
  const response = await api.get("/history/");
  return response.data;
}