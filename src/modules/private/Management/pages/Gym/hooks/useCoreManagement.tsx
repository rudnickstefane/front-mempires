import { Box, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LuScreenShareOff } from 'react-icons/lu';
import { TbSmartHome } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { useBackendForFrontend } from '../../../../../common/hooks/useBackendForFrontend';
import { FindCompanyDetailsResponse, FindMenusResponse, FindNotificationsResponse, FindProfileDetailsResponse } from '../../../../../common/types';
import { ManagementProps } from '../../../../../common/types/ManagementProps.type';
import GymProfileManagement from '../../../../Profile';
import { QueryFindMenus, QueryFindNotifications, QueryFindProfileDetails } from '../../../components/Graphql';
import { QueryFindCompanyDetails } from '../../../components/Graphql/QueryFindCompanyDetails';
import CompanyDetailsManagement from '../../Company';
import CoreSupport from '../../Core/Support';
import Invoices from '../../Invoices';
import Marketplace from '../../Marketplace';
import Notifications from '../../Notifications';
import { MutationNotificationUpsert } from '../graphql';
import ApplicationGymAdmin from '../pages/Admin/ApplicationGymAdmin';
import ClassesGymAdmin from '../pages/Admin/ClassesGymAdmin';
import ContributorsGymAdmin from '../pages/Admin/ContributorsGymAdmin';
import FrequenciesGymAdmin from '../pages/Admin/FrequenciesGymAdmin';
import NutritionistGymAdmin from '../pages/Admin/NutritionistGymAdmin';
import PersonalGymAdmin from '../pages/Admin/PersonalGymAdmin';
import PlansGymAdmin from '../pages/Admin/PlansGymAdmin';
import ProductsGymAdmin from '../pages/Admin/ProductsGymAdmin';
import RelationshipGymAdmin from '../pages/Admin/RelationshipGymAdmin';
import SettingsGymAdmin from '../pages/Admin/SettingsGymAdmin';
import SignatureGymAdmin from '../pages/Admin/SignatureGymAdmin';
import StudentsGymAdmin from '../pages/Admin/StudentsGymAdmin';
import SuppliersGymAdmin from '../pages/Admin/SuppliersGymAdmin';
import HomeGymManagement from '../pages/Home/HomeGymManagement';
import { AdminGymDrawerType } from '../types';
import { GymManagementType } from '../types/gym-management.types';
import { ResourceBoxProps } from '../types/gym-resource-box.types';

