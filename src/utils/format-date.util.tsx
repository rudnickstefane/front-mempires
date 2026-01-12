/**
 * Formata data ISO para DD/MM/AAAA
 * Ex: 1960-04-27T00:00:00.000Z -> 27/04/1960
 */
export const formatDate = (dateString?: string): string => {
  if (!dateString) return "-";

  // Dividimos a string para pegar apenas a parte da data YYYY-MM-DD
  const [datePart] = dateString.split("T");
  const [year, month, day] = datePart.split("-");

  return `${day}/${month}/${year}`;
};

/**
 * Formata data ISO para DD/MM/AAAA às HHhMM
 * Ex: 1960-04-27T15:30:00.000Z -> 27/04/1960 às 15h30
 */
export const formatDateTime = (dateString?: string): string => {
  if (!dateString) return "-";

  // Pegamos a data e a hora separadamente da string ISO
  const [datePart, timePart] = dateString.split("T");
  const [year, month, day] = datePart.split("-");

  // Pegamos apenas hora e minuto (HH:mm)
  const [hour, minute] = timePart.split(":");

  return `${day}/${month}/${year} às ${hour}h${minute}`;
};
