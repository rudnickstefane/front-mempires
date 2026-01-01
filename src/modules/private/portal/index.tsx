import { useManagement } from "./hooks";
import GymManagement from "./pages/Gym";

export default function Management() {
  const { isAuthorized, role, permissions } = useManagement();

  return (
    <GymManagement permissions={permissions} />
    // <AccessRestrict isAuthorized={isAuthorized}>
    // <InactivitySignIn />
    // {role === 'IFLEXFIT' && <CoreManagement permissions={permissions}/>}
    // {<GymManagement permissions={permissions} />}
    // {role === 'NUTRITIONIST' && <GymManagement />}
    // {role === 'SUPPLIER' && <GymManagement />}
    // {role === 'PERSONAL' && <GymManagement />}
    // </AccessRestrict>
  );
}
