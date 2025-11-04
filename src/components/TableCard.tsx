import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

export interface Table {
  id: number;
  status: string;
  number: number;
}

interface TableCardProps {
  table: Table;
  onClick: () => void;
}

export function TableCard({ table, onClick }: TableCardProps) {
  const disabled = table.status === "occupied" ? true : false;
  return (
    <Card
      sx={{
        bgcolor: table.status === "occupied" ? "#fdecea" : "#e8f5e9",
        color: table.status === "occupied" ? "#c62828" : "#2e7d32",
        borderRadius: 2,
        transition: "all 0.3s ease",
        "&:hover": disabled
          ? {}
          : {
              transform: "scale(1.05)",
              // transform: "translateY(-5px)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            },
      }}
    >
      <CardActionArea onClick={onClick} disabled={disabled}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            Table {table.number}
          </Typography>
          <Typography variant="body2">{table.status}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
