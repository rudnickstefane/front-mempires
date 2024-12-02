export const FormatIdentity = (document: string) => {
    // Remove caracteres não numéricos
    const numericDocument = document.replace(/\D/g, '');

    const formatted = `${numericDocument.slice(0, 3)}.${numericDocument.slice(3, 6)}.${numericDocument.slice(6, 9)}-${numericDocument.slice(9, 11)}`;

    // Documento inválido se não for CPF nem CNPJ
    return formatted;
};

export const FormatCode = (document: string) => {
    // Remove caracteres não numéricos
    const numericDocument = document.replace(/\D/g, '');

    const formatted = `${numericDocument.slice(0, 2)}.${numericDocument.slice(2, 5)}.${numericDocument.slice(5, 8)}/${numericDocument.slice(8, 12)}-${numericDocument.slice(12, 14)}`;

    // Documento inválido se não for CPF nem CNPJ
    return formatted;
}
