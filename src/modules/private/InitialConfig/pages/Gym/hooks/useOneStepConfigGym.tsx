import { SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { GymConfigErrorStepOne, StepOneProps } from '../../../../../../pages/sign-up/gym/types';
import { formatTime } from '../../../../../../utils/format-time';
import { validateDaysSelection, validateTime, validateTimeZone } from '../../../../../../utils/validate-gym-configs';

export const useOneStepConfigGym = (formData: StepOneProps['formData'], setFormData: StepOneProps['setFormData'], setErrors: StepOneProps['setErrors']) => {
    const [selectedValue, setSelectedValue] = useState(formData.isPersonalizable ? 'isPersonalizable' : 'is24Hours');

    useEffect(() => {
        setSelectedValue(formData.is24Hours ? 'is24Hours' : 'isPersonalizable');
    }, [formData.is24Hours, formData.isPersonalizable]);

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name.startsWith('startTime') || name.startsWith('endTime') ? formatTime(value) : value
        }));
        
        setErrors(prevErrors => {
            const errors = { ...prevErrors } as { [key: string]: string | undefined };
            delete errors[`${name}Error`];
            return errors;
        });
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSelectedValue(value);
        setFormData(prevState => ({
            ...prevState,
            is24Hours: value === 'is24Hours',
            startTimeMondayToFriday: value === 'is24Hours' ? '00:00' : prevState.startTimeMondayToFriday,
            endTimeMondayToFriday: value === 'is24Hours' ? '23:59' : prevState.endTimeMondayToFriday,
            startTimeSaturday: value === 'is24Hours' ? '00:00' : prevState.startTimeSaturday,
            endTimeSaturday: value === 'is24Hours' ? '23:59' : prevState.endTimeSaturday,
            startTimeSunday: value === 'is24Hours' ? '00:00' : prevState.startTimeSunday,
            endTimeSunday: value === 'is24Hours' ? '23:59' : prevState.endTimeSunday,
        }));
        setErrors(prevErrors => {
            const errors = { ...prevErrors } as { [key: string]: string | undefined };
            delete errors[`${name}Error`];
            return errors;
        }); 
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

    const handleDayChange = (day: string) => {
        setFormData(prevFormData => {
            const newSelectedDays = prevFormData.selectedDays.includes(day)
                ? prevFormData.selectedDays.filter(selectedDay => selectedDay !== day)
                : [...prevFormData.selectedDays, day];

            return { ...prevFormData, selectedDays: newSelectedDays };
        });
    };

    const validateForm = () => {
        const newErrors: GymConfigErrorStepOne = {
            startTimeMondayToFridayError: formData.startTimeMondayToFriday ? null : validateTime(formData.startTimeMondayToFriday),
            endTimeMondayToFridayError: validateTime(formData.endTimeMondayToFriday),
            dayError: validateDaysSelection(formData.selectedDays),
            timeZoneError: validateTimeZone(formData.timeZone)
        };

        setErrors(newErrors);
        return !(
            newErrors.startTimeMondayToFridayError ||
            newErrors.endTimeMondayToFridayError ||
            newErrors.dayError ||
            newErrors.timeZoneError
        );
    };

    return {
        selectedValue,
        handleTextFieldChange,
        handleRadioChange,
        handleSelectChange,
        handleDayChange,
        validateForm
    };
};
