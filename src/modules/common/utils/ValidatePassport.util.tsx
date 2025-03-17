export const ValidatePassport = (passport: string): { isValid: boolean; formatted: string } => {
    // Remove espaços em branco
    const trimmedPassport = passport.trim();

    // Regex para validar passaportes brasileiros
    const passportRegex = /^[A-Z]{2}\d{6}$/;

    // Verifica se o passaporte é válido
    const isValid = passportRegex.test(trimmedPassport);

    // Formata o passaporte (apenas maiúsculas e trim)
    const formatted = trimmedPassport.toUpperCase();

    return { isValid, formatted };
};
