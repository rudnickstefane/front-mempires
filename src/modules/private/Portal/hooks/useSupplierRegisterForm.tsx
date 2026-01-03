import { VariantType } from 'notistack';
import { ChangeEvent, useState } from 'react';
import { FormatAndValidateCodeAndIdentity, ValidateFormSupplierRegister } from '../../../common/utils';
import { FormatCode, FormatIdentity } from '../../../common/utils/FormatCodeAndIdentity.util';
import { SupplierRegisterProps } from '../components/Drawer/types';

const mockData = {
    cpf: '45782513810',
    cnpj: '',
    name: 'PRO FITNESS EQUIPAMENTOS',
    address: 'Av. Barão Homem de Melo, nº 1985 - Alpes, Belo Horizonte - MG, 30451-669'
  };

export const useSupplierRegisterForm = ({
    closeDrawer,
    enqueueSnackbar
}: {
    closeDrawer: () => void;
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [isFinishDisabled, setIsFinishDisabled] = useState(true);
    const [supplierData, setSupplierData] = useState<null | typeof mockData>(null);
    const [activeStep] = useState(0);

    const [formData, setFormData] = useState<SupplierRegisterProps['formData']>({
        codeAndIdentity: ''
    });

    const [errors, setErrors] = useState<SupplierRegisterProps['errors']>({
        codeAndIdentityError: '',
        searchCodeAndIdentityError: ''
    });

    const dynamicSteps = ['Informações'];

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedValue = value;

        // Lógica para formatação e validação do CPF e CNPJ
        if (name === 'codeAndIdentity' && value) {
            const { formatted, isValid } = FormatAndValidateCodeAndIdentity(value);
            
            // Atualiza o valor no estado com a formatação do documento
            setFormData(prevState => ({
                ...prevState,
                [name]: formatted // Atualiza o campo com o valor formatado
            }));
    
            setSupplierData(null);
            setIsFinishDisabled(true);
            setErrors(prevErrors => ({
                ...prevErrors,
                codeAndIdentityError: isValid ? '' : 'CPF ou CNPJ inválido',
                searchCodeAndIdentityError: ''
            }));

            // Verifica se o CPF ou CNPJ tem 11 ou 14 dígitos e é válido
            if ((value.length === 11 && isValid || formatted.length === 11 && isValid) || (value.length === 14 && isValid || formatted.length === 18 && isValid)) {
                setIsLoading(true);
                
                // Simula a requisição com delay
                setTimeout(() => {
                    // Verifica se o CPF ou CNPJ corresponde ao mockData
                    if (value === mockData.cpf || value === mockData.cnpj) {
                        const formattedCNPJ = mockData.cnpj ? FormatCode(mockData.cnpj) : '';
                        const formattedCPF = mockData.cpf ? FormatIdentity(mockData.cpf) : '';
                        setSupplierData({
                            ...mockData,
                            cnpj: formattedCNPJ, 
                            cpf: formattedCPF
                          });
                    setIsFinishDisabled(false); // Ativa o botão de concluir
                    } else {
                    setSupplierData(null);
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        searchCodeAndIdentityError: value.length === 11 
                            ? 'CPF informado não foi encontrado.' 
                            : 'CNPJ informado não foi encontrado.'
                    }));
                    setIsFinishDisabled(true); // Desativa o botão de concluir
                    }
                    setIsLoading(false);
                }, 1000); // Delay de 1 segundo para simular a requisição
            }
            
            return; // Impede a atualização adicional de `formData` com o valor não formatado
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

    const validateForm = () => {
        let newErrors: SupplierRegisterProps['errors'] = {};
        newErrors = ValidateFormSupplierRegister(formData, activeStep);
        setErrors(newErrors);
        
        return Object.keys(newErrors).length === 0;
    };
    
    const handleFinish = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                // Simulando uma requisição ao banco
                await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay simulado
                enqueueSnackbar('Fornecedor vinculado com sucesso!', { variant: 'success' });
                closeDrawer();
            } catch (error) {
                enqueueSnackbar('Erro ao vincular o fornecedor!', { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return {
        setFormData,
        setErrors,
        isLoading,
        isFinishDisabled,
        supplierData,
        formData,
        errors,
        activeStep,
        dynamicSteps,
        handleTextFieldChange,
        handleFinish
      };
};
