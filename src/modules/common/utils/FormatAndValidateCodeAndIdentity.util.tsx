export const FormatAndValidateCodeAndIdentity = (document: string): { formatted: string; isValid: boolean } => {
    // Remove caracteres não numéricos
    let numericDocument = document.replace(/\D/g, '');

    // Limita o número de dígitos ao máximo necessário (14 para CNPJ)
    if (numericDocument.length > 14) {
        numericDocument = numericDocument.slice(0, 14);
    }

    // Validação do comprimento para CPF ou CNPJ
    if (numericDocument.length === 11) {
        // Formatar e validar CPF
        const formatted = `${numericDocument.slice(0, 3)}.${numericDocument.slice(3, 6)}.${numericDocument.slice(6, 9)}-${numericDocument.slice(9, 11)}`;
        const isValid = ValidCPF(numericDocument);
        return { formatted, isValid };
    } else if (numericDocument.length === 14) {
        // Formatar e validar CNPJ
        const formatted = `${numericDocument.slice(0, 2)}.${numericDocument.slice(2, 5)}.${numericDocument.slice(5, 8)}/${numericDocument.slice(8, 12)}-${numericDocument.slice(12, 14)}`;
        const isValid = ValidCNPJ(numericDocument);
        return { formatted, isValid };
    }

    // Documento inválido se não for CPF nem CNPJ
    return { formatted: numericDocument, isValid: false };
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

// Valida CNPJ
export const ValidCNPJ = (cnpj: string): boolean => {
    const numericCNPJ = cnpj.replace(/\D/g, '');

    // Verifica se tem 14 dígitos ou se todos os números são iguais (caso inválido)
    if (numericCNPJ.length !== 14 || /^(\d)\1+$/.test(numericCNPJ)) {
        return false;
    }

    // Validação dos dígitos verificadores
    const calculateVerifierDigit = (cnpjSlice: string, factors: number[]): number => {
        const sum = cnpjSlice
            .split('')
            .reduce((acc, digit, index) => acc + parseInt(digit) * factors[index], 0);
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstTwelveDigits = numericCNPJ.slice(0, 12);
    const firstVerifier = calculateVerifierDigit(firstTwelveDigits, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    const secondVerifier = calculateVerifierDigit(numericCNPJ.slice(0, 13), [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

    return (
        firstVerifier === parseInt(numericCNPJ.charAt(12)) &&
        secondVerifier === parseInt(numericCNPJ.charAt(13))
    );
};
