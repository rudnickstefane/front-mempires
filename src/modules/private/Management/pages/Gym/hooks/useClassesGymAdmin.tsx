import { SelectChangeEvent } from '@mui/material';
import { VariantType } from 'notistack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useBackendForFrontend } from '../../../../../common/hooks/useBackendForFrontend';
import { ClassAlterData, FindClassesResponse } from '../../../../../common/types';
import { GetErrorMessage } from '../../../../../common/utils';
import { ClassAlterDrawer, ClassCreateDrawer } from '../../../components/Drawer';
import { MutationClassUpsert, QueryFindClasses } from '../../../components/Graphql';
import { GymClassesDetails } from '../pages/Admin/Classes';
import { AdminGymDetailsProps, AdminGymDrawerType } from '../types';

export const useClassesGymAdmin = ({
    enqueueSnackbar
}: {
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const [responseClasses, setResponseClasses] = useState<FindClassesResponse | null>();
    const [alterClasses, setAlterClasses] = useState<ClassAlterData | null>();
    const [classDetails, setclassDetails] = useState<ClassAlterData | null>();
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
    const filteredClasses = (responseClasses?.findClasses || []).filter((classes) => {
        const searchLower = searchText.trim().toLowerCase();

        // Extrair número do formato PLN-52
        const extractedclassCode = searchLower.startsWith('pln-') 
            ? searchLower.replace('TRM-', '') 
            : null;

        return (
            classes.name?.toLowerCase().includes(searchLower) || // Filtrar pelo nome
            (classes.classCode && extractedclassCode && classes.classCode.toString() === extractedclassCode)
        );
    });

    // Cálculo para paginação com base nos itens filtrados
    const totalItems = filteredClasses.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const classesToDisplay = filteredClasses.slice(startIndex, endIndex);

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
    const handleOpenMore = (event: React.MouseEvent<HTMLElement>, classCode: string) => {
        setAnchorEls((prev) => ({ ...prev, [classCode]: event.currentTarget }));
    };

    // Função para fechar o menu
    const handleCloseMore = (classCode: string) => {
        setAnchorEls((prev) => ({ ...prev, [classCode]: null }));
    };

    const handleMoreDetails = (classCode: string) => {
        const classToAlter = responseClasses?.findClasses?.find((classes) => classes.classCode === classCode);
        if (classToAlter) {
            setclassDetails({
                findClasses: classToAlter,
            });
        } 
        setIsDetailsView(true);
        openContent('ClassDetail');
        handleCloseMore(classCode);
    };

    const handleAlterClasses = (classCode: string) => {
        const classToAlter = responseClasses?.findClasses?.find((classes) => classes.classCode === classCode);
        if (classToAlter) {
            setAlterClasses({
                findClasses: classToAlter,
            });
        }    
        openDrawer('ClassAlter');
        handleCloseMore(classCode);
    };

    const handleStatusPlan = async (classCode: string, status: string) => {
        try {
            const variables = {
                input: {
                    type: 'UPDATE',
                    action: 'HANDLE_STATUS',
                    classCode: Number(classCode),
                    status: status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
                }
            };

            await request(MutationClassUpsert, variables);

            const message = status === 'ACTIVE' 
            ? 'Turma desativado com sucesso!' 
            : 'Turma ativado com sucesso!';
            enqueueSnackbar(message, { variant: 'success' });
            refresh('findClasses');
        } catch (error: unknown) {
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao ativar/desativar turma. Entre em contato com nosso suporte.', { variant: 'error' });
            }

            const genericError = 'Ops! Algo deu errado ao ativar/desativar turma. Tente novamente!'
            const errorMessage = GetErrorMessage(error, genericError);
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    const handleStatusDay = async (classCode: string, day: string, status: boolean) => {
        try {
            const variables = {
                input: {
                    type: 'UPDATE',
                    action: 'HANDLE_STATUS_DAY',
                    classCode: Number(classCode),
                    day: `${day}[${(status === true ? false : true)}]`,
                }
            };

            await request(MutationClassUpsert, variables);

            const message = status === true
            ? 'Dia desativado com sucesso!' 
            : 'Dia ativado com sucesso!';
            enqueueSnackbar(message, { variant: 'success' });
            refresh('findClasses');
        } catch (error: unknown) {
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao ativar/desativar o dia. Entre em contato com nosso suporte.', { variant: 'error' });
            }

            const genericError = 'Ops! Algo deu errado ao ativar/desativar o dia. Tente novamente!'
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

    const handleDeletePlan = async (classCode: string) => {
        try {
            const variables = {
                input: {
                    type: 'DELETE',
                    classCode: Number(classCode),
                    status: 'DELETED',
                }
            };

            await request(MutationClassUpsert, variables);
            setModalConfirmDelete(false);

            enqueueSnackbar('Turma excluída com sucesso', { variant: 'success' });
            refresh('findClasses');
        } catch (error: unknown) {
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao excluir turma. Entre em contato com nosso suporte.', { variant: 'error' });
            }

            const genericError = 'Ops! Algo deu errado ao excluir turma. Tente novamente!'
            const errorMessage = GetErrorMessage(error, genericError);
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    const isMenuOpen = (classCode: string) => Boolean(anchorEls[classCode]);

    const [componentType, setComponentType] = useState<AdminGymDetailsProps[keyof AdminGymDetailsProps] | null>(null);

    {/* Drawers */}
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerType, setDrawerType] = useState<AdminGymDrawerType[keyof AdminGymDrawerType] | null>(null);

    const findClasses = useCallback(async () => {
            setIsLoading(true);
            try {
                const response: FindClassesResponse = await request(QueryFindClasses, { companyCode: companyCode });

                setResponseClasses(response);
            } catch (error) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao buscar turmas. Entre em contato com nosso suporte.', { variant: 'error' });
                }
                enqueueSnackbar('Erro ao buscar turmas cadastradas em sua academia.', { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }, [attemptCount, companyCode, enqueueSnackbar, request]);

    useEffect(() => {
        if (!calledRef.current) {
            calledRef.current = true;

            const fetchData = async () => {
                await findClasses();
            };

            fetchData();
        }
    }, [findClasses]);

    const renderDrawerContent = () => {
        switch (drawerType) {
            case 'ClassCreate':
                return (
                    <ClassCreateDrawer 
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar} 
                        refresh={() => refresh('findClasses')}
                    />
                );

            case 'ClassAlter':
                return (
                    <ClassAlterDrawer 
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar}
                        data={alterClasses}
                        initialStep={activeDrawerStep}
                        refresh={() => refresh('findClasses')}
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
            case 'ClassDetail':
                return (
                    <GymClassesDetails
                        key={reloadKey}
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar}
                        data={classDetails}
                        initialStep={activeContentStep}
                        refresh={() => refresh('findClasses')}
                        onBack={handleBackToTable}
                    />
                );

            default:
                break;
        }
    };

    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        if (responseClasses) {
            const classToAlter = responseClasses.findClasses?.find(classes => classes.classCode === classDetails?.findClasses?.classCode);

            if (classToAlter) {
                setReloadKey(prevKey => prevKey + 1);  // Força o recarregamento do componente
                setclassDetails({ findClasses: classToAlter });
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [classDetails?.findClasses, classDetails?.findClasses?.classCode, responseClasses]);

    const refresh = async (source: unknown) => {

        switch (source) {
            case 'findClasses':
                await findClasses();
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
        responseClasses,
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
        filteredClasses,
        anchorEls,
        handleOpenMore,
        handleCloseMore,
        handleMoreDetails,
        handleAlterClasses,
        handleDeletePlan,
        handleConfirmDelete,
        modalConfirmDelete,
        handleCloseConfirmDelete,
        handleStatusPlan,
        isMenuOpen,
        classesToDisplay,
        isDetailsView,
        renderComponentContent,
        handleStatusDay,
    };
};
