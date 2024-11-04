import axios from 'axios';
import { ChangeEvent } from 'react';
import { API_URLS } from '../config/apis.config';
import { GymConfigErrorStepTwo, StepTwoProps } from '../pages/sign-up/gym/types';
import { formatCep } from '../utils/format-cep';
import { validateAddress, validateCep, validateCity, validateNeighborhood, validateNumber, validateState } from '../utils/validate-gym-configs';

export const useGymConfigFormStepTwo = (formData: StepTwoProps['formData'], setFormData: StepTwoProps['setFormData'], setErrors: StepTwoProps['setErrors']) => {

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (name === 'cep') {
            updatedValue = formatCep(value);

            setErrors(prevErrors => ({
                ...prevErrors,
                cepError: ''
            }));
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: updatedValue
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));

        if (name === 'cep' && updatedValue.length === 9) {
            axios.get(`${API_URLS.VIA_CEP}/${updatedValue}/json/`)
                .then(response => {
                    if (response.data.erro) {
                        const { localidade, uf } = response.data;
                        setFormData(prevState => ({
                            ...prevState,
                            city: localidade || '',
                            state: uf || '',
                        }));

                        setErrors(prevErrors => ({
                            ...prevErrors,
                            cepError: 'CEP não encontrado.',
                        }));
                    } else {
                        const { logradouro, bairro, localidade, uf } = response.data;
                        setFormData(prevState => ({
                            ...prevState,
                            address: logradouro || '',
                            neighborhood: bairro || '',
                            city: localidade || '',
                            state: uf || '',
                        }));
                        setErrors(prevErrors => ({
                            ...prevErrors,
                            cityError: '',
                            stateError: '',
                        }));
                    }
                })
                .catch(() => {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        cepError: 'Erro ao buscar o CEP',
                    }));
                });
        }
    };

    const validateForm = () => {
        const newErrors: GymConfigErrorStepTwo = {
            addressError: validateAddress(formData.address),
            numberError: validateNumber(formData.number),
            neighborhoodError: validateNeighborhood(formData.neighborhood),
            cepError: validateCep(formData.cep),
            cityError: validateCity(formData.city),
            stateError: validateState(formData.state)
        };

        setErrors(newErrors);
        return !(
            newErrors.addressError ||
            newErrors.numberError ||
            newErrors.neighborhoodError ||
            newErrors.cepError ||
            newErrors.cityError ||
            newErrors.stateError
        );
    };

    return {
        handleTextFieldChange,
        validateForm
    };
};
