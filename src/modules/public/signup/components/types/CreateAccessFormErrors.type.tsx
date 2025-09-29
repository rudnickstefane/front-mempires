export type CreateAccessFormErrors = {
    nameError?: string;
    emailError?: string;
    passwordError?: string;
    phoneError?: string;
    fantasyNameError?: string,
    codeError?: string,
    [key: string]: string | undefined;
}