import type { Table } from "../components/TableCard";
import api from "./client";
// const DUMMY_TABLES: Table[] = [
//   { id: 1, number: 1, status: "free" },
//   { id: 2, number: 2, status: "free" },
//   { id: 3, number: 3, status: "free" },
//   { id: 4, number: 4, status: "free" },
//   { id: 5, number: 5, status: "free" },
//   { id: 6, number: 6, status: "free" },
//   { id: 7, number: 7, status: "free" },
//   { id: 8, number: 8, status: "free" },
//   { id: 9, number: 9, status: "occupied" },
//   { id: 10, number: 10, status: "free" },
//   { id: 11, number: 11, status: "free" },
//   { id: 12, number: 12, status: "occupied" },
// ];

export async function fetchTables() {
  // await new Promise((r) => setTimeout(r, 1000));
  const response = await api.get("/tables/");
  return response.data;
}
export async function updateTableStatus(id: number, status: "occupied" | "available" | "reserved") {
  // await new Promise((r) => setTimeout(r, 500));
  // DUMMY_TABLES.find((t) => t.number === number)!.status = status;
  const response = await api.patch(`/tables/${id}/`, { status });
  return response.status;
}