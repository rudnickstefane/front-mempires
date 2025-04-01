import { SelectChangeEvent } from '@mui/material';
import { VariantType } from 'notistack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useBackendForFrontend } from '../../../../../common/hooks/useBackendForFrontend';
import { FindProductsResponse, ProductData } from '../../../../../common/types';
import { GetErrorMessage } from '../../../../../common/utils';
import { EditStudentDrawer, StudentRegisterDrawer } from '../../../components/Drawer';
import { MutationStudentUpsert, QueryFindProducts } from '../../../components/Graphql';
import { GymStudentDetails } from '../pages/Admin/Students/Details';
import { AdminGymDetailsProps, AdminGymDrawerType } from '../types';

export const useMarketplace = ({
    enqueueSnackbar
}: {
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [responseProducts, setResponseProducts] = useState<FindProductsResponse | null>();
    const [alterStudent, setAlterStudent] = useState<ProductData | null>();
    const [studentDetails, setStudentDetails] = useState<ProductData | null>();
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
    const filteredProducts = (responseProducts?.findProducts || []).filter((product) => {
        const searchLower = searchText.trim().toLowerCase();

        // Extrair número do formato STD-52
        const extractedproductCode = searchLower.startsWith('std-') 
            ? searchLower.replace('prt-', '') 
            : null;

        return (
            product.name?.toLowerCase().includes(searchLower) ||
            product.fantasyName?.toLowerCase().includes(searchLower) ||
            (product.productCode && extractedproductCode && product.productCode.toString() === extractedproductCode)
        );
    });

    // Cálculo para paginação com base nos itens filtrados
    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

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
    const handleOpenMore = (event: React.MouseEvent<HTMLElement>, productCode: string) => {
        setAnchorEls((prev) => ({ ...prev, [productCode]: event.currentTarget }));
    };

    // Função para fechar o menu
    const handleCloseMore = (productCode: string) => {
        setAnchorEls((prev) => ({ ...prev, [productCode]: null }));
    };

    const handleMoreDetails = (productCode: string) => {
        const studentDetail = responseProducts?.findProducts?.find((product) => product.productCode === productCode);
        if (studentDetail) {
            setStudentDetails(studentDetail);
        } 
        setIsDetailsView(true);
        openContent('StudentDetails');
        handleCloseMore(productCode);
    };

    const handleAlterStudent = (productCode: string) => {
        const studentDetail = responseProducts?.findProducts?.find((product) => product.productCode === productCode);
        if (studentDetail) {
            setAlterStudent(studentDetail);
        }    
        openDrawer('EditStudent');
        handleCloseMore(productCode);
    };

    const handleStatusPlan = async (productCode: string, status: string) => {
        try {
            const variables = {
                data: {
                    origin: 'GYM',
                    type: 'UPDATE',
                    input: {
                        action: 'HANDLE_STATUS',
                        studentCode: Number(productCode),
                        status: status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
                    }
                }
            };

            await request(MutationStudentUpsert, variables);

            const message = status === 'ACTIVE' 
            ? 'Aluno desativado com sucesso!' 
            : 'Aluno ativado com sucesso!';
            enqueueSnackbar(message, { variant: 'success' });
            refresh('findProducts');
        } catch (error: unknown) {
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao ativar/desativar aluno. Entre em contato com nosso suporte.', { variant: 'error' });
            }

            const genericError = 'Ops! Algo deu errado ao ativar/desativar aluno. Tente novamente!'
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

    const handleDeletePlan = async (productCode: string) => {
        try {
            const variables = {
                data: {
                    origin: 'GYM',
                    type: 'DELETE',
                    input: {
                        studentCode: Number(productCode),
                        status: 'DELETED'
                    }
                }
            };

            await request(MutationStudentUpsert, variables);
            setModalConfirmDelete(false);

            enqueueSnackbar('Aluno excluído com sucesso', { variant: 'success' });
            refresh('findProducts');
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

    const isMenuOpen = (productCode: string) => Boolean(anchorEls[productCode]);

    const [componentType, setComponentType] = useState<AdminGymDetailsProps[keyof AdminGymDetailsProps] | null>(null);

    {/* Drawers */}
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerType, setDrawerType] = useState<AdminGymDrawerType[keyof AdminGymDrawerType] | null>(null);

    const findProducts = useCallback(async () => {
            setIsLoading(true);
            try {
                const response: FindProductsResponse = await request(QueryFindProducts, { request: 'MARKETPLACE' });

                setResponseProducts(response);
            } catch (error) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao buscar alunos. Entre em contato com nosso suporte.', { variant: 'error' });
                }
                enqueueSnackbar('Erro ao buscar alunos matriculados em sua academia.', { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }, [attemptCount, enqueueSnackbar, request]);

    useEffect(() => {
        if (!calledRef.current) {
            calledRef.current = true;

            const fetchData = async () => {
                await findProducts();
            };

            fetchData();
        }
    }, [findProducts]);

    const renderDrawerContent = () => {
        switch (drawerType) {
            case 'StudentRegister':
                return (
                    <StudentRegisterDrawer 
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar} 
                        refresh={() => refresh('findProducts')}
                    />
                );

            case 'EditStudent':
                return (
                    <EditStudentDrawer 
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar}
                        data={alterStudent}
                        initialStep={activeDrawerStep}
                        refresh={() => refresh('findProducts')}
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
            case 'StudentDetails':
                return (
                    <GymStudentDetails
                        key={reloadKey}
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar}
                        data={studentDetails}
                        initialStep={activeContentStep}
                        refresh={() => refresh('findProducts')}
                        onBack={handleBackToTable}
                    />
                );

            default:
                break;
        }
    };

    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        if (responseProducts) {
            const studentDetail = responseProducts.findProducts?.find(product => product.productCode === studentDetails?.productCode);

            if (studentDetail) {
                setReloadKey(prevKey => prevKey + 1);  // Força o recarregamento do componente
                setStudentDetails(studentDetail);
            }
        }
    }, [studentDetails?.productCode, responseProducts]);

    const refresh = async (source: unknown) => {

        switch (source) {
            case 'findProducts':
                await findProducts();
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
        responseProducts,
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
        filteredProducts,
        anchorEls,
        handleOpenMore,
        handleCloseMore,
        handleMoreDetails,
        handleAlterStudent,
        handleDeletePlan,
        handleConfirmDelete,
        modalConfirmDelete,
        handleCloseConfirmDelete,
        handleStatusPlan,
        isMenuOpen,
        productsToDisplay,
        isDetailsView,
        renderComponentContent
    };
};
