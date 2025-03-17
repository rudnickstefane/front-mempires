export const RemovePunctuation = (value: string): string => {
    return value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
};