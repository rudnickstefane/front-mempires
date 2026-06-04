/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { useClientHook, useClientSelection } from "@sr/common/hooks";
import { CheckboxController } from "@sr/common/iu/components/Inputs/Checkbox";
import { TextField } from "@sr/common/iu/components/Inputs/TextField/TextField";
import { Skeleton } from "@sr/common/iu/components/Skeleton/Skeleton";
import { Typography } from "@sr/common/iu/components/Typography";
import { Alert } from "@sr/common/ui/Alert";
import { FormatCode } from "@sr/modules/common/utils/FormatCodeAndIdentity.util";
import { formatText } from "@sr/utils";
import { useFormikContext } from "formik";
import { SearchStatus } from "iconsax-react";
import { useEffect, useMemo, useState } from "react";
import { Show } from "../Show";

export function ClientsForm() {
  const { values, errors, touched } = useFormikContext<any>();
  const { handleFilterChange, isPending, rows } = useClientHook(true);
  const { selectedClients, toggleClient, isMaxReached } = useClientSelection();

  const [currentResultTerm, setCurrentResultTerm] = useState("");
  const searchValue = values.clientSearch || "";

  useEffect(() => {
    const handler = setTimeout(() => {
      handleFilterChange({ search: searchValue });
      setCurrentResultTerm(searchValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [handleFilterChange, searchValue]);

  const isTyping = searchValue.trim().length > 0;
  const isStale = searchValue !== currentResultTerm;

  const apiResults = useMemo(() => {
    if (!isTyping || isStale) return [];

    return rows.filter(
      (row: any) =>
        !selectedClients.some((s: any) => s.clientCode === row.clientCode),
    );
  }, [isTyping, isStale, rows, selectedClients]);

  const showSkeleton = isTyping && (isPending || isStale);
  const hasApiResults = apiResults.length > 0;
  const hasSelectedClients = selectedClients.length > 0;

  const notFound = !isPending && !isStale && isTyping && rows.length === 0;

  const showEmptyState = !isTyping && !hasSelectedClients;

  return (
    <Box className="flex flex-col gap-6">
      <TextField
        name="clientSearch"
        placeholder="Busque pelo nome ou CNPJ do convênio"
        startIcon={<SearchStatus variant="Linear" />}
        fullWidth
        className="m-0"
      />

      <Box className="flex justify-between items-end">
        <Typography className="font-bold text-sm text-neutral-800">
          Selecione os convênios abaixo
        </Typography>
        <Typography className="text-sm text-neutral-500">
          {selectedClients.length} de 10 selecionados
        </Typography>
      </Box>

      <Show hidden={!notFound} variant="effect">
        <Alert
          variant="warning"
          title="O Convênio informado não foi encontrado."
          message="Verifique o CNPJ ou digite um novo nome para pesquisar."
        />
      </Show>

      <Show hidden={!showEmptyState} variant="effect">
        <Typography className="p-8 text-center text-sm text-neutral-500 border border-dashed border-neutral-300 rounded-xl">
          Pesquise o convênio para vinculá-lo.
        </Typography>
      </Show>

      <Show
        hidden={!showSkeleton}
        variant="effect"
        className="flex flex-col gap-2"
      >
        {[1, 2].map((i) => (
          <Box
            key={i}
            className="flex flex-col p-4 border border-solid border-neutral-200 rounded-xl"
          >
            <Skeleton count={2} gap={2} />
          </Box>
        ))}
      </Show>

      <Show
        hidden={!hasApiResults && !hasSelectedClients}
        variant="effect"
        className="flex flex-col gap-2"
      >
        {apiResults.map((client: any) => (
          <CheckboxController
            key={client.clientCode}
            variant="card"
            checked={false}
            disabled={isMaxReached}
            onValueChange={() => toggleClient(client)}
            label={
              <Box className="flex flex-col">
                <Typography className="text-sm font-bold text-neutral-800">
                  {formatText(client.name)}
                </Typography>
                <Typography className="text-sm text-neutral-500">
                  {FormatCode(client.code)}
                </Typography>
              </Box>
            }
          />
        ))}

        {selectedClients.map((client: any) => (
          <CheckboxController
            key={client.clientCode}
            variant="card"
            checked={true}
            onValueChange={() => toggleClient(client)}
            label={
              <Box className="flex flex-col">
                <Typography className="text-sm font-bold text-neutral-800">
                  {formatText(client.fantasyName || client.name)}
                </Typography>
                <Typography className="text-sm text-neutral-500">
                  {FormatCode(client.code)}
                </Typography>
              </Box>
            }
          />
        ))}
      </Show>

      <Show
        hidden={!((touched.clients && errors.clients) || isMaxReached)}
        variant="effect"
      >
        <Alert
          variant={errors.clients ? "error" : "warning"}
          title={errors.clients ? "Ops, falta algo!" : "Atenção"}
          message={
            (errors.clients as string) ||
            "Você atingiu o limite máximo de 10 convênios selecionados."
          }
        />
      </Show>
    </Box>
  );
}
