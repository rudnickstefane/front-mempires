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
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { SearchStatus } from "iconsax-react"; // Ícone para "Não encontrado"

interface ReactTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  setPage: (page: number) => void;
  setLimitPagination: (limit: number) => void;
  isLoading?: boolean;
}

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
    <Box className="bg-white rounded-2xl border-0 shadow-soft hover:shadow-lg overflow-hidden transition-all duration-300">
      <TableContainer className="min-h-[300px] relative">
        <Table>
          <TableHead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    className="text-primary-950/80 font-semibold"
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
            {/* ESTADO: CARREGANDO */}
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
              /* ESTADO: COM DADOS */
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-primary-950">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              /* ESTADO: VAZIO (Nenhum registro) */
              <TableRow>
                <TableCell colSpan={columns.length} className="h-60">
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
                      Não encontramos dados para essa consulta. Tente ajustar
                      seus filtros ou pesquisar novamente.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* RODAPÉ: Só exibe se não estiver carregando e se houver dados (opcional) */}
      {!isLoading && data.length > 0 && (
        <Box className="flex justify-between items-center px-6 py-3 border-t border-[#EAECF0]">
          <Box className="flex items-center gap-2">
            <Select
              value={pagination.limit}
              onChange={(e) => setLimitPagination(Number(e.target.value))}
              size="small"
              className="w-[5.5rem] h-[32px] text-sm"
            >
              {[5, 10, 25, 50].map((val) => (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
            <Typography variant="body2" className="text-gray-600">
              itens por página
            </Typography>
            <Box className="border-l border-gray-300 mx-2 h-4"></Box>
            <Typography variant="body2" className="text-gray-600 font-medium">
              Total de {pagination.total} registros
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
