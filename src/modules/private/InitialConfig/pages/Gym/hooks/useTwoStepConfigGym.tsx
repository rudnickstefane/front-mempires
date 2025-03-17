import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { GymConfigErrorStepTwo, StepTwoProps } from '../../../../../../pages/sign-up/gym/types';
import { validateAddress, validateCep, validateCity, validateDistrict, validateNumber, validateState } from '../../../../../../utils/validate-gym-configs';
import { APIS } from '../../../../../common/configs/apis.config';
import { FormatName, FormatZipCode } from '../../../../../common/utils';

export const useTwoStepConfigGym = (formData: StepTwoProps['formData'], setFormData: StepTwoProps['setFormData'], setErrors: StepTwoProps['setErrors']) => {

    const [isNoNumber, setIsNoNumber] = useState(false);

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedValue = FormatName(value);

        if (name === 'zipCode') {
            updatedValue = FormatZipCode(value);
        }

        if (name === 'zipCode' && updatedValue.length === 9) {
            axios.get(`${APIS.zipCode}/${updatedValue}/json/`)
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
                            zipCodeError: 'CEP não encontrado.',
                        }));
                    } else {
                        const { logradouro, bairro, localidade, uf } = response.data;
                        setFormData(prevState => ({
                            ...prevState,
                            address: logradouro || '',
                            district: bairro || '',
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
                        zipCodeError: 'Erro ao buscar o CEP',
                    }));
                });
        }

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
        const newErrors: GymConfigErrorStepTwo = {
            addressError: validateAddress(formData.address),
            numberError: validateNumber(formData.number),
            districtError: validateDistrict(formData.district),
            zipCodeError: validateCep(formData.zipCode),
            cityError: validateCity(formData.city),
            stateError: validateState(formData.state)
        };

        setErrors(newErrors);
        return !(
            newErrors.addressError ||
            newErrors.numberError ||
            newErrors.districtError ||
            newErrors.zipCodeError ||
            newErrors.cityError ||
            newErrors.stateError
        );
    };

    return {
        isNoNumber,
        handleNoNumberToggle,
        handleTextFieldChange,
        validateForm
    };
};
