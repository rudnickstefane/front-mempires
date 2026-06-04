/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  CircularProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Select } from "@sr/common/iu/components/Select";
import { Typography } from "@sr/common/iu/components/Typography";
import { storage } from "@sr/common/storage";
import { ReactTableProps } from "@sr/common/types";
import { NoRecordsFound } from "@sr/modules/common/ui";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import { useMemo } from "react";

export function ReactTable<T>({
  data,
  columns,
  pagination,
  setPage,
  setLimitPagination,
  isLoading,
  sort,
  onSortChange,
  sortOptions = [],
}: ReactTableProps<T>) {
  const sortableFields = useMemo(() => {
    return Array.from(
      new Set(sortOptions.map((opt) => opt.value.split(":")[0])),
    );
  }, [sortOptions]);

  const limitOptions = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 15, value: 15 },
    { label: 20, value: 20 },
    { label: 25, value: 25 },
    { label: 50, value: 50 },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  const nextDirectionMap = {
    asc: "desc",
    desc: undefined,
  } as const;

  const handleSort = (columnId: string) => {
    const isSameColumn = sort?.field === columnId;

    const direction = isSameColumn
      ? nextDirectionMap[sort?.direction as "asc" | "desc"]
      : "asc";

    onSortChange?.(direction ? { field: columnId, direction } : {});
  };

  const renderSortIcon = (columnId: string) => {
    const isActive = sort?.field === columnId;

    const isAsc = isActive && sort?.direction === "asc";
    const isDesc = isActive && sort?.direction === "desc";

    return (
      <Box className="flex flex-col items-center ml-1">
        <ArrowUp2
          size={15}
          variant="Bold"
          onClick={(e) => {
            e.stopPropagation();
            handleSort(columnId);
          }}
          className={`cursor-pointer transition-colors ${
            isAsc ? "text-gray-600" : "text-gray-300"
          }`}
        />

        <ArrowDown2
          size={15}
          variant="Bold"
          onClick={(e) => {
            e.stopPropagation();
            handleSort(columnId);
          }}
          className={`cursor-pointer -mt-2 transition-colors ${
            isDesc ? "text-gray-600" : "text-gray-300"
          }`}
        />
      </Box>
    );
  };

  return (
    <Box className="w-full overflow-hidden">
      <TableContainer className="relative border-t border-gray-200">
        <Table sx={{ borderCollapse: "collapse" }}>
          <TableHead className="bg-gray-100/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  const columnId = header.column.id;

                  const isSortable = sortableFields.includes(columnId);

                  const isFirst = index === 0;
                  const isLast = index === headerGroup.headers.length - 1;

                  return (
                    <TableCell
                      key={header.id}
                      className="border-b-2 border-gray-200 px-6 py-4 relative"
                    >
                      <Box className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                        {isSortable && renderSortIcon(columnId)}
                      </Box>

                      {!isFirst && !isLast && (
                        <Box className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-px bg-gray-200" />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-60">
                  <Box className="flex flex-col items-center justify-center gap-2">
                    <CircularProgress size={40} thickness={4} />
                    <Typography variant="body2" className="text-gray-500">
                      Buscando dados...
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="transition-all duration-200 hover:bg-gray-50 group relative"
                  sx={{
                    "&:hover": {
                      boxShadow: "inset 3px 0px 0px 0px #2F3033",
                    },
                    "& td": { borderBottom: "1px solid #E5E7EB" },
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isStatusColumn = cell.column.id === "details_status";
                    const isActionColumn = cell.column.id === "actions";

                    return (
                      <TableCell
                        key={cell.id}
                        align={
                          isStatusColumn || isActionColumn ? "center" : "left"
                        }
                        className={`text-gray-700 px-6 py-4 border-none whitespace-nowrap ${
                          isStatusColumn ? "w-[1%]" : "w-auto"
                        }`}
                      >
                        <Box
                          className={
                            isStatusColumn
                              ? "flex justify-center items-center w-full"
                              : ""
                          }
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </Box>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-60 border-none"
                >
                  <NoRecordsFound />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* RODAPÉ */}
      {!isLoading && data.length > 0 && (
        <Box className="flex justify-between items-center px-6 py-4 bg-white">
          <Box className="flex items-center gap-2">
            <Select
              value={pagination.limit}
              options={limitOptions}
              className="h-9 text-sm w-16"
              onChange={(newLimit) => {
                storage.set("tableLimit", newLimit);
                setLimitPagination(newLimit);
                setPage(1);
              }}
              iconRight="8px"
            />
            <Typography className="text-gray-600 text-sm">
              itens por página
            </Typography>
            <Box className="border-l border-gray-300 mx-2 h-4"></Box>
            <Typography className="text-gray-600 text-sm">
              {(pagination.page - 1) * pagination.limit + 1} -{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              de {pagination.total} registro(s)
            </Typography>
          </Box>

          <Pagination
            count={Math.ceil(pagination.total / pagination.limit)}
            page={pagination.page}
            onChange={(_, val) => setPage(val)}
            color="primary"
            shape="rounded"
            size="small"
          />
        </Box>
      )}
    </Box>
  );
}
