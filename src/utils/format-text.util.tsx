export const formatText = (name: string): string => {
  const exceptions = ["de", "da", "das", "do", "dos", "e"];
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => {
      if (exceptions.includes(word)) {
        return word; // Mantém as preposições em minúsculo
      }
      return word.charAt(0).toUpperCase() + word.slice(1); // Primeira letra maiúscula
    })
    .join(" ");
};
