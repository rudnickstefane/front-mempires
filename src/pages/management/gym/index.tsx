import { useState } from "react";
import { ManagementGymHeader } from "../components/header/gym";
import GymProfileManagement from "../components/profile";
import GymAdminManagement from "./admin";
import GymDashboardManagement from "./dashboard";
import GymFinanceManagement from "./finance";
import GymManagementHome from "./home/gym-management-home";
import GymIntegrationManagement from "./integration";
import GymProgramManagement from "./program";
import { GymManagementType } from "./types/gym-management.types";

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
