// Função para remover acentos e deixar lowercase
export function RemoveAccentsLowercase(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
