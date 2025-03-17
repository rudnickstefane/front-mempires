export const FormatText = (text: string): string => {
    if (!text) return ''; // Retorna vazio se o texto for nulo ou vazio

    return text
        .split('\n') // Divide em parágrafos baseados em quebras de linha
        .map(line => {
            const trimmedLine = line.trimStart(); // Remove espaços no início, mas preserva internos
            if (!trimmedLine) return ''; // Deixa linhas vazias inalteradas
            return trimmedLine.charAt(0).toUpperCase() + trimmedLine.slice(1); // Primeira letra maiúscula
        })
        .join('\n'); // Junta os parágrafos novamente
};