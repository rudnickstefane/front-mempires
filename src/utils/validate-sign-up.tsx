import { validatePassword } from "./validate-password";
import { validatePhoneNumber } from "./validate-phone";

export const ValidateName = (name: string): string => {
    if (!name) {
        return 'O nome completo é obrigatório.';
    } else if (name.split(' ').length < 2) {
        return 'O nome completo deve conter pelo menos o primeiro e o último nome.';
    }
    return '';
};

export const validateEmail = (email: string): string => {
    if (!email) {
        return 'O e-mail é obrigatório.';
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'O e-mail deve ser válido.';
        }
    }
    return '';
};

export const validateFantasyName = (fantasyName: string): string => {
    if (!fantasyName) {
        return 'O nome da academia é obrigatório.';
    }
    return '';
};

export const validateCompanyPhone = (companyPhone: string): string => {
    if (!companyPhone) {
        return 'O telefone é obrigatório.';
    } else if (!validatePhoneNumber(companyPhone)) {
        return 'O telefone deve estar no formato (xx) xxxx xxxx ou (xx) x xxxx xxxx.';
    }
    return '';
};

export const validatePasswordField = (password: string): string => {
    if (!password) {
        return 'A senha é obrigatória.';
    } else {
        const passwordValidationResult = validatePassword(password);
        if (passwordValidationResult) {
            return passwordValidationResult;
        }
    }
    return '';
};