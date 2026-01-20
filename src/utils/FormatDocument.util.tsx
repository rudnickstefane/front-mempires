export const formatDocument = (value: string): string => {
  if (!value || value.trim() === "") return "-";

  // 1. Remove caracteres especiais, mantendo números e letras (para RNE e RG com X)
  const cleanValue = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

  // 2. Regra para CIN / CPF (11 dígitos numéricos)
  if (cleanValue.length === 11 && /^\d+$/.test(cleanValue)) {
    return cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  // 3. Regra para RG (Padrão 9 caracteres - SP/RJ/etc)
  if (cleanValue.length === 9) {
    return cleanValue.replace(/(\d{2})(\d{3})(\d{3})([0-9X])/, "$1.$2.$3-$4");
  }

  // 4. Se for CNH (11 dígitos) ou RNE/Outros (tamanhos variados)
  // Apenas retornamos o valor limpo em caixa alta para evitar máscaras erradas
  return cleanValue.slice(0, 15);
};
