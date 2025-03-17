export const FormatAndValidateCNPJ = (cnpj: string): { formatted: string; isValid: boolean } => {
    const numericCNPJ = cnpj.replace(/\D/g, ''); // Remove formatação

    // Verifica se tem 14 dígitos
    if (numericCNPJ.length !== 14) {
        return { formatted: cnpj, isValid: false };
    }

    // Formata o CNPJ (XX.XXX.XXX/XXXX-XX)
    const formatted = `${numericCNPJ.slice(0, 2)}.${numericCNPJ.slice(2, 5)}.${numericCNPJ.slice(5, 8)}/${numericCNPJ.slice(8, 12)}-${numericCNPJ.slice(12)}`;

    // Valida o CNPJ
    const isValid = validateCNPJ(numericCNPJ);

    return { formatted, isValid };
};

// Função de validação de CNPJ
const validateCNPJ = (cnpj: string): boolean => {
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
        return false; // Tamanho inválido ou CNPJ com todos os números iguais
    }

    const calculateVerifierDigit = (cnpjSlice: string, weights: number[]): number => {
        const sum = cnpjSlice
            .split('')
            .reduce((acc, digit, index) => acc + parseInt(digit) * weights[index], 0);
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstVerifier = calculateVerifierDigit(cnpj.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    const secondVerifier = calculateVerifierDigit(cnpj.slice(0, 13), [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

    return (
        firstVerifier === parseInt(cnpj.charAt(12)) &&
        secondVerifier === parseInt(cnpj.charAt(13))
    );
};
