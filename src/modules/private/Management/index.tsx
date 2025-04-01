import { AccessRestrict } from '../../common/pages/AccessRestrict';
import InactivitySignIn from '../../common/pages/InactivitySignIn';
import { useManagement } from './hooks';
import CoreManagement from './pages/Core';
import GymManagement from './pages/Gym';

export default function Management() {

    const {
        isAuthorized,
        role,
        permissions,
    } = useManagement();

    return (
        <AccessRestrict isAuthorized={isAuthorized}>
            <InactivitySignIn />
            {role === 'IFLEXFIT' && <CoreManagement />}
            {role === 'GYM' && <GymManagement permissions={permissions} />}
            {role === 'NUTRITIONIST' && <GymManagement />}
            {role === 'SUPPLIER' && <GymManagement />}
            {role === 'PERSONAL' && <GymManagement />}
        </AccessRestrict>
    );
}