export const useCoreManagement = ({
    permissions,
}: ManagementProps) => {

    const { enqueueSnackbar } = useSnackbar();
    const { request } = useBackendForFrontend();
    const [isMenuLoading, setIsMenuLoading] = useState(false);
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [isCompanyLoading, setIsCompanyLoading] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState<number[]>([]);
    const [responseMenus, setResponseMenus] = useState<FindMenusResponse | null>(null);
    const [activeComponent, setActiveComponent] = useState<GymManagementType>("Home");
    const [selectedResource, setSelectedResource] = useState<ResourceBoxProps | null>({
        name: 'Início',
        icon: TbSmartHome,
        onClick: () => openComponent('Home'),
    });
    const [responseProfileDetails, setResponseProfileDetails] = useState<FindProfileDetailsResponse>();
    const [responseCompanyDetails, setResponseCompanyDetails] = useState<FindCompanyDetailsResponse>();
    const [responseNotifications, setResponseNotifications] = useState<FindNotificationsResponse>();
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const profileCode = Number(localStorage.getItem('@iflexfit:profileCode'));
    const calledRef = useRef(false);
    const navigate = useNavigate();

    const menuExcludedPaths = permissions && permissions.length > 0
        ? permissions
            .find((perm: { module: string }) => perm.module === "MENU")
            ?.items.filter((item: { permission: string }) => item.permission === "NONE")
            ?.map((item: { path: string }) => item.path) || []
        : [];

    const companyPermissions = permissions && permissions.length > 0
        ? permissions.find((perm: { module: string }) => perm.module === "COMPANY")?.items || []
        : [];

    const companyPermission = companyPermissions.find((item: { path: string }) => item.path === "Company")?.permission;
    const isCompanyDisabled = companyPermission === "NONE" ? true : false;

    const formatNotificationTime = (createdAt: string): string => {
        if (!createdAt) return '';
    
        // Extraindo data e hora da string "dd/MM/yyyy às HHhmm"
        const [datePart, timePart] = createdAt.split(' às ');
        const [day, month, year] = datePart.split('/').map(Number);
        const [hours, minutes] = timePart.split('h').map(Number);
    
        // Criando objeto Date corretamente
        const notificationDate = new Date(year, month - 1, day, hours, minutes);
        const now = new Date();
    
        // Comparando a data da notificação com a data de hoje
        const sameDay = now.getDate() === notificationDate.getDate() && 
                        now.getMonth() === notificationDate.getMonth() && 
                        now.getFullYear() === notificationDate.getFullYear();
    
        if (sameDay) {
            // Se for o mesmo dia, mostra a diferença em horas ou minutos
            const diffMs = now.getTime() - notificationDate.getTime();
            const diffMinutes = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMinutes / 60);

            if (diffMinutes < 1) return 'agora';
            if (diffMinutes < 60) return `há ${diffMinutes}m`;
            return `há ${diffHours}h`;
        } else {
            // Se não for o mesmo dia, mostra a data completa
            return createdAt;
        }
    };

    const handleNotificationRead = async (notificationCode: string) => {

        const variables = {
            input: {
                action: 'READ_UPDATE',
                notificationCode: Number(notificationCode),
            },
        }

        await request(MutationNotificationUpsert, variables);
        refresh('findNotifications')
    }

    const findGymMenus = useCallback(async () => {
        setIsMenuLoading(true);
        try {
            const response: FindMenusResponse = await request(QueryFindMenus, { companyCode: companyCode});
            setResponseMenus(response);
            setIsMenuLoading(false);
        } catch {
            enqueueSnackbar('Tivemos um problema ao exibir os menus.', { variant: 'error' });
        }
    }, [companyCode, enqueueSnackbar, request]);

    const findProfileDetails = useCallback(async () => {
        setIsProfileLoading(true);
        try {
            const response: FindProfileDetailsResponse = await request(QueryFindProfileDetails, { profileCode: profileCode });

            setResponseProfileDetails(response);
            setIsProfileLoading(false);
        } catch {
            enqueueSnackbar('Ocorreu um erro ao buscar as informações do seu perfil.', { variant: 'error' });
        }
    }, [enqueueSnackbar, profileCode, request]);

    const findCompanyDetails = useCallback(async () => {
        setIsCompanyLoading(true);
        try {
            const response: FindCompanyDetailsResponse = await request(QueryFindCompanyDetails, { companyCode: companyCode });

            setResponseCompanyDetails(response);
            setIsCompanyLoading(false);
        } catch {
            enqueueSnackbar('Ocorreu um erro ao buscar as informações da academia.', { variant: 'error' });
        }
    }, [enqueueSnackbar, companyCode, request]);

    const findNotifications = useCallback(async () => {
        try {
            const response: FindNotificationsResponse = await request(QueryFindNotifications, { companyCode: companyCode, profileCode: profileCode });

            setResponseNotifications(response);
        } catch {
            enqueueSnackbar('Ocorreu um erro ao buscar as notificações.', { variant: 'error' });
        }
    }, [enqueueSnackbar, companyCode, profileCode, request]);

    useEffect(() => {
        if (!calledRef.current) {
            calledRef.current = true;
            
            const fetchData = async () => {
                await findProfileDetails();
                await findCompanyDetails();
                await findGymMenus();
                await findNotifications();
            };

            fetchData();
        }
    }, [findProfileDetails, findGymMenus, findCompanyDetails, findNotifications, selectedResource]);

    const refresh = async (source: unknown) => {

        switch (source) {
            case 'findProfileDetails':
                await findProfileDetails();
                break;

            case 'findCompanyDetails':
                await findCompanyDetails();
                break;

            case 'findNotifications':
                await findNotifications();
                break;
            
            default:
                break;
        }
    };

    const finishSession = () => {
        localStorage.clear();
        enqueueSnackbar('Sua sessão foi encerrada com sucesso. Até logo!', { variant: 'success' });
        navigate('/entrar');
    };

    const toggleSubMenu = (menuId: number) => {
        setExpandedMenus((prev) => 
            prev.includes(menuId) ? [] : [menuId]
        );
    };

    const toggleMenu = () => {
        setIsMenuCollapsed((prev) => !prev);
    };

    const openComponent = (type: GymManagementType) => {
        setActiveComponent(type);
    };

    const renderComponentContent = () => {
        switch (activeComponent) {
            case 'Home':
                return <HomeGymManagement enqueueSnackbar={ enqueueSnackbar } />;

            case 'Application':
                return <ApplicationGymAdmin />;

            case 'Students':
                return <StudentsGymAdmin enqueueSnackbar={ enqueueSnackbar } />;

            case 'Classes':
                return <ClassesGymAdmin enqueueSnackbar={ enqueueSnackbar } />;

            case 'Frequencies':
                return <FrequenciesGymAdmin />;

            case 'Plans':
                return <PlansGymAdmin enqueueSnackbar={ enqueueSnackbar } />;

            case 'Relationship':
                return <RelationshipGymAdmin />;
            
            case 'Products':
                return <ProductsGymAdmin />;

            case 'Suppliers':
                return <SuppliersGymAdmin />;

            case 'Contributors':
                return <ContributorsGymAdmin />;

            case 'GroupAccess':
                return <ContributorsGymAdmin />;

            case 'Settings':
                return <SettingsGymAdmin />;
        
            // case 'Finance':
            //     return <GymFinanceManagement userData={userData} />;

            // case 'Integration':
            //     return <GymIntegrationManagement userData={userData} />;

            // case 'Dashboard':
            //     return <GymDashboardManagement userData={userData} />;

            // case 'Programs':
            //     return <GymProgramManagement userData={userData} />;

            case 'Profile':
                return <GymProfileManagement data={responseProfileDetails} refresh={() => refresh('findProfileDetails')} isProfileLoading={isProfileLoading}/>;

            case 'Company':
                return <CompanyDetailsManagement data={responseCompanyDetails} refresh={() => refresh('findCompanyDetails')} isCompanyLoading={isCompanyLoading} permissions={companyPermission}/>;

            case 'Marketplace':
                return <Marketplace enqueueSnackbar={ enqueueSnackbar } />;

            case 'Personal':
                return <PersonalGymAdmin />;

            case 'Nutritionist':
                return <NutritionistGymAdmin />;

            case 'Notifications':
                return <Notifications />;

            case 'Support':
                return <CoreSupport />;

            case 'Signature':
                return <SignatureGymAdmin 
                        refresh={async () => {
                            await refresh('findProfileDetails');
                            await refresh('findCompanyDetails');
                            await refresh('findGymMenus');
                        }}
                        />;

            case 'Invoices':
                return <Invoices enqueueSnackbar={ enqueueSnackbar }/>;

            default:
                return (
                    <Box className='flex items-center justify-center w-full h-full'>
                        <Box className='flex flex-row w-[90%] justify-between items-center'>
                            <Box className='flex flex-col'>
                                <Typography variant="h4" className='text-[#282929]'>Estamos em manutenção.</Typography>
                                <Box className="flex flex-col mt-5">
                                    <Typography>Pedimos desculpas pelo transtorno, mas esta área está temporariamente indisponível devido a uma manutenção programada.</Typography>
                                    <Typography>Nosso time está trabalhando para restabelecer o acesso o mais rápido possível.</Typography>
                                    <Typography className='!mt-5'>Caso você acredite que deveria ter acesso, por favor, entre em contato com nossa equipe de suporte.</Typography>
                                </Box>
                            </Box>
                            <Box className='ml-[5rem]'>
                                <LuScreenShareOff className='text-[17rem] text-[#d7d7d8]'/>
                            </Box>
                        </Box>
                    </Box>
                );
        }
    };

    useEffect(() => {
        // Configura o intervalo para chamar a cada 30 segundos
        const intervalId = setInterval(() => {
            findNotifications();
        }, 60 * 1000); // 30 segundos em milissegundos

        // Limpa o intervalo quando o componente desmontar
        return () => clearInterval(intervalId);
    }, [findNotifications]);

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

    const renderDrawerContent = () => {
        switch (drawerType) {
            default:
                break;
        }
    };

    const [anchorEls, setAnchorEls] = useState<{ [key: string]: HTMLElement | null }>({});

    // Função para abrir o menu
    const handleOpen = (event: React.MouseEvent<HTMLElement>, viewCode: string) => {
        setAnchorEls((prev) => ({ ...prev, [viewCode]: event.currentTarget }));
    };

    // Função para fechar o menu
    const handleClose = (viewCode: string) => {
        setAnchorEls((prev) => ({ ...prev, [viewCode]: null }));
    };

    return {
        enqueueSnackbar,
        isMenuLoading,
        isProfileLoading,
        isCompanyLoading,
        responseMenus,
        responseProfileDetails,
        responseCompanyDetails,
        isMenuCollapsed,
        expandedMenus,
        setExpandedMenus,
        activeComponent,
        selectedResource,
        toggleMenu,
        toggleSubMenu,
        openComponent,
        setActiveComponent,
        setSelectedResource,
        refresh,
        finishSession,
        renderComponentContent,
        renderDrawerContent,
        isDrawerOpen,
        closeDrawer,
        openDrawer,
        anchorEls,
        handleOpen,
        handleClose,
        responseNotifications,
        formatNotificationTime,
        handleNotificationRead,
        menuExcludedPaths,
        isCompanyDisabled,
    };
};
