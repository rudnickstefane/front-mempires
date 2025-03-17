export const FormatZipCode = (ZipCode: string) => {
    // Remove tudo que não é número
    const cleanedZipCode = ZipCode.replace(/\D/g, '');

    // Verifica se tem o comprimento adequado
    if (cleanedZipCode.length <= 5) return cleanedZipCode;

    // Retorna no formato XXXXX-XXX
    return `${cleanedZipCode.slice(0, 5)}-${cleanedZipCode.slice(5, 8)}`;
};
