import { Box, Button, Drawer, Skeleton, Typography } from "@mui/material";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdAddBox, MdDeleteOutline } from 'react-icons/md';
import { PiFireFill, PiStorefrontLight, PiUserPlusLight } from "react-icons/pi";
import { TbFilterQuestion } from "react-icons/tb";

export default function GymManagementHome() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => {
        setIsDrawerOpen(open);
    };

    return (
        <Box>
            <Box className='flex flex-row justify-between items-center'>
                <Box className='flex flex-col w-[380px]'>
                    <Box className='text-[2.4rem] color-secondary'>Oi, Rudnick!</Box>
                    <Box className='text-[2.4rem] color-secondary'>Quais são os planos para hoje?</Box>
                    <Box className='mt-5 color-secondary font-light'>Para tornar o sistema mais intuitivo e de fácil acesso, ao lado oferecemos algumas opções rápidas para você começar.</Box>
                </Box>
                <Box className='flex flex-row'>
                    <Button
                        className='bg-white w-[200px] h-[200px] !rounded-3xl items-center justify-center flex flex-col !mx-4 !font-normal !border-dashed !border-[1px]'
                        style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                        sx={{
                            background: '#ff033511',
                            color: '#ff033524',
                            transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                            '&:hover': {
                                color: '#4b5563',
                            },
                        }}
                    >
                        <MdAddBox className='text-[2.3rem] color-primary' />
                        <Box className='flex flex-col mt-3 color-primary'>Novo Atalho</Box>
                    </Button>
                    <Button
                        className='bg-white w-[200px] h-[200px] !rounded-3xl shadow-2xl items-center justify-center flex flex-col !mx-4 !font-normal !text-[16px]'
                        style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                        sx={{
                            color: '#4b5563',
                            transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                            '&:hover': {
                                background: '#ff0336',
                                color: 'white',
                            },
                        }}
                        onClick={() => toggleDrawer(true)}
                    >
                        <Box><PiUserPlusLight className='text-[5rem]' /></Box>
                        <Box className='flex flex-col mt-3'>Matricular Aluno</Box>
                    </Button>
                    {/* Drawer para a matrícula */}
                    <Drawer
                        anchor="right" // Define o lado esquerdo para a abertura do modal
                        open={isDrawerOpen}
                        onClose={() => toggleDrawer(false)}
                        PaperProps={{
                            sx: { width: '550px', padding: '16px' }, // Largura do Drawer
                        }}
                    >
                        {/* Conteúdo do Drawer */}
                        <Box display="flex" flexDirection="column">
                            <Typography variant="h5" component="div" gutterBottom>
                                Matricular Aluno
                            </Typography>
                            <Box mt={2}>
                                {/* Formulário ou conteúdo adicional para matrícula aqui */}
                                <Typography variant="body1">Preencha os dados do aluno para completar a matrícula.</Typography>
                                {/* Adicione campos, botões e outros elementos necessários */}
                            </Box>
                        </Box>
                    </Drawer>
                    <Button
                        className='bg-white w-[200px] h-[200px] !rounded-3xl shadow-2xl items-center justify-center flex flex-col !ml-4 !font-normal !text-[16px]'
                        style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                        sx={{
                            color: '#4b5563',
                            transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                            '&:hover': {
                                background: '#ff0336',
                                color: 'white',
                            },
                        }}
                    >
                        <Box><PiStorefrontLight className='text-[5rem]' /></Box>
                        <Box className='flex flex-col mt-3'>Marketplace</Box>
                    </Button>
                </Box>
            </Box>
            <Box className='flex flex-row mt-10 w-full'>
                <Box className='flex flex-wrap w-[750px] content-center'>
                    <Box className='bg-white rounded-3xl shadow-md w-[320px] h-[330px] mr-7'>
                        <Box className='flex flex-row justify-between m-5'>
                            <Box className='color-secondary text-[1.3rem]'>Notificações</Box>
                            <Button
                                startIcon={<MdDeleteOutline />}
                                style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                                sx={{
                                    color: '#4b5563',
                                    fontWeight: 'normal',
                                    padding: 0,
                                    transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                    '&:hover': {
                                        background: 'white',
                                        color: '#ff0336',
                                    },
                                }}
                            > Limpar</Button>
                        </Box>
                        <Box className='flex flex-col justify-center items-center'>
                            <Skeleton variant="rounded" width={250} height={70} className='mb-5' />
                            <Skeleton variant="rounded" width={250} height={70} className='mb-5' />
                            <Skeleton variant="rounded" width={250} height={50} />
                        </Box>
                    </Box>
                    <Box className='bg-white rounded-3xl shadow-md w-[385px] h-[330px]'>
                        <Box className='flex flex-row justify-between m-5'>
                            <Box className='color-secondary text-[1.3rem]'>Pagamentos Pendentes</Box>
                            <Button
                                startIcon={<TbFilterQuestion />}
                                className='!min-w-5'
                                style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                                sx={{
                                    color: '#4b5563',
                                    fontWeight: 'normal',
                                    padding: 0,
                                    transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                    '&:hover': {
                                        background: 'white',
                                        color: '#ff0336',
                                    },
                                }}
                            >Filtrar</Button>
                        </Box>
                        <Box className='flex flex-col justify-center items-center'>
                            <Skeleton variant="rounded" height={70} className='mb-5 w-full' />
                            <Skeleton variant="rounded" width={250} height={70} className='mb-5' />
                            <Skeleton variant="rounded" width={250} height={50} />
                        </Box>
                    </Box>
                    <Box className='bg-white rounded-3xl shadow-md w-[500px] h-[330px] mt-7 mr-7'>
                        <Box className='flex flex-row justify-between m-5'>
                            <Box className='color-secondary text-[1.3rem]'>Agenda e Reservas</Box>
                            <Box>
                                <Button
                                    startIcon={<IoMdAddCircleOutline />}
                                    className='!min-w-5 !mr-5'
                                    style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                                    sx={{
                                        color: '#4b5563',
                                        fontWeight: 'normal',
                                        padding: 0,
                                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                        '&:hover': {
                                            background: 'white',
                                            color: '#ff0336',
                                        },
                                    }}
                                >Novo</Button>
                                <Button
                                    startIcon={<TbFilterQuestion />}
                                    className='!min-w-5'
                                    style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                                    sx={{
                                        color: '#4b5563',
                                        fontWeight: 'normal',
                                        padding: 0,
                                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                        '&:hover': {
                                            background: 'white',
                                            color: '#ff0336',
                                        },
                                    }}
                                >Filtrar</Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box className='bg-[#08041b] rounded-3xl shadow-md w-[205px] h-[330px] mt-7 flex flex-col justify-center items-center p-5'>
                        <PiFireFill className='color-primary text-[3rem]' />
                        <Box className='!text-white text-[14px] my-5 font-light'>Tenha acesso a uma variedade de benefícios projetados para aprimorar sua experiência.</Box>
                        <Button
                            variant="contained"
                            href="/planos/fornecedor"
                            color="primary"
                            style={{ color: 'white', fontFamily: 'Poppins', height: '3rem' }}
                            sx={{
                                background: '#ff0336',
                                transition: 'transform 0.3s, background-color 0.3s',
                                '&:hover': {
                                    background: '#FF0000'
                                },
                            }}
                        >Assinar Plano</Button>
                    </Box>
                </Box>
                <Box className='flex flex-col w-[400px] ml-7'>
                    <Box className='bg-white rounded-3xl shadow-md w-full h-[380px]'>
                        <Box className='flex flex-row justify-between m-5'>
                            <Box className='color-secondary text-[1.3rem]'>Programas de <span className='color-primary'>Incentivo</span></Box>
                        </Box>
                    </Box>
                    <Box className='bg-white rounded-3xl shadow-md w-full h-[160px] mt-7'>
                        <Box className='flex flex-row justify-between m-5'>
                            <Box className='color-secondary text-[1.3rem]'>Matrículas</Box>
                        </Box>
                    </Box>
                    <Box className='bg-white rounded-3xl shadow-md w-full h-[160px] mt-7'>
                        <Box className='flex flex-row justify-between m-5'>
                            <Box className='color-secondary text-[1.3rem]'>Vendas</Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}