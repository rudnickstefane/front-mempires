
// Validação do Horário de Início
export const validateTime = (startTime: string): string | null => {
    if (!startTime.trim()) {
        return 'O campo é obrigatório';
    }

    return null;
};

export const validateTimeFormated = (startTime: string): string | null => {
    const timePattern = /^\d{2}:\d{2}$/;

    if (!timePattern.test(startTime)) {
        return 'O horário de início deve estar no formato HH:MM.';
    }

    return null;
};

// Validação do Horário de Fim
export const validateEndTime = (endTime: string): string | null => {
    const timePattern = /^\d{2}:\d{2}$/;

    if (!timePattern.test(endTime)) {
        return 'O horário de fim deve estar no formato HH:MM.';
    }

    return null;
};

// Validação de Seleção de Dias
export const validateDaysSelection = (selectedDays: string[]): string | null => {
    if (selectedDays.length === 0) {
        return 'Selecione pelo menos um dia.';
    }
    return null;
};

// Validação de Formas de Trabalho
export const validateWorkForms = (workForms: string[]): string | null => {
    if (workForms.length === 0) {
        return 'Selecione pelo menos uma forma de trabalho.';
    }
    return null;
};

// Validação de planos
export const validatePlans = (plans: string[]): string => {
    if (plans.length === 0) {
        return "Pelo menos um plano deve ser selecionado.";
    }
    return "";
};

// Validação de Fuso Horário
export const validateTimeZone = (timeZone: string): string | null => {
    if (!timeZone) {
        return 'Selecione ao menos um fuso horário.';
    }
    return null;
};

// Validação do CEP
export const validateCep = (cep: string): string | null => {

    if (!cep) {
        return 'O CEP é obrigatório.';
    }

    if (cep.length !== 9) {
        return 'O CEP deve conter 8 dígitos.';
    }

    return null;
};

// Validação do Endereço
export const validateAddress = (address: string): string | null => {

    if (!address) {
        return 'O endereço é obrigatório.';
    }

    return null;
};

// Validação do Número
export const validateNumber = (number: string): string | null => {

    if (!number) {
        return 'O número é obrigatório.';
    }

    return null;
};

// Validação do Bairro
export const validateNeighborhood = (neighborhood: string): string | null => {

    if (!neighborhood) {
        return 'O bairro é obrigatório.';
    }

    return null;
};

// Validação da Cidade
export const validateCity = (city: string): string | null => {

    if (!city) {
        return 'A cidade é obrigatória.';
    }

    return null;
};

// Validação do Estado
export const validateState = (state: string): string | null => {

    if (!state) {
        return 'O estado é obrigatório.';
    }

    return null;
};