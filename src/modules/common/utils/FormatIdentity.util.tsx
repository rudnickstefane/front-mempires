export const FormatIdentity = (document: string) => {
    // Remove espaços extras e normaliza o texto
    const trimmedDocument = document.trim();

    // Se o documento for um CPF (somente números, 11 dígitos)
    const numericDocument = trimmedDocument.replace(/\D/g, ''); // Extrai apenas números
    if (numericDocument.length === 11) {
        // Formata como CPF (XXX.XXX.XXX-XX)
        const formatted = `${numericDocument.slice(0, 3)}.${numericDocument.slice(3, 6)}.${numericDocument.slice(6, 9)}-${numericDocument.slice(9, 11)}`;

        return formatted;
    }

    // Se o documento for um CNPJ (14 dígitos)
    if (numericDocument.length === 14) {
        // Formata como CNPJ (XX.XXX.XXX/XXXX-XX)
        return `${numericDocument.slice(0, 2)}.${numericDocument.slice(2, 5)}.${numericDocument.slice(5, 8)}/${numericDocument.slice(8, 12)}-${numericDocument.slice(12, 14)}`;
    }

    // Se o documento for um RG (números, 9 dígitos)
    if (numericDocument.length === 9) {
        // Formata como RG (00.000.000-0)
        const formatted = `${numericDocument.slice(0, 2)}.${numericDocument.slice(2, 5)}.${numericDocument.slice(5, 8)}-${numericDocument.slice(8)}`;

        return formatted;
    }

    // Se o documento contiver letras (possivelmente um passaporte)
    if (/^[A-Za-z0-9]+$/.test(trimmedDocument)) {
        // Mantém o formato original (sem formatação específica)
        return trimmedDocument; // Passaportes são aceitos como válidos
    }
};