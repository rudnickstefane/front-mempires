import { SelectChangeEvent } from '@mui/material';
import { VariantType } from 'notistack';
import { ChangeEvent, useState } from 'react';
import { FormatText, ValidateFormClassCreate } from '../../../common/utils';
import { ClassCreateProps } from '../components/Drawer/types/ClassCreateProps.type';

export const useClassCreateForm = ({
    closeDrawer,
    enqueueSnackbar
}: {
    closeDrawer: () => void;
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [activeStep] = useState(0);

    const [formData, setFormData] = useState<ClassCreateProps['formData']>({
        class: '',
        modalities: '',
        numberStudent: '',
        minimumAlert: ''
    });

    const [errors, setErrors] = useState<ClassCreateProps['errors']>({
        classError: '',
        modalitiesError: '',
        numberStudentError: '',
        minimumAlertError: ''
    });

    const dynamicSteps = ['Informações'];

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (name === 'class' && value) {
            updatedValue = FormatText(value);
        }

        // Atualiza o estado com o novo valor do campo
        setFormData(prevState => ({
            ...prevState,
            [name]: updatedValue
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    const validateForm = () => {
        let newErrors: ClassCreateProps['errors'] = {};
        newErrors = ValidateFormClassCreate(formData, activeStep);
        setErrors(newErrors);
        
        return Object.keys(newErrors).length === 0;
    };

    const handleFinish = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                // Simulando uma requisição ao banco
                await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay simulado
                enqueueSnackbar('Turma cadastrada com sucesso!', { variant: 'success' });
                closeDrawer();
            } catch (error) {
                enqueueSnackbar('Erro ao cadastrar a turma!', { variant: 'error' });
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
        handleTextFieldChange,
        handleSelectChange,
        handleFinish
      };
};
