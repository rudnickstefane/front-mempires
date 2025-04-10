import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { APIS } from '../../../common/configs/apis.config';
import { useBackendForFrontend } from '../../../common/hooks/useBackendForFrontend';
import { DrawerProps } from '../../../common/types';
import { FormatAndValidateCNPJ, FormatName, FormatZipCode, GetErrorMessage, ValidateFormPlanSignature } from '../../../common/utils';
import { ReviewsProps } from '../components/Drawer/types';
import { MutationPlanSignature } from '../components/Graphql';

export const useSignaturePlanForm = ({
    closeDrawer,
    enqueueSnackbar,
    data,
    // refresh,
}: DrawerProps) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [attemptCount, setAttemptCount] = useState(0);
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const profileCode = Number(localStorage.getItem('@iflexfit:profileCode'));

    const plans = {
        Essential: {
          name: "Essential",
          monthly: 199.90,
          quarterly: 539.90,
          yearly: 1919.00,
          quarterlyMonthly: 179.97,
          yearlyMonthly: 159.92,
          description: 'Plano inicial para academias, uma faísca para começar a gestão.',
          features: [
            "Alunos Ilimitados",
            "Check-in & Check-out",
            "Integrações",
            "Fornecedores",
            "Nutricionistas",
            "Personal Trainers",
          ],
        },
        Business: {
          name: "Business",
          monthly: 399.90,
          quarterly: 1079.90,
          yearly: 3839.00,
          quarterlyMonthly: 359.97,
          yearlyMonthly: 31.92,
          description: 'Plano intermediário para academias, focado em negócios e crescimento.',
          features: [
            "Aplicativo",
            "Programas",
            "Relatórios Completos",
          ],
        },
        Imaginative: {
          name: "Imaginative",
          monthly: 699.90,
          quarterly: 1889.90,
          yearly: 6719.00,
          quarterlyMonthly: 629.97,
          yearlyMonthly: 559.92,
          description: 'Plano avançado para academias, com recursos completos para grandes operações.',
          features: [
            "Relatórios Avançados",
            "Programas Exclusivos",
            "Site da Academia",
          ],
        },
    };
    
    const selectedPlan = plans[data.plan as keyof typeof plans];
    const currentPlan = plans[data.plan as keyof typeof plans];

    const dynamicSteps = ['Informações', 'Cadastro'];

    const [formData, setFormData] = useState<ReviewsProps['formData']>({
        code: '',
        level: currentPlan.name.toUpperCase(),
        type: data.periodicity === 'monthly' ? 'MONTH' : data.periodicity === 'quarterly' ? 'QUARTER' : 'ANNUAL',
        amount: data.periodicity === 'monthly' ? currentPlan.monthly : data.periodicity === 'quarterly' ? currentPlan.quarterly : currentPlan.yearly,
        businessName: '',
        zipCode: '',
        address: '',
        district: '',
        city: '',
        number: '',
        complement: '',
        state: ''
    });

    const [errors, setErrors] = useState<ReviewsProps['errors']>({
        codeError: '',
    });

    const handleTextFieldChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedValue = value;

        // Lógica para formatação e validação do documento de identidade
        if (name === 'code' && value) {
            const numericValue = value.replace(/[^0-9]/g, '');
            const { formatted, isValid } = FormatAndValidateCNPJ(numericValue);
            
            // Atualiza o valor no estado com a formatação do documento
            setFormData(prevState => ({
                ...prevState,
                [name]: formatted // Atualiza o campo com o valor formatado
            }));
    
            // Atualiza o erro caso o documento seja inválido
            setErrors(prevErrors => ({
                ...prevErrors,
                codeError: isValid ? '' : 'CNPJ inválido',
            }));

            if (!isValid) {
                setFormData(prevState => ({
                    ...prevState,
                    businessName: '',
                    zipCode: '',
                    address: '',
                    district: '',
                    city: '',
                    number: '',
                    complement: '',
                    state: '',
                }));
            }

            if (value.length === 14) {
                axios.get(`${APIS.receitaWs}/${value}`)
                    .then(response => {
                        if (response.data.status === 'ERROR') {
                            setFormData(prevState => ({
                                ...prevState,
                                businessName: '',
                                zipCode: '',
                                address: '',
                                district: '',
                                city: '',
                                number: '',
                                complement: '',
                                state: '',
                            }));
    
                            setErrors(prevErrors => ({
                                ...prevErrors,
                                codeError: 'CNPJ não encontrado.',
                            }));
                        } else {
                            const { logradouro, bairro, nome, cep, numero, municipio, complemento, uf } = response.data;
                            setFormData(prevState => ({
                                ...prevState,
                                businessName: nome || '',
                                zipCode: FormatZipCode(cep) || '',
                                address: FormatName(logradouro) || '',
                                district: FormatName(bairro) || '',
                                city: FormatName(municipio) || '',
                                number: numero || '',
                                complement: FormatName(complemento) || '',
                                state: uf || '',
                            }));

                            setErrors(prevErrors => ({
                                ...prevErrors,
                                codeError: '',
                                stateError: '',
                            }));
                        }
                    })
                    .catch(() => {
                        setFormData(prevState => ({
                            ...prevState,
                            businessName: '',
                            zipCode: '',
                            address: '',
                            district: '',
                            city: '',
                            number: '',
                            complement: '',
                            state: '',
                        }));

                        setErrors(prevErrors => ({
                            ...prevErrors,
                            codeError: 'Erro ao buscar o CNPJ.',
                        }));
                    });
            }
            
            return; // Impede a atualização adicional de `formData` com o valor não formatado
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

    const handleContinue = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const validateForm = () => {
        let newErrors: ReviewsProps['errors'] = {};
        newErrors = ValidateFormPlanSignature(formData, activeStep);
        setErrors(newErrors);
        
        return Object.keys(newErrors).length === 0;
    };

    const handleFinish = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                const variables = {
                    input: {
                        companyCode: companyCode,
                        profileCode: profileCode,
                        code: formData.code,
                        level: formData.level,
                        type: formData.type,
                        amount: formData.amount,
                        name: `Plano ${currentPlan.name}`,
                        description: currentPlan.description,
                        businessName: formData.businessName,
                        zipCode: formData.zipCode,
                        address: formData.address,
                        district: formData.district,
                        city: formData.city,
                        number: formData.number,
                        complement: formData.complement,
                        state: formData.state
                    },
                }

                await request(MutationPlanSignature, variables);

                enqueueSnackbar('Assinatura efetuada com sucesso!', { variant: 'success' });
                closeDrawer();
                window.location.reload();
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao assinar plano. Entre em contato com nosso suporte.', { variant: 'error' });
                }

                const genericError = 'Ops! Algo deu errado ao processar assinatura do plano. Tente novamente!'
                const errorMessage = GetErrorMessage(error, genericError);
                enqueueSnackbar(errorMessage, { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return {
        formData,
        errors,
        isLoading,
        activeStep,
        dynamicSteps,
        handleBack,
        handleContinue,
        handleFinish,
        selectedPlan,
        currentPlan,
        handleTextFieldChange
    };
};
