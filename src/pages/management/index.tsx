import { Container } from '@mui/material';
import FooterManagement from './components/footer';
import GymManagement from './gym';

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
