import { AccessRestrict } from '../../common/pages/AccessRestrict';
import InactivitySignIn from '../../common/pages/InactivitySignIn';
import { useManagement } from './hooks';
import GymManagement from './pages/Gym';

export default function Management() {

    const {
        isAuthorized,
        role,
    } = useManagement();

    return (
        <AccessRestrict isAuthorized={isAuthorized}>
            <InactivitySignIn />
            {role === 'GYM' && <GymManagement />}
        </AccessRestrict>
    );
}