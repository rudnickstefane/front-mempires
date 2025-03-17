export type StudentUpsertFormData = {
    origin?: string;
    type?: string;
    status?: string,
    assignment?: number,
    name: string;
    birthDate: string;
    identity: string;
    gender: string | null;
    stateMarital: string | null;
    profession: string;
    company: string;
    address: string;
    number: string;
    complement: string;
    zipCode: string;
    district: string;
    city: string;
    state: string;
    periodicityCode: string;
    paymentDay: string;
    modalities: string[];
    statusModality: string;
    detailsPlan: string;
    email: string;
    emailStatus: string;
    typeContact: string;
    description: string | null;
    phone: string;
    emergencyContact: string;
    emergencyPhone: string;
    referralSource: string;
    responsible: string;
    studentCode?: string;
    financeResponsible: string;
    indicationSearch: string;
}