import { Box } from "@mui/material";
import { Card, StatCard } from "@sr/common/components/Card";
import { Buildings, Buildings2, StatusUp } from "iconsax-react";
import { RendererModulesType } from "../../Portal/pages/home/types/gym-management.types";
import { TablePartner } from "../components/Table";
import { usePartnerPageHook } from "../hooks";
import { FindPartnersResponse } from "../types";

export type PartnerProps = {
  data: {
    partners: FindPartnersResponse;
    loading: boolean;
  };
  label?: {
    code: string;
  };
  openDrawer: (index: number) => void;
  onNavigate: (module: RendererModulesType) => void;
  refresh?: () => Promise<void>;
};

export function PartnersPage() {
  const {
    isPending,
    partnersQuery,
    columns,
    rows,
    metrics,
    pagination,
    setPage,
    setLimit,
    setFilters,
  } = usePartnerPageHook();

  const isPositive = (metrics?.growthPercentage ?? 0) >= 0;

  const statsConfig = [
    {
      title: "Total de parceiros",
      value: metrics?.totalGeneral?.toLocaleString("pt-BR") || 0,
      icon: <Buildings variant="Bulk" size={24} />,
    },
    {
      title: "Novos parceiros",
      value: metrics?.totalCurrentMonth?.toLocaleString("pt-BR") || 0,
      icon: <Buildings2 variant="Bulk" size={24} />,
      change: `${isPositive ? "+" : ""}${metrics?.growthPercentage}% vs. mês anterior`,
      trend: isPositive ? ("up" as const) : ("down" as const),
    },
    {
      title: "Ativos",
      value: metrics?.totalActive || 0,
      icon: <StatusUp variant="Bulk" size={24} />,
      colorClass: "text-success",
      bgClass: "bg-success/10",
    },
    {
      title: "Inativos",
      value: metrics?.totalInactive || 0,
      icon: <StatusUp variant="Bulk" size={24} />,
      colorClass: "text-slate-500",
      bgClass: "bg-slate-100",
      iconClass: "rotate-180 scale-x-[-1]",
    },
  ];

  return (
    <>
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statsConfig.map((stat, index) => (
          <Card key={index} loading={isPending} skeletonCount={3}>
            <StatCard {...stat} />
          </Card>
        ))}
      </Box>

      <TablePartner
        queryResult={partnersQuery}
        data={rows}
        columns={columns}
        setPage={setPage}
        setLimitPagination={setLimit}
        pagination={pagination}
        isDataWithEdges={true}
        filters={[
          {
            type: "search",
            name: "search",
            placeholder: "Buscar por nome ou CNPJ",
          },
          {
            type: "checkbox",
            name: "isActive",
            label: "Somente ativos",
          },
        ]}
        onFilterChange={(f) => {
          setPage(1);
          setFilters({
            search: f.search ?? "",
            isActive: f.isActive ?? false,
          });
        }}
      />
    </>
  );
}
