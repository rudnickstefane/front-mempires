import { SelectChangeEvent } from '@mui/material';
import { VariantType } from 'notistack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useBackendForFrontend } from '../../../../../common/hooks/useBackendForFrontend';
import { FindStudentsResponse, StudentData } from '../../../../../common/types';
import { GetErrorMessage } from '../../../../../common/utils';
import { EditStudentDrawer, StudentRegisterDrawer } from '../../../components/Drawer';
import { MutationStudentUpsert, QueryFindStudents } from '../../../components/Graphql';
import { GymStudentDetails } from '../pages/Admin/Students/Details';
import { AdminGymDetailsProps, AdminGymDrawerType } from '../types';

export const useStudentsGymAdmin = ({
    enqueueSnackbar
}: {
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const [responsePlans, setResponsePlans] = useState<FindStudentsResponse | null>();
    const [alterStudent, setAlterStudent] = useState<StudentData | null>();
    const [studentDetails, setStudentDetails] = useState<StudentData | null>();
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
    const filteredPlans = (responsePlans?.findStudents || []).filter((student) => {
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
    const studentsToDisplay = filteredPlans.slice(startIndex, endIndex);

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
        const studentDetail = responsePlans?.findStudents?.find((student) => student.profileCode === profileCode);
        if (studentDetail) {
            setStudentDetails(studentDetail);
        } 
        setIsDetailsView(true);
        openContent('StudentDetails');
        handleCloseMore(profileCode);
    };

    const handleAlterStudent = (profileCode: string) => {
        const studentDetail = responsePlans?.findStudents?.find((plan) => plan.profileCode === profileCode);
        if (studentDetail) {
            setAlterStudent(studentDetail);
        }    
        openDrawer('EditStudent');
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
            ? 'Aluno desativado com sucesso!' 
            : 'Aluno ativado com sucesso!';
            enqueueSnackbar(message, { variant: 'success' });
            refresh('findStudents');
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
            refresh('findStudents');
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

    const [componentType, setComponentType] = useState<AdminGymDetailsProps[keyof AdminGymDetailsProps] | null>(null);

    {/* Drawers */}
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerType, setDrawerType] = useState<AdminGymDrawerType[keyof AdminGymDrawerType] | null>(null);

    const findStudents = useCallback(async () => {
            setIsLoading(true);
            try {
                const response: FindStudentsResponse = await request(QueryFindStudents, { companyCode: companyCode });

                setResponsePlans(response);
            } catch (error) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao buscar alunos. Entre em contato com nosso suporte.', { variant: 'error' });
                }
                enqueueSnackbar('Erro ao buscar alunos matriculados em sua academia.', { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }, [attemptCount, companyCode, enqueueSnackbar, request]);

    useEffect(() => {
        if (!calledRef.current) {
            calledRef.current = true;

            const fetchData = async () => {
                await findStudents();
            };

            fetchData();
        }
    }, [findStudents]);

    const renderDrawerContent = () => {
        switch (drawerType) {
            case 'StudentRegister':
                return (
                    <StudentRegisterDrawer 
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar} 
                        refresh={() => refresh('findStudents')}
                    />
                );

            case 'EditStudent':
                return (
                    <EditStudentDrawer 
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar}
                        data={alterStudent}
                        initialStep={activeDrawerStep}
                        refresh={() => refresh('findStudents')}
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
                        refresh={() => refresh('findStudents')}
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
            const studentDetail = responsePlans.findStudents?.find(student => student.profileCode === studentDetails?.profileCode);

            if (studentDetail) {
                setReloadKey(prevKey => prevKey + 1);  // Força o recarregamento do componente
                setStudentDetails(studentDetail);
            }
        }
    }, [studentDetails?.profileCode, responsePlans]);

    const refresh = async (source: unknown) => {

        switch (source) {
            case 'findStudents':
                await findStudents();
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
        handleAlterStudent,
        handleDeletePlan,
        handleConfirmDelete,
        modalConfirmDelete,
        handleCloseConfirmDelete,
        handleStatusPlan,
        isMenuOpen,
        studentsToDisplay,
        isDetailsView,
        renderComponentContent
    };
};
