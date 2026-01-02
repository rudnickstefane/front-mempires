import { VariantType } from 'notistack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useBackendForFrontend } from '../../../../../common/hooks/useBackendForFrontend';
import { FindSlidesResponse, FindStudentMetricsResponse, FindUserShortcutsResponse, StudentMetrics } from '../../../../../common/types';
import { GetErrorMessage } from '../../../../../common/utils';
import { ClassCreateDrawer, ShortcutCreateDrawer, StudentRegisterDrawer, VisitRegisterDrawer } from '../../../components/Drawer';
import { MutationDeleteShortcut, QueryFindSlides, QueryFindStudentsMetrics, QueryFindUserShortcuts } from '../../../components/Graphql';
import { AdminGymDrawerType } from '../types';

export const useHomeGymManagement = ({
    enqueueSnackbar
}: {
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}) => {

    const jwtSecret = import.meta.env.VITE_APP_JWT_SECRET;
    const { request } = useBackendForFrontend(jwtSecret);
    const [isLoadingStudentMetrics, setIsLoadingStudentMetrics] = useState(false);
    const [isLoadingShortcuts, setIsLoadingShortcuts] = useState(false);
    const [isLoadingSlides, setIsLoadingSlides] = useState(false);
    const [responseStudentMetrics, setResponseStudentMetrics] = useState<StudentMetrics | null>(null);
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const profileCode = Number(localStorage.getItem('@iflexfit:profileCode'));
    const [responseShortcuts, setResponseShortcuts] = useState<FindUserShortcutsResponse>();
    const [responseSlides, setResponseSlides] = useState<FindSlidesResponse>();
    const [attemptCount, setAttemptCount] = useState(0);
    const calledRef = useRef(false);

    {/* Drawers */}
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerType, setDrawerType] = useState<AdminGymDrawerType[keyof AdminGymDrawerType] | null>(null);

    const findMetrics = useCallback(async () => {
        setIsLoadingStudentMetrics(true);
        try {
            const response: FindStudentMetricsResponse = await request(QueryFindStudentsMetrics, { companyCode: companyCode });
            const { findStudentMetrics } = response;

            setResponseStudentMetrics(findStudentMetrics);
            setIsLoadingStudentMetrics(false);
        } catch {
            enqueueSnackbar('Ocorreu um problema ao exibir os gráficos dos alunos.', { variant: 'error' });
        }
    }, [companyCode, enqueueSnackbar, request]);

    const findUserShortcuts = useCallback(async () => {
        setIsLoadingShortcuts(true);
        try {
            const response: FindUserShortcutsResponse = await request(QueryFindUserShortcuts, { profileCode: profileCode });

            setResponseShortcuts(response);
            setIsLoadingShortcuts(false);
        } catch {
            enqueueSnackbar('Não foi possível exibir seus atalhos.', { variant: 'error' });
        }
    }, [enqueueSnackbar, profileCode, request]);

    const findSlides = useCallback(async () => {
        setIsLoadingSlides(true);
        try {
            const response: FindSlidesResponse = await request(QueryFindSlides, { origin: 'GYM' });

            setResponseSlides(response);
            setIsLoadingSlides(false);
        } catch {
            enqueueSnackbar('Tivemos um problema ao exibir os slides.', { variant: 'error' });
        }
    }, [enqueueSnackbar, request]);

    useEffect(() => {
        if (!calledRef.current) {
            calledRef.current = true;

            const fetchData = async () => {
                await findMetrics();
                await findUserShortcuts();
                await findSlides();
            };

            fetchData();
        }
    }, [findMetrics, findUserShortcuts, findSlides]);

    const handleDeleteShortcut = async (shortcut: { shortcutCode: string }) => {
        try {
            const shortcutCode = Number(shortcut);
            await request(MutationDeleteShortcut, { shortcutCode, profileCode: profileCode });
            enqueueSnackbar('Atalho excluído com sucesso!', { variant: 'success' });
            refresh('ShortcutCreate');
        } catch (error: unknown) {
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao excluir atalho. Entre em contato com nosso suporte.', { variant: 'error' });
            }

            const genericError = 'Ops! Algo deu errado ao excluir atalho. Tente novamente!'
            const errorMessage = GetErrorMessage(error, genericError);
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    const renderDrawerContent = () => {
        switch (drawerType) {
            case 'StudentRegister':
                return (
                    <StudentRegisterDrawer 
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar} 
                        refresh={() => refresh('findMetrics')}
                    />
                );
            
            case 'VisitRegister':
                return (
                    <VisitRegisterDrawer 
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar} 
                        refresh={() => refresh('findMetrics')}
                    />
                );

            case 'ClassCreate':
                return (
                    <ClassCreateDrawer 
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar}
                        refresh={() => refresh('findClasses')}
                    />
                );

            case 'ShortcutCreate':
                return (
                    <ShortcutCreateDrawer 
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar} 
                        refresh={() => refresh('ShortcutCreate')}
                    />
                );
            
            default:
                break;
        }
    };

    const refresh = async (source: unknown) => {

        switch (source) {
            case 'findMetrics':
                await findMetrics();
                break;

            case 'ShortcutCreate':
                await findUserShortcuts();
                break;
            
            default:
                break;
        }
    };

    const closeDrawer = () => {
        setDrawerType(null);
        setIsDrawerOpen(false);
    };

    const openDrawer = (type: AdminGymDrawerType[keyof AdminGymDrawerType]) => {
        setDrawerType(type);
        setIsDrawerOpen(true);
    };

    return {
        isLoadingStudentMetrics,
        isLoadingShortcuts,
        isLoadingSlides,
        isDrawerOpen,
        responseStudentMetrics,
        renderDrawerContent,
        openDrawer,
        closeDrawer,
        responseShortcuts,
        responseSlides,
        handleDeleteShortcut
      };
};
