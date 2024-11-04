export const formatCep = (cep: string) => {
    // Remove tudo que n�o � n�mero
    const cleanedCep = cep.replace(/\D/g, '');

    // Verifica se tem o comprimento adequado
    if (cleanedCep.length <= 5) return cleanedCep;

    // Retorna no formato XXXXX-XXX
    return `${cleanedCep.slice(0, 5)}-${cleanedCep.slice(5, 8)}`;
};
