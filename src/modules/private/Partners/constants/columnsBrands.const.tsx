/* eslint-disable @typescript-eslint/no-explicit-any */
import { Switch } from "@sr/common/components/Switch";
import { Typography } from "@sr/common/iu/components/Typography";
import { FormatCode } from "@sr/modules/common/utils/FormatCodeAndIdentity.util";
import { formatText } from "@sr/utils";
import { createColumnHelper } from "@tanstack/react-table";
import { BrandProps } from "../types";
import { BrandsActions } from "./actionsTableBrands.const";

const columnHelper = createColumnHelper<BrandProps>();

export const columnsBrands = (
  onToggleStatus: (
    brandCode: string,
    partnerCode: string,
    name: string,
    isActive: boolean,
  ) => void,
  openDrawer: (brand: any) => void,
  onDelete: (code: string, name: string) => void,
) => [
  columnHelper.accessor("details.status", {
    header: () => <Typography className="text-sm font-bold">Ativo</Typography>,
    cell: (info) => {
      const status = info.getValue();
      const isActive = status === "ACTIVE";
      const { brandCode, partnerCode, name, company } = info.row.original;

      return (
        <Switch
          isTable
          checked={isActive}
          onChange={() => {
            onToggleStatus(
              brandCode || "",
              partnerCode || "",
              name ? name : company.fantasyName,
              isActive,
            );
          }}
        />
      );
    },
  }),
  columnHelper.accessor("name", {
    header: () => (
      <Typography className="text-sm font-bold">Bandeira</Typography>
    ),
    cell: (info) => {
      const { name, company } = info.row.original;

      const displayName =
        name && name.trim() !== "" ? name : company?.fantasyName;

      return (
        <Typography className="text-sm">
          {formatText(displayName || "N/A")}
        </Typography>
      );
    },
  }),
  columnHelper.accessor("company.code", {
    header: () => <Typography className="text-sm font-bold">CNPJ</Typography>,
    cell: (info) => (
      <Typography className="text-sm">
        {info.getValue() ? FormatCode(info.getValue()) : "-"}
      </Typography>
    ),
  }),
  columnHelper.accessor("establishmentsCount", {
    header: () => <Typography className="text-sm font-bold">Lojas</Typography>,
    cell: (info) => (
      <Typography className="text-sm">{info.getValue()}</Typography>
    ),
  }),
  columnHelper.display({
    id: "actions",
    cell: (info) => (
      <BrandsActions
        brand={info.row.original}
        onEdit={() => openDrawer(info.row.original)}
        onDelete={() =>
          onDelete(
            info.row.original.brandCode || "",
            info.row.original.company.fantasyName,
          )
        }
      />
    ),
  }),
];
