import { Box, Button, Collapse, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useRef } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import plansIconOne from '../../../assets/images/plansOne.svg';
import plansIconThree from '../../../assets/images/plansThree.svg';
import { HeaderLight } from "../../../components/Header/light";
import { useSignatureForm } from "../../../modules/private/Management/hooks";
import { Img } from "../../Home/styles.d";

export const GymPlans = () => {
    const recursosRef = useRef<HTMLDivElement>(null);
    const collapseRef = useRef<HTMLDivElement>(null);

    const scrollToRecursos = () => {
        recursosRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    const scrollToCollapse = (plan: string) => {
        setSelectedPlan(plan);
        collapseRef.current?.scrollIntoView();
    };

    const navigate = useNavigate();

    const {
        plans,
        selectedPlan,
        setSelectedPlan,
    } = useSignatureForm();

    const renderPaymentOptions = (plan: string) => {
        const currentPlan = plans[plan as keyof typeof plans];
        return (
            <Box className='w-full pb-20 flex flex-col items-center mt-10'>
                <Box className='flex md:flex-row flex-col md:mt-10 mt-16'>
                    <Box className='shadow-2xl rounded-lg p-6 flex flex-col items-center w-[277px] transition-transform duration-500 hover:scale-105 cursor-pointer bg-[#F6F6F7] text-[#7B7E86]'>
                        <Box className='text-[25px] text-black mt-5'>Plano Mensal</Box>
                        <Box className='flex flex-row color-primary'>
                            <Typography className='!text-[20px]'>R$</Typography>
                            <Typography className='!text-[40px] !font-bold !ml-1'>{currentPlan.monthly}</Typography>
                            <Box className='flex flex-row items-end'>
                                <Typography className='!mb-5'>/mês</Typography>
                            </Box>
                        </Box>
                        <Divider className='!my-5 w-full bg-[#e2e2e4]' />
                        <Box className='flex flex-col items-center justify-center h-full'>
                            <Typography className='flex flex-row items-center !mt-10 !text-[15px]'>Comece hoje mesmo a transformar a gestão da sua academia!</Typography>
                        </Box>
                        <Box className='flex flex-col h-full items-center justify-end w-full'>
                            <Divider className='!my-5 w-full bg-[#e2e2e4]' />
                            <Button
                                onClick={() => navigate('/cadastro')}
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
                    <Box className='shadow-2xl rounded-lg mx-10 p-6 flex flex-col items-center w-[277px] transition-transform duration-500 scale-105 cursor-pointer bg-[#000000c7] text-white md:mt-0 mt-16'>
                        <Box className='bg-[#ff0336] px-4 py-1 text-[14px] rounded-lg absolute -mt-10'>
                            Mais Escolhido
                        </Box>
                        <Box className='text-[25px]'>Plano Trimestral</Box>
                        <Box className='flex flex-row'>
                            <Typography className='!text-[17px]'>R$</Typography>
                            <Typography className='!text-[35px] !font-bold !ml-1'>{currentPlan.quarterly}</Typography>
                            <Box className='flex flex-row items-end'>
                                <Typography className='!mb-5 !text-[14px]'>/trimestre</Typography>
                            </Box>
                        </Box>
                        <Divider className='!my-5 w-full bg-[#e2e2e4]' />
                        <Box className='flex flex-col items-center justify-center h-full'>
                            <Typography className='flex flex-row items-center !text-[23px] !font-bold'>10% de Desconto</Typography>
                            <Typography className='flex flex-row items-center !mb-5 !text-[15px]'>Até 6x sem juros no cartão</Typography>
                            <Box className='flex flex-col text-[15px] items-center !mt-10'>Aproximadamente <Typography className='!font-bold !mt-1'>R$ {currentPlan.quarterlyMonthly}</Typography> mensais</Box>
                        </Box>
                        <Box className='flex flex-col items-center justify-end w-full'>
                            <Divider className='!my-5 w-full bg-[#e2e2e4]' />
                            <Button
                                onClick={() => navigate('/cadastro')}
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
                    <Box className='shadow-2xl rounded-lg p-6 flex flex-col items-center w-[277px] transition-transform duration-500 hover:scale-105 cursor-pointer bg-[#F6F6F7] text-[#7B7E86] md:mt-0 mt-24'>
                        <Box className='text-[25px] text-black'>Plano Anual</Box>
                        <Box className='flex flex-row color-primary'>
                            <Typography className='!text-[20px]'>R$</Typography>
                            <Typography className='!text-[40px] !font-bold !ml-1'>{currentPlan.yearly}</Typography>
                            <Box className='flex flex-row items-end'>
                                <Typography className='!mb-5'>/ano</Typography>
                            </Box>
                        </Box>
                        <Divider className='!my-5 w-full bg-[#E2E2E4]' />
                        <Box className='flex flex-col items-center justify-center h-full'>
                            <Typography className='flex flex-row items-center !text-[23px] !font-bold color-primary'>20% de Desconto</Typography>
                            <Typography className='flex flex-row items-center !mb-5 !text-[15px]'>Até 12x sem juros no cartão</Typography>
                            <Box className='flex flex-col text-[15px] items-center !mt-10'>Aproximadamente <Typography className='!font-bold color-primary !mt-1'>R$ {currentPlan.yearlyMonthly}</Typography> mensais</Box>
                        </Box>
                        <Box className='flex flex-col items-center justify-end w-full'>
                            <Divider className='!my-5 w-full bg-[#e2e2e4]' />
                            <Button
                                onClick={() => navigate('/cadastro')}
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
        );
    };

    return (
        <Box>
            <HeaderLight />
            <Box className="p-5 pb-[4rem]">
                <Box className='w-full flex flex-col'>
                    <Box className='w-full py-6 flex flex-col items-center'>
                        <Box className='flex flex-row md:text-[2.5rem] text-[1.5rem] text-black'>A <Typography className='!mx-[10px] !font-bold md:!text-[2.5rem] !text-[1.5rem] color-primary'>gestão</Typography> perfeita está a um passo de você!</Box>
                        <Typography className='md:!text-[1.1em] !text-[.75em] !mt-1'>
                            Escolha o plano ideal para sua academia e aproveite todos os benefícios exclusivos!
                        </Typography>
                    </Box>

                    <Box className='w-full pb-20 flex flex-col items-center mt-10'>
                        <Box className='flex md:flex-row flex-col md:mt-10 mt-16'>
                            <Box className='shadow-2xl rounded-lg p-6 flex flex-col items-center w-[277px] transition-transform duration-500 hover:scale-105 cursor-pointer bg-[#F6F6F7] text-[#7B7E86]'>
                                <Box className='px-4 py-4 rounded-lg -mt-24 -skew-x-12 -ml-20'>
                                    <Box className='bg-secondary w-[105px] h-[100px] -skew-x-6 rounded-2xl flex items-center justify-center text-white text-[20px]'>
                                        <Img src={plansIconOne} />
                                    </Box>
                                </Box>
                                <Box className='text-[25px] text-black mt-5'>{plans.Essential.name}</Box>
                                <Box className='flex flex-row color-primary'>
                                    <Typography className='!text-[20px]'>R$</Typography>
                                    <Typography className='!text-[40px] !font-bold !ml-1'>{plans.Essential.monthly}</Typography>
                                    <Box className='flex flex-row items-end'>
                                        <Typography className='!mb-5'>/mês</Typography>
                                    </Box>
                                </Box>
                                <Divider className='!my-5 w-full bg-[#e2e2e4]' />
                                <Box className='flex flex-col w-[91%]'>
                                    {plans.Essential.features.map((feature, index) => (
                                        <Typography key={index} className="flex flex-row items-center !mb-3">
                                            <FaRegCircleCheck className="mr-2 color-primary" /> {feature}
                                        </Typography>
                                    ))}
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
                                        onClick={() => scrollToCollapse("Essential")}
                                    >
                                        Mais informações
                                    </Button>
                                </Box>
                            </Box>
                            <Box className='shadow-2xl rounded-lg mx-10 p-6 flex flex-col items-center w-[277px] transition-transform duration-500 scale-105 cursor-pointer bg-[#0c0f17] text-[#b2b8bf] md:mt-0 mt-16'>
                                <Box className='bg-[#ff0336] px-4 py-1 text-[14px] rounded-lg absolute -mt-10 text-white'>
                                    Mais Escolhido
                                </Box>
                                <Box className='text-[25px] text-white'>{plans.Business.name}</Box>
                                <Box className='flex flex-row text-white'>
                                    <Typography className='!text-[17px]'>R$</Typography>
                                    <Typography className='!text-[40px] !font-bold !ml-1'>{plans.Business.monthly}</Typography>
                                    <Box className='flex flex-row items-end'>
                                        <Typography className='!mb-5'>/mês</Typography>
                                    </Box>
                                </Box>
                                <Divider className='!my-5 w-full bg-[#44474f]' />
                                <Box className='flex flex-col justify-center w-[91%] h-full'>
                                    <Typography className='flex flex-row justify-center items-center !mb-3 !font-semibold'> Tudo do Essential +</Typography>
                                    {plans.Business.features.map((feature, index) => (
                                        <Typography key={index} className="flex flex-row items-center !mb-3">
                                            <FaRegCircleCheck className="mr-2 color-primary" /> {feature}
                                        </Typography>
                                    ))}
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
                                <Box className='flex flex-col items-center justify-end w-full'>
                                    <Divider className='!my-5 w-full bg-[#44474f]' />
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
                                        onClick={() => scrollToCollapse("Business")}
                                    >
                                        Mais informações
                                    </Button>
                                </Box>
                            </Box>
                            <Box className='shadow-2xl rounded-lg p-6 flex flex-col items-center w-[277px] transition-transform duration-500 hover:scale-105 cursor-pointer bg-[#F6F6F7] text-[#7B7E86] md:mt-0 mt-24'>
                                <Box className='px-4 py-4 rounded-lg -mt-24 -skew-x-12 -ml-20'>
                                    <Box className='bg-secondary w-[105px] h-[100px] -skew-x-6 rounded-2xl flex items-center justify-center text-white text-[20px]'>
                                        <Img src={plansIconThree} />
                                    </Box>
                                </Box>
                                <Box className='text-[25px] text-black'>{plans.Imaginative.name}</Box>
                                <Box className='flex flex-row color-primary'>
                                    <Typography className='!text-[20px]'>R$</Typography>
                                    <Typography className='!text-[40px] !font-bold !ml-1'>{plans.Imaginative.monthly}</Typography>
                                    <Box className='flex flex-row items-end'>
                                        <Typography className='!mb-5'>/mês</Typography>
                                    </Box>
                                </Box>
                                <Divider className='!my-5 w-full bg-[#E2E2E4]' />
                                <Box className='flex flex-col justify-center w-[91%] h-full'>
                                    <Typography className='flex flex-row justify-center items-center !mb-3 !font-semibold'> Tudo do Business +</Typography>
                                    {plans.Imaginative.features.map((feature, index) => (
                                        <Typography key={index} className="flex flex-row items-center !mb-3">
                                            <FaRegCircleCheck className="mr-2 color-primary" /> {feature}
                                        </Typography>
                                    ))}
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
                                <Box className='flex flex-col items-center justify-end w-full'>
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
                                        onClick={() => scrollToCollapse("Imaginative")}
                                    >
                                        Mais informações
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box ref={collapseRef}>
                        <Collapse in={!!selectedPlan} timeout="auto" unmountOnExit>
                            <Box className="mt-5 flex flex-row justify-evenly items-center">
                                <Box className="rounded-3xl p-2 bg-[#f3f3f3]">
                                    <Button
                                        className={`flex flex-row !rounded-2xl !p-4 w-[10rem] !text-[1.1rem] ${selectedPlan === "Essential" ? "bg-secondary !text-white" : "!bg-[#f3f3f3]"}`}
                                        style={{ color: selectedPlan === "Essential" ? "#fff" : "#08041b" }}
                                        sx={{ textTransform: "none" }}
                                        onClick={() => setSelectedPlan("Essential")}
                                    >
                                        Essential
                                    </Button>
                                    <Button
                                        className={`flex flex-row !rounded-2xl !p-4 w-[10rem] !text-[1.1rem] !mx-2 ${selectedPlan === "Business" ? "bg-secondary !text-white" : "!bg-[#f3f3f3]"}`}
                                        style={{ color: selectedPlan === "Business" ? "#fff" : "#08041b" }}
                                        sx={{ textTransform: "none" }}
                                        onClick={() => setSelectedPlan("Business")}
                                    >
                                        Business
                                    </Button>
                                    <Button
                                        className={`flex flex-row !rounded-2xl !p-4 w-[10rem] !text-[1.1rem] ${selectedPlan === "Imaginative" ? "bg-secondary !text-white" : "!bg-[#f3f3f3]"}`}
                                        style={{ color: selectedPlan === "Imaginative" ? "#fff" : "#08041b" }}
                                        sx={{ textTransform: "none" }}
                                        onClick={() => setSelectedPlan("Imaginative")}
                                    >
                                        Imaginative
                                    </Button>
                                </Box>
                            </Box>
                            {selectedPlan && renderPaymentOptions(selectedPlan)}
                        </Collapse>
                    </Box>

                    <Box ref={recursosRef}>
                        <Box className="flex flex-row w-full p-10 pt-0">
                            <Box className="shadow-2xl rounded-lg p-6 flex flex-col items-center w-full transition-transform duration-500 bg-[#F6F6F7] text-[#7B7E86] md:mt-0 mt-24">
                                <Typography className="text-[#212121] text-center !my-5 !text-2xl">Principais recursos de cada plano</Typography>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Recursos</TableCell>
                                                <TableCell align="center">{plans.Essential.name}</TableCell>
                                                <TableCell align="center">{plans.Business.name}</TableCell>
                                                <TableCell align="center">{plans.Imaginative.name}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* Recursos Básicos */}
                                            <TableRow>
                                                <TableCell><strong>Recursos Básicos</strong></TableCell>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Alunos Ilimitados</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Check-in & Check-out</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center">Personalizável</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Controle de Acessos</TableCell>
                                                <TableCell align="center">Simples</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center">Personalizável</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Grupos de Acesso</TableCell>
                                                <TableCell align="center">Simples</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center">Personalizável</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Multiunidades</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Marketplace</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Cadastros de Visitantes</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Site da Academia</TableCell>
                                                <TableCell align="center">-</TableCell>
                                                <TableCell align="center">-</TableCell>
                                                <TableCell align="center">Adicional</TableCell>
                                            </TableRow>

                                            {/* Aplicativos */}
                                            <TableRow>
                                                <TableCell><strong>Aplicativos</strong></TableCell>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Aplicativo do Aluno</TableCell>
                                                <TableCell align="center">-</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Aplicativo do Gestor</TableCell>
                                                <TableCell align="center">-</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center">Personalizável</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Aplicativo do Instrutor</TableCell>
                                                <TableCell align="center">-</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center">Personalizável</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Notificações Push</TableCell>
                                                <TableCell align="center">-</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center">Personalizável</TableCell>
                                            </TableRow>

                                            {/* Gestão */}
                                            <TableRow>
                                                <TableCell><strong>Gestão</strong></TableCell>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Gestão de Agenda</TableCell>
                                                <TableCell align="center">Simples</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center">Personalizável</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Gestão de Treino</TableCell>
                                                <TableCell align="center">Simples</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center">Personalizável</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Gestão Financeira</TableCell>
                                                <TableCell align="center">Simples</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center">Personalizável</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Gestão de Produtos</TableCell>
                                                <TableCell align="center">-</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Reativação de Alunos</TableCell>
                                                <TableCell align="center">-</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>

                                            {/* Programas */}
                                            <TableRow>
                                                <TableCell><strong>Programas</strong></TableCell>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Programa Indique +</TableCell>
                                                <TableCell align="center">-</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Programa de Incentivo</TableCell>
                                                <TableCell align="center">-</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Programas de Fidelidade</TableCell>
                                                <TableCell align="center">-</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center">Personalizável</TableCell>
                                            </TableRow>

                                            {/* Parceiros */}
                                            <TableRow>
                                                <TableCell><strong>Parceiros</strong></TableCell>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Fornecedores</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Nutricionistas</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Personal Trainers</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>

                                            {/* Integrações */}
                                            <TableRow>
                                                <TableCell><strong>Integrações</strong></TableCell>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Integrações</TableCell>
                                                <TableCell align="center">Simples</TableCell>
                                                <TableCell align="center">Completo</TableCell>
                                                <TableCell align="center">Personalizável</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Whatsapp Integrado</TableCell>
                                                <TableCell align="center">-</TableCell>
                                                <TableCell align="center">Adicional</TableCell>
                                                <TableCell align="center">Adicional</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Wellhub</TableCell>
                                                <TableCell align="center">Adicional</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>TotalPass</TableCell>
                                                <TableCell align="center">Adicional</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>ClassPass</TableCell>
                                                <TableCell align="center">Adicional</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>

                                            {/* Cobranças */}
                                            <TableRow>
                                                <TableCell><strong>Cobranças</strong></TableCell>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Cobranças Automáticas</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Cobrança por Pix</TableCell>
                                                <TableCell align="center">Adicional</TableCell>
                                                <TableCell align="center">Adicional</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Cobrança por Cartão</TableCell>
                                                <TableCell align="center">Adicional</TableCell>
                                                <TableCell align="center">Adicional</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Cobrança por Boleto</TableCell>
                                                <TableCell align="center">Adicional</TableCell>
                                                <TableCell align="center">Adicional</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Emissão de NFS-e</TableCell>
                                                <TableCell align="center">Adicional</TableCell>
                                                <TableCell align="center">Adicional</TableCell>
                                                <TableCell align="center">Adicional</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Gestão de Inadimplência</TableCell>
                                                <TableCell align="center">-</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>

                                            {/* Relatórios */}
                                            <TableRow>
                                                <TableCell><strong>Relatórios</strong></TableCell>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Relatórios</TableCell>
                                                <TableCell align="center">Simples</TableCell>
                                                <TableCell align="center">Completo</TableCell>
                                                <TableCell align="center">Personalizável</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Análise de Desempenho</TableCell>
                                                <TableCell align="center">-</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center">Personalizável</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Relatórios de Frequência</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>

                                            {/* Suporte */}
                                            <TableRow>
                                                <TableCell><strong>Suporte</strong></TableCell>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Suporte via Chat</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Suporte Prioritário</TableCell>
                                                <TableCell align="center">-</TableCell>
                                                <TableCell align="center">-</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Treinamento Online</TableCell>
                                                <TableCell align="center">-</TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                                <TableCell align="center"><FaRegCircleCheck className="color-primary mx-auto" /></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}