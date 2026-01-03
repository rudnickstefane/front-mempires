import { SelectChangeEvent } from '@mui/material';
import { VariantType } from 'notistack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useBackendForFrontend } from '../../../../../common/hooks/useBackendForFrontend';
import { FindVisitsResponse, VisitData } from '../../../../../common/types';
import { GetErrorMessage } from '../../../../../common/utils';
import { EditVisitDrawer, VisitDetailDrawer, VisitRegisterDrawer } from '../../../components/Drawer';
import { MutationStudentUpsert, QueryFindVisits } from '../../../components/Graphql';
import { AdminGymDrawerType } from '../types';

export const useVisitsGymAdmin = ({
    enqueueSnackbar
}: {
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const [responsePlans, setResponsePlans] = useState<FindVisitsResponse | null>();
    const [alterVisit, setAlterVisit] = useState<VisitData | null>();
    const [visitDetail, setVisitDetails] = useState<VisitData | null>();
    const [attemptCount, setAttemptCount] = useState(0);
    const calledRef = useRef(false);
    const [modalConfirmDelete, setModalConfirmDelete] = useState(false);
    const [activeDrawerStep, setActiveDrawerStep] = useState(0);

    // Estado de controle de paginação e busca
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");

    // Aplicar filtragem de alunos
    const filteredPlans = (responsePlans?.findVisits || []).filter((visit) => {
        const searchLower = searchText.trim().toLowerCase();

        // Extrair número do formato STD-52
        const extractedProfileCode = searchLower.startsWith('std-') 
            ? searchLower.replace('std-', '') 
            : null;

        // Função para limpar caracteres especiais (., -, /) de documentos
        const sanitize = (value: string) => value?.replace(/[.\-/]/g, '').toLowerCase();

        // Documento sanitizado e busca sanitizada
        const sanitizedIdentity = sanitize(visit.identity);
        const sanitizedSearch = sanitize(searchText);

        return (
            visit.name?.toLowerCase().includes(searchLower) || // Filtrar pelo nome
            (visit.visitCode && extractedProfileCode && visit.visitCode.toString() === extractedProfileCode) ||
            (sanitizedIdentity?.startsWith(sanitizedSearch))
        );
    });

    // Cálculo para paginação com base nos itens filtrados
    const totalItems = filteredPlans.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const visitsToDisplay = filteredPlans.slice(startIndex, endIndex);

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

    const handleMoreDetails = (visitCode: string) => {
        const visitDetails = responsePlans?.findVisits?.find((visit) => visit.visitCode === visitCode);
        if (visitDetails) {
            setVisitDetails(visitDetails);
        } 
        openDrawer('VisitDetails');
        handleCloseMore(visitCode);
    };

    const handleAlterVisit = (visitCode: string) => {
        const studentDetail = responsePlans?.findVisits?.find((visit) => visit.visitCode === visitCode);
        if (studentDetail) {
            setAlterVisit(studentDetail);
        }    
        openDrawer('EditVisit');
        handleCloseMore(visitCode);
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

            enqueueSnackbar('Aluno excluído com sucesso', { variant: 'success' });
            refresh('findVisits');
        } catch (error: unknown) {
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao excluir aluno. Entre em contato com nosso suporte.', { variant: 'error' });
            }

            const genericError = 'Ops! Algo deu errado ao excluir aluno. Tente novamente!'
            const errorMessage = GetErrorMessage(error, genericError);
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    const isMenuOpen = (profileCode: string) => Boolean(anchorEls[profileCode]);

    {/* Drawers */}
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerType, setDrawerType] = useState<AdminGymDrawerType[keyof AdminGymDrawerType] | null>(null);

    const findVisits = useCallback(async () => {
            setIsLoading(true);
            try {
                const response: FindVisitsResponse = await request(QueryFindVisits, { companyCode: companyCode });

                setResponsePlans(response);
            } catch (error) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao buscar visitantes. Entre em contato com nosso suporte.', { variant: 'error' });
                }
                enqueueSnackbar('Erro ao buscar visitantes em sua academia.', { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }, [attemptCount, companyCode, enqueueSnackbar, request]);

    useEffect(() => {
        if (!calledRef.current) {
            calledRef.current = true;

            const fetchData = async () => {
                await findVisits();
            };

            fetchData();
        }
    }, [findVisits]);

    const renderDrawerContent = () => {
        switch (drawerType) {
            case 'VisitRegister':
                return (
                    <VisitRegisterDrawer 
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar} 
                        refresh={() => refresh('findVisits')}
                    />
                );

            case 'EditVisit':
                return (
                    <EditVisitDrawer 
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar}
                        data={alterVisit}
                        initialStep={activeDrawerStep}
                        refresh={() => refresh('findVisits')}
                    />
                );

            case 'VisitDetails':
                return (
                    <VisitDetailDrawer 
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar}
                        data={visitDetail}
                    />
                );

            default:
                break;
        }
    };

    const refresh = async (source: unknown) => {

        switch (source) {
            case 'findVisits':
                await findVisits();
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
        handleAlterVisit,
        handleDeletePlan,
        handleConfirmDelete,
        modalConfirmDelete,
        handleCloseConfirmDelete,
        isMenuOpen,
        visitsToDisplay,
    };
};
