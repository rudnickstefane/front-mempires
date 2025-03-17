import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/machine.png';
import '../../../input.css';
import { Container, Img } from './styles.d';

export function HeaderAuthLight() {

    return (
        <>
            <Container className='page-clean relative z-10'>
                <Link to="/"><div className='flex w-32 justify-between items-center'><Img src={logo} alt="Logo" /><h1 className='text-[40px] text-[#08041b]'>iFlex</h1></div></Link>
                <Typography>Olá, Rudnick!
                </Typography>
            </Container>
        </>
    );
}
