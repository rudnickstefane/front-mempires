import { useState } from "react";
import GymProfileManagement from "../../../Profile";
import { ManagementGymHeader } from "../../components/Header";
import HomeGymAdmin from "./pages/Admin/HomeGymAdmin";
import GymDashboardManagement from "./pages/Dashboard";
import GymFinanceManagement from "./pages/Finance";
import HomeGymManagement from "./pages/Home/HomeGymManagement";
import GymIntegrationManagement from "./pages/Integration";
import GymProgramManagement from "./pages/Programs";
import { GymManagementType } from "./types/gym-management.types";

const renderComponents: { [key in GymManagementType]: React.ComponentType } = {
    Home: HomeGymManagement,
    Admin: HomeGymAdmin,
    Finance: GymFinanceManagement,
    Integration: GymIntegrationManagement,
    Dashboard: GymDashboardManagement,
    Programs: GymProgramManagement,
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