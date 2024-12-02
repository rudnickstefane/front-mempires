import { useState } from "react";
import GymProfileManagement from "../../Profile";
import { ManagementGymHeader } from "../components/Header";
import HomeGymAdmin from "./Gym/pages/Admin/HomeGymAdmin";
import GymDashboardManagement from "./Gym/pages/Dashboard";
import GymFinanceManagement from "./Gym/pages/Finance";
import HomeGymManagement from "./Gym/pages/Home/HomeGymManagement";
import GymIntegrationManagement from "./Gym/pages/Integration";
import GymProgramManagement from "./Gym/pages/Programs";
import { GymManagementType } from "./Gym/types/gym-management.types";

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
