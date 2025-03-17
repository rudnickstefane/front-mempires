import { StepFiveProps } from '../../../../../../pages/sign-up/gym/types/gym-steps.types';

const services = [
    { name: 'Avaliação Física', description: 'Avaliação para monitorar seu progresso físico' },
    { name: 'Armário', description: 'Serviço de armário pessoal para seus pertences' },
    { name: 'Nutricionista', description: 'Consultas e acompanhamento nutricional' },
    { name: 'Personal Trainer', description: 'Treinamento personalizado com um personal trainer' },
    { name: 'Estacionamento', description: 'Vaga de estacionamento para seu veículo' },
    { name: 'Bicicletário', description: 'Espaço seguro para estacionar sua bicicleta' },
    { name: 'Toalha', description: 'Serviço de empréstimo de toalhas' }
];

const segments = [
    { name: 'Academia de Musculação', description: 'Espaço dedicado para treino de musculação' },
    { name: 'Studio de Musculação com Personal', description: 'Studio especializado em musculação com acompanhamento de personal' },
    { name: 'Centro de Treinamento Funcional', description: 'Área destinada ao treinamento funcional' },
    { name: 'Escola de Luta', description: 'Espaço dedicado a artes marciais e lutas' },
    { name: 'Escola de Dança', description: 'Área para aprendizado e prática de diversos estilos de dança' },
    { name: 'Escola de Natação', description: 'Espaço para aulas e treinos de natação' },
    { name: 'Escola de Ginástica', description: 'Espaço para diversas atividades de ginástica' },
    { name: 'Studio de Pilates', description: 'Studio especializado em pilates para todos os níveis' },
    { name: 'Studio de Yoga', description: 'Área destinada à prática de yoga' },
    { name: 'Box de CrossFit', description: 'Espaço especializado em treinos de CrossFit' },
    { name: 'Box de Cross Training', description: 'Área para treinos de Cross Training' },
    { name: 'Clube', description: 'Clube com diversas atividades esportivas e de lazer' },
];

export const useFiveStepConfigGym = (formData: StepFiveProps['formData'], setFormData: StepFiveProps['setFormData']) => {

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, itemName: string, itemType: 'service' | 'segment') => {
        const items = itemType === 'service' ? services : segments;
        const selectedItems = formData[itemType === 'service' ? 'selectedServices' : 'selectedSegments'] || [];

        // Encontra o objeto correspondente
        const item = items.find((i) => i.name === itemName);

        if (!item) return;

        if (event.target.checked) {
            setFormData({
                ...formData,
                [itemType === 'service' ? 'selectedServices' : 'selectedSegments']: [...selectedItems, item],
            });
        } else {
            setFormData({
                ...formData,
                [itemType === 'service' ? 'selectedServices' : 'selectedSegments']: selectedItems.filter(
                    (i: { name: string; description: string }) => i.name !== itemName
                ),
            });
        }
    };

    return {
        services,
        segments,
        handleCheckboxChange,
    };
};
