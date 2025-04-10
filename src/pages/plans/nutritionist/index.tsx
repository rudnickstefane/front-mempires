import { Box, Button, Divider, Typography } from "@mui/material";
import { useRef } from "react";
import { BsWindow } from "react-icons/bs";
import { CiDiscount1, CiDollar, CiDumbbell, CiLock, CiMobile3, CiViewList } from "react-icons/ci";
import { FaPinterestP } from "react-icons/fa";
import { FaPersonArrowUpFromLine, FaPersonHarassing, FaRegCircleCheck } from "react-icons/fa6";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoStorefrontOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { PiUsersLight } from "react-icons/pi";
import { RiMiniProgramLine } from "react-icons/ri";
import plansIconOne from '../../../assets/images/plansOne.svg';
import plansIconThree from '../../../assets/images/plansThree.svg';
import { HeaderLight } from "../../../components/Header/light";
import { DestaqueTitle } from '../../../components/Styles/styles.d';
import { Img } from "../../Home/styles.d";

const resources = [
    {
        icon: CiMobile3,
        name: 'Aplicativo',
        description: 'Aluno, Gestor e Instrutor',
        link: '/recursos/aplicativo'
    },
    {
        icon: PiUsersLight,
        name: 'Alunos Ilimitados',
        description: 'Sem limite de alunos',
        link: '/recursos/alunos'
    },
    {
        icon: CiViewList,
        name: 'Avaliação Física',
        description: 'Avaliações detalhadas',
        link: '/recursos/avaliacao'
    },
    {
        icon: CiDiscount1,
        name: 'Programas de Incentivo',
        description: 'Benefícios exclusivos',
        link: '/recursos/incentivo'
    },
    {
        icon: IoStorefrontOutline,
        name: 'Fornecedores',
        description: 'Parceria com fornecedores',
        link: '/recursos/fornecedor'
    },
    {
        icon: CiDollar,
        name: 'Gestão Financeira',
        description: 'Administração completa',
        link: '/recursos/financeiro'
    },
    {
        icon: FaPinterestP,
        name: 'Integração Gympass',
        description: 'Planejamento Individual',
        link: '/recursos/gympass'
    },
    {
        icon: RiMiniProgramLine,
        name: 'Integração TotalPass',
        description: 'Planejamento Individual',
        link: '/recursos/totalpass'
    },
    {
        icon: MdOutlineLocalGroceryStore,
        name: 'Marketplace',
        description: 'Planejamento Individual',
        link: '/recursos/marketplace'
    },
    {
        icon: HiOutlineClipboardDocumentList,
        name: 'Nutricionistas',
        description: 'Profissionais de saúde',
        link: '/recursos/nutricionista'
    },
    {
        icon: FaPersonHarassing,
        name: 'Personal Trainer',
        description: 'Planejamento Individual',
        link: '/recursos/personal'
    },
    {
        icon: CiDumbbell,
        name: 'Planos de Treinos',
        description: 'Treinos personalizados',
        link: '/recursos/planos'
    },
    {
        icon: FaPersonArrowUpFromLine,
        name: 'Relacionamento',
        description: 'Planejamento Individual',
        link: '/recursos/relacionamento'
    },
    {
        icon: BsWindow,
        name: 'Site da Academia',
        description: 'Com Área do Aluno',
        link: '/recursos/site-academia'
    },
    {
        icon: CiLock,
        name: 'Controle de Acesso',
        description: 'Check-in & Check-out',
        link: '/recursos/controle'
    }
];

interface ResourceBoxProps {
    icon: IconType;
    name: string;
    description: string;
    link: string;
}

const ResourceBox: React.FC<ResourceBoxProps> = ({ icon: Icon, name, description, link }) => (
    <>
        <Box
            className='flex flex-row items-center color-primary text-[17px] px-4 py-3 cursor-pointer hover:scale-125 transition-transform duration-500 bg-white rounded-lg shadow-lg m-5'
            onClick={() => window.open(link, '_blank')}
        >
            <Icon size={50} />
            <Box className='flex flex-col w-[235px]'>
                <Box className='ml-2'>{name}</Box>
                <Typography className='!ml-2 !text-[#646464]'>{description}</Typography>
            </Box>
        </Box>
    </>
);

