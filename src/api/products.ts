// import api from "./client";

export interface Product {
  id: number;
  name: string;
  price: number;
}
const DUMMY_PRODUCTS: Product[] = [
  { id: 1, name: "Chilaquiles", price: 69 },
  { id: 2, name: "Molletes", price: 29 },
  { id: 3, name: "Sopes", price: 39 },
  { id: 4, name: "Tacos", price: 13 },
  { id: 5, name: "Torta", price: 22 },
  { id: 6, name: "Sopa", price: 40 },
  { id: 7, name: "Enchiladas", price: 89 },
  { id: 8, name: "Quesadillas", price: 40 },
  { id: 9, name: "Limonada", price: 30 },
  { id: 10, name: "Agua de Jamaica", price: 25 },
  { id: 11, name: "Café", price: 20 },
  { id: 12, name: "Coca-Cola", price: 15 },
];
export async function fetchProducts(): Promise<Product[]> {
   await new Promise((r) => setTimeout(r, 1000));
  return DUMMY_PRODUCTS;
  // const { result } = await api.get("/products/");
  // return result;
}
