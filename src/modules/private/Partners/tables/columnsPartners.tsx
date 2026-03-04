import { IconButton } from "@mui/material";
import { Typography } from "@sr/common/iu/components/Typography";
import { createColumnHelper } from "@tanstack/react-table";
import { More } from "iconsax-react";

// Interface do Objeto de Parceiro
export interface PartnerDTO {
  id: string;
  isActive: boolean;
  businessName: string;
  cnpj: string;
  type: "Rede" | "Independente";
  storesCount: number;
  location: string;
}

const columnHelper = createColumnHelper<PartnerDTO>();

export const columnsPartners = (onActionClick: (row: PartnerDTO) => void) => [
  columnHelper.accessor("isActive", {
    header: "Ativo",
    cell: (info) => (
      <Typography className="text-sm">
        {info.getValue() ? "Sim" : "Não"}
      </Typography>
    ),
  }),
  columnHelper.accessor("businessName", {
    header: "Nome fantasia",
    cell: (info) => (
      <Typography className="text-sm">{info.getValue()}</Typography>
    ),
  }),
  columnHelper.accessor("cnpj", {
    header: "CNPJ",
    cell: (info) => (
      <Typography className="text-sm">{info.getValue()}</Typography>
    ),
  }),
  columnHelper.accessor("type", {
    header: "Tipo",
    cell: (info) => (
      <Typography className="text-sm">{info.getValue()}</Typography>
    ),
  }),
  columnHelper.accessor("storesCount", {
    header: "Lojas",
    cell: (info) => (
      <Typography className="text-sm">{info.getValue()}</Typography>
    ),
  }),
  columnHelper.accessor("location", {
    header: "Localização",
    cell: (info) => (
      <Typography className="text-sm">{info.getValue()}</Typography>
    ),
  }),
  columnHelper.display({
    id: "actions",
    cell: (info) => (
      <IconButton onClick={() => onActionClick(info.row.original)}>
        <More size={20} />
      </IconButton>
    ),
  }),
];
