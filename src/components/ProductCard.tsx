import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

interface ProductCardProps {
  product: {
    name: string;
    price: number;
  };
  onAdd: () => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardActionArea onClick={onAdd}>
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="600"
            color="text.primary"
            gutterBottom
          >
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="info.main" fontWeight={500}>
            ${product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
