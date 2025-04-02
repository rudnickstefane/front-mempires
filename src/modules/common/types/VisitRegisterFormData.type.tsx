export type VisitRegisterFormData = {
    assignment?: number;
    name?: string;
    identity?: string;
    referralSource?: string;
    indicationSearch?: string;
    modalities?: string[];
    observation?: string;
    email?: string;
    phone?: string;
    [key: string]: string | number | boolean | string[] | null | unknown;
}