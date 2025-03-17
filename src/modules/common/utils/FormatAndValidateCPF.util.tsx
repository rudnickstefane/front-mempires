// Formata e valida CPF
export const FormatAndValidateCPF = (document: string): { formatted: string; isValid: boolean } => {
    // Remove espaços extras e normaliza o texto
    const trimmedDocument = document.trim();

    // Remove caracteres não numéricos
    const numericDocument = trimmedDocument.replace(/\D/g, '');

    // Valida comprimento (CPF precisa ter 11 dígitos)
    if (numericDocument.length !== 11) {
        return { formatted: trimmedDocument, isValid: false };
    }

    // Formata como CPF (XXX.XXX.XXX-XX)
    const formatted = `${numericDocument.slice(0, 3)}.${numericDocument.slice(3, 6)}.${numericDocument.slice(6, 9)}-${numericDocument.slice(9, 11)}`;

    // Valida o CPF
    const isValid = ValidCPF(numericDocument);
    return { formatted, isValid };
};

// Validação de CPF
export const ValidCPF = (cpf: string): boolean => {
    const numericCPF = cpf.replace(/\D/g, '');

    if (numericCPF.length !== 11 || /^(\d)\1+$/.test(numericCPF)) {
        return false;
    }

    const calculateVerifierDigit = (cpfSlice: string, factor: number): number => {
        const sum = cpfSlice
            .split('')
            .reduce((acc, digit, index) => acc + parseInt(digit) * (factor - index), 0);
        const remainder = (sum * 10) % 11;
        return remainder === 10 ? 0 : remainder;
    };

    const firstNineDigits = numericCPF.slice(0, 9);
    const firstVerifier = calculateVerifierDigit(firstNineDigits, 10);
    const secondVerifier = calculateVerifierDigit(numericCPF.slice(0, 10), 11);

    return (
        firstVerifier === parseInt(numericCPF.charAt(9)) &&
        secondVerifier === parseInt(numericCPF.charAt(10))
    );
};