import { Grid } from "@mui/material";
import type { Product } from "../api/products";
import { ProductCard } from "./ProductCard";

interface ProductsProps {
  products?: Product[];
  addItem: (id: number, name: string, price: number) => void;
}

export default function Products({ products, addItem }: ProductsProps) {
  return (
    <Grid container spacing={2}>
      {products?.map((p: Product) => (
        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={p.id}>
          <ProductCard
            product={p}
            onAdd={() => addItem(p.id, p.name, p.price)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
