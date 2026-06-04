/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { Card } from "@sr/common/components/Card";
import { ModuleHeader, ModuleViewport } from "@sr/common/components/Layout";
import { Show } from "@sr/common/components/Show";
import { UnderlineTabs } from "@sr/common/iu/components/Button";
import { TabOption } from "@sr/common/types";
import { Animated } from "@sr/common/ui/motion";
import { useNavigationStore } from "@sr/store";
import { TableBrand, TableEstablishment } from "../../components/Table";
import {
  useBrandAndEstablishmentPageHook,
  useBrandTabHook,
  useEstablishmentTabHook,
} from "../../hooks";
import { BrandAndEstablishmentViewType } from "../../types";

export function BrandAndEstablishmentPage() {
  const { params } = useNavigationStore();
  const pageBase = useBrandAndEstablishmentPageHook();

  const brand = useBrandTabHook({
    partnerCode: params.partnerCode,
    isEnabled: pageBase.currentView === "BRANDS",
  });

  const establishment = useEstablishmentTabHook({
    brandCode: params.brandCode,
    partnerCode: params.partnerCode,
    isEnabled: pageBase.currentView === "ESTABLISHMENTS",
  });

  const tabOptions: TabOption<BrandAndEstablishmentViewType>[] = [
    { id: "BRANDS", label: "Bandeiras" },
    { id: "ESTABLISHMENTS", label: "Lojas" },
  ];

  const headerConfig = {
    BRANDS: {
      label: "Adicionar Bandeira",
      title: "brandAndEstablishment.title",
    },
    ESTABLISHMENTS: {
      label: "Adicionar Loja",
      title: "brandAndEstablishment.title",
    },
  };

  const isBrands = pageBase.currentView === "BRANDS";

  return (
    <ModuleViewport
      header={
        <ModuleHeader
          showButton
          labelButton={headerConfig[pageBase.currentView].label}
          onClick={async () =>
            isBrands ? brand.openDrawer() : establishment.openDrawer()
          }
          onBack
        />
      }
    >
      <Animated variant="container" className="grid grid-cols-1 gap-5">
        <Card skeletonCount={3} padding="p-0">
          <Box className="p-6 pb-0">
            <UnderlineTabs
              options={tabOptions}
              activeTab={pageBase.currentView}
              onChange={pageBase.setCurrentView}
            />
          </Box>

          <Show hidden={pageBase.currentView !== "BRANDS"} variant="effect">
            <TableBrand
              queryResult={brand.brandsQuery}
              data={brand.rows}
              columns={brand.columns}
              setPage={brand.setPage}
              setLimitPagination={brand.setLimit}
              pagination={{
                ...brand.pagination,
                total: brand.brandsQuery.data?.totalCount || 0,
              }}
              sort={brand.sort}
              onSortChange={(s) => {
                brand.setSort(s);
              }}
              isDataWithEdges={true}
              filters={[
                {
                  type: "search",
                  name: "search",
                  placeholder: "Buscar bandeira ou CNPJ",
                },
              ]}
              onFilterChange={brand.handleFilterChange}
              currentFilters={brand.filters}
            />
          </Show>

          <Show
            hidden={pageBase.currentView !== "ESTABLISHMENTS"}
            variant="effect"
          >
            <TableEstablishment
              queryResult={establishment.establishmentsQuery}
              data={establishment.rows}
              columns={establishment.columns}
              setPage={establishment.setPage}
              setLimitPagination={establishment.setLimit}
              pagination={{
                ...establishment.pagination,
                total: establishment.establishmentsQuery.data?.totalCount || 0,
              }}
              sort={establishment.sort}
              onSortChange={(s) => {
                establishment.setSort(s);
              }}
              isDataWithEdges={true}
              filters={[
                {
                  type: "search",
                  name: "search",
                  placeholder: "Buscar por nome ou CNPJ",
                },
              ]}
              onFilterChange={establishment.handleFilterChange}
              currentFilters={establishment.filters}
            />
          </Show>
        </Card>
      </Animated>
    </ModuleViewport>
  );
}
