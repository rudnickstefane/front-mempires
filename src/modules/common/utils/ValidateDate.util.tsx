export const ValidateDate = (date: string): boolean => {
  // Expressão regular para validar o formato aaaa-mm-dd
  const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
  const match = date.match(regex);

  if (!match) return false;

  const [, year, month, day] = match.map(Number);

  // Verifica se a data é válida usando os limites reais de dia e mês
  if (day < 1 || day > 31 || month < 1 || month > 12) return false;

  // Cria uma data e verifica se ela é consistente
  const parsedDate = new Date(year, month - 1, day);
  return (
    parsedDate.getDate() === day &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getFullYear() === year
  );
};
