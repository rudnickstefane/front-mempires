export const FormatCash = (value: string): string => {
  // Remove caracteres não numéricos
  const numericValue = value.replace(/[^0-9]/g, '');

  // Verifica se o valor é vazio
  if (!numericValue) return '0,00';

  // Adiciona zeros à esquerda para garantir pelo menos 3 dígitos
  const paddedValue = numericValue.padStart(3, '0');

  // Separa a parte inteira e decimal
  const integerPart = paddedValue.slice(0, -2); // Tudo menos os últimos 2 dígitos
  const decimalPart = paddedValue.slice(-2); // Últimos 2 dígitos

  // Formata a parte inteira com separador de milhares
  const formattedIntegerPart = parseInt(integerPart, 10).toLocaleString('pt-BR');

  // Junta a parte inteira e decimal
  return `${formattedIntegerPart},${decimalPart}`;
};
