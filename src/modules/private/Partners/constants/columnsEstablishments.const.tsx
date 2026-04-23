/* eslint-disable @typescript-eslint/no-explicit-any */
import { Switch } from "@sr/common/components/Switch";
import { Typography } from "@sr/common/iu/components/Typography";
import { FormatCode } from "@sr/modules/common/utils/FormatCodeAndIdentity.util";
import { formatText } from "@sr/utils";
import { createColumnHelper } from "@tanstack/react-table";
import { EstablishmentProps } from "../types";
import { EstablishmentsActions } from "./actionsTableEstablishments.const";

const columnHelper = createColumnHelper<EstablishmentProps>();

export const columnsEstablishments = (
  onToggleStatus: (
    brandCode: string,
    partnerCode: string,
    name: string,
    isActive: boolean,
  ) => void,
  openDrawer: (partner: any) => void,
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
  columnHelper.accessor("company.fantasyName", {
    header: () => (
      <Typography className="text-sm font-bold">Nome fantasia</Typography>
    ),
    cell: (info) => (
      <Typography className="text-sm">{formatText(info.getValue())}</Typography>
    ),
  }),
  columnHelper.accessor("company.code", {
    header: () => <Typography className="text-sm font-bold">CNPJ</Typography>,
    cell: (info) => (
      <Typography className="text-sm">
        {info.getValue() ? FormatCode(info.getValue()) : "-"}
      </Typography>
    ),
  }),
  columnHelper.accessor("company.code", {
    header: () => (
      <Typography className="text-sm font-bold">Bandeira</Typography>
    ),
    cell: (info) => (
      <Typography className="text-sm">
        {info.getValue() ? FormatCode(info.getValue()) : "-"}
      </Typography>
    ),
  }),
  columnHelper.accessor("storeCount", {
    header: () => (
      <Typography className="text-sm font-bold">Endereço</Typography>
    ),
    cell: (info) => (
      <Typography className="text-sm">{info.getValue()}</Typography>
    ),
  }),
  columnHelper.display({
    id: "actions",
    cell: (info) => (
      <EstablishmentsActions
        partner={info.row.original}
        onEdit={() => openDrawer(info.row.original)}
        onDelete={() =>
          onDelete(
            info.row.original.partnerCode || "",
            info.row.original.company.fantasyName,
          )
        }
      />
    ),
  }),
];
