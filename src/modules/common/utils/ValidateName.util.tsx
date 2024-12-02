export const ValidateName = (name: string): string => {

    const nameParts = name.trim().split(/\s+/).filter(part => part.length > 0);
    
    if (!name) {
        return 'O nome completo é obrigatório.';
    } else if (nameParts.length < 2 || nameParts.some(part => part.length <= 1)) {
        return 'O nome completo deve conter pelo menos o primeiro e o último nome.';
    }
    return '';
};