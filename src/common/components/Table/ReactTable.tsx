/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  CircularProgress,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Typography } from "@sr/common/iu/components/Typography";
import { storage } from "@sr/common/storage";
import { ReactTableProps } from "@sr/common/types";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDown2, SearchStatus } from "iconsax-react";

export function ReactTable<T>({
  data,
  columns,
  pagination,
  setPage,
  setLimitPagination,
  isLoading,
}: ReactTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <Box className="w-full overflow-hidden">
      <TableContainer className="relative border-t border-gray-200">
        <Table sx={{ borderCollapse: "collapse" }}>
          <TableHead className="bg-gray-100/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    align={header.column.id === "actions" ? "center" : "left"}
                    className="border-b-2 border-gray-200 px-6 py-4"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableCell>
                ))}
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
                    const isStatusColumn = cell.column.id === "isActive";
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
                  <Box className="flex flex-col items-center justify-center text-center p-10">
                    <Box className="bg-gray-100 p-4 rounded-full mb-4">
                      <SearchStatus
                        size={48}
                        variant="Linear"
                        className="text-gray-400"
                      />
                    </Box>
                    <Typography
                      variant="h6"
                      className="text-gray-700 font-bold"
                    >
                      Nenhum registro encontrado
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-gray-500 max-w-[300px]"
                    >
                      Tente ajustar seus filtros.
                    </Typography>
                  </Box>
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
              onChange={(e) => {
                const newLimit = Number(e.target.value);
                storage.set("tableLimit", newLimit);
                setLimitPagination(newLimit);
                setPage(1);
              }}
              sx={{
                "& .MuiSelect-icon": {
                  right: "8px !important",
                },
              }}
              className="h-9 text-sm w-16"
              IconComponent={ArrowDown2}
            >
              {[5, 10, 15, 20, 25, 50].map((val) => (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
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