export const NutritionistPlans = () => {

    const recursosRef = useRef<HTMLDivElement>(null);

    const scrollToRecursos = () => {
        recursosRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <HeaderLight />
            <Box className='w-full mt-5 py-6 flex flex-col'>
                <Box className='w-full py-6 flex flex-col items-center'>
                    <Box className='flex flex-row md:text-[3rem] text-[1.5rem] text-black'>A <Typography className='!mx-[10px] !font-bold md:!text-[3rem] !text-[1.5rem] color-primary'>gestão</Typography> perfeita está a um passo de você!</Box>
                    <Typography className='md:!text-[1.3em] !text-[.75em] !mt-1'>
                        Escolha o plano ideal para sua academia e aproveite todos os benefícios exclusivos!
                    </Typography>
                </Box>
                <Box className='w-full pt-10 pb-20 flex flex-col items-center mt-10'>
                    <DestaqueTitle className="bg-secondary text-white w-[15.5rem]">Planos Academias</DestaqueTitle>
                    <Box className='flex md:flex-row flex-col md:mt-10 mt-16'>
                        <Box className='shadow-2xl rounded-lg mx-5 p-6 flex flex-col items-center w-[350px] transition-transform duration-500 hover:scale-105 cursor-pointer bg-[#F6F6F7] text-[#7B7E86]'>
                            <Box className='px-4 py-4 rounded-lg -mt-24 -skew-x-12 -ml-20'>
                                <Box className='bg-secondary w-[115px] h-[110px] -skew-x-6 rounded-2xl flex items-center justify-center text-white text-[20px]'>
                                    <Img src={plansIconOne} />
                                </Box>
                            </Box>
                            <Box className='text-[30px] text-black mt-5'>Plano Mensal</Box>
                            <Box className='flex flex-row color-primary'>
                                <Typography className='!text-[20px]'>R$</Typography>
                                <Typography className='!text-[55px] !font-bold'>299,99</Typography>
                                <Box className='flex flex-row items-end'>
                                    <Typography className='!mb-5'>/mês</Typography>
                                </Box>
                            </Box>
                            <Divider className='!my-5 w-full bg-[#e2e2e4]' />
                            <Box className='flex flex-col'>
                                <Typography className='flex flex-row items-center !mb-3'><FaRegCircleCheck className='mr-2 color-primary' /> Aplicativo do Aluno e Gestor</Typography>
                                <Typography className='flex flex-row items-center !mb-3'><FaRegCircleCheck className='mr-2 color-primary' /> Check-in & Check-out</Typography>
                                <Typography className='flex flex-row items-center !mb-3'><FaRegCircleCheck className='mr-2 color-primary' /> Fornecedores</Typography>
                                <Typography className='flex flex-row items-center !mb-3'><FaRegCircleCheck className='mr-2 color-primary' /> Gympass & TotalPass</Typography>
                                <Typography className='flex flex-row items-center !mb-3'><FaRegCircleCheck className='mr-2 color-primary' /> Nutricionistas</Typography>
                                <Typography className='flex flex-row items-center !mb-3'><FaRegCircleCheck className='mr-2 color-primary' /> Personal Trainers</Typography>
                                <Typography className='flex flex-row items-center !mb-3'><FaRegCircleCheck className='mr-2 color-primary' /> Programas de Incentivo</Typography>
                                <Typography className='flex flex-row items-center !mb-3'><FaRegCircleCheck className='mr-2 color-primary' /> Sistema Completo</Typography>
                                <Typography className='flex flex-row items-center !mb-3'><FaRegCircleCheck className='mr-2 color-primary' /> Alunos Ilimitados</Typography>
                            </Box>
                            <Button
                                onClick={scrollToRecursos}
                                variant="outlined"
                                color="primary"
                                sx={{
                                    marginTop: '1rem',
                                    color: '#ff0336',
                                    borderColor: '#ff0336',
                                    '&:hover': {
                                        borderColor: '#ff0336',
                                        color: '#ff0336',
                                    },
                                }}
                            >
                                Ver todos os recursos
                            </Button>
                            <Box className='flex flex-col h-full items-center justify-end w-full'>
                                <Divider className='!my-5 w-full bg-[#e2e2e4]' />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        backgroundColor: '#ff0336',
                                        color: '#fff',
                                        height: '3rem',
                                        '&:hover': {
                                            backgroundColor: '#e6001b',
                                        },
                                    }}
                                >
                                    Contratar
                                </Button>
                            </Box>
                        </Box>
                        <Box className='shadow-2xl rounded-lg mx-5 p-6 flex flex-col items-center w-[350px] transition-transform duration-500 scale-105 cursor-pointer bg-[#000000c7] text-white md:mt-0 mt-16'>
                            <Box className='bg-[#ff0336] px-4 py-1 text-[14px] rounded-lg absolute -mt-10'>
                                Mais Escolhido
                            </Box>
                            <Box className='text-[30px]'>Plano Trimestral</Box>
                            <Box className='flex flex-row'>
                                <Typography className='!text-[20px]'>R$</Typography>
                                <Typography className='!text-[55px] !font-bold'>827,97</Typography>
                                <Box className='flex flex-row items-end'>
                                    <Typography className='!mb-5'>/trimestre</Typography>
                                </Box>
                            </Box>
                            <Divider className='!my-5 w-full bg-[#e2e2e4]' />
                            <Box className='flex flex-col items-center justify-end h-full'>
                                <Typography className='flex flex-row items-center !text-[23px] !font-bold'>8% de Desconto</Typography>
                                <Typography className='flex flex-row items-center !mb-5 !text-[20px]'>Até 3x sem juros no cartão</Typography>
                                <Box className='flex flex-row text-[14px] items-center'>Aproximadamente <Typography className='!font-bold !mx-1'>R$ 275,99</Typography> mensais</Box>
                            </Box>
                            <Box className='flex flex-col h-full items-center justify-end w-full'>
                                <Divider className='!my-5 w-full bg-[#e2e2e4]' />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        backgroundColor: '#ff0336',
                                        color: '#fff',
                                        height: '3rem',
                                        '&:hover': {
                                            backgroundColor: '#e6001b',
                                        },
                                    }}
                                >
                                    Contratar
                                </Button>
                            </Box>
                        </Box>
                        <Box className='shadow-2xl rounded-lg mx-5 p-6 flex flex-col items-center w-[350px] transition-transform duration-500 hover:scale-105 cursor-pointer bg-[#F6F6F7] text-[#7B7E86] md:mt-0 mt-24'>
                            <Box className='px-4 py-4 rounded-lg -mt-24 -skew-x-12 -ml-20'>
                                <Box className='bg-secondary w-[115px] h-[110px] -skew-x-6 rounded-2xl flex items-center justify-center text-white text-[20px]'>
                                    <Img src={plansIconThree} />
                                </Box>
                            </Box>
                            <Box className='text-[30px] text-black'>Plano Anual</Box>
                            <Box className='flex flex-row color-primary'>
                                <Typography className='!text-[20px]'>R$</Typography>
                                <Typography className='!text-[55px] !font-bold'>2.699,91</Typography>
                                <Box className='flex flex-row items-end'>
                                    <Typography className='!mb-5'>/ano</Typography>
                                </Box>
                            </Box>
                            <Divider className='!my-5 w-full bg-[#E2E2E4]' />
                            <Box className='flex flex-col items-center justify-end h-full'>
                                <Typography className='flex flex-row items-center !text-[23px] !font-bold color-primary'>25% de Desconto</Typography>
                                <Typography className='flex flex-row items-center !mb-5 !text-[20px]'>Até 6x sem juros no cartão</Typography>
                                <Box className='flex flex-row text-[14px] items-center'>Aproximadamente <Typography className='!font-bold !mx-1 color-primary'>R$ 224,99</Typography> mensais</Box>
                            </Box>
                            <Box className='flex flex-col h-full items-center justify-end w-full'>
                                <Divider className='!my-5 w-full bg-[#e2e2e4]' />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        backgroundColor: '#ff0336',
                                        color: '#fff',
                                        height: '3rem',
                                        '&:hover': {
                                            backgroundColor: '#e6001b',
                                        },
                                    }}
                                >
                                    Contratar
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Seção de Recursos */}
                <Box className='flex flex-col items-center mt-14' ref={recursosRef}>
                    <DestaqueTitle className="bg-secondary text-white w-[16rem]">Todos os Recursos</DestaqueTitle>
                    <Typography>Confira abaixo todos os recursos disponíveis em nossos planos.</Typography>
                    <Box className='flex flex-row flex-wrap justify-center'>
                        {resources.map((resource, index) => (
                            <ResourceBox
                                key={index}
                                icon={resource.icon}
                                name={resource.name}
                                description={resource.description}
                                link={resource.link}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    );
};