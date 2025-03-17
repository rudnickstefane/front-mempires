export const ValidateName = (name: string): string => {
    // Remove espaços extras e divide o nome
    const nameParts = name.trim().split(/\s+/).filter(part => part.length > 0);

    // Regex para verificar se há apenas letras e espaços
    const validCharacters = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

    if (!name) {
        return 'O nome completo é obrigatório.';
    } 
    // Verifica se contém caracteres inválidos
    else if (!validCharacters.test(name)) {
        return 'O nome não pode conter números, pontuações ou caracteres especiais.';
    }
    // Verifica se há pelo menos o primeiro e o último nome
    else if (nameParts.length < 2 || nameParts.some(part => part.length <= 1)) {
        return 'O nome completo deve conter pelo menos o primeiro e o último nome.';
    }

    return '';
};
