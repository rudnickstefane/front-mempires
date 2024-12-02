export const FormatAndValidateIdentity = (document: string): { formatted: string; isValid: boolean } => {
    // Remove espaços extras e normaliza o texto
    const trimmedDocument = document.trim();

    // Validação básica do comprimento mínimo (6 caracteres)
    if (trimmedDocument.length < 6) {
        return { formatted: trimmedDocument, isValid: false };
    }

    // Se o documento for um CPF (somente números, 11 dígitos)
    const numericDocument = trimmedDocument.replace(/\D/g, ''); // Extrai apenas números
    if (numericDocument.length === 11) {
        // Formata como CPF (XXX.XXX.XXX-XX)
        const formatted = `${numericDocument.slice(0, 3)}.${numericDocument.slice(3, 6)}.${numericDocument.slice(6, 9)}-${numericDocument.slice(9, 11)}`;

        // Valida o CPF
        const isValid = ValidCPF(numericDocument);
        return { formatted, isValid };
    }

    // Se o documento for um RG (números, 9 dígitos)
    if (numericDocument.length === 9) {
        // Formata como RG (00.000.000-0)
        const formatted = `${numericDocument.slice(0, 2)}.${numericDocument.slice(2, 5)}.${numericDocument.slice(5, 8)}-${numericDocument.slice(8)}`;

        // Valida o RG
        const isValid = ValidRG(numericDocument);
        return { formatted, isValid };
    }

    // Se o documento contiver letras (possivelmente um passaporte)
    if (/^[A-Za-z0-9]+$/.test(trimmedDocument)) {
        // Mantém o formato original (sem formatação específica)
        return { formatted: trimmedDocument, isValid: true }; // Passaportes são aceitos como válidos
    }

    // Qualquer outro caso (caracteres inválidos)
    return { formatted: trimmedDocument, isValid: true };
};

// Valida CPF
export const ValidCPF = (cpf: string): boolean => {
    const numericCPF = cpf.replace(/\D/g, '');

    // Verifica se tem 11 dígitos ou se todos os números são iguais (caso inválido)
    if (numericCPF.length !== 11 || /^(\d)\1+$/.test(numericCPF)) {
        return false;
    }

    // Validação dos dígitos verificadores
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

// Valida RG
export const ValidRG = (rg: string): boolean => {
    // Remove caracteres não numéricos
    const numericRG = rg.replace(/\D/g, '');

    // Verifica se tem exatamente 9 dígitos
    if (numericRG.length !== 9) {
        return false;
    }

    // Cálculo do dígito verificador usando módulo 11
    const calculateVerifierDigit = (rgSlice: string): number => {
        const sum = rgSlice
            .split('')
            .reduce((acc, digit, index) => acc + parseInt(digit) * (2 + index), 0);
        const remainder = sum % 11;
        return remainder > 1 ? 11 - remainder : 0;
    };

    const baseRG = numericRG.slice(0, 8);
    const expectedVerifier = parseInt(numericRG.charAt(8));
    const calculatedVerifier = calculateVerifierDigit(baseRG);

    return expectedVerifier === calculatedVerifier;
};
