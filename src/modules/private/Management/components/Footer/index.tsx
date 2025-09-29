import { Box } from '@mui/material';
import logo from '../../../../../assets/images/machine.png';
import { Img, Link } from '../../../../components/Footer/styles.d';

function FooterManagement() {
    const currentYear = new Date().getFullYear();

    return (
        <Box className="text-[#08041b] flex flex-col justify-center">
            <Box className="flex flex-col md:flex-row justify-center items-start w-full mt-12">
                <Link to="/"><Box className='flex w-32 justify-between items-center'><Img src={logo} alt="Logo" /><Box className='text-[40px] text-[#000]'>iFlex</Box></Box></Link>
            </Box>
            <Box className="flex text-center text-[#646464] h-[3rem] items-center justify-center">
                <p>Copyright &copy; {currentYear} iFlex.</p>
            </Box>
        </Box>
    );
}

export default FooterManagement;
