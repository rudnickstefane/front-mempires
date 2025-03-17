import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackendForFrontend } from '../../../../../common/hooks/useBackendForFrontend';
import { FindCompanyDetailsResponse, FindMenusResponse, FindProfileDetailsResponse } from '../../../../../common/types';
import GymProfileManagement from '../../../../Profile';
import { QueryFindMenus, QueryFindProfileDetails } from '../../../components/Graphql';
import { QueryFindCompanyDetails } from '../../../components/Graphql/QueryFindCompanyDetails';
import CompanyDetailsManagement from '../../Company';
import Support from '../../Support';
import ApplicationGymAdmin from '../pages/Admin/ApplicationGymAdmin';
import ClassesGymAdmin from '../pages/Admin/ClassesGymAdmin';
import ContributorsGymAdmin from '../pages/Admin/ContributorsGymAdmin';
import FrequenciesGymAdmin from '../pages/Admin/FrequenciesGymAdmin';
import MarketplaceGymAdmin from '../pages/Admin/MarketplaceGymAdmin';
import PlansGymAdmin from '../pages/Admin/PlansGymAdmin';
import RelationshipGymAdmin from '../pages/Admin/RelationshipGymAdmin';
import SettingsGymAdmin from '../pages/Admin/SettingsGymAdmin';
import StudentsGymAdmin from '../pages/Admin/StudentsGymAdmin';
import SuppliersGymAdmin from '../pages/Admin/SuppliersGymAdmin';
import HomeGymManagement from '../pages/Home/HomeGymManagement';
import { GymManagementType } from '../types/gym-management.types';
import { ResourceBoxProps } from '../types/gym-resource-box.types';

export const useGymManagement = () => {

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
        icon: 'TbSmartHome',
        onClick: () => openComponent('Home'),
    });
    const [responseProfileDetails, setResponseProfileDetails] = useState<FindProfileDetailsResponse>();
    const [responseCompanyDetails, setResponseCompanyDetails] = useState<FindCompanyDetailsResponse>();
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const profileCode = Number(localStorage.getItem('@iflexfit:profileCode'));
    const calledRef = useRef(false);
    const navigate = useNavigate();

    const findGymMenus = useCallback(async () => {
        setIsMenuLoading(true);
        try {
            const response: FindMenusResponse = await request(QueryFindMenus, { companyCode: companyCode, profileCode: profileCode });
            setResponseMenus(response);
            setIsMenuLoading(false);
        } catch {
            enqueueSnackbar('Tivemos um problema ao exibir os menus.', { variant: 'error' });
        }
    }, [companyCode, enqueueSnackbar, profileCode, request]);

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

    useEffect(() => {
        if (!calledRef.current) {
            calledRef.current = true;
            
            const fetchData = async () => {
                await findProfileDetails();
                await findCompanyDetails();
                await findGymMenus();
            };

            fetchData();
        }
    }, [findProfileDetails, findGymMenus, findCompanyDetails, selectedResource]);

    const refresh = async (source: unknown) => {

        switch (source) {
            case 'findProfileDetails':
                await findProfileDetails();
                break;

            case 'findCompanyDetails':
                await findCompanyDetails();
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
            
            case 'Marketplace':
                return <MarketplaceGymAdmin />;

            case 'Suppliers':
                return <SuppliersGymAdmin />;

            case 'Contributors':
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
                return <CompanyDetailsManagement data={responseCompanyDetails} refresh={() => refresh('findCompanyDetails')} isCompanyLoading={isCompanyLoading}/>;

            case 'Support':
                return <Support />;

            default:
                break;
        }
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
        renderComponentContent
      };
};
