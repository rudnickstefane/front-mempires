import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useBackendForFrontend } from '../../../common/hooks/useBackendForFrontend';
import { DrawerProps } from '../../../common/types';
import { FormatName, FormatText, GetErrorMessage, GroupsUpsertVariables, ValidateFormRegisterGroup } from '../../../common/utils';
import { EditGroupDrawer } from '../components/Drawer';
import { ReviewsProps } from '../components/Drawer/types';
import { MutationGroupUpsert } from '../components/Graphql';
import { AdminGymDetailsProps } from '../pages/Gym/types';

export const useGroupEditForm = ({
    closeDrawer,
    enqueueSnackbar,
    data,
    refresh,
}: DrawerProps) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [isNoNumber, setIsNoNumber] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [attemptCount, setAttemptCount] = useState(0);
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const [charactersRemaining, setCharactersRemaining] = useState<Record<string, number>>({
        description: 300,
    });

    const [formData, setFormData] = useState<ReviewsProps['formData']>({
        action: 'UPDATE',
        companyCode: companyCode,
        status: data.status,
        name: data.name,
        description: data.description,
        permissionProfileCompany: data.permissions.find((p: { path: string; }) => p.path === "Company")?.permission,
        permissionMenuAdmin: data.permissions.find((p: { path: string; }) => p.path === "Admin")?.permission,
        permissionMenuFinance: data.permissions.find((p: { path: string; }) => p.path === "Finance")?.permission,
        permissionMenuIntegration: data.permissions.find((p: { path: string; }) => p.path === "Integration")?.permission,
        permissionMenuDashboard: data.permissions.find((p: { path: string; }) => p.path === "Dashboard")?.permission,
        permissionMenuPrograms: data.permissions.find((p: { path: string; }) => p.path === "Programs")?.permission,
    });

    const [errors, setErrors] = useState<ReviewsProps['errors']>({
        nameError: '',
        descriptionError: '',
    });

    const dynamicSteps = ['Informações', 'Permissões'];

    const handleTextFieldChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedValue = value;

        updatedValue = FormatText(value);

        if (name === 'name') {
            updatedValue = FormatName(value);
        }

        if (name === 'description' && value.length <= 300) {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
            
            setCharactersRemaining((prevState) => ({
                ...prevState,
                [name]: 300 - value.length,
            }));
        }

        // Atualiza o estado com o novo valor do campo
        setFormData(prevState => ({
            ...prevState,
            [name]: updatedValue
        }));

        setErrors(prevErrors => {
            const errors = { ...prevErrors } as { [key: string]: string | undefined };
            delete errors[`${name}Error`];
            return errors;
        }); 
    };

    const handleNoNumberToggle = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setIsNoNumber(checked);
    
        if (checked) {
            setFormData(prevFormData => ({
                ...prevFormData,
                number: 'S/N'
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                number: ''
            }));
        }
    };

    const validateForm = () => {
        let newErrors: ReviewsProps['errors'] = {};
        newErrors = ValidateFormRegisterGroup(formData, activeStep);
        setErrors(newErrors);
        
        return Object.keys(newErrors).length === 0;
    };

    const handleContinue = () => {
        if (validateForm()) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleFinish = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                const variables = GroupsUpsertVariables(formData);
                await request(MutationGroupUpsert, variables);
                enqueueSnackbar('Alterações realizadas com sucesso!', { variant: 'success' });
                closeDrawer();
                refresh?.();
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao atualizar grupo. Entre em contato com nosso suporte.', { variant: 'error' });
                }

                const genericError = 'Ops! Algo deu errado ao atualizar grupo. Tente novamente!'
                const errorMessage = GetErrorMessage(error, genericError);
                enqueueSnackbar(errorMessage, { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    {/* Drawers */}
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerType, setDrawerType] = useState<AdminGymDetailsProps[keyof AdminGymDetailsProps] | null>(null);
    const [activeDrawerStep, setActiveDrawerStep] = useState(0);

    const renderDrawerContent = () => {
        switch (drawerType) {
            case 'EditGroup':
                return (
                    <EditGroupDrawer 
                        closeDrawer={closeDrawerDetails} 
                        enqueueSnackbar={enqueueSnackbar}
                        data={data}
                        initialStep={activeDrawerStep}
                        refresh={() => refresh?.()}
                    />
                );

            default:
                break;
        }
    };

    const closeDrawerDetails = () => {
        setDrawerType(null);
        setIsDrawerOpen(false);
    };

    const openDrawer = (type: AdminGymDetailsProps[keyof AdminGymDetailsProps], initialStep: number = 0) => {
        setDrawerType(type);
        setIsDrawerOpen(true);
        setActiveDrawerStep(initialStep);
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        setErrors(prevErrors => {
            const errors = { ...prevErrors } as { [key: string]: string | undefined };
            delete errors[`${name}Error`];
            return errors;
        }); 
    };

    return {
        isLoading,
        formData,
        errors,
        activeStep,
        setActiveStep,
        dynamicSteps,
        isNoNumber,
        handleTextFieldChange,
        handleNoNumberToggle,
        handleBack,
        handleContinue,
        handleFinish,
        charactersRemaining,
        isDrawerOpen,
        closeDrawerDetails,
        renderDrawerContent,
        openDrawer,
        handleSelectChange
    };
};
