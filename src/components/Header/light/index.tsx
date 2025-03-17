import { Box } from '@mui/material';
import '../../../input.css';
import logo from '../../../modules/assets/images/icon.png';
import { ButtonHeader, Container } from './styles.d';

export function HeaderLight() {

    return (
        <>
            <style>
                {`
                    header {
                        display: none !important;
                    }
                `}
            </style>
            <Container className='page-clean relative z-10'>
                <a href='/'>
                    <Box className='flex w-32 items-center'>
                        <img src={logo} alt="Logo" className='w-[3.7rem]' />
                        <Box className='ml-3 text-[2rem] color-primary font-intro mt-[.35rem]'>iFlex</Box>
                    </Box>
                </a>
                <nav>
                    <ButtonHeader href="/" className='after-arrowMenu'>Início</ButtonHeader>
                </nav>
            </Container>
        </>
    );
}
