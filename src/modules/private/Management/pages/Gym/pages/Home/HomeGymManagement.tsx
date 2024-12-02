import { Box, Button, Checkbox, Divider, Drawer, FormControlLabel, Skeleton, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { FiAlertTriangle, FiInfo } from "react-icons/fi";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LiaTruckLoadingSolid } from "react-icons/lia";
import { LuAlertCircle, LuCircleDollarSign } from "react-icons/lu";
import { MdAddBox, MdDeleteOutline } from 'react-icons/md';
import { PiFireFill, PiStorefrontLight, PiUserPlusLight } from "react-icons/pi";
import { RiNotificationOffLine } from "react-icons/ri";
import { TbFilterQuestion, TbUserDollar } from "react-icons/tb";
import { StudentRegisterDrawer } from "../../../../components/Drawer/StudentRegisterDrawer";
import { useGymData } from "../../hooks/dbHome";
import { AdminGymDrawerType } from "../../types";

interface GymData {
    id: number;
    name: string;
}

interface Notification {
    id: number;
    type: string;
    icon: string;
    name: string;
    describe: string;
    route: string;
    colorName: string;
    colorBackIcon: string;
}

interface PendingGymPayments {
    id: number;
    userId: number;
    paymentType: string;
    name: string;
    describe: string;
    colorName: string;
    colorBackIcon: string;
}

const iconMap: Record<string, React.ElementType> = {
    FiAlertTriangle: FiAlertTriangle,
    LuAlertCircle: LuAlertCircle,
    FiInfo: FiInfo,
    Plan: LuCircleDollarSign,
    Students: TbUserDollar,
    Supplier: LiaTruckLoadingSolid,
};

