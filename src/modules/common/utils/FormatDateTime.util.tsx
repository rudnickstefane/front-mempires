export const FormatDateTime = (isoDate: string): string => {
  if (!isoDate) {
    throw new Error("Data ISO inválida ou vazia.");
  }

  const date = new Date(isoDate);

  if (isNaN(date.getTime())) {
    throw new Error(`Formato de data inválido: ${isoDate}`);
  }

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Meses começam do 0
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} às ${hours}h${minutes}`;
};