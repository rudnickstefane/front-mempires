import { Box } from '@mui/material';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import logo from '../../assets/images/machine.png';
import { Img, Link } from './styles.d';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <Box className="text-[#08041b] flex flex-col justify-center">
            <Box className="flex flex-col md:flex-row justify-center items-start py-32 px-20 pb-10 w-full">
                <Box className="mb-6 md:mb-0 mx-5">
                    <Link to="/"><Box className='flex w-32 justify-between items-center'><Img src={logo} alt="Logo" /><Box className='text-[40px] text-[#000]'>iFlex</Box></Box></Link>
                    <p className="mt-2 text-[#646464]">Descubra tudo o que a iFlex pode<br />fazer por você.
                    </p>
                    <Box className="flex mt-7 space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#646464] hover:text-white bg-[#efefef] p-3 rounded-full hover:bg-[#ff0336] transition-colors duration-300"><FaFacebookF size={17} /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#646464] hover:text-white bg-[#efefef] p-3 rounded-full hover:bg-[#ff0336] transition-colors duration-300"><FaXTwitter size={17} /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#646464] hover:text-white bg-[#efefef] p-3 rounded-full hover:bg-[#ff0336] transition-colors duration-300"><FaLinkedinIn size={17} /></a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-[#646464] hover:text-white bg-[#efefef] p-3 rounded-full hover:bg-[#ff0336] transition-colors duration-300"><FaYoutube size={17} /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#646464] hover:text-white bg-[#efefef] p-3 rounded-full hover:bg-[#ff0336] transition-colors duration-300"><FaInstagram size={17} /></a>
                    </Box>
                </Box>
                <Box className="mb-6 md:mb-0 md:mx-7">
                    <h2 className="text-[22px] font-semibold color-primary after-arrow">Empresa</h2>
                    <ul className="mt-5 space-y-2 leading-8">
                        <li><a href="/carreiras" className='text-[#646464] hover:text-[#ff0336] transition-colors duration-300'>Carreiras</a></li>
                        {/* <li><a href="/clientes" className='text-[#646464] hover:text-[#ff0336] transition-colors duration-300'>Clientes</a></li>
                        <li><a href="/parceiros" className='text-[#646464] hover:text-[#ff0336] transition-colors duration-300'>Parceiros</a></li> */}
                        <li><a href="/quem-somos" className='text-[#646464] hover:text-[#ff0336] transition-colors duration-300'>Quem Somos</a></li>
                    </ul>
                </Box>
                <Box className="mb-6 md:mb-0 md:mx-10">
                    <h2 className="text-[22px] font-semibold color-primary after-arrow">Serviços</h2>
                    <ul className="mt-5 space-y-2 leading-8">
                        <li><a href="descontos/produtos" className='text-[#646464] hover:text-[#ff0336] transition-colors duration-300'>Descontos em Produtos</a></li>
                        <li><a href="/gestao/academias" className='text-[#646464] hover:text-[#ff0336] transition-colors duration-300'>Gestão de Academias</a></li>
                        <li><a href="/parceiros/fornecedores" className='text-[#646464] hover:text-[#ff0336] transition-colors duration-300'>Parcerias com Fornecedores</a></li>
                        <li><a href="/programas/incentivo" className='text-[#646464] hover:text-[#ff0336] transition-colors duration-300'>Programas de Incentivo</a></li>
                        <li><a href="/treinos/personalizados" className='text-[#646464] hover:text-[#ff0336] transition-colors duration-300'>Treinos Personalizados</a></li>
                    </ul>
                </Box>
                <Box className="mb-6 md:mb-0">
                    <h2 className="text-[22px] font-semibold color-primary after-arrow">Ficou com alguma dúvida?</h2>
                    <p className="mt-5 mb-5 text-[#646464] flex items-center">Entre em contato para mais informações ou<br />agende uma demonstração gratuita.</p>
                    <a href="https://wa.me/551100000000?text=Ol%C3%A1%2C%20encontrei%20o%20site%20iFlex%20e%20tenho%20algumas%20d%C3%BAvidas." target="_blank" className="mt-2 text-[#212121] flex text-[24px] items-center font-semibold hover:text-[#ff0336] transition-colors duration-300"><FaWhatsapp size={25} className='color-primary mr-2' /> 11 0000 0000</a>
                    <a href='mailto:contato@iflex.fit' className="mt-2 text-[#646464] flex items-center hover:text-[#ff0336] transition-colors duration-300">comercial@iflexfit.com.br</a>
                </Box>
            </Box>
            <Box className="flex text-center text-[#646464] h-[92px] items-center justify-center">
                <p>Copyright &copy; {currentYear} iFlex.</p>
            </Box>
        </Box>
    );
}

export default Footer;
