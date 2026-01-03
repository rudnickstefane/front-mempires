import { SelectChangeEvent } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useBackendForFrontend } from '../../../common/hooks/useBackendForFrontend';
import { DrawerProps, FindShortcutsResponse } from '../../../common/types';
import { GetErrorMessage } from '../../../common/utils';
import { MutationShortcutCreate, QueryFindShortcuts } from '../components/Graphql';

export const useShortcutCreateForm = ({
    closeDrawer,
    enqueueSnackbar,
    refresh,
}: DrawerProps) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [activeStep] = useState(0);
    const [attemptCount, setAttemptCount] = useState(0);
    const [responseShortcuts, setResponseShortcuts] = useState<FindShortcutsResponse>();
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const profileCode = Number(localStorage.getItem('@iflexfit:profileCode'));
    const calledRef = useRef(false);

    const [formData, setFormData] = useState({
        profileCode: profileCode,
        shortcutCode: '',
        groupCode: '',
        name: '',
    });

    const [errors, setErrors] = useState({
        shortcutsError: '',
    });

    const handleSelectChange = (event: SelectChangeEvent) => {
        const selectedShortcut = event.target.value as string;
    
        // Encontrar o atalho correspondente ao shortcutCode
        const shortcut = responseShortcuts?.findShortcuts.find(
            (shortcut) => shortcut.shortcutCode.toString() === selectedShortcut
        );

        setFormData((prevFormData) => ({
            ...prevFormData,
            shortcutCode: selectedShortcut,
            groupCode: shortcut?.groupCode || '',
            name: shortcut?.name || '',
        }));
    };

    const dynamicSteps =  ['Opções'];

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!formData.shortcutCode) {
            newErrors.shortcutsError = 'O atalho é obrigatório';
            valid = false;
        } else {
            newErrors.shortcutsError = '';
        }

        setErrors(newErrors);
        return valid;
    };

    const findShortcuts = useCallback(async () => {
        try {
            const response: FindShortcutsResponse = await request(QueryFindShortcuts, { companyCode: companyCode, profileCode: profileCode });

            setResponseShortcuts(response);
        } catch {
            enqueueSnackbar('Não foi possível exibir seus atalhos.', { variant: 'error' });
        }
    }, [companyCode, enqueueSnackbar, profileCode, request]);

    useEffect(() => {
        if (!calledRef.current) {
            calledRef.current = true;
            
            const fetchData = async () => {
                await findShortcuts();
            };

            fetchData();
        }
    }, [findShortcuts]);

    const handleFinish = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                const variables = {
                    input: {
                        shortcutCode: formData.shortcutCode,
                        profileCode: formData.profileCode,
                        groupCode: formData?.groupCode,
                    }
                };
                await request(MutationShortcutCreate, variables);
                enqueueSnackbar('Atalho salvo com sucesso!', { variant: 'success' });
                closeDrawer();
                refresh?.();
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao salvar novo atalho. Entre em contato com nosso suporte.', { variant: 'error' });
                }

                const genericError = 'Ops! Algo deu errado ao salvar novo atalho. Tente novamente!'
                const errorMessage = GetErrorMessage(error, genericError);
                enqueueSnackbar(errorMessage, { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return {
        setFormData,
        setErrors,
        isLoading,
        formData,
        errors,
        activeStep,
        dynamicSteps,
        handleSelectChange,
        handleFinish,
        responseShortcuts,
      };
};