export default function HomeGymManagement() {

    {/* Drawers */}
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerType, setDrawerType] = useState<AdminGymDrawerType[keyof AdminGymDrawerType] | null>(null);

    const openDrawer = (type: AdminGymDrawerType[keyof AdminGymDrawerType]) => {
        setDrawerType(type);
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerType(null);
        setIsDrawerOpen(false);
    };

    const { enqueueSnackbar } = useSnackbar();

    const renderDrawerContent = () => {
        switch (drawerType) {
            case 'StudentRegister':
                return <StudentRegisterDrawer closeDrawer={closeDrawer} enqueueSnackbar={enqueueSnackbar}/>
            
            default:
                return <div>Escolha uma ação</div>;
        }
    };

    const { data, loading } = useGymData<GymData[]>('http://localhost:5000/UserDetails');
    const { data: notificationsData, loading: notificationsLoading } = useGymData<Notification[]>(`http://localhost:5000/NotificationManagement?userId=${data?.[0]?.id}&_expand=icon`);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const { data: pendingGymPaymentsData, loading: pendingGymPaymentsLoading } = useGymData<PendingGymPayments[]>(`http://localhost:5000/PendingGymPayments?userId=${data?.[0]?.id}`);

    // Pagamentos Pendentes
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false); // Para o Drawer de filtro
    const [filteredPayments, setFilteredPayments] = useState<PendingGymPayments[]>(pendingGymPaymentsData || []);
    const [selectedPaymentTypes, setSelectedPaymentTypes] = useState<string[]>([]); // Para armazenar os tipos selecionados

    // Função para alternar o filtro de pagamento
    const handlePaymentTypeChange = (paymentType: string) => {
        setSelectedPaymentTypes((prevSelected) => {
            if (prevSelected.includes(paymentType)) {
                return prevSelected.filter((type) => type !== paymentType); // Remove do filtro
            } else {
                return [...prevSelected, paymentType]; // Adiciona ao filtro
            }
        });
    };

    // Função para abrir o Drawer de Filtro
    const toggleFilterDrawer = (open: boolean) => {
        setIsFilterDrawerOpen(open);
        if (open) {
            setIsRegisterDrawerOpen(false); // Fechar o Drawer de matrícula quando abrir o de filtro
        }
    };

    // Atualiza os pagamentos filtrados sempre que os tipos de pagamento mudam
    useEffect(() => {
        if (selectedPaymentTypes.length > 0) {
            const filtered = pendingGymPaymentsData?.filter((payment) =>
                selectedPaymentTypes.includes(payment.paymentType)
            );
            setFilteredPayments(filtered || []);
        } else {
            setFilteredPayments(pendingGymPaymentsData || []); // Se não houver filtro, mostra todos
        }
    }, [selectedPaymentTypes, pendingGymPaymentsData]);

    React.useEffect(() => {
        if (notificationsData) {
            setNotifications(notificationsData);
        }
    }, [notificationsData]);

    const clearNotifications = () => {
        setNotifications([]); // Limpa as notificações
    };

    const clearFilters = () => {
        setSelectedPaymentTypes([]);
    };

    // Função para extrair o primeiro nome
    const getFirstName = (fullName: string) => {
        return fullName.split(' ')[0];
    };

    return (
        <Box>
            {/* Drawer */}
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={closeDrawer}
                PaperProps={{
                    className: "w-[60%] p-8"
                }}
            >
                {renderDrawerContent()}
            </Drawer>

            <Box className='flex flex-row justify-between items-center'>
                <Box className='flex flex-col w-[380px]'>
                    <Box className='text-[2.4rem] color-secondary flex'>Oi, 
                        {loading || !data ? (
                            <Skeleton variant="rounded" animation="wave" width={190} height={38} className='m-3 mb-0' />
                        ) : (
                            <Box className='ml-3'>{getFirstName(data[0]?.name || '')}!</Box>
                        )}
                    </Box>
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
                        onClick={() => openDrawer('StudentRegister')}>
                            <Box><PiUserPlusLight className='text-[5rem]' /></Box>
                            <Box className='flex flex-col mt-3'>Matricular Aluno</Box>
                    </Button>
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
                    <Box className='bg-white rounded-3xl shadow-md w-[320px] h-[367px] mr-7'>
                        <Box className='flex flex-row justify-between m-5'>
                            <Box className='color-secondary text-[1.3rem]'>Notificações</Box>
                            <Button
                                onClick={clearNotifications}
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
                        <Box className="w-full bg-[#f3f4f7] px-3 py-2 border-[#efefef] border-y-[1px] mb-3 font-light">Recentes</Box>
                        <Box className='flex flex-col h-[195px]' style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {notificationsLoading ? (
                                Array.from({ length: 2 }).map((_, index) => (
                                    <Box className='flex flex-col'>
                                        <Box key={index} className="flex flex-row items-center p-2"> 
                                            <Skeleton variant="circular" animation="wave" width={48} height={48} className='mx-3' />
                                            <Box>
                                                <Skeleton variant="text" animation="wave" sx={{ fontSize: '1rem' }} width={150} />
                                                <Skeleton variant="text" animation="wave" sx={{ fontSize: '1rem' }} width={180} />
                                            </Box>
                                        </Box>
                                        <Divider className='!mx-5 !my-3 bg-[#efefef]' />
                                    </Box>
                                ))
                            ) : notifications.length > 0 ? (
                                // Exibe as notificações com o ícone
                                notifications?.map((notification) => (
                                    <Box className='flex flex-col'>
                                        <Box
                                            key={notification.id}
                                            className="flex flex-row items-center p-2"
                                            > 
                                                {iconMap[notification.icon] && (
                                                    <Box
                                                        className="mx-3 rounded-full"
                                                        style={{ background: `#${notification.colorBackIcon}` }}
                                                    >
                                                        {React.createElement(iconMap[notification.icon], {
                                                            className: "p-3 text-[3rem]",
                                                            style: { color: `#${notification.colorName}` },
                                                        })}
                                                    </Box>
                                                )}
                                            <Box>
                                                <Box className="font-roboto font-medium" style={{ color: `#${notification.colorName}` }}>{notification.name}</Box>
                                                <Box className="text-sm text-gray-600">{notification.describe}</Box>
                                            </Box>
                                        </Box>
                                        <Divider className='!mx-5 !my-3 bg-[#efefef]' />
                                    </Box>
                                ))
                            ) : (
                                <Box className="flex flex-col items-center justify-center h-full text-gray-500 mt-[-.5rem]">
                                    <RiNotificationOffLine className="text-[3rem]" />
                                    <Box className="mt-2 text-center">Sem notificações</Box>
                                </Box>
                            )}
                        </Box>
                        <Box className='flex justify-center mt-1'>
                            <Button
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
                                }}>
                                    Ver todas as notificações
                            </Button>
                        </Box>
                    </Box>
                    <Box className='bg-white rounded-3xl shadow-md w-[385px] h-[367px]'>
                        <Box className='flex flex-row justify-between m-5'>
                            <Box className='color-secondary text-[1.3rem]'>Pagamentos Pendentes</Box>
                            <Button
                                onClick={() => toggleFilterDrawer(true)}
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
                        {/* Drawer para filtros */}
                <Drawer
                    anchor="right"
                    open={isFilterDrawerOpen}
                    onClose={() => toggleFilterDrawer(false)}
                    PaperProps={{
                        sx: { width: '350px', padding: '16px' },
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Filtrar Pagamentos
                    </Typography>
                    <Box display="flex" flexDirection="column">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedPaymentTypes.includes('Students')}
                                    onChange={() => handlePaymentTypeChange('Students')}
                                />
                            }
                            label="Alunos"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedPaymentTypes.includes('Supplier')}
                                    onChange={() => handlePaymentTypeChange('Supplier')}
                                />
                            }
                            label="Fornecedores"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedPaymentTypes.includes('Plan')}
                                    onChange={() => handlePaymentTypeChange('Plan')}
                                />
                            }
                            label="Planos"
                        />
                        <Button
                            onClick={clearFilters}
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
                        >
                            Limpar Filtros
                        </Button>
                    </Box>
                </Drawer>
                        <Box className="w-full bg-[#f3f4f7] px-3 py-2 border-[#efefef] border-y-[1px] mb-3 font-light">Necessitam de sua atenção</Box>
                        <Box className='flex flex-col h-[195px]' style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {pendingGymPaymentsLoading ? (
                                Array.from({ length: 2 }).map((_, index) => (
                                    <Box className='flex flex-col'>
                                        <Box key={index} className="flex flex-row items-center p-2"> 
                                            <Skeleton variant="circular" animation="wave" width={48} height={48} className='mx-3' />
                                            <Box>
                                                <Skeleton variant="text" animation="wave" sx={{ fontSize: '1rem' }} width={150} />
                                                <Skeleton variant="text" animation="wave" sx={{ fontSize: '1rem' }} width={180} />
                                            </Box>
                                        </Box>
                                        <Divider className='!mx-5 !my-3 bg-[#efefef]' />
                                    </Box>
                                ))
                            ) : pendingGymPaymentsData.length > 0 ? (
                                // Exibe as notificações com o ícone
                                filteredPayments.map((payment) => (
                                    <Box className='flex flex-col'>
                                        <Box
                                            key={payment.id}
                                            className="flex flex-row items-center p-2"
                                            > 
                                            {iconMap[payment.paymentType] && (
                                                    <Box
                                                        className="mx-3 rounded-full"
                                                        style={{ background: `#${payment.colorBackIcon}` }}
                                                    >
                                                        {React.createElement(iconMap[payment.paymentType], {
                                                            className: "p-3 text-[3rem]",
                                                            style: { color: `#${payment.colorName}` },
                                                        })}
                                                    </Box>
                                                )}
                                            <Box>
                                                <Box className="font-roboto font-medium">{payment.name}</Box>
                                                <Box className="text-sm text-gray-600">{payment.describe}</Box>
                                            </Box>
                                        </Box>
                                        <Divider className='!mx-5 !my-3 bg-[#efefef]' />
                                    </Box>
                                ))
                            ) : (
                                <Box className="flex flex-col items-center justify-center h-full text-gray-500 mt-[-.5rem]">
                                    <HiOutlineEmojiHappy className="text-[3rem]" />
                                    <Box className="mt-2 text-center">Não há pagamentos</Box>
                                </Box>
                            )}
                        </Box>
                        <Box className='flex justify-center mt-1'>
                            <Button
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
                                }}>
                                    Ver todos os pagamentos
                            </Button>
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