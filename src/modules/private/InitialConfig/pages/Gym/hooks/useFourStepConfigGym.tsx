import { GymConfigErrorStepFour } from '../../../../../../pages/sign-up/gym/types/gym-errors.types';
import { StepFourProps } from '../../../../../../pages/sign-up/gym/types/gym-steps.types';
import { validateModalitiesForm } from '../../../../../../utils/validate-gym-configs';

const modalities = [
    { name: 'Musculação', description: 'Treino de força e resistência' },
    { name: 'Funcional', description: 'Treino funcional com movimentos naturais' },
    { name: 'Rítmos', description: 'Aulas de dança com variados estilos musicais' },
    { name: 'Jump', description: 'Treino com mini trampolim para cardio' },
    { name: 'Pilates', description: 'Exercícios focados em flexibilidade e força' },
    { name: 'FitDance', description: 'Aulas de dança para queima calórica' },
    { name: 'Muay-thai', description: 'Arte marcial tailandesa' },
    { name: 'Jiu-Jitsu', description: 'Arte marcial brasileira de defesa pessoal' },
    { name: 'Zumba', description: 'Dança latina com foco em fitness' },
    { name: 'Hidroginástica', description: 'Exercícios aeróbicos na água' },
    { name: 'Crossfit', description: 'Treino de alta intensidade e variação' },
    { name: 'Boxe', description: 'Treino de combate e condicionamento' },
    { name: 'Natação', description: 'Treino de natação para todos os níveis' },
    { name: 'Spinning', description: 'Ciclismo indoor com alta intensidade' },
    { name: 'Ballet', description: 'Dança clássica com foco em técnica e postura' },
    { name: 'Karatê', description: 'Arte marcial japonesa de defesa pessoal' },
    { name: 'Judô', description: 'Arte marcial de origem japonesa focada em arremessos' },
    { name: 'Dança de Salão', description: 'Dança social em pares' },
    { name: 'Yoga', description: 'Prática de posturas e meditação' },
    { name: 'Forró', description: 'Dança popular brasileira de par' },
    { name: 'Jazz', description: 'Dança contemporânea com diversas influências' },
];

export const useFourStepConfigGym = (formData: StepFourProps['formData'], setFormData: StepFourProps['setFormData'], setErrors: StepFourProps['setErrors']) => {

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const isChecked = event.target.checked;
        const selectedModalities = formData.selectedModalities || [];
        const modality = modalities.find((modality) => modality.name === name);

        if (!modality) return;

        if (isChecked) {
            setFormData({
                ...formData,
                selectedModalities: [...selectedModalities, modality],
            });
        } else {
            setFormData({
                ...formData,
                selectedModalities: selectedModalities.filter((modality) => modality.name !== name),
            });
        }
    };

    const validateForm = () => {
        const newErrors: GymConfigErrorStepFour = {
            modalitiesError: validateModalitiesForm(formData.selectedModalities),
        };

        setErrors(newErrors);
        return !(
            newErrors.modalitiesError
        );
    };

    return {
        modalities,
        handleCheckboxChange,
        validateForm
    };
};
