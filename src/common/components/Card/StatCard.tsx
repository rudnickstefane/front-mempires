import { Box } from "@mui/material";
import { Typography } from "@sr/common/iu/components/Typography";
import { TrendingDown, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: React.ReactNode;
  change?: string;
  trend?: "up" | "down";
  icon: React.ReactNode;
  colorClass?: string; // Ex: text-primary, text-success
  bgClass?: string; // Ex: bg-primary/10, bg-success/10
  iconClass?: string; // Para o rotate/scale
}

export function StatCard({
  title,
  value,
  change,
  trend,
  icon,
  colorClass = "text-primary",
  bgClass = "bg-primary/10",
  iconClass = "",
}: StatCardProps) {
  return (
    <Box className="flex items-start justify-between w-full">
      <Box className="flex flex-col gap-3">
        <Typography
          translateId={title}
          className="text-sm text-gray-500 font-medium"
        />
        <Typography
          className={`text-3xl font-bold ${title === "Ativos" ? "text-green-600" : "text-primary-950"}`}
        >
          {value}
        </Typography>

        {change && (
          <Box
            className={`flex items-center gap-2 text-sm ${trend === "up" ? "text-green-600" : "text-red-500"}`}
          >
            {trend === "up" ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            <Box>{change}</Box>
          </Box>
        )}
      </Box>

      <Box
        className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${bgClass} ${colorClass}`}
      >
        <Box className={`${iconClass} flex items-center justify-center`}>
          {icon}
        </Box>
      </Box>
    </Box>
  );
}
