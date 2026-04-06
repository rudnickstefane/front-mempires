export const formatText = (text: string): string => {
  if (!text) return "";

  const lowerExceptions = ["de", "da", "do", "das", "dos", "e"];
  const upperExceptions = [
    "LTDA",
    "S.A",
    "S/A",
    "S.A.",
    "ME",
    "EPP",
    "MEI",
    "EIRELI",
    "CNPJ",
    "CPF",
  ];

  return text
    .split(" ")
    .filter((word) => word.trim().length > 0)
    .map((word) => {
      const cleanWord = word.trim();
      const lowerWord = cleanWord.toLowerCase();

      // 1. Siglas Jurídicas (Sempre força o padrão da lista)
      const isUpper = upperExceptions.find(
        (sigla) => sigla.toLowerCase() === lowerWord,
      );
      if (isUpper) return isUpper;

      // 2. Preposições (Sempre minúsculo)
      if (lowerExceptions.includes(lowerWord)) {
        return lowerWord;
      }

      // 3. Regra para RD, JLS, ABC (2 ou 3 letras)
      // Se tiver até 3 letras, retorna exatamente como o usuário digitou
      // Assim, "RD" continua "RD" e "rd" continua "rd"
      if (cleanWord.length <= 2) {
        return cleanWord;
      }

      // 4. Palavras longas (> 3 letras)
      // "SAUDE" -> "Saude", "DROGARIA" -> "Drogaria"
      return (
        cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1).toLowerCase()
      );
    })
    .join(" ");
};
