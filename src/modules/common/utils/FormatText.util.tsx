export const FormatText = (name: string): string => {
    const exceptions = ["de", "da", "do", "das", "dos"];
    return name
        .toLowerCase()
        .split(" ")
        .map(word => {
            if (exceptions.includes(word)) {
                return word; // Mantém as preposições em minúsculo
            }
            return word.charAt(0).toUpperCase() + word.slice(1); // Primeira letra maiúscula
        })
        .join(" ");
};
