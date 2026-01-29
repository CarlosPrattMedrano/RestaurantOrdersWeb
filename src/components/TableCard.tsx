import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import type { Order } from "../api/orders";

export interface Table {
  id: number;
  status: string;
  number: number;
}

interface TableCardProps {
  table: Table;
  order?: Order;
  onClick: () => void;
}

const tableOrderStyles = {
  available: {
    bgcolor: "#e8f5e9",
    color: "#2e7d32",
    clickable: true,
  },
  occupied: {
    pending: {
      bgcolor: "#fdecea",
      color: "#c62828",
      clickable: false,
    },
    ready: {
      bgcolor: "#FFF3CD",
      color: "#B8860B",
      clickable: true,
    },
    served: {
      bgcolor: "#E3F2FD",
      color: "#1565C0",
      clickable: true,
    },
  },
};
export function TableCard({ table, order, onClick }: TableCardProps) {
  const getTableOrderStyles = () => {
    if (table.status === "available") {
      return tableOrderStyles.available;
    }
    return tableOrderStyles.occupied[
      order?.status as keyof typeof tableOrderStyles.occupied
    ];
  };
  const disabled = getTableOrderStyles()?.clickable === false;
  return (
    <Card
      sx={{
        bgcolor: getTableOrderStyles()?.bgcolor,
        color: getTableOrderStyles()?.color,
        borderRadius: 2,
        transition: "all 0.3s ease",
        "&:hover": disabled
          ? {}
          : {
              transform: "scale(1.05)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            },
      }}
    >
      <CardActionArea onClick={onClick} disabled={disabled}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            Table {table.number}
          </Typography>
          <Typography variant="body2">
            Table {table.status} -{" "}
            {order ? `Order ${order.status}` : "No current order"}{" "}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
