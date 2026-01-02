import { SelectChangeEvent } from '@mui/material';
import { VariantType } from 'notistack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useBackendForFrontend } from '../../../../../common/hooks/useBackendForFrontend';
import { FindContributorsResponse, StudentData } from '../../../../../common/types';
import { GetErrorMessage } from '../../../../../common/utils';
import { ContributorRegisterDrawer } from '../../../components/Drawer';
import { EditContributorDrawer } from '../../../components/Drawer/EditContributorDrawer';
import { MutationStudentUpsert, QueryFindContributors } from '../../../components/Graphql';
import { GymContributorDetails } from '../pages/Admin/Settings/Contributors/Details';
import { AdminGymDetailsProps, AdminGymDrawerType } from '../types';

export const useContributorsGymAdmin = ({
    enqueueSnackbar
}: {
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const [responsePlans, setResponseContributors] = useState<FindContributorsResponse | null>();
    const [alterContributor, setalterContributor] = useState<StudentData | null>();
    const [contributorDetails, setcontributorDetails] = useState<StudentData | null>();
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
    const filteredPlans = (responsePlans?.findContributors || []).filter((student) => {
        const searchLower = searchText.trim().toLowerCase();

        // Extrair número do formato STD-52
        const extractedProfileCode = searchLower.startsWith('std-') 
            ? searchLower.replace('std-', '') 
            : null;

        // Função para limpar caracteres especiais (., -, /) de documentos
        const sanitize = (value: string) => value?.replace(/[.\-/]/g, '').toLowerCase();

        // Documento sanitizado e busca sanitizada
        const sanitizedIdentity = sanitize(student.identity);
        const sanitizedSearch = sanitize(searchText);

        return (
            student.name?.toLowerCase().includes(searchLower) || // Filtrar pelo nome
            (student.profileCode && extractedProfileCode && student.profileCode.toString() === extractedProfileCode) ||
            (sanitizedIdentity?.startsWith(sanitizedSearch))
        );
    });

    // Cálculo para paginação com base nos itens filtrados
    const totalItems = filteredPlans.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const contributorsToDisplay = filteredPlans.slice(startIndex, endIndex);

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
    const handleOpenMore = (event: React.MouseEvent<HTMLElement>, profileCode: string) => {
        setAnchorEls((prev) => ({ ...prev, [profileCode]: event.currentTarget }));
    };

    // Função para fechar o menu
    const handleCloseMore = (profileCode: string) => {
        setAnchorEls((prev) => ({ ...prev, [profileCode]: null }));
    };

    const handleMoreDetails = (profileCode: string) => {
        const studentDetail = responsePlans?.findContributors?.find((student) => student.profileCode === profileCode);
        if (studentDetail) {
            setcontributorDetails(studentDetail);
        } 
        setIsDetailsView(true);
        openContent('ContributorDetails');
        handleCloseMore(profileCode);
    };

    const handleAlterContributor = (profileCode: string) => {
        const studentDetail = responsePlans?.findContributors?.find((plan) => plan.profileCode === profileCode);
        if (studentDetail) {
            setalterContributor(studentDetail);
        }    
        openDrawer('EditContributor');
        handleCloseMore(profileCode);
    };

    const handleStatusPlan = async (profileCode: string, status: string) => {
        try {
            const variables = {
                data: {
                    origin: 'GYM',
                    type: 'UPDATE',
                    input: {
                        action: 'HANDLE_STATUS',
                        studentCode: Number(profileCode),
                        status: status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
                    }
                }
            };

            await request(MutationStudentUpsert, variables);

            const message = status === 'ACTIVE' 
            ? 'Colaborador desativado com sucesso!' 
            : 'Colaborador ativado com sucesso!';
            enqueueSnackbar(message, { variant: 'success' });
            refresh('findContributors');
        } catch (error: unknown) {
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao ativar/desativar colaborador. Entre em contato com nosso suporte.', { variant: 'error' });
            }

            const genericError = 'Ops! Algo deu errado ao ativar/desativar colaborador. Tente novamente!'
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

    const handleDeletePlan = async (profileCode: string) => {
        try {
            const variables = {
                data: {
                    origin: 'GYM',
                    type: 'DELETE',
                    input: {
                        studentCode: Number(profileCode),
                        status: 'DELETED'
                    }
                }
            };

            await request(MutationStudentUpsert, variables);
            setModalConfirmDelete(false);

            enqueueSnackbar('Colaborador excluído com sucesso', { variant: 'success' });
            refresh('findContributors');
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

    const isMenuOpen = (profileCode: string) => Boolean(anchorEls[profileCode]);

    const [componentType, setComponentType] = useState<AdminGymDetailsProps[keyof AdminGymDetailsProps] | null>(null);

    {/* Drawers */}
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerType, setDrawerType] = useState<AdminGymDrawerType[keyof AdminGymDrawerType] | null>(null);

    const findContributors = useCallback(async () => {
            setIsLoading(true);
            try {
                const response: FindContributorsResponse = await request(QueryFindContributors, { companyCode: companyCode });

                setResponseContributors(response);
            } catch (error) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao buscar colaboradores. Entre em contato com nosso suporte.', { variant: 'error' });
                }
                enqueueSnackbar('Erro ao buscar colaboradores cadastrados em sua academia.', { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }, [attemptCount, companyCode, enqueueSnackbar, request]);

    useEffect(() => {
        if (!calledRef.current) {
            calledRef.current = true;

            const fetchData = async () => {
                await findContributors();
            };

            fetchData();
        }
    }, [findContributors]);

    const renderDrawerContent = () => {
        switch (drawerType) {
            case 'ContributorRegister':
                return (
                    <ContributorRegisterDrawer 
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar} 
                        refresh={() => refresh('findContributors')}
                    />
                );

            case 'EditContributor':
                return (
                    <EditContributorDrawer 
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar}
                        data={alterContributor}
                        initialStep={activeDrawerStep}
                        refresh={() => refresh('findContributors')}
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
            case 'ContributorDetails':
                return (
                    <GymContributorDetails
                        key={reloadKey}
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar}
                        data={contributorDetails}
                        initialStep={activeContentStep}
                        refresh={() => refresh('findContributors')}
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
            const studentDetail = responsePlans.findContributors?.find(student => student.profileCode === contributorDetails?.profileCode);

            if (studentDetail) {
                setReloadKey(prevKey => prevKey + 1);  // Força o recarregamento do componente
                setcontributorDetails(studentDetail);
            }
        }
    }, [contributorDetails?.profileCode, responsePlans]);

    const refresh = async (source: unknown) => {

        switch (source) {
            case 'findContributors':
                await findContributors();
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
        handleAlterContributor,
        handleDeletePlan,
        handleConfirmDelete,
        modalConfirmDelete,
        handleCloseConfirmDelete,
        handleStatusPlan,
        isMenuOpen,
        contributorsToDisplay,
        isDetailsView,
        renderComponentContent
    };
};
