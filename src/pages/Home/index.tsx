import { Box, Button, Typography } from "@mui/material";
import { CiBadgeDollar, CiDiscount1 } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { GoChecklist } from "react-icons/go";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { PiHeartbeat, PiStorefrontThin, PiUsers, PiUsersThree, PiUserSwitchLight } from "react-icons/pi";
import indexGirl from '../../assets/images/nutri.png';
import indexPersonal from '../../assets/images/personalTwo.png';
import sectionTitleDestac from '../../assets/images/section-titleDestac.svg';
import Footer from "../../components/Footer";
import { Header } from "../../components/Header/pattern";
import { DestaqueTitle } from '../../components/Styles/styles.d';
import useTextSwitcher from "../../hooks/use-text-switcher-home";
import '../../input.css';
import { ImgCustomOne, ImgEquipament, SectionPersonal, SectionSupplier } from "./styles.d";

export default function Home() {
    const { text, description, fade } = useTextSwitcher([
        {
            text: 'Academias',
            description: <span>Aproveite um sistema <b className='font-bold'>completo</b> para gerenciar sua academia, com nosso exclusivo <b className='font-bold'>programa de incentivo</b> e muito mais.</span>
        },
        {
            text: 'Fornecedores',
            description: <span>Conecte-se com <b className='font-bold'>academias de todo o Brasil</b>, aumente sua visibilidade e conquiste novos clientes.</span>
        },
        {
            text: 'Nutricionistas',
            description: <span>Faça parte da nossa <b className='font-bold'>comunidade</b> de nutricionistas e tenha acesso direto aos alunos das academias.</span>
        },
        {
            text: 'Personal Trainers',
            description: <span><b className='font-bold'>Amplie</b> sua base de alunos e ofereça treinos personalizados através da nossa plataforma.</span>
        }
    ], 5000);

    return (
        <>
            <Header />
            <Box className='w-full flex justify-center absolute md:top-[10rem] top-[8rem] px-10'>
                <Box className='flex flex-col text-white w-[700px]'>
                    <Box>
                        <DestaqueTitle className="bg-secondary text-white">Ser Flex é fácil</DestaqueTitle>
                        <Box className='flex flex-col'>
                            <Box className="flex flex-row font-intro md:text-[2.7rem] text-[1.5rem] text-white uppercase items-center">
                                Benefícios exclusivos
                                <Box className='md:text-[17px] text-[10px] ml-2 mt-2'>para</Box>
                            </Box>
                            <Box
                                className={`font-intro text-[2.7rem] uppercase text-transparent stroke-white md:-mt-[1.3rem] -mt-[1rem] transition-opacity duration-500 md:w-auto w-[500px] ${fade ? 'opacity-100' : 'opacity-0'}`}
                                style={{
                                WebkitTextStroke: '.08rem white', // Define a borda ao redor do texto
                                WebkitTextFillColor: 'transparent', // Faz o preenchimento do texto transparente
                                }}
                            >
                                {text}
                            </Box>
                            <Typography className={`h-[51px] !mt-5 !text-[17px] !font-light !text-[#cbcbcb] transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                                {description}
                            </Typography>
                            <Button
                                variant="contained"
                                href="/cadastro"
                                color="primary"
                                style={{ backgroundColor: '#ff0336', color: 'white', fontFamily: 'Poppins', height: '3rem', width: '250px', marginTop: '2rem' }}
                            >
                                Experimentar agora <FaArrowRight className='ml-2' />
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Box className='flex items-start mt-20 ml-20 w-[360.58px]'></Box>
            </Box>
            
            <Box className="py-10 shadow-lg rounded-lg bg-white absolute w-[70%] md:top-[33rem] top-[29rem] right-[3rem] p-[2rem]">
                <Box className="container mx-auto">
                    <DestaqueTitle className="bg-secondary text-white">Exclusivo</DestaqueTitle>
                    <Box className='flex md:flex-row flex-col'>
                        <Box className='font-intro text-[3rem] color-primary uppercase'>Programa de</Box>
                        <Box
                            className='font-intro text-[3rem] uppercase text-transparent stroke-white md:ml-4'
                            style={{
                            WebkitTextStroke: '.15rem #ff0336', // Define a borda ao redor do texto
                            WebkitTextFillColor: 'transparent', // Faz o preenchimento do texto transparente
                            }}
                        >
                            Incentivo
                        </Box>
                    </Box>
                    <Box>
                        <Box>Aproveite vantagens como descontos especiais, estratégias para reativação de alunos e ações que promovem saúde e bem-estar.</Box>
                        <Box className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                            <Box className="flex flex-col items-center">
                                <Box className="color-primary text-4xl mb-4">
                                    <CiDiscount1 />
                                </Box>
                                <Box className="text-lg font-semibold mb-2 text-black">Descontos</Box>
                                <Box className="text-center text-gray-600">Aproveite descontos em produtos, mensalidades e muito mais.</Box>
                            </Box>
                            <Box className="flex flex-col items-center md:mt-0 mt-4">
                                <Box className="color-primary text-4xl mb-4">
                                    <PiUsers />
                                </Box>
                                <Box className="text-lg font-semibold mb-2 text-black">Reativação de Alunos</Box>
                                <Box className="text-center text-gray-600">Recupere alunos inativos com estratégias práticas e eficientes.</Box>
                            </Box>
                            <Box className="flex flex-col items-center md:mt-0 mt-4">
                                <Box className="color-primary text-4xl mb-4">
                                    <PiHeartbeat />
                                </Box>
                                <Box className="text-lg font-semibold mb-2 text-black">Bem-Estar e Saúde</Box>
                                <Box className="text-center text-gray-600">Hábitos saudáveis e qualidade de vida para todos.</Box>
                            </Box>
                        </Box>
                        <Button
                            href="/cadastro"
                            color="primary"
                            sx={{
                                width: '176px',
                                fontSize: '1.03rem',
                                textTransform: 'none',
                                fontFamily: 'Poppins',
                                color: '#ff0336',
                                mt: 3,
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'transform 0.3s, margin-left 0.3s, color 0.3s, background-color 0.3s',
                                '&:hover': {
                                    ml: 1,
                                    background: '#ff0336',
                                    color: 'white',
                                    transform: 'translateX(-1px)',
                                },
                            }}
                        >
                            Saiba Mais <FaArrowRight className='ml-2' />
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Box className='md:mt-[23rem] mt-[47rem]'>
                <Box className='m-10 flex flex-row justify-center'>
                    <ImgCustomOne className='absolute md:h-[500px] h-[550px]' />
                    <Box className='relative z-0'>
                        <DestaqueTitle className="bg-secondary text-white">Ei Academia!</DestaqueTitle>
                        <Box className='text-black text-[2.4rem] mb-5'>Já pensou em ter <span className='font-bold color-primary'>tudo</span> o que precisa em um único sistema?</Box>
                        <Typography>Descubra a facilidade de gerenciar sua academia com nossa solução completa e integrada.</Typography>
                        <Box className='flex md:flex-row md:w-[800px] mt-10 flex-col'>
                            <Box className='text-black text-[20px] mx-5 flex flex-col items-center w-[240px]'><CiBadgeDollar className='color-primary mb-2' size={45} /> Cobranças automática</Box>
                            <Box className='text-black text-[20px] mx-5 flex flex-col items-center w-[200px] border-[#ccc] md:border-r-[1px] md:border-l-[1px] md:mt-0 mt-5'><PiStorefrontThin className='color-primary mb-2' size={45} /> Marketplace</Box>
                            <Box className='text-black text-[20px] mx-5 flex flex-col items-center w-[220px] md:mt-0 mt-5'><PiUserSwitchLight className='color-primary mb-2' size={45} /> Reativação de Alunos</Box>
                        </Box>
                        <Button
                            variant="contained"
                            href="/planos/academia"
                            color="primary"
                            style={{ color: 'white', fontFamily: 'Poppins', height: '3rem', width: '245px', marginTop: '2rem' }}
                            sx={{
                                background: '#3F3F3F',
                                transition: 'transform 0.3s, background-color 0.3s',
                                '&:hover': {
                                    background: '#ff0336'
                                },
                            }}
                        >
                            Ver todos os Recursos <FaArrowRight className='ml-2' />
                        </Button>
                    </Box>
                </Box>
                <Box className='w-full bg-secondary h-[15rem] font-bold text-white text-[2.4rem] flex items-center justify-center relative z-0'>
                    <Box className='md:w-[50%] w-full mx-10 md:mx-0'>
                        Descubra como nossa plataforma pode transformar a sua vida.
                    </Box>
                </Box>
                <Box className='mt-20 flex flex-row justify-center w-full'>
                    <Box className='w-[405px] mr-10 md:mt-0 mt-48'>
                        <Box className='bg-secondary w-[1rem] md:h-[20rem] h-[10rem] absolute mt-5'></Box>
                        <Box className='bg-secondary w-[.5rem] md:h-[10rem] h-[20rem] absolute mt-14 -ml-5'></Box>
                        <Box className='flex flex-col items-center'>
                            <img src={indexGirl} className='z-1 relative ml-5 w-[379px] md:mt-0 mt-[5rem]' />
                        </Box>
                    </Box>
                    <Box className='w-[675px]'>
                        <Box>
                            <DestaqueTitle className="bg-secondary text-white">Vem com a nutri!</DestaqueTitle>
                            <Box className='text-black text-[2.4rem] mb-5'>Junte-se à nossa <span className='font-bold color-primary'>comunidade</span> e transforme vidas!</Box>
                            <img src={sectionTitleDestac} className='md:ml-[27rem] ml-[10rem] w-[7rem] md:w-[186px] -mt-[5rem] absolute' />
                            <Typography className='text-[1.2rem]'>Ei,
                                <span className='font-bold text-primary'> nutricionista,</span> nossa plataforma oferece visibilidade para alcançar mais clientes e potencializar seu negócio.
                            </Typography>
                            <Box className='flex flex-wrap mt-5'>
                                <Box>
                                    <Typography className='flex flex-row items-center !mb-3'><FaRegCircleCheck className='mr-2 color-primary' /> Agendamentos</Typography>
                                    <Typography className='flex flex-row items-center !mb-3'><FaRegCircleCheck className='mr-2 color-primary' /> Chat com o aluno</Typography>
                                    <Typography className='flex flex-row items-center !mb-3'><FaRegCircleCheck className='mr-2 color-primary' /> Controle de Pagamentos</Typography>
                                    <Typography className='flex flex-row items-center !mb-3'><FaRegCircleCheck className='mr-2 color-primary' /> Ficha técnica</Typography>
                                </Box>
                                <Box className='md:ml-5'>
                                    <Typography className='flex flex-row items-center !mb-3'><FaRegCircleCheck className='mr-2 color-primary' /> Pré-consulta</Typography>
                                    <Typography className='flex flex-row items-center !mb-3'><FaRegCircleCheck className='mr-2 color-primary' /> Sistema de Planejamento Alimentar</Typography>
                                </Box>
                            </Box>
                            <Button
                                variant="contained"
                                href="/cadastro"
                                color="primary"
                                style={{ color: 'white', fontFamily: 'Poppins', height: '3rem', width: '205px', marginTop: '2rem' }}
                                sx={{
                                    background: '#3F3F3F',
                                    transition: 'transform 0.3s, background-color 0.3s',
                                    '&:hover': {
                                        background: '#ff0336'
                                    },
                                }}
                            >
                                Tenho interesse <FaArrowRight className='ml-2' />
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <SectionSupplier className='flex flex-col justify-center w-full py-20'>
                    <Box className='w-full flex flex-col justify-center items-center'>
                        <DestaqueTitle className="bg-secondary text-white">Fornecedores</DestaqueTitle>
                        <Box className='text-black text-[2.4rem] mb-5'>Que tal <span className='font-bold color-primary'>expandir</span> o seu alcance?</Box>
                        <Typography className='text-[1.2rem] md:w-[800px] text-center w-[650px]'>Nossa plataforma oferece uma série de ferramentas para que você possa <span className='font-bold'>maximizar</span> suas oportunidades e facilitar as operações com as academias.</Typography>
                    </Box>
                    <Box className='mt-20 flex flex-row justify-center w-full'>
                        <Box className='w-[675px] md:ml-0 ml-5'>
                            <Box>
                                <Box className='mt-5'>
                                    <Typography className='!mb-5'><span className='color-primary mr-2'>• Marketplace</span>- Exponha seus produtos para academias em todo o Brasil.</Typography>
                                    <Typography className='!mb-5'><span className='color-primary mr-2'>• Sistema de Orçamentos</span>- Facilite a criação e envio de orçamentos personalizados para academias, agilizando o processo de negociação e aumentando suas chances de fechar vendas.</Typography>
                                    <Typography className='!mb-5'><span className='color-primary mr-2'>• Gestão Financeira</span>- Monitore suas receitas, despesas e custos de forma centralizada. Tenha total controle financeiro do seu negócio.</Typography>
                                    <Typography className='!mb-5'><span className='color-primary mr-2'>• Integração com Correios</span>- Facilite o cálculo de frete e otimize a logística das suas entregas, tudo diretamente pela plataforma.</Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    href="/cadastro"
                                    color="primary"
                                    style={{ color: 'white', fontFamily: 'Poppins', height: '3rem', width: '205px', marginTop: '2rem' }}
                                    sx={{
                                        background: '#ff0336',
                                        transition: 'transform 0.3s, background-color 0.3s',
                                        '&:hover': {
                                            background: '#FF0000'
                                        },
                                    }}
                                >
                                    Quero saber mais <FaArrowRight className='ml-2' />
                                </Button>
                            </Box>
                        </Box>
                        <ImgEquipament />
                    </Box>
                </SectionSupplier>
                <Box className='w-full bg-secondary md:h-[10rem] h-[15rem] font-bold text-white text-[2.4rem] flex items-center justify-center relative'>
                    <Box className='md:w-[70%] w-full mx-10 md:mx-0'>Seja parte da iFlex e revolucione o mercado fitness com a gente.</Box>
                </Box>
                <SectionPersonal>
                    <Box className='w-full flex flex-row justify-center items-center md:h-[700px]'>
                        <Box className='w-[530px] mr-10 md:mt-0 mt-48 md:flex flew-row h-full md:pt-[12rem] pt-[25rem] hidden'>
                            <Box className='bg-secondary w-[1rem] h-[10rem] mr-2 skew-x-[5deg]'></Box>
                            <img src={indexPersonal} className='w-[500px]' />
                            <Box className='bg-secondary w-[1rem] md:h-[10rem] h-[20rem] mt-32 ml-2 skew-x-[5deg]'></Box>
                        </Box>
                        <Box className='w-[675px] md:mt-0 my-10 md:m-0 m-10'>
                            <DestaqueTitle className="bg-secondary text-white">Personal Trainer</DestaqueTitle>
                            <Box className='text-white text-[2.4rem] mb-5'>Aumente sua <span className='font-bold color-primary'>visibilidade</span> e alcance mais alunos!</Box>
                            <Box className='mt-5 p-5 rounded-lg text-[#B4B4B4]'>
                                Conecte-se diretamente com alunos das academias em busca de treinos personalizados, expanda sua clientela e gerencie tudo em um só lugar. Transforme sua paixão em um negócio de sucesso com nossa plataforma.
                            </Box>
                            <Box className='flex flex-wrap'>
                                <Box className='text-white m-5 w-[280px] flex flex-row items-center text-[1.3rem]'><MdOutlineSportsGymnastics className='text-[4rem] bg-[#2b2b2b] hover:bg-[#ff0336] transition-all duration-300 p-3 rounded-full mr-5' />Ficha de Treino</Box>
                                <Box className='text-white m-5 w-[280px] flex flex-row items-center text-[1.3rem] '><CiBadgeDollar className='text-[4rem] bg-[#2b2b2b] hover:bg-[#ff0336] transition-all duration-300 p-3 rounded-full mr-5' />Gestão Financeira</Box>
                                <Box className='text-white m-5 w-[280px] flex flex-row items-center text-[1.3rem]'><PiUsersThree className='text-[4rem] bg-[#2b2b2b] hover:bg-[#ff0336] transition-all duration-300 p-3 rounded-full mr-5' />Gestão de Alunos</Box>
                                <Box className='text-white m-5 w-[280px] flex flex-row items-center text-[1.3rem]'><GoChecklist className='text-[4rem] bg-[#2b2b2b] hover:bg-[#ff0336] transition-all duration-300 p-3 rounded-full mr-5' />Avaliação Física</Box>
                            </Box>
                            <Button
                                variant="contained"
                                href="/cadastro"
                                color="primary"
                                style={{ color: 'white', fontFamily: 'Poppins', height: '3rem', width: '205px', marginTop: '2rem' }}
                                sx={{
                                    background: '#ff0336',
                                    transition: 'transform 0.3s, background-color 0.3s',
                                    '&:hover': {
                                        background: '#ff0000'
                                    },
                                }}
                            >
                                Saiba Mais <FaArrowRight className='ml-2' />
                            </Button>
                        </Box>
                    </Box>
                </SectionPersonal>
            </Box>
            <Footer />
        </>
    );
}