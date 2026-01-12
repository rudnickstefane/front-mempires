export const formatTime = (input: string) => {
    const time = input.replace(/[^0-9]/g, '');

    let hours = time.slice(0, 2);
    let minutes = time.slice(2, 4);

    // Validação de horas
    if (parseInt(hours, 10) > 23) {
        hours = '23';
    }

    // Validação de minutos
    if (minutes && parseInt(minutes, 10) > 59) {
        minutes = '59';
    }

    if (time.length <= 2) {
        return hours;
    } else if (time.length <= 4) {
        return `${hours}:${minutes}`;
    } else {
        return `${hours}:${minutes}`;
    }
};
