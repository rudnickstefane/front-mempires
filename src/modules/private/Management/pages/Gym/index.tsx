import { useState } from "react";
import GymProfileManagement from "../../../../../pages/management/components/profile";
import GymAdminManagement from "../../../../../pages/management/gym/admin";
import GymDashboardManagement from "../../../../../pages/management/gym/dashboard";
import GymFinanceManagement from "../../../../../pages/management/gym/finance";
import GymIntegrationManagement from "../../../../../pages/management/gym/integration";
import GymProgramManagement from "../../../../../pages/management/gym/program";
import { GymManagementType } from "../../../../../pages/management/gym/types/gym-management.types";
import { ManagementGymHeader } from "../../components/Header";
import GymManagementHome from "./pages/Home/ManagementGymHome";

const renderComponents: { [key in GymManagementType]: React.ComponentType } = {
    Home: GymManagementHome,
    Admin: GymAdminManagement,
    Finance: GymFinanceManagement,
    Integration: GymIntegrationManagement,
    Dashboard: GymDashboardManagement,
    Program: GymProgramManagement,
    Profile: GymProfileManagement,
};

export default function GymManagement() {

    const [activeComponent, setActiveComponent] = useState<GymManagementType>('Home');

    const ActiveComponent = renderComponents[activeComponent];

    return (
        <>
            <ManagementGymHeader setActiveComponent={setActiveComponent} />
            <ActiveComponent />
        </>
    );
}
