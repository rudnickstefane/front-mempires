export const EmailValidator = (email: string): string => {
    // Verifica se o email está vazio
    if (!email) return "O e-mail fornecido é inválido.";

    // Regex para validar o e-mail com as regras definidas
    const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9.]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (/[À-ÿ]/.test(email)) {
        return "O e-mail não pode conter caracteres acentuados.";
    }

    // Nome de usuário só pode ter letras, números e pontos
    const usernamePart = email.split("@")[0];
    if (!/^[a-zA-Z0-9][a-zA-Z0-9._]*$/.test(usernamePart)) {
        return "Somente letras (a - z), números (0 - 9), pontos (.) e underline (_) são permitidos.";
    }

    // O primeiro caractere do nome de usuário precisa ser uma letra ou número
    if (!/^[a-zA-Z0-9]/.test(usernamePart)) {
        return "O primeiro caractere do nome de usuário precisa ser uma letra ou número.";
    }

    // Validação final do e-mail
    if (!emailRegex.test(email)) {
        return "O e-mail fornecido é inválido.";
    }

    return "";
};