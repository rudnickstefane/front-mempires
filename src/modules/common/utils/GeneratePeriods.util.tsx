export const GeneratePeriodLabel = (months: number): string => {
    if (months === 1) return 'Mensal';
    if (months === 2) return 'Bimestral';
    if (months === 3) return 'Trimestral';
    if (months === 4) return 'Quadrimestral';
    if (months === 6) return 'Semestral';
    if (months === 12) return 'Anual';
    if (months === 24) return 'Bienal';
    return `${months} Meses`;
};

export const GeneratePeriodDescription = (months: number): string => {
    if (months === 1) return 'Pagamento por mês.';
    if (months === 2) return 'Pagamento a cada 2 meses.';
    if (months === 3) return 'Pagamento a cada 3 meses.';
    if (months === 4) return 'Pagamento a cada 4 meses.';
    if (months === 6) return 'Pagamento a cada 6 meses.';
    if (months === 12) return 'Pagamento a cada 12 meses.';
    if (months === 24) return 'Pagamento a cada 24 meses.';
    return `Pagamento a cada ${months} meses.`;
};