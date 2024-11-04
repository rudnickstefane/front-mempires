export const validatePassword = (password: string): string | null => {
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const sequentialNumbersRegex = /012|123|234|345|456|567|678|789/;

    if (!upperCaseRegex.test(password)) {
        return 'A senha deve conter pelo menos um caractere maiúsculo.';
    }

    if (!lowerCaseRegex.test(password)) {
        return 'A senha deve conter pelo menos um caractere minúsculo.';
    }

    if (!specialCharRegex.test(password)) {
        return 'A senha deve conter pelo menos um caractere especial.';
    }

    if (sequentialNumbersRegex.test(password)) {
        return 'A senha não deve conter sequências de números consecutivos.';
    }

    return null;
};
