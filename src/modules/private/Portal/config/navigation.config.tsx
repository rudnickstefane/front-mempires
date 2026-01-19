/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from "@mui/material";
import { LuScreenShareOff } from "react-icons/lu";
import Profile from "../../Profile";
import ApplicationGymAdmin from "../pages/home/pages/Admin/ApplicationGymAdmin";
import ClassesGymAdmin from "../pages/home/pages/Admin/ClassesGymAdmin";
import FrequenciesGymAdmin from "../pages/home/pages/Admin/FrequenciesGymAdmin";
import PlansGymAdmin from "../pages/home/pages/Admin/PlansGymAdmin";
import SettingsGymAdmin from "../pages/home/pages/Admin/SettingsGymAdmin";
import StudentsGymAdmin from "../pages/home/pages/Admin/StudentsGymAdmin";
import HomeGymManagement from "../pages/home/pages/Home/HomeGymManagement";
import { GymManagementType } from "../pages/home/types/gym-management.types";
import Marketplace from "../pages/Marketplace";

export const renderModule = (
  type: GymManagementType,
  props: { data: any; refresh: (source: string) => Promise<void> },
) => {
  const modules: Record<GymManagementType, React.ReactNode> = {
    Home: <HomeGymManagement />,
    Application: <ApplicationGymAdmin />,
    Partners: <StudentsGymAdmin />,
    Marketplace: <Marketplace />,
    Classes: <PlansGymAdmin />,
    Frequencies: <FrequenciesGymAdmin />,
    Plans: <ClassesGymAdmin />,
    Profile: (
      <Profile
        data={props?.data}
        refresh={() => props.refresh("findUserDetails")}
      />
    ),
    // Relationship: <RelationshipGymAdmin />,
    // Products: <ProductsGymAdmin />,
    // Suppliers: <SuppliersGymAdmin />,
    // Contributors: <ContributorsGymAdmin />,
    // GroupAccess: <ContributorsGymAdmin />,
    Settings: <SettingsGymAdmin />,
    // Finance: <GymFinanceManagement />,
    // Integration: <GymIntegrationHomeManagement />,
    // Dashboard: <GymDashboardManagement />,
    // Programs: <GymProgramManagement />,
    // Marketplace: <Marketplace />,
    // Personal: <PersonalGymAdmin />,
    // Nutritionist: <NutritionistGymAdmin />,
    // Notifications: <Notifications />,
    // Support: <Support />,
    // Invoices: <Invoices />,
  };

  return modules[type] || <MaintenanceView />;
};

// Componente de Manutenção isolado para legibilidade
const MaintenanceView = () => (
  <Box className="flex items-center justify-center w-full h-full">
    <Box className="flex flex-row w-[90%] justify-between items-center">
      <Box className="flex flex-col">
        <Typography variant="h4" className="text-[#282929]">
          Estamos em manutenção.
        </Typography>
        <Box className="flex flex-col mt-5">
          <Typography>
            Pedimos desculpas pelo transtorno, mas esta área está
            temporariamente indisponível devido a uma manutenção programada.
          </Typography>
          <Typography>
            Nosso time está trabalhando para restabelecer o acesso o mais rápido
            possível.
          </Typography>
          <Typography className="!mt-5">
            Caso você acredite que deveria ter acesso, por favor, entre em
            contato com nossa equipe de suporte.
          </Typography>
        </Box>
      </Box>
      <Box className="ml-[5rem]">
        <LuScreenShareOff className="text-[17rem] text-[#d7d7d8]" />
      </Box>
    </Box>
  </Box>
);
