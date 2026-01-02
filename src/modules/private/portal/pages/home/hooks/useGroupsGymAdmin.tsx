import { SelectChangeEvent } from '@mui/material';
import { VariantType } from 'notistack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useBackendForFrontend } from '../../../../../common/hooks/useBackendForFrontend';
import { FindGroupsResponse, GroupData } from '../../../../../common/types';
import { GetErrorMessage } from '../../../../../common/utils';
import { EditGroupDrawer, GroupRegisterDrawer } from '../../../components/Drawer';
import { MutationGroupUpsert, MutationStudentUpsert, QueryFindGroups } from '../../../components/Graphql';
import { GymGroupsDetails } from '../pages/Admin/Settings/Groups/Details';
import { AdminGymDetailsProps, AdminGymDrawerType } from '../types';

export const useGroupsGymAdmin = ({
    enqueueSnackbar
}: {
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const [responseGroups, setResponseGroups] = useState<FindGroupsResponse | null>();
    const [alterGroup, setalterGroup] = useState<GroupData | null>();
    const [groupDetails, setgroupDetails] = useState<GroupData | null>();
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

    // Aplicar filtragem de alunos
    const filteredPlans = (responseGroups?.findGroups || []).filter((group) => {
        const searchLower = searchText.trim().toLowerCase();

        // Extrair número do formato STD-52
        const extractedGroupCode = searchLower.startsWith('std-') 
            ? searchLower.replace('std-', '') 
            : null;

        return (
            group.name?.toLowerCase().includes(searchLower) || // Filtrar pelo nome
            (group.groupCode && extractedGroupCode && group.groupCode.toString() === extractedGroupCode)
        );
    });

    // Cálculo para paginação com base nos itens filtrados
    const totalItems = filteredPlans.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const groupsToDisplay = filteredPlans.slice(startIndex, endIndex);

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
    const handleOpenMore = (event: React.MouseEvent<HTMLElement>, groupCode: string) => {
        setAnchorEls((prev) => ({ ...prev, [groupCode]: event.currentTarget }));
    };

    // Função para fechar o menu
    const handleCloseMore = (groupCode: string) => {
        setAnchorEls((prev) => ({ ...prev, [groupCode]: null }));
    };

    const handleMoreDetails = (groupCode: string) => {
        const groupDetail = responseGroups?.findGroups?.find((group) => group.groupCode === groupCode);
        if (groupDetail) {
            setgroupDetails(groupDetail);
        } 
        setIsDetailsView(true);
        openContent('GroupDetails');
        handleCloseMore(groupCode);
    };

    const handleAlterGroup = (groupCode: string) => {
        const groupDetail = responseGroups?.findGroups?.find((group) => group.groupCode === groupCode);
        if (groupDetail) {
            setalterGroup(groupDetail);
        }    
        openDrawer('EditGroup');
        handleCloseMore(groupCode);
    };

    const handleStatusPlan = async (groupCode: string, status: string) => {
        try {
            const variables = {
                input: {
                    action: 'HANDLE_STATUS',
                    groupCode: Number(groupCode),
                    status: status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
                }
            };

            await request(MutationGroupUpsert, variables);

            const message = status === 'ACTIVE' 
            ? 'Grupo desativado com sucesso!' 
            : 'Grupo ativado com sucesso!';
            enqueueSnackbar(message, { variant: 'success' });
            refresh('findGroups');
        } catch (error: unknown) {
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao ativar/desativar grupo. Entre em contato com nosso suporte.', { variant: 'error' });
            }

            const genericError = 'Ops! Algo deu errado ao ativar/desativar grupo. Tente novamente!'
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

    const handleDeletePlan = async (groupCode: string) => {
        try {
            const variables = {
                data: {
                    origin: 'GYM',
                    type: 'DELETE',
                    input: {
                        studentCode: Number(groupCode),
                        status: 'DELETED'
                    }
                }
            };

            await request(MutationStudentUpsert, variables);
            setModalConfirmDelete(false);

            enqueueSnackbar('Colaborador excluído com sucesso', { variant: 'success' });
            refresh('findGroups');
        } catch (error: unknown) {
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao excluir colaborador. Entre em contato com nosso suporte.', { variant: 'error' });
            }

            const genericError = 'Ops! Algo deu errado ao excluir colaborador. Tente novamente!'
            const errorMessage = GetErrorMessage(error, genericError);
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    const isMenuOpen = (groupCode: string) => Boolean(anchorEls[groupCode]);

    const [componentType, setComponentType] = useState<AdminGymDetailsProps[keyof AdminGymDetailsProps] | null>(null);

    {/* Drawers */}
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerType, setDrawerType] = useState<AdminGymDrawerType[keyof AdminGymDrawerType] | null>(null);

    const findGroups = useCallback(async () => {
            setIsLoading(true);
            try {
                const response: FindGroupsResponse = await request(QueryFindGroups, { companyCode: companyCode });

                setResponseGroups(response);
            } catch (error) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao buscar grupos de acesso. Entre em contato com nosso suporte.', { variant: 'error' });
                }
                enqueueSnackbar('Erro ao buscar grupos de acesso cadastrados em sua academia.', { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }, [attemptCount, companyCode, enqueueSnackbar, request]);

    useEffect(() => {
        if (!calledRef.current) {
            calledRef.current = true;

            const fetchData = async () => {
                await findGroups();
            };

            fetchData();
        }
    }, [findGroups]);

    const renderDrawerContent = () => {
        switch (drawerType) {
            case 'GroupRegister':
                return (
                    <GroupRegisterDrawer 
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar} 
                        refresh={() => refresh('findGroups')}
                    />
                );

            case 'EditGroup':
                return (
                    <EditGroupDrawer 
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar}
                        data={alterGroup}
                        initialStep={activeDrawerStep}
                        refresh={() => refresh('findGroups')}
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
            case 'GroupDetails':
                return (
                    <GymGroupsDetails
                        key={reloadKey}
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar}
                        data={groupDetails}
                        initialStep={activeContentStep}
                        refresh={() => refresh('findGroups')}
                        onBack={handleBackToTable}
                    />
                );

            default:
                break;
        }
    };

    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        if (responseGroups) {
            const groupDetail = responseGroups.findGroups?.find(group => group.groupCode === groupDetails?.groupCode);

            if (groupDetail) {
                setReloadKey(prevKey => prevKey + 1);  // Força o recarregamento do componente
                setgroupDetails(groupDetail);
            }
        }
    }, [groupDetails?.groupCode, responseGroups]);

    const refresh = async (source: unknown) => {

        switch (source) {
            case 'findGroups':
                await findGroups();
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
        responseGroups,
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
        handleAlterGroup,
        handleDeletePlan,
        handleConfirmDelete,
        modalConfirmDelete,
        handleCloseConfirmDelete,
        handleStatusPlan,
        isMenuOpen,
        groupsToDisplay,
        isDetailsView,
        renderComponentContent
    };
};
