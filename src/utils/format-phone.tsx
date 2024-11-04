export const formatPhoneNumber = (value: string): string => {
    // Remove qualquer caractere que não seja dígito e limita o comprimento a 11 para celular ou 10 para fixo
    const digits = value.replace(/\D/g, '').slice(0, 11);

    // Adiciona a formatação para telefone fixo e celular
    if (digits.length <= 10) {
        // Formato (00) 0000-0000
        return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
        // Formato (00) 0 0000-0000
        return digits.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
    }
};
