import { Container } from '@mui/material';
import FooterManagement from './components/Footer';
import GymManagement from './pages/Gym';

export default function Management() {
    return (
        <>
            <style>
                {`
                    body {
                        background-color: #f8fafb;
                    }
                `}
            </style>
            <Container>
                <GymManagement />
                <FooterManagement />
            </Container>
        </>
    );
}
