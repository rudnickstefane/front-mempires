import { useState } from "react";

import { Box } from "@mui/material";
import { Card } from "@sr/common/components/Card";
import { ReactTable } from "@sr/common/components/Table";
import { Typography } from "@sr/common/iu/components/Typography";
import { Key } from "iconsax-react";
import { columnsPartners, PartnerDTO } from "../tables/columnsPartners";

// Mock de dados simulando retorno da API
const MOCK_DATA: PartnerDTO[] = [
  {
    id: "1",
    isActive: true,
    businessName: "Drogarias Pacheco",
    cnpj: "33.438.250/0001-67",
    type: "Rede",
    storesCount: 1600,
    location: "Rio de Janeiro - RJ",
  },
  {
    id: "2",
    isActive: false,
    businessName: "Drogaria Central",
    cnpj: "67.890.123/0001-45",
    type: "Independente",
    storesCount: 3,
    location: "Curitiba - PR",
  },
];

export function PartnersPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Exemplo de como você lidaria com o clique no "More" (Excluir/Editar)
  const handleAction = (row: PartnerDTO) => {
    console.log("Abrir modal para:", row.businessName);
    // Aqui você abriria seu Modal de exclusão/edição
  };

  return (
    <>
      <Box className="flex flex-col lg:flex-row gap-5">
        <Card loading={false} skeletonCount={3}>
          <Box className="flex flex-row justify-between gap-3">
            <Box>
              <Typography
                translateId="Total de Parceiros"
                className="text-sm"
              />
              <Typography
                translateId="Total de Parceiros"
                className="text-sm"
              />
            </Box>
            <Key variant="Linear" />
          </Box>
        </Card>
        <Card loading={true} skeletonCount={3}>
          oi
        </Card>
      </Box>
      <ReactTable
        data={MOCK_DATA} // Aqui viria o queryResult.data
        columns={columnsPartners(handleAction)}
        pagination={{
          page,
          limit,
          total: 100, // Total vindo do backend
        }}
        setPage={setPage}
        setLimitPagination={setLimit}
        isLoading={false}
      />
    </>
  );
}
