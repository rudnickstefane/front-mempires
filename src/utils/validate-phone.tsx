export const validatePhoneNumber = (phone: string) => {
    // Permite ambos os formatos: (XX) XXXX-XXXX e (XX) X XXXX-XXXX
    const phoneRegex = /^\(\d{2}\) \d{4}-\d{4}$|^\(\d{2}\) \d \d{4}-\d{4}$/;
    return phoneRegex.test(phone);
};