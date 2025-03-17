// Formata e valida RG
export const FormatAndValidateRG = (document: string): { formatted: string; isValid: boolean } => {
    // Remove espaços extras e normaliza o texto
    const trimmedDocument = document.trim();

    // Remove caracteres não numéricos
    const numericDocument = trimmedDocument.replace(/\D/g, '');

    // Valida comprimento (RG precisa ter 9 dígitos)
    if (numericDocument.length !== 9) {
        return { formatted: trimmedDocument, isValid: false };
    }

    // Formata como RG (XX.XXX.XXX-X)
    const formatted = `${numericDocument.slice(0, 2)}.${numericDocument.slice(2, 5)}.${numericDocument.slice(5, 8)}-${numericDocument.slice(8)}`;

    // Valida o RG
    const isValid = ValidRG(numericDocument);
    return { formatted, isValid };
};

// Validação de RG
export const ValidRG = (rg: string): boolean => {
    const numericRG = rg.replace(/\D/g, '');

    if (numericRG.length !== 9) {
        return false;
    }

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