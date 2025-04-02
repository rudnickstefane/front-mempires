import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Box, Button, Checkbox, CircularProgress, Divider, Drawer, FormControlLabel, IconButton, Skeleton, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaDollarSign, FaUserCheck, FaUserFriends } from "react-icons/fa";
import { FiAlertTriangle, FiInfo } from "react-icons/fi";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { LiaTruckLoadingSolid } from "react-icons/lia";
import { LuAlertCircle, LuCircleDollarSign } from "react-icons/lu";
import { MdAddBox, MdDeleteOutline } from 'react-icons/md';
import { PiFireFill, PiUserPlus, PiUsersThree } from "react-icons/pi";
import { RiUserSharedFill, RiUserStarFill, RiUserUnfollowFill } from 'react-icons/ri';
import { TbFilterQuestion, TbUserDollar } from "react-icons/tb";
import { TiUserAdd } from "react-icons/ti";
import { useHomeGymManagement } from '../../hooks';
import { useGymData } from "../../hooks/dbHome";
import { GymManagementProps } from '../../types';
import Carousel from './Carousel';

interface GymData {
    id: number;
    name: string;
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
    PiUserPlus: PiUserPlus,
    PiUsersThree: PiUsersThree,
};

export default function HomeGymManagement({ enqueueSnackbar }: GymManagementProps) {

    const {
        isLoadingStudentMetrics,
        isLoadingShortcuts,
        isLoadingSlides,
        responseStudentMetrics,
        isDrawerOpen,
        renderDrawerContent,
        openDrawer,
        closeDrawer,
        responseShortcuts,
        responseSlides,
        handleDeleteShortcut
    } = useHomeGymManagement({ enqueueSnackbar });

    const { data } = useGymData<GymData[]>('http://localhost:5000/UserDetails');

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
            setIsFilterDrawerOpen(false); // Fechar o Drawer de matrícula quando abrir o de filtro
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

    const clearFilters = () => {
        setSelectedPaymentTypes([]);
    };

    return (
        <Box className='overflow-x-auto max-h-[calc(100vh-60px)] p-5 pb-[4rem]'>
            {/* Drawer */}
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={closeDrawer}
                disableEnforceFocus
                PaperProps={{
                    className: "w-[60%] p-8"
                }}
            >
                {renderDrawerContent()}
            </Drawer>

            <Box className='flex flex-row w-full'>
                <Box className='bg-white w-full rounded-3xl shadow-md p-5 border border-[#EAECF0] mr-5'>
                    <Typography className='text-[#152c5b]'>Pagamentos a receber
                        <Tooltip
                            title={
                                <>
                                    Esses valores pendentes incluem as vendas de seus produtos no nosso Marketplace e as taxas configuradas pela sua academia para o uso de serviços de personal trainers e nutricionistas.<br /><br />
                                    Se sua academia configurou uma taxa, ela será recebida como repasse referente aos serviços prestados aos seus alunos.<br /><br />
                                    Para mais detalhes, acesse no menu: <br />
                                    <b>Administrativo &gt; Configurações &gt; Taxas</b>
                                </>
                            } placement="right" arrow>
                            <IconButton
                                size="small"
                                sx={{ marginTop: '-5px', marginLeft: '5px' }}
                            >
                                <HelpOutlineIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                    <Box className='flex flex-row items-center my-3 justify-between'>
                        <Box className='flex flex-row items-end'>
                            <Box className='bg-[#fff0f3] rounded-full p-2 mr-5'>
                                <FaDollarSign className='text-[1.6rem] text-[#ff0336]'/>
                            </Box>
                            <Typography variant="h4" className='!font-bold text-[#152c5b]'>R$ 00,00</Typography>
                        </Box>
                    </Box>
                    <Typography className='!text-[.9rem]'>Markeplace & serviços de personal trainers e nutricionistas.</Typography>
                </Box>
                <Box className='bg-white min-w-[23%] rounded-3xl shadow-md p-5 border border-[#EAECF0] mr-5'>
                    <Typography className='text-[#152c5b]'>Novos Alunos
                        <Tooltip 
                            title={
                                <>
                                    Novas Matrículas. <br /><br />
                                    O percentual indica a diferença no número de matrículas em relação ao mês anterior. <br /><br />
                                    Se o valor é positivo, significa que tivemos mais matrículas do que no mês passado. <br /><br />
                                    Se for negativo, significa que o número de novas matrículas diminuiu. <br /><br />
                                    Para mais detalhes, acesse no menu: <br />
                                    <b>Administrativo &gt; Alunos</b>
                                </>
                            } placement="right" arrow>
                            <IconButton
                                size="small"
                                sx={{ marginTop: '-5px', marginLeft: '5px' }}
                            >
                                <HelpOutlineIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                    <Box className='flex flex-row items-center my-3 justify-between'>
                        <Box className='flex flex-row items-end'>
                            {isLoadingStudentMetrics ? (
                                    <>
                                        <Skeleton variant="circular" className='!w-[2.55rem] !h-[2.55rem]' animation="wave" />
                                        <Skeleton variant="text" className='!w-[3rem] !ml-2' animation="wave" />
                                    </>
                                ) : responseStudentMetrics ? (
                                    <>
                                        <Typography variant="h4" className='!font-bold text-[#152c5b]'>
                                            {responseStudentMetrics.newStudents.value}
                                        </Typography>
                                        <Typography
                                            className={`!font-bold !ml-2 ${responseStudentMetrics.newStudents.percentageChange < 0 ? 'text-red-500' : 'text-[#23c38e]'}`}
                                            >
                                            {responseStudentMetrics.newStudents.percentageChange >= 0
                                                ? `+ ${responseStudentMetrics.newStudents.percentageChange.toFixed(2)}%`
                                                : `- ${Math.abs(responseStudentMetrics.newStudents.percentageChange).toFixed(2)}%`}
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="h4" className='!font-bold text-[#152c5b]'>0</Typography>
                                        <Typography className='text-[#23c38e] !font-bold !ml-2'>+ 0.00%</Typography>
                                    </>
                                )
                            }
                        </Box>
                        <Box className='bg-[#ecfbf7] rounded-full p-2'>
                            <TiUserAdd className='text-[1.6rem] text-[#23c38e]'/>
                        </Box>
                    </Box>
                    <Typography className='!text-[.9rem]'>Matriculados neste mês</Typography>
                </Box>
                <Box className='bg-white min-w-[23%] rounded-3xl shadow-md p-5 border border-[#EAECF0]'>
                    <Typography className='text-[#152c5b]'>Novos Visitantes
                        <Tooltip 
                            title={
                                <>
                                    Novos Visitantes. <br /><br />
                                    O percentual indica a diferença no número de visitantes em relação aos últimos 30 dias. <br />
                                    Se o valor é positivo, significa que tivemos mais visitantes que no mês passado. <br />
                                    Se for negativo, significa que o número de visitantes diminuiu. <br /><br />
                                    Para mais detalhes, acesse no menu: <br />
                                    <b>Administrativo &gt; Relacionamento &gt; Visitas</b>
                                </>
                            } placement="right" arrow>
                            <IconButton
                                size="small"
                                sx={{ marginTop: '-5px', marginLeft: '5px' }}
                            >
                                <HelpOutlineIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                    <Box className='flex flex-row items-center my-3 justify-between'>
                        <Box className='flex flex-row items-end'>
                            {isLoadingStudentMetrics ? (
                                    <>
                                        <Skeleton variant="circular" className='!w-[2.55rem] !h-[2.55rem]' animation="wave" />
                                        <Skeleton variant="text" className='!w-[3rem] !ml-2' animation="wave" />
                                    </>
                                ) : responseStudentMetrics ? (
                                    <>
                                        <Typography variant="h4" className='!font-bold text-[#152c5b]'>
                                            {responseStudentMetrics.newVisitors.value}
                                        </Typography>
                                        <Typography
                                            className={`!font-bold !ml-2 ${responseStudentMetrics.newVisitors.percentageChange < 0 ? 'text-red-500' : 'text-[#fd6d3f]'}`}
                                            >
                                            {responseStudentMetrics.newVisitors.percentageChange >= 0
                                                ? `+ ${responseStudentMetrics.newVisitors.percentageChange.toFixed(2)}%`
                                                : `- ${Math.abs(responseStudentMetrics.newVisitors.percentageChange).toFixed(2)}%`}
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="h4" className='!font-bold text-[#152c5b]'>0</Typography>
                                        <Typography className='text-[#fd6d3f] !font-bold !ml-2'>+ 0.00%</Typography>
                                    </>
                                )
                            }
                        </Box>
                        <Box className='bg-[#fbf5ec] rounded-full p-2'>
                            <FaUserFriends className='text-[1.6rem] text-[#fd6d3f]'/>
                        </Box>
                    </Box>
                    <Typography className='!text-[.9rem]'>Nos últimos 30 dias</Typography>
                </Box>
            </Box>

            <Box className='flex flex-row mt-5 w-full'>
                <Box className='flex flex-col w-full mr-5'>
                    <Box className='flex flex-row w-full'>
                        <Box className='flex flex-row w-full'>
                            <Button
                                className='!bg-white w-full h-[80px] !rounded-3xl shadow-md items-center justify-center flex flex-row !font-normal !text-[16px] !border-solid !border !border-[#EAECF0]'
                                style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                                sx={{
                                    color: '#08041b',
                                    transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                    '&:hover': {
                                        background: '#ff0336 !important',
                                        color: 'white',
                                    },
                                }}
                                onClick={() => openDrawer('StudentRegister')}
                            >
                                <Box><FaUserCheck className='text-[2.5rem] text-[#ff0336] bg-[#fff0f3] p-2 rounded-full' /></Box>
                                <Box className='ml-2'>Novo Aluno</Box>
                            </Button>
                        </Box>
                        {isLoadingShortcuts ? (
                                <>
                                    <Button className='bg-white w-full h-[80px] !rounded-3xl items-center justify-center flex flex-row !font-normal !border-dashed !border-[1px] !mx-4' disabled>
                                        <Skeleton variant="circular" className='!w-[2.50rem] !h-[2.50rem]' animation="wave" />
                                        <Skeleton variant="text" className='!w-[6rem] !ml-2' animation="wave" />
                                    </Button>
                                    <Button className='bg-white w-full h-[80px] !rounded-3xl items-center justify-center flex flex-row !font-normal !border-dashed !border-[1px]' disabled>
                                        <Skeleton variant="circular" className='!w-[2.50rem] !h-[2.50rem]' animation="wave" />
                                        <Skeleton variant="text" className='!w-[6rem] !ml-2' animation="wave" />
                                    </Button>
                                </>
                            ) : (
                                <>
                                    {Array.isArray(responseShortcuts?.findUserShortcuts) && responseShortcuts.findUserShortcuts.length > 0 ? (
                                        <>
                                        {responseShortcuts.findUserShortcuts.map((shortcut, index) => (
                                            <Box className={`flex flex-row w-full ${index === 0 ? "!mx-5" : ""}`}>
                                                <Button
                                                    key={shortcut.shortcutCode}
                                                    className={`!bg-white w-full h-[80px] !rounded-l-3xl shadow-md items-center justify-center flex flex-row !font-normal !text-[16px] !border-solid !border-[1px] !border-[#EAECF0]`}
                                                    style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                                                    sx={{
                                                        color: '#08041b',
                                                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                                        '&:hover': {
                                                            background: `${shortcut.colorPrimary || '#ff0336'} !important`,
                                                            color: 'white',
                                                        },
                                                    }}
                                                    onClick={() => openDrawer(shortcut.path)}
                                                >
                                                    {React.createElement(iconMap[shortcut.icon], {
                                                        style: {
                                                            color: `${shortcut.colorPrimary || '#ff0336'}`,
                                                            backgroundColor: `${shortcut.colorSecond || '#fff0f3'}`,
                                                            padding: '0.5rem ',  // p-2
                                                            borderRadius: '50% ', // rounded-full
                                                            fontSize: '2.5rem',
                                                        }
                                                    })}
                                                    <Box className="ml-2">{shortcut.name}</Box>
                                                </Button>
                                                <Tooltip
                                                    placement="bottom"
                                                    title={'Excluir Atalho'}
                                                    arrow
                                                    >
                                                    <Button
                                                        className='!min-w-[1.8rem] !h-full !rounded-r-3xl !rounded-l-none !border-solid !border-[1px] !border-[#EAECF0] shadow-md'
                                                        sx={{
                                                            color: '#7f8a93',
                                                            background: '#1976d20a',
                                                            fontWeight: 'normal',
                                                            padding: 0,
                                                            transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                                            '&:hover': {
                                                                color: 'white',
                                                                background: `${shortcut.colorPrimary || '#ff0336'} !important`,
                                                            },
                                                        }}
                                                        onClick={() => handleDeleteShortcut(shortcut.shortcutCode)}
                                                    >
                                                        <MdDeleteOutline size={24}/>
                                                    </Button>
                                                </Tooltip>
                                            </Box>
                                        ))}

                                        {responseShortcuts.findUserShortcuts.length === 1 && (
                                            <Box className='flex flex-row w-full'>
                                                <Button
                                                    className='bg-white w-full h-[80px] !rounded-3xl items-center justify-center flex flex-row !font-normal !border-dashed !border-[1px] !text-[#ff0336]'
                                                    style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                                                    sx={{
                                                        background: '#ff033511',
                                                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                                        '&:hover': {
                                                            color: '#152c5b !important',
                                                        },
                                                    }}
                                                    onClick={() => openDrawer('ShortcutCreate')}
                                                >
                                                    <MdAddBox className='text-[2.5rem] bg-[#1976d20a] p-2 rounded-full' />
                                                    <Box className='ml-2'>Novo Atalho</Box>
                                                </Button>
                                            </Box>
                                        )}
                                        </>
                                    ) : (
                                        <>
                                            <Box className='flex flex-row w-full !mx-4'>
                                                <Button
                                                    className='bg-white w-full h-[80px] !rounded-3xl items-center justify-center flex flex-row !font-normal !border-dashed !border-[1px] !text-[#ff0336]'
                                                    style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                                                    sx={{
                                                        background: '#ff033511',
                                                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                                        '&:hover': {
                                                            color: '#152c5b !important',
                                                        },
                                                    }}
                                                    onClick={() => openDrawer('ShortcutCreate')}
                                                >
                                                    <MdAddBox className='text-[2.5rem] bg-[#1976d20a] p-2 rounded-full' />
                                                    <Box className='ml-2'>Novo Atalho</Box>
                                                </Button>
                                            </Box>
                                            <Box className='flex flex-row w-full'>
                                                <Button
                                                    className='bg-white w-full h-[80px] !rounded-3xl items-center justify-center flex flex-row !font-normal !border-dashed !border-[1px]'
                                                    style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                                                    disabled
                                                />
                                            </Box>
                                        </>
                                    )}
                                </>
                            )
                        }
                    </Box>

                    <Box className='mt-5 flex flex-col w-full bg-white !rounded-3xl shadow-md h-[240px] !border !border-[#EAECF0]'>
                    {isLoadingSlides ? (
                                <Box className='flex flex-col items-center justify-center h-full'>
                                    <CircularProgress size={40} className='!text-[#ff0336]' />
                                </Box>
                            ) : (
                                <>
                                {responseSlides?.findSlides && Array.isArray(responseSlides.findSlides) && (
                                    <Carousel
                                        autoSlide={true}
                                        autoSlideInterval={3000}
                                        slides={responseSlides.findSlides}
                                        duration={1000}
                                        stopAutoPlayOnHover={true}
                                    />
                                )}
                                </>
                            )
                        }
                    </Box>

                    <Box className='flex flex-row w-full mt-5'>
                        <Box className='bg-white w-full rounded-3xl shadow-md p-5 border border-[#EAECF0]'>
                            <Typography className='text-[#152c5b]'>Alunos Ativos
                                <Tooltip 
                                    title={
                                        <>
                                            São os alunos com matrículas ativas até este momento. <br /><br />
                                            Para mais detalhes, acesse no menu: <br />
                                            <b>Administrativo &gt; Alunos</b>
                                        </>
                                    } placement="right" arrow>
                                    <IconButton
                                        size="small"
                                        sx={{ marginTop: '-5px', marginLeft: '5px' }}
                                    >
                                        <HelpOutlineIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                            <Box className='flex flex-row items-center my-3 justify-between'>
                                <Box className='bg-[#fff9ed] rounded-full p-2'>
                                    <RiUserStarFill className='text-[1.6rem] text-[#ffbf3b]'/>
                                </Box>
                                {isLoadingStudentMetrics ? (
                                        <>
                                            <Skeleton variant="rounded" className='!w-[3rem] !h-[1.9rem]' animation="wave" />
                                        </>
                                    ) : (
                                        <Typography variant="h4" className='!font-bold text-[#152c5b]'>
                                            {responseStudentMetrics?.activeStudents.value}
                                        </Typography>
                                    )
                                }
                            </Box>
                            <Typography className='!text-[.9rem]'>Total</Typography>
                        </Box>

                        <Box className='bg-white w-full rounded-3xl shadow-md p-5 border border-[#EAECF0] mx-5'>
                            <Typography className='text-[#152c5b]'>Rematrículas
                                <Tooltip
                                    title={
                                        <>
                                            <b>Rematrículas ou renovações:</b><br /><br />
                                            Alunos que renovaram um plano existente ou retornaram após um período de ausência. <br /><br />
                                            Para mais detalhes, acesse no menu: <br />
                                            <b>Administrativo &gt; Alunos</b>
                                        </>
                                    } placement="right" arrow>
                                    <IconButton
                                        size="small"
                                        sx={{ marginTop: '-5px', marginLeft: '5px' }}
                                    >
                                        <HelpOutlineIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                            <Box className='flex flex-row items-center my-3 justify-between'>
                                <Box className='bg-[#ecfbf7] rounded-full p-2'>
                                    <RiUserSharedFill className='text-[1.6rem] text-[#23c38e]'/>
                                </Box>
                                {isLoadingStudentMetrics ? (
                                        <>
                                            <Skeleton variant="rounded" className='!w-[3rem] !h-[1.9rem]' animation="wave" />
                                        </>
                                    ) : (
                                        <Typography variant="h4" className='!font-bold text-[#152c5b]'>
                                            {responseStudentMetrics?.reEnrollments.value}
                                        </Typography>
                                    )
                                }
                            </Box>
                            <Typography className='!text-[.9rem]'>Neste mês</Typography>
                        </Box>

                        <Box className='bg-white w-full rounded-3xl shadow-md p-5 border border-[#EAECF0]'>
                            <Typography className='text-[#152c5b]'>Rescisões
                                <Tooltip
                                    title={
                                        <>
                                            Alunos que cancelaram suas matrículas. <br /><br />
                                            Para mais detalhes, acesse no menu: <br />
                                            <b>Administrativo &gt; Alunos</b>
                                        </>
                                    } placement="right" arrow>
                                    <IconButton
                                        size="small"
                                        sx={{ marginTop: '-5px', marginLeft: '5px' }}
                                    >
                                        <HelpOutlineIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                            <Box className='flex flex-row items-center my-3 justify-between'>
                                <Box className='bg-[#fff0f3] rounded-full p-2'>
                                    <RiUserUnfollowFill className='text-[1.6rem] text-[#ff0336]'/>
                                </Box>
                                {isLoadingStudentMetrics ? (
                                        <>
                                            <Skeleton variant="rounded" className='!w-[3rem] !h-[1.9rem]' animation="wave" />
                                        </>
                                    ) : (
                                        <Typography variant="h4" className='!font-bold text-[#152c5b]'>
                                            {responseStudentMetrics?.terminations.value}
                                        </Typography>
                                    )
                                }
                            </Box>
                            <Typography className='!text-[.9rem]'>Nos últimos 30 dias</Typography>
                        </Box>
                    </Box>

                    {/* <Box className='bg-white rounded-3xl shadow-md w-full h-[367px] mt-5'>
                        <Box className='flex flex-row justify-between m-5'>
                            <Box className='color-secondary text-[1.3rem]'>Notificações</Box>
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
                    </Box> */}

                    <Box className='bg-white rounded-3xl shadow-md w-full mt-5 p-5'>
                        <Box className='color-secondary text-[1.3rem] mb-5'>Agendamentos e Reservas</Box>
                        {/* <Calendar /> */}
                    </Box>
                </Box>
                <Box className='flex flex-col w-[52.5%]'>
                    <Box className='bg-white rounded-3xl shadow-md w-full border border-[#EAECF0]'>
                        <Box className='mt-5'>
                            <Box className='flex flex-row justify-between mx-5 mb-3'>
                                <Box className='color-secondary text-[1.3rem]'>Pagamentos Pendentes</Box>
                                <Tooltip title="Filtrar" placement="right" arrow>
                                    <Button
                                        onClick={() => toggleFilterDrawer(true)}
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
                                    >
                                        <TbFilterQuestion className='text-[1.3rem]'/>
                                    </Button>
                                </Tooltip>
                            </Box>
                            {/* Drawer para filtros */}
                            <Drawer
                                disableEnforceFocus
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
                            <Box className='flex flex-col h-[195px] max-h-[400px] overflow-y-auto overflow-x-hidden py-2'>
                                {pendingGymPaymentsLoading ? (
                                    Array.from({ length: 2 }).map((_, index) => (
                                        <Box key={index} className='flex flex-col'>
                                            <Box className="flex flex-row items-center p-2"> 
                                                <Skeleton variant="circular" animation="wave" width={48} height={48} className='mx-3' />
                                                <Box>
                                                    <Skeleton variant="text" animation="wave" sx={{ fontSize: '1rem' }} width={150} />
                                                    <Skeleton variant="text" animation="wave" sx={{ fontSize: '1rem' }} width={180} />
                                                </Box>
                                            </Box>
                                            <Divider className='!mx-5 !my-3 bg-[#efefef]' />
                                        </Box>
                                    ))
                                ) : pendingGymPaymentsData && pendingGymPaymentsData.length > 0 ? (
                                    // Exibe as notificações com o ícone
                                    filteredPayments.map((payment, index) => (
                                        <Box key={index} className='flex flex-col'>
                                            <Button
                                            key={payment.id}
                                            className="flex flex-row !mx-5 !py-2 !justify-start !text-left !rounded-lg"
                                            style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                                            sx={{
                                                color: '#4b5563',
                                                fontWeight: 'normal',
                                                padding: 0,
                                                transition: 'transform 0.3s, background-color 0.3s, color 0.3s, transform .5s;',
                                                '&:hover': {
                                                    background: '#f3f3f3',
                                                    transform: 'scale(1.02)'
                                                },
                                            }}>
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
                                                    <Box className="font-poppins font-semibold">{payment.name}</Box>
                                                    <Box className="text-sm text-gray-600">{payment.describe}</Box>
                                                </Box>
                                            </Button>
                                            <Divider className='!mx-10 !my-3 bg-[#efefef]' />
                                        </Box>
                                    ))
                                ) : (
                                    <Box className="flex flex-col items-center justify-center h-full text-gray-500 mt-[-.5rem]">
                                        <HiOutlineEmojiHappy className="text-[3rem]" />
                                        <Box className="mt-2 text-center">Não há pagamentos</Box>
                                    </Box>
                                )}
                            </Box>
                            <Box className='flex justify-center my-2.5'>
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
                    </Box>
                    <Box className='bg-[#08041b] rounded-3xl shadow-md w-full h-[330px] mt-7 flex flex-col justify-center items-center p-5'>
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
            </Box>
        </Box>
    );
}
