import { SelectChangeEvent } from '@mui/material';
import { VariantType } from 'notistack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useBackendForFrontend } from '../../../../../common/hooks/useBackendForFrontend';
import { FindPlansResponse, PlanAlterData } from '../../../../../common/types';
import { GetErrorMessage } from '../../../../../common/utils';
import { PlanAlterDrawer, PlanCreateDrawer } from '../../../components/Drawer';
import { MutationPlanUpSert, QueryFindPlans } from '../../../components/Graphql';
import { GymPlansDetails } from '../pages/Admin/Plans';
import { AdminGymDetailsProps, AdminGymDrawerType } from '../types';

export const usePlansGymAdmin = ({
    enqueueSnackbar
}: {
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const [responsePlans, setResponsePlans] = useState<FindPlansResponse | null>();
    const [alterPlan, setAlterPlan] = useState<PlanAlterData | null>();
    const [planDetails, setPlanDetails] = useState<PlanAlterData | null>();
    const [attemptCount, setAttemptCount] = useState(0);
    const [isDetailsView, setIsDetailsView] = useState(false);
    const calledRef = useRef(false);
    const [modalConfirmDelete, setModalConfirmDelete] = useState(false);
    const [activeDrawerStep, setActiveDrawerStep] = useState(0);
    const [activeContentStep, setActiveContentStep] = useState(0);

    // Estado de controle de paginação e busca
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");

    // Aplicar filtragem de planos
    const filteredPlans = (responsePlans?.findPlans || []).filter((plan) => {
        const searchLower = searchText.trim().toLowerCase();

        // Extrair número do formato PLN-52
        const extractedPlanCode = searchLower.startsWith('pln-') 
            ? searchLower.replace('pln-', '') 
            : null;

        return (
            plan.name?.toLowerCase().includes(searchLower) || // Filtrar pelo nome
            (plan.planCode && extractedPlanCode && plan.planCode.toString() === extractedPlanCode) || // Filtrar por PLN-52
            (plan.periodicities &&
                plan.periodicities.some(periodicity =>
                    periodicity.amount?.toString().includes(searchText) // Filtrar por periodicidade
                ))
        );
    });

    // Cálculo para paginação com base nos itens filtrados
    const totalItems = filteredPlans.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const plansToDisplay = filteredPlans.slice(startIndex, endIndex);

    // Handlers
    const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
        setItemsPerPage(Number(event.target.value)); // Atualiza itens por página
        setCurrentPage(1); // Reset para a primeira página
    };

    const handlePageChange = (_: unknown, page: number) => {
        setCurrentPage(page); // Atualiza página atual
    };

    const [anchorEls, setAnchorEls] = useState<{ [key: string]: HTMLElement | null }>({});

    // Função para abrir o menu
    const handleOpenMore = (event: React.MouseEvent<HTMLElement>, planCode: string) => {
        setAnchorEls((prev) => ({ ...prev, [planCode]: event.currentTarget }));
    };

    // Função para fechar o menu
    const handleCloseMore = (planCode: string) => {
        setAnchorEls((prev) => ({ ...prev, [planCode]: null }));
    };

    const handleMoreDetails = (planCode: string) => {
        const planToAlter = responsePlans?.findPlans?.find((plan) => plan.planCode === planCode);
        if (planToAlter) {
            setPlanDetails({
                findPlans: planToAlter,
            });
        } 
        setIsDetailsView(true);
        openContent('PlanDetails');
        handleCloseMore(planCode);
    };

    const handleAlterPlan = (planCode: string) => {
        const planToAlter = responsePlans?.findPlans?.find((plan) => plan.planCode === planCode);
        if (planToAlter) {
            setAlterPlan({
                findPlans: planToAlter,
            });
        }    
        openDrawer('PlanAlter');
        handleCloseMore(planCode);
    };

    const handleStatusPlan = async (planCode: string, status: string) => {
        try {
            const variables = {
                input: {
                    type: 'UPDATE',
                    action: 'HANDLE_STATUS',
                    planCode: Number(planCode),
                    status: status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
                }
            };

            await request(MutationPlanUpSert, variables);

            const message = status === 'ACTIVE' 
            ? 'Plano desativado com sucesso!' 
            : 'Plano ativado com sucesso!';
            enqueueSnackbar(message, { variant: 'success' });
            refresh('findPlans');
        } catch (error: unknown) {
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao ativar/desativar plano. Entre em contato com nosso suporte.', { variant: 'error' });
            }

            const genericError = 'Ops! Algo deu errado ao ativar/desativar plano. Tente novamente!'
            const errorMessage = GetErrorMessage(error, genericError);
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    const handleConfirmDelete = () => {
        setModalConfirmDelete(true);
    };

    const handleCloseConfirmDelete = () => {
        setModalConfirmDelete(false);
    };

    const handleDeletePlan = async (planCode: string) => {
        try {
            const variables = {
                input: {
                    type: 'DELETE',
                    planCode: Number(planCode),
                    status: 'DELETED',
                }
            };

            await request(MutationPlanUpSert, variables);
            setModalConfirmDelete(false);

            enqueueSnackbar('Plano excluído com sucesso', { variant: 'success' });
            refresh('findPlans');
        } catch (error: unknown) {
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao excluir plano. Entre em contato com nosso suporte.', { variant: 'error' });
            }

            const genericError = 'Ops! Algo deu errado ao excluir plano. Tente novamente!'
            const errorMessage = GetErrorMessage(error, genericError);
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    const isMenuOpen = (planCode: string) => Boolean(anchorEls[planCode]);

    const [componentType, setComponentType] = useState<AdminGymDetailsProps[keyof AdminGymDetailsProps] | null>(null);

    {/* Drawers */}
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerType, setDrawerType] = useState<AdminGymDrawerType[keyof AdminGymDrawerType] | null>(null);

    const findPlans = useCallback(async () => {
            setIsLoading(true);
            try {
                const response: FindPlansResponse = await request(QueryFindPlans, { companyCode: companyCode });

                setResponsePlans(response);
            } catch (error) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao buscar planos. Entre em contato com nosso suporte.', { variant: 'error' });
                }
                enqueueSnackbar('Erro ao buscar planos cadastrados em sua academia.', { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }, [attemptCount, companyCode, enqueueSnackbar, request]);

    useEffect(() => {
        if (!calledRef.current) {
            calledRef.current = true;

            const fetchData = async () => {
                await findPlans();
            };

            fetchData();
        }
    }, [findPlans]);

    const renderDrawerContent = () => {
        switch (drawerType) {
            case 'PlanCreate':
                return (
                    <PlanCreateDrawer 
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar} 
                        refresh={() => refresh('findPlans')}
                    />
                );

            case 'PlanAlter':
                return (
                    <PlanAlterDrawer 
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar}
                        data={alterPlan}
                        initialStep={activeDrawerStep}
                        refresh={() => refresh('findPlans')}
                    />
                );

            default:
                break;
        }
    };

    const handleBackToTable = () => {
        setIsDetailsView(false);
    };

    const renderComponentContent = () => {
        switch (componentType) {
            case 'PlanDetails':
                return (
                    <GymPlansDetails
                        key={reloadKey}
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar}
                        data={planDetails}
                        initialStep={activeContentStep}
                        refresh={() => refresh('findPlans')}
                        onBack={handleBackToTable}
                    />
                );

            default:
                break;
        }
    };

    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        if (responsePlans) {
            const planToAlter = responsePlans.findPlans?.find(plan => plan.planCode === planDetails?.findPlans?.planCode);

            if (planToAlter) {
                setReloadKey(prevKey => prevKey + 1);  // Força o recarregamento do componente
                setPlanDetails({ findPlans: planToAlter });
            }
        }
    }, [planDetails?.findPlans?.planCode, responsePlans]);

    const refresh = async (source: unknown) => {

        switch (source) {
            case 'findPlans':
                await findPlans();
                break;
            
            default:
                break;
        }
    };

    const closeDrawer = () => {
        setDrawerType(null);
        setIsDrawerOpen(false);
    };

    const openDrawer = (type: AdminGymDrawerType[keyof AdminGymDrawerType], initialStep: number = 0) => {
        setDrawerType(type);
        setIsDrawerOpen(true);
        setActiveDrawerStep(initialStep);
    };

    const openContent = (type: AdminGymDetailsProps[keyof AdminGymDetailsProps], initialStep: number = 0) => {
        setComponentType(type);
        setActiveContentStep(initialStep);
    };

    return {
        isLoading,
        responsePlans,
        renderDrawerContent,
        openDrawer,
        closeDrawer,
        isDrawerOpen,
        itemsPerPage,
        handleItemsPerPageChange,
        startIndex,
        endIndex,
        totalItems,
        totalPages,
        currentPage,
        handlePageChange,
        searchText,
        setSearchText,
        filteredPlans,
        anchorEls,
        handleOpenMore,
        handleCloseMore,
        handleMoreDetails,
        handleAlterPlan,
        handleDeletePlan,
        handleConfirmDelete,
        modalConfirmDelete,
        handleCloseConfirmDelete,
        handleStatusPlan,
        isMenuOpen,
        plansToDisplay,
        isDetailsView,
        renderComponentContent
    };
};
