export type EditProfileFormData = {
    origin?: string;
    profileCode: number;
    name: string;
    gender: string;
    profession: string;
    company: string;
    stateMarital: string;
    birthDate: string;
    identity: string;
    username: string;
    address: string;
    number: string;
    complement: string;
    zipCode: string;
    district: string;
    city: string;
    state: string;
    description: string;
    phone: string;
    emergencyContact: string;
    emergencyPhone: string;
    email: string;
    referralSource: string;
    indicationSearch: string;
}

export type Contact = {
    contactCode: string;
    type: string;
    description: string;
    phone: string;
    emergencyContact: string;
    emergencyPhone: string;
    email: string;
